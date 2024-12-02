/// Client side configuration, don't put any sensitive information here
import { VITE_CONFIG, VITE_ENABLE_MOCK, VITE_MOCKS } from '$generated/vite-config';

export interface Config {
    serviceUrl: string;
    webUrl: string;
    contentUrl: string;

    turnstile: {
        siteKey: string;
    };
}

const config = VITE_CONFIG as Config;
const enabledMocks: string[] | null = VITE_ENABLE_MOCK ? VITE_MOCKS : null;

export { config, enabledMocks };
