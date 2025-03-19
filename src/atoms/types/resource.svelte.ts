import { v4 as uuid } from 'uuid';
import { logResource } from '$lib/loggers';
import type { AppError } from '$lib/utils';

type ResourceState<T> =
    | { type: 'empty' }
    | { type: 'content'; content: T; age: number; isDirty: boolean }
    | { type: 'error'; error: AppError };

export interface ResourceService<T> {
    load: () => Promise<T>;
}

export type ResourceRefreshOptions = {
    // perform a forced reload and ignore any pending requests
    force?: boolean;
    // refresh if the resource is older than the given interval
    interval?: number;
    // keep the error state unless some other option forces a reload
    // by default a failed resource will be reloaded
    keepError?: boolean;
};

export class ResourceStore<T, S extends ResourceService<T>> {
    private resource = $state<ResourceState<T>>({ type: 'empty' });
    private isLoading = false;
    private lastUpdate = 0;
    private id = uuid();

    constructor(public readonly service: S) {}

    uniqueId(): string {
        return `${this.constructor.name}-${this.id}`;
    }

    get isEmpty() {
        return this.resource.type === 'empty';
    }

    get isDirty() {
        return this.resource.type !== 'content' || this.resource.isDirty;
    }

    get isError() {
        return this.resource.type === 'error';
    }

    get error(): AppError {
        if (this.resource.type !== 'error') {
            throw new Error('Resource is not in error state');
        }
        return this.resource.error;
    }

    get isContent() {
        return this.resource.type === 'content';
    }

    get age(): number {
        return Math.clamp(Date.now() - this.lastUpdate, 0, Number.MAX_VALUE);
    }

    get content(): T {
        if (this.resource.type !== 'content') {
            throw new Error('Resource is not in content state');
        }
        return this.resource.content;
    }

    async load() {
        if (this.resource.type === 'content') {
            this.resource.isDirty = true;
        }

        const now = Date.now();
        logResource(`${this.uniqueId()}: Start loading resource at ${now}, loading: ${this.isLoading}`);
        this.lastUpdate = now;
        this.isLoading = true;
        let newResource: ResourceState<T>;
        try {
            const content = await this.service.load();
            newResource = { type: 'content', content, age: Date.now(), isDirty: false };
        } catch (err) {
            newResource = { type: 'error', error: err as AppError };
        }

        // when multiple load calls are made, only the last one should update the resource
        if (this.lastUpdate === now) {
            logResource(`${this.uniqueId()}: Loading resource completed with ${newResource.type}`);
            this.resource = newResource;
            this.isLoading = false;
        } else {
            logResource(
                `${this.uniqueId()}: Loading resource ignored request as ${now} is replaced by ${this.lastUpdate}`
            );
        }
    }

    async refresh(options?: ResourceRefreshOptions) {
        let reload = false;

        if (options?.force) {
            logResource(`${this.uniqueId()}: Refreshing resource forced`);
            reload ||= true;
        }

        if (!this.isLoading) {
            if (options?.interval && this.age > options.interval * 1000) {
                logResource(`${this.uniqueId()}: Refreshing resource for outdated content`);
                reload ||= true;
            }
            if (this.resource.type === 'empty') {
                logResource(`${this.uniqueId()}: Refreshing resource for the initial load`);
                reload ||= true;
            }
            if (this.resource.type === 'error' && !options?.keepError) {
                logResource(`${this.uniqueId()}: Refreshing resource  from error state`);
                reload ||= true;
            }
        }

        if (reload) {
            await this.load();
        } else {
            logResource(`${this.uniqueId()}: Skipping resource refresh `);
        }
    }

    protected async update(fn: (content: T) => Promise<T>) {
        if (this.resource.type === 'content') {
            this.resource.isDirty = true;

            this.resource = {
                type: 'content',
                content: await fn(this.resource.content),
                age: this.resource.age,
                isDirty: this.resource.isDirty
            };
        }
        await this.load();
    }
}
