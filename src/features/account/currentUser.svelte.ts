import { getContext, setContext } from 'svelte';
import { type CurrentUser, identityApi } from '@lib/api/identity-api';
import { type ResourceRefreshOptions, type ResourceService, ResourceStore } from '@atoms/types/resource.svelte';

// Update the current user every n seconds
const UPDATE_INTERVAL = 15 * 60;

export interface CurrentUserService extends ResourceService<CurrentUser> {
    startEmailConfirmation: () => Promise<void>;
    startEmailChange: (newEmail: string) => Promise<void>;
    getLogoutUrl: (all: boolean, redirectUrl: string) => string;
}

export class CurrentUserStore extends ResourceStore<CurrentUser, CurrentUserService> {
    get isAuthenticated() {
        return this.isContent && this.content.isAuthenticated;
    }

    async refresh(options?: ResourceRefreshOptions) {
        await super.refresh({ ...options, interval: UPDATE_INTERVAL });
    }
}

const contextKey = Symbol('currentUserStore');

export function setCurrentUserStore(dataService: CurrentUserService): CurrentUserStore {
    const store = new CurrentUserStore(dataService);
    setContext(contextKey, store);
    return store;
}

export function setDefaultCurrentUserStore(): CurrentUserStore {
    return setCurrentUserStore({
        load: () => identityApi.getCurrentUser(fetch),
        startEmailConfirmation: () => identityApi.startEmailConfirmation(),
        startEmailChange: (email: string) => identityApi.startEmailChange(email),
        getLogoutUrl: (all: boolean, redirectUrl: string) => identityApi.getLogoutUrl(all, redirectUrl)
    });
}

export function getCurrentUserStore(): CurrentUserStore {
    const store = getContext<CurrentUserStore>(contextKey);
    if (!store) {
        throw new Error('CurrentUserStore not found, missing call to setCurrentUserStore');
    }
    return store;
}
