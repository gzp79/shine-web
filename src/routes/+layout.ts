import { loadCurrentUser } from '$lib/account/currentUser.svelte';
import { loadLanguage } from '$src/lib/i18n/i18n.svelte';
import { loadTheme } from '$src/lib/theme/theme.svelte';

export const load = async ({ fetch, data, url }) => {
    const currentUser = loadCurrentUser(fetch);
    await loadLanguage(url, data.language);
    await loadTheme(data.theme);

    return {
        streamed: {
            currentUser
        }
    };
};
