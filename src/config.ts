import { config as baseConfig } from '$generated/config';

export interface Config {
    environment: 'mock' | 'dev' | 'prod';

    identityUrl: string;
    builderUrl: string;
    webUrl: string;
    contentUrl: string;

    // when null, mock is disabled
    mocks?: string[];

    turnstile: {
        disable?: boolean;
        siteKey: string;
    };
}

export const config: Config = {
    ...baseConfig,
    environment: baseConfig.environment as 'mock' | 'dev' | 'prod'
};
