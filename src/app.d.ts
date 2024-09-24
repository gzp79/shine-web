import type { TurnstileObject } from 'turnstile-types';

declare global {
    namespace App {
        interface Locals {
            theme: ThemeProps;
        }

        interface Error {
            code: number;
            message: string;
            detail: unknown;
        }

        interface Platform {
            env: {
                COUNTER: DurableObjectNamespace;
            };
            context: {
                waitUntil(promise: Promise<unknown>): void;
            };
            caches: CacheStorage & { default: Cache };
        }
    }

    interface Window {
        turnstile?: TurnstileObject;
    }
}

export {};
