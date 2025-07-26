import { redirect } from '@sveltejs/kit';
import { fetchLatestGameUrls } from '@features/game/Game.svelte';

export const load = async ({ fetch }: { fetch: typeof window.fetch }) => {
    try {
        const gameUrls = await fetchLatestGameUrls(fetch);
        return { gameUrls };
    } catch {
        throw redirect(303, '/error?redirectUrl=/design/features/game');
    }
};
