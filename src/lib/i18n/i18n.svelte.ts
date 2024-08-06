/* cspell: disable */
import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';
import { browser, dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';
import { Store } from 'runed';
import { getCookie, type Maybe } from '$lib/utils';
/* cspell: enable */

export const langList = Object.keys(lang);
export const defaultLocale = 'en';

function getSupportedLocale(candidate: string) {
    const supportedLocales = locales.get().map((l) => l.toLowerCase());
    return supportedLocales.includes(candidate) ? candidate : defaultLocale;
}

/// return the preferred language set in the browser
function defaultBrowserLanguage() {
    return `${navigator.language}`.toLowerCase();
}

function createLoader(key: string, routes?: string[]) {
    return langList.map((locale) => ({
        locale: locale,
        key: key,
        routes: routes ?? [`/${key}`],
        loader: async () => (await import(`./${locale}/${key}.json`)).default
    }));
}

const config: Config = {
    log: {
        level: dev ? 'warn' : 'error'
    },
    translations: langList.reduce((r, v) => ({ ...r, ...{ [v]: { lang } } }), {}),
    loaders: [...createLoader('common', ['/']), ...createLoader('tools')]
};

const { t, locale, locales, translations, loadTranslations, setLocale, setRoute } = new i18n(config);
export { t };

export interface LanguageProps {
    i18n: { locale: string; route: string };
    translations: Record<string, Record<string, string>>;
}

export async function loadLanguageServerSide(url: URL, cookies: Cookies, headers: Headers): Promise<LanguageProps> {
    const { pathname } = url;

    let locale = (cookies.get('lang') || '').toLowerCase();
    if (!locale) {
        locale = `${`${headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
    }

    locale = getSupportedLocale(locale);
    await loadTranslations(locale, pathname);

    return {
        i18n: { locale, route: pathname },
        translations: translations.get()
    };
}

export async function loadLanguage(url: URL, languageProps: Maybe<LanguageProps>): Promise<void> {
    let i18n = languageProps?.i18n;

    if (!i18n) {
        if (!browser)
            throw new Error('No languageProps provided, loadLanguageServerSide must be called on the server side.');
        console.log('Loading language from browser...');
        let locale = getCookie('lang') ?? defaultBrowserLanguage();
        locale = getSupportedLocale(locale);
        const route = url.pathname;
        i18n = { locale, route };
    }

    await setLocale(i18n.locale);
    await setRoute(i18n.route);
}

export function languageStore() {
    const rune = new Store(locale);

    $effect(() => {
        document.cookie = `lang=${rune.current}; max-age=31536000; path=/`;
    });

    return rune;
}
