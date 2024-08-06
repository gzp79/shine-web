import { browser } from '$app/environment';

export class CookieStore<T> {
    value = $state<T>() as T;

    constructor(
        public readonly key: string,
        value: T,
        public readonly validator: (value: T) => boolean = () => true
    ) {
        this.value = value;

        //if (browser) {
            const item = this.getCookie();
            this.value = this.deserialize(item) ?? value;
        //}

        $effect(() => {
            if (this.value === undefined) this.deleteCookie();
            else this.setCookie(this.serialize(this.value));
        });
    }

    private serialize(value: T): string {
        return encodeURIComponent(JSON.stringify(value));
    }

    private deserialize(item: string | null): T | undefined {
        try {
            const decode = item ? decodeURIComponent(item) : undefined;
            const value = decode ? JSON.parse(decode) : undefined;
            if (value === undefined || !this.validator(value))
                throw new Error(`Invalid cookie value: ${this.key} [${item}]`);
            return value;
        } catch (e) {
            console.warn(`Error deserializing cookie: ${this.key}`, e);
            this.deleteCookie();
        }
        return undefined;
    }

    private getCookie(): string {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === this.key ? parts[1] : r;
        }, '');
    }

    private updateCookie(value: string, expires: Date) {
        document.cookie = `${this.key}=${value}; expires=${expires.toUTCString()}; path=/`;
    }

    private setCookie(value: string) {
        const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 100));
        this.updateCookie(value, expires);
    }

    private deleteCookie() {
        this.updateCookie('', new Date(0));
    }
}

export function cookieStore<T>(key: string, value: T) {
    return new CookieStore(key, value);
}

/// todo: The server-side of the cookie store.
