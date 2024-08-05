import { browser } from '$app/environment';

export class LocalStore<T> {
    value = $state<T>() as T;

    constructor(
        public readonly key: string,
        value: T,
        public readonly validator: (value: T) => boolean = () => true
    ) {
        this.value = value;

        if (browser) {
            const item = localStorage.getItem(key);
            this.value = this.deserialize(item) ?? value;
        }

        $effect(() => {
            if (this.value === undefined) localStorage.removeItem(this.key);
            else localStorage.setItem(this.key, this.serialize(this.value));
        });
    }

    private serialize(value: T): string {
        return JSON.stringify(value);
    }

    private deserialize(item: string | null): T | undefined {
        try {
            const value = item ? JSON.parse(item) : undefined;
            if (value === undefined || !this.validator(value))
                throw new Error(`Invalid local storage value: ${this.key} [${item}]`);
            return value;
        } catch (e) {
            console.warn(`Error deserializing local storage: ${this.key}`, e);
            localStorage.removeItem(this.key);
        }
        return undefined;
    }
}

export function localStore<T>(key: string, value: T) {
    return new LocalStore(key, value);
}
