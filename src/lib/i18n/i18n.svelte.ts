import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';
import { browser, dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';
import { Store } from 'runed';

export const langList = Object.keys(lang);
export const defaultLocale = 'en';

function createLoader(key: string, routes?: string[]) {
    return langList.map((locale) => ({
        locale: locale,
        key: key,
        routes: routes ?? [`/${key}`],
        loader: async () => (await import(`./${locale}/${key}.json`)).default
    }));
}

export const config: Config = {
    log: {
        level: dev ? 'warn' : 'error'
    },
    translations: langList.reduce((r, v) => ({ ...r, ...{ [v]: { lang } } }), {}),
    loaders: [...createLoader('common', ['/']), ...createLoader('tools')]
};

const { t, loading, locale, locales, translations, loadTranslations, setLocale, setRoute } = new i18n(config);
export { t };

export interface LanguageProps {
    i18n: { locale: string; route: string };
    translations: Record<string, Record<string, string>>;
}

export async function loadLanguageServerSide(
    url: URL,
    cookies: Cookies,
    headers: Headers
): Promise<LanguageProps> {
    const { pathname } = url;

    let locale = (cookies.get('lang') || '').toLowerCase();
    if (!locale) {
        locale = `${`${headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
    }

    const supportedLocales = locales.get().map((l) => l.toLowerCase());
    if (!supportedLocales.includes(locale)) {
        locale = defaultLocale;
    }

    await loadTranslations(locale, pathname);

    return {
        i18n: { locale, route: pathname },
        translations: translations.get()
    };
}

export async function loadLanguage(languageProps: LanguageProps): Promise<void> {
    const { locale, route } = languageProps.i18n;
    await setLocale(locale);
    await setRoute(route);
}

export function languageStore() {
    const rune = new Store(locale);

    $effect(() => {
        if (browser) {
            document.cookie = `lang=${rune.current}; max-age=31536000; path=/`;
        }
    });

    return rune;
}

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
