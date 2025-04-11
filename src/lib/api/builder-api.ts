import { config } from '@config';

//import { logAPI } from '@lib/loggers';

class BuilderApi {
    constructor(public readonly serviceUrl: string) {}

    getConnectUrl(room: string): string {
        return `${this.serviceUrl}/builder/api/connect/${room}`;
    }
}

export const builderApi = new BuilderApi(config.builderUrl);
