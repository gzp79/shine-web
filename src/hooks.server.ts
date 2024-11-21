// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { loadThemeServerSide } from '$lib/theme/theme.svelte';

if (ENABLE_MOCK) {
    console.log('starting server mock worker');
    const { server } = await import('$mocks/node');
    server.listen();
}

export const handle: Handle = async ({ event, resolve }) => {
    const theme = await loadThemeServerSide(event.cookies);

    event.locals.theme = theme;

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            const themeAttribute = theme.theme === 'system' ? '' : `data-theme=${event.locals.theme.theme}`;
            return html.replace('%svelte:data-theme%', themeAttribute);
        }
    });

    return response;
};
