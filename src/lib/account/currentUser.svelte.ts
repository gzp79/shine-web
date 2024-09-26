import { type CurrentUser, identityApi } from '../api/identity-api';
import { logUser } from '../loggers';
import { type AppError, type Fetch } from '../utils';

type UserState = CurrentUser | AppError | null | { isLoading: number };

function isLoaded(user: UserState): user is CurrentUser | AppError {
    return user !== null && !('isLoading' in user);
}

function isMaybeError(user: UserState): user is AppError | null {
    return user === null || 'errorKind' in user;
}

function isCurrentUser(user: UserState): user is CurrentUser {
    return isLoaded(user) && !('isLoading' in user);
}

let user = $state<UserState>(null);
let nextUpdate = $state(0);

// Update the current user every n seconds
const UPDATE_INTERVAL = 15 * 60;

async function refreshCurrentUser(fetch: Fetch): Promise<void> {
    const now = Date.now();
    if (user === null || now > nextUpdate) {
        logUser('Refreshing current user', nextUpdate, user);
        try {
            user = { isLoading: now };
            nextUpdate = now + UPDATE_INTERVAL * 1000;

            const usr = await identityApi.getCurrentUser(fetch);
            if ('isLoading' in user && user.isLoading == now) {
                //update user only if it hasn't changed yet
                user = usr;
                nextUpdate = now + UPDATE_INTERVAL * 1000;
            }
        } catch (error) {
            if (error !== null && typeof error === 'object') {
                if ('errorKind' in error && 'message' in error) {
                    user = error as AppError;
                } else if ('message' in error) {
                    user = { errorKind: 'other', message: (error as Error).message };
                } else {
                    user = { errorKind: 'other', message: JSON.stringify(error) };
                }
            } else {
                user = { errorKind: 'other', message: String(error) };
            }
            nextUpdate = 0;
        }

        logUser('Refreshed current user', nextUpdate, user);
    }
}

export function currentUserStore() {
    return {
        get isNull(): boolean {
            return user === null;
        },

        get isLoaded(): boolean {
            return isLoaded(user);
        },

        forget(): void {
            user = null;
        },

        async refresh(): Promise<void> {
            await refreshCurrentUser(fetch);
        },

        get error(): AppError | null {
            if (isMaybeError(user)) return user;
            return null;
        },

        get isAuthenticated(): boolean {
            return isCurrentUser(user) && user.isAuthenticated;
        },

        get user(): CurrentUser {
            if (!isCurrentUser(user)) throw new Error('User not loaded');
            return user as CurrentUser;
        }
    };
}
