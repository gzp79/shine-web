import { redirect } from '@sveltejs/kit';
import { fetchLatestGameUrl } from '@features/game/Game.svelte';

export const load = async ({ fetch }: { fetch: typeof window.fetch }) => {
    try {
        const gameUrl = await fetchLatestGameUrl(fetch);
        return { gameUrl };
    } catch {
        throw redirect(303, '/error?redirectUrl=/design/features/game');
    }
};
