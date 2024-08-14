import { type CurrentUser, identityApi } from '../api/identity_api';
import type { Fetch, Maybe } from '../utils';

let user = $state(null as Maybe<CurrentUser>);
let nextUpdate = $state(0);

// Update the current user every n seconds
const UPDATE_INTERVAL = 5;

export async function loadCurrentUser(fetch: Fetch): Promise<CurrentUser> {
    const now = Date.now();
    if (user === null || now > nextUpdate) {
        const usr = await identityApi.getCurrentUser(fetch);
        user = usr;
        nextUpdate = now + UPDATE_INTERVAL * 1000;
    }
    return user;
}

export async function refreshCurrentUser(fetch: Fetch): Promise<void> {
    loadCurrentUser(fetch);
}

export function currentUserStore() {
    return {
        get isLoaded(): boolean {
            return user !== null;
        },

        get isAuthenticated(): boolean {
            return user !== null && user.isAuthenticated;
        },

        get user(): CurrentUser {
            if (!this.isLoaded) throw new Error('User not loaded');
            return user as CurrentUser;
        }
    };
}
