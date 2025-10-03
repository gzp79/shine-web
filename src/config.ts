import { config as baseConfig } from '@generated/config';
import '@lib/prelude';

export const GAME_BASE_NAME = 'shine-client';

export interface Config {
    environment: 'mock' | 'dev' | 'prod';

    identityUrl: string;
    builderUrl: string;
    builderWSUrl: string;
    webUrl: string;
    assetUrl: string;
    gameUrl: string;

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
