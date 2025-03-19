import { type Snippet } from 'svelte';
import { browser } from '$app/environment';

export type Nullable<T> = T | null;
export function maybeNull<T>(): Nullable<T> {
    return null;
}

type ErrorKind = 'fetch' | 'other' | 'schema';

// A interface for any ssr error that is captured and delegated to the client
export interface AppError {
    errorKind: ErrorKind;
    message: string;
    detail?: unknown;
}

export type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export class FetchError implements AppError {
    errorKind: ErrorKind = 'fetch';

    constructor(
        public message: string,
        public detail: { status: number; body: string }
    ) {}
}

export class SchemaError implements AppError {
    errorKind: ErrorKind = 'schema';

    constructor(public message: string) {}
}

// When building for CF, the cache is disabled and should not be set in the fetch options
export function fetchCacheOption(cache: RequestCache): Partial<RequestInit> {
    if (browser) {
        return { cache };
    }
    return {};
}

export async function fetchError(message: string, response: Response): Promise<FetchError> {
    const body = await response.text();
    return new FetchError(message, { status: response.status, body });
}

export const async = {
    delay(ms: number): Promise<void> {
        return new Promise((resolver) => setTimeout(resolver, ms));
    },

    never(): Promise<never> {
        return new Promise(() => {});
    },

    resolved<T>(data: T): Promise<T> {
        return Promise.resolve(data);
    },

    async error(error: Error): Promise<never> {
        throw error;
    }
};

export function getCookie(key: string): string | undefined {
    const value = document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === key ? parts[1] : r;
    }, '');

    return value ? value : undefined;
}

export function updateCookie(key: string, value: string, expires: Date) {
    document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
}

export function setCookie(key: string, value: string) {
    const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 100));
    updateCookie(key, value, expires);
}

export function deleteCookie(key: string) {
    updateCookie(key, '', new Date(0));
}

export function isSnippet(obj: unknown): obj is Snippet {
    // workaround for sveltekit issue https://github.com/sveltejs/svelte/issues/9774
    return typeof obj !== 'function';
}
