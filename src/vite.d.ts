import { Config } from '$app/config';

declare global {
    declare const VITE_CONFIG: Config;
    declare const VITE_ENABLE_MOCK: boolean;
    declare const VITE_MOCKS: string[];
}
