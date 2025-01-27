import { type CurrentUser, identityApi } from '$lib/api/identity-api';
import { logUser } from '$lib/loggers';
import { type AppError, type Fetch } from '$lib/utils';

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

let s_user = $state<UserState>(null);
let s_nextUpdate = $state(0);

// Update the current user every n seconds
const UPDATE_INTERVAL = 15 * 60;

async function refreshCurrentUser(fetch: Fetch): Promise<void> {
    const now = Date.now();
    if (s_user === null || now > s_nextUpdate) {
        logUser('Refreshing current user', s_nextUpdate, s_user);
        try {
            s_user = { isLoading: now };
            s_nextUpdate = now + UPDATE_INTERVAL * 1000;

            logUser('Fetching current user data...');
            const usr = await identityApi.getCurrentUser(fetch);
            if ('isLoading' in s_user && s_user.isLoading == now) {
                logUser('Fetching current user data completed', usr);
                //update user only if it hasn't changed yet
                s_user = usr;
                s_nextUpdate = now + UPDATE_INTERVAL * 1000;
            } else {
                logUser('Fetching current user data was late...');
            }
        } catch (error) {
            logUser('Fetching current user data failed with error', error);
            if (error !== null && typeof error === 'object') {
                if ('errorKind' in error && 'message' in error) {
                    s_user = error as AppError;
                } else if ('message' in error) {
                    s_user = { errorKind: 'other', message: (error as Error).message };
                } else {
                    s_user = { errorKind: 'other', message: JSON.stringify(error) };
                }
            } else {
                s_user = { errorKind: 'other', message: String(error) };
            }
            s_nextUpdate = 0;
        }

        logUser('Refreshed current user', s_nextUpdate, s_user);
    }
}

export function currentUserStore() {
    return {
        get isNull(): boolean {
            return s_user === null;
        },

        get isLoaded(): boolean {
            return isLoaded(s_user);
        },

        forget(): void {
            s_user = null;
        },

        async refresh(): Promise<void> {
            await refreshCurrentUser(fetch);
        },

        get error(): AppError | null {
            if (isMaybeError(s_user)) return s_user;
            return null;
        },

        get isAuthenticated(): boolean {
            return isCurrentUser(s_user) && s_user.isAuthenticated;
        },

        get user(): CurrentUser {
            if (!isCurrentUser(s_user)) throw new Error('User not loaded');
            return s_user as CurrentUser;
        },

        get raw(): UserState {
            return s_user;
        }
    };
}
