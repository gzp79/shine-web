import type { LanguageProps } from '$lib/i18n/i18n.svelte';
import { loadLanguage } from '$lib/i18n/i18n.svelte';

export const load = async ({ data }) => {
    const languageProps: LanguageProps = data!;
    await loadLanguage(languageProps);

    return languageProps.i18n;
};
