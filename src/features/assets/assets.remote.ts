import { query } from '$app/server';
import { config } from '@config';
import z from 'zod';
import { type ResourceService, ResourceStore } from '@atoms/types/resource.svelte';
import { logResource } from '../../lib/loggers';
import { fetchError } from '../../lib/utils';

/// Cache resources on the server for this duration (in milliseconds)
const ASSET_CACHE_DURATION = 60 * 60 * 1000;

async function fetchLatestAssetVersion(): Promise<string> {
    const latestUrl = `${config.assetUrl}/latest.json`;
    const response = await fetch(latestUrl);

    if (!response.ok) {
        const error = await fetchError('Failed to fetch latest asset version', response);
        throw error;
    }
    const { version }: { version: string } = await response.json();
    logResource.info(`Latest asset version: [${version}]`);

    return version;
}

type AssetLinks = Record<string, string>;
class AssetService implements ResourceService<AssetLinks> {
    async load(): Promise<AssetLinks> {
        const version = await fetchLatestAssetVersion();

        const assetManifestUrl = `${config.assetUrl}/${version}/web/ui/assets.json`;
        logResource.info(`Loading asset manifest from ${assetManifestUrl}`);
        const response = await fetch(assetManifestUrl);
        if (!response.ok) {
            const error = await fetchError('Failed to fetch asset manifest', response);
            throw error;
        }

        const links = await response.json();
        return links;
    }
}
const assetStore = new ResourceStore<AssetLinks, AssetService>(new AssetService());

export const getAssetLinks = query(async (force = false): Promise<AssetLinks> => {
    await assetStore.refresh({
        interval: ASSET_CACHE_DURATION,
        force
    });

    return !assetStore.isContent ? ({} as AssetLinks) : assetStore.content;
});

/// Return the URL for an asset by its key.
export const getAssetUrl = query(z.string(), async (key: string): Promise<string> => {
    const links = await getAssetLinks();
    const relative = links[key] ?? 'not-found';
    const url = config.assetUrl + '/' + relative;
    logResource.log(`Resolved asset key "${key}" to URL: ${url}`);
    return url;
});

export const getAssetUrls = query(z.array(z.string()), async (keys: string[]): Promise<string[]> => {
    const links = await getAssetLinks();
    const relatives = keys.map((key) => links[key] ?? 'not-found');
    const urls = relatives.map((relative) => config.assetUrl + '/' + relative);
    logResource.log(`Resolved asset key "${keys}" to URL: ${urls}`);
    return urls;
});
