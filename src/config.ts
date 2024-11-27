/// Client side configuration, don't put any sensitive information here

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
