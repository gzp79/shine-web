import { getContext, setContext } from 'svelte';
import { type LinkedIdentity } from '@lib/api/identity-api';
import { type ResourceService, ResourceStore } from '@atoms/types/resource.svelte';

export interface LinkedIdentityService extends ResourceService<LinkedIdentity[]> {
    unlink: (provider: string, providerUserId: string) => Promise<void>;
    getLinkUrl: (provider: string, redirect: string) => string;
}

export class LinkedIdentityStore extends ResourceStore<LinkedIdentity[], LinkedIdentityService> {
    async unlink(provider: string, providerUserId: string): Promise<void> {
        return this.update(async (links) => {
            try {
                await this.service.unlink(provider, providerUserId);
            } catch (error) {
                // todo: show error toasts
                console.error('Failed to unlink', provider, providerUserId, error);
            }
            return links.filter((link) => link.provider !== provider || link.providerUserId !== providerUserId);
        });
    }
}

const contextKey = Symbol('linkedIdentityStore');

export function setLinkedIdentityStore(dataService: LinkedIdentityService): LinkedIdentityStore {
    const store = new LinkedIdentityStore(dataService);
    setContext(contextKey, () => store);
    return store;
}

export function getLinkedIdentityStore(): LinkedIdentityStore {
    const store = getContext<() => LinkedIdentityStore>(contextKey);
    if (!store) {
        throw new Error('ActiveTokenStore not found, missing call to setActiveTokenStore');
    }
    return store();
}
