import { config } from '@config';

//import { logAPI } from '@lib/loggers';

class BuilderApi {
    constructor(
        public readonly serviceUrl: string,
        public readonly wsUrl: string
    ) {}

    getConnectUrl(room: string): string {
        return `${this.wsUrl}/builder/api/connect/${room}`;
    }
}

export const builderApi = new BuilderApi(config.builderUrl, config.builderWSUrl);
