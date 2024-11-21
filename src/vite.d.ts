import { Config } from '$app/config';

declare global {
    declare const CONFIG: Config;
    declare const ENABLE_MOCK: boolean;
}
