export type Maybe<T> = T | null;

export type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export class FetchError extends Error {
    constructor(
        message: string,
        public status: number,
        public body: string
    ) {
        super(message);
    }
}

export async function fetchError(message: string, response: Response): Promise<Error> {
    const body = await response.text();
    return new FetchError(message, response.status, body);
}

export function delay(ms: number): Promise<void> {
    return new Promise((resolver) => setTimeout(resolver, ms));
}

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

