import { type CurrentUser, identityApi } from '../api/identity-api';
import { type AppError, type Fetch, FetchError, maybeNull } from '../utils';

let user = $state(maybeNull<CurrentUser | AppError>());
let nextUpdate = $state(0);

// Update the current user every n seconds
const UPDATE_INTERVAL = 15 * 60;

export async function loadCurrentUser(fetch: Fetch): Promise<CurrentUser | AppError> {
    const now = Date.now();
    if (user === null || now > nextUpdate) {
        try {
            const usr = await identityApi.getCurrentUser(fetch);
            user = usr;
            nextUpdate = now + UPDATE_INTERVAL * 1000;
        } catch (error) {
            if (error instanceof FetchError) {
                console.error('Failed to load current user', error);
                user = error;
                nextUpdate = 0;
            } else {
                throw error;
            }
        }
    }
    return user;
}

export function currentUserStore() {
    return {
        get isLoaded(): boolean {
            return user !== null;
        },

        get isAuthenticated(): boolean {
            return user !== null && !('errorKind' in user) && user.isAuthenticated;
        },

        forgetUser(): void {
            user = null;
        },

        async refreshUser(): Promise<void> {
            await loadCurrentUser(fetch);
        },

        get error(): AppError | null {
            if (user !== null && 'errorKind' in user) return user;
            return null;
        },

        get user(): CurrentUser {
            if (user === null || 'errorKind' in user) throw new Error('User not loaded');
            return user as CurrentUser;
        }
    };
}
