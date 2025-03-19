import { getContext, setContext } from 'svelte';
import type { ActiveSession } from '$lib/api/identity-api';
import { type ResourceService, ResourceStore } from '$atoms/types/resource.svelte';

export type ActiveSessionService = ResourceService<ActiveSession[]>;

export class ActiveSessionStore extends ResourceStore<ActiveSession[], ActiveSessionService> {}

const contextKey = Symbol('activeSessionStore');

export function setActiveSessionStore(dataService: ActiveSessionService): ActiveSessionStore {
    const store = new ActiveSessionStore(dataService);
    setContext(contextKey, () => store);
    return store;
}

export function getActiveSessionStore(): ActiveSessionStore {
    const store = getContext<() => ActiveSessionStore>(contextKey);
    if (!store) {
        throw new Error('ActiveSessionStore not found, missing call to setActiveSessionStore');
    }
    return store();
}
