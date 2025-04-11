import { getContext, setContext } from 'svelte';
import { type ActiveToken } from '@lib/api/identity-api';
import { type ResourceService, ResourceStore } from '@atoms/types/resource.svelte';

export interface ActiveTokenService extends ResourceService<ActiveToken[]> {
    revoke: (tokenHash: string) => Promise<void>;
}

export class ActiveTokenStore extends ResourceStore<ActiveToken[], ActiveTokenService> {
    async revoke(tokenHash: string) {
        this.update(async (tokens) => {
            try {
                await this.service.revoke(tokenHash);
            } catch (error) {
                // todo: show error toasts
                console.error('Failed to revoke token', error);
            }
            return tokens.filter((token) => token.tokenHash !== tokenHash);
        });
    }
}

const contextKey = Symbol('activeTokenStore');

export function setActiveTokenStore(dataService: ActiveTokenService): ActiveTokenStore {
    const store = new ActiveTokenStore(dataService);
    setContext(contextKey, () => store);
    return store;
}

export function getActiveTokenStore(): ActiveTokenStore {
    const store = getContext<() => ActiveTokenStore>(contextKey);
    if (!store) {
        throw new Error('ActiveTokenStore not found, missing call to setActiveTokenStore');
    }
    return store();
}
