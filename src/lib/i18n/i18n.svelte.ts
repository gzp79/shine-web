/* cspell: disable */
import type { Cookies } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { type Nullable, getCookie, setCookie } from '$lib/utils';
import { i18n } from '../../translations/i18n';

/* cspell: enable */

const { langList, defaultLocale, t, loadTranslations, locale, locales, setLocale, setRoute, translations } = i18n;

export { langList, defaultLocale, t };

function getSupportedLocale(candidate: string) {
    const supportedLocales = locales.get().map((l) => l.toLowerCase());
    return supportedLocales.includes(candidate) ? candidate : defaultLocale;
}

/// return the preferred language set in the browser
function defaultBrowserLanguage() {
    //console.log(`Finding default browser language (${navigator.language}) ...`);
    return `${navigator.language}`.toLowerCase();
}

export interface LanguageProps {
    i18n: { locale: string; route: string };
    translations: Record<string, Record<string, string>>;
}

export async function loadLanguageServerSide(url: URL, cookies: Cookies, headers: Headers): Promise<LanguageProps> {
    const { pathname } = url;

    let locale = (cookies.get('lang') || '').toLowerCase();
    if (!locale) {
        //console.log('Checking accept-language ...');
        locale = `${`${headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
    }
    //console.log(`Selected language, server side: ${locale}`);

    locale = getSupportedLocale(locale);
    await loadTranslations(locale, pathname);

    return {
        i18n: { locale, route: pathname },
        translations: translations.get()
    };
}

export async function loadLanguage(url: URL, languageProps: Nullable<LanguageProps>): Promise<void> {
    let i18n = languageProps?.i18n;

    if (!i18n) {
        if (!browser)
            throw new Error('No languageProps provided, loadLanguageServerSide must be called on the server side.');
        let locale = getCookie('lang') ?? defaultBrowserLanguage();
        locale = getSupportedLocale(locale);
        const route = url.pathname;
        i18n = { locale, route };
    }

    await setLocale(i18n.locale);
    await setRoute(i18n.route);
}

export function refreshLanguage() {
    let loc = getCookie('lang') ?? defaultBrowserLanguage();
    loc = getSupportedLocale(loc);
    locale.set(loc);
}

export function languageStore() {
    let rune = $state(locale.get());
    locale.subscribe((value) => {
        rune = value;
        if (browser) {
            //console.log(`Setting lang cookie to ${rune}`);
            setCookie('lang', rune);
        }
    });

    return {
        get current() {
            return rune;
        },
        set current(value: string) {
            locale.set(value);
        }
    };
}
