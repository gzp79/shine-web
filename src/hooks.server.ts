// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { loadThemeServerSide } from '$lib/theme/theme.svelte';

export const handle: Handle = async ({ event, resolve }) => {
    const theme = await loadThemeServerSide(event.cookies);

    event.locals.theme = theme;

    // Modify the response
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            const themeAttribute = theme.theme === 'system' ? '' : `data-theme=${event.locals.theme.theme}`;
            return html.replace('%svelte:data-theme%', themeAttribute);
        }
    });

    return response;
};
