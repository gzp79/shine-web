export interface Config {
    serviceUrl: string;
    webUrl: string;
    contentUrl: string;

    turnstile: {
        siteKey: string;
    };
}

const config = CONFIG as Config;
export default config;
