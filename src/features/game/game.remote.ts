import { query } from '$app/server';
import { GAME_BASE_NAME, config } from '@config';
import { logGame } from '@lib/loggers';
import { fetchError } from '@lib/utils';

export const getGameUrls = query(async (): Promise<Record<string, string>> => {
    const targetBaseUrl = config.gameUrl;
    logGame.log('gameUrl Base', targetBaseUrl);
    const latestUrl = `${targetBaseUrl}/latest.json`;
    const response = await fetch(latestUrl);

    if (!response.ok) {
        const error = await fetchError('Failed to fetch latest game version', response);
        throw error;
    }

    const { version, examples }: { version: string; examples: string[] } = await response.json();
    logGame.log('game version', version);
    logGame.log('examples', examples);

    const gameUrls: Record<string, string> = {
        game: `${targetBaseUrl}/${version}/${GAME_BASE_NAME}`
    };
    for (const example of examples) {
        gameUrls[example] = `${targetBaseUrl}/${version}/${example}`;
    }

    return gameUrls;
});
