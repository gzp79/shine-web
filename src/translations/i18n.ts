/* cspell: disable */
import { dev } from '$app/environment';
import I18N, { type Config, type Modifier, type Parser } from 'sveltekit-i18n';
import lang from '../translations/lang.json';

/* cspell: enable */

const langList = Object.keys(lang);
const defaultLocale = 'en';

function createLoader(path: string, key: string, routes?: RegExp[]) {
    return langList.map((locale) => {
        return {
            locale: locale,
            key: key,
            routes: routes ?? [`/${key}`],
            loader: async () => (await import(`./${locale}/${path}.json`)).default
        };
    });
}

type Params = Record<string, unknown>;

const config: Config<Partial<Params>> = {
    log: {
        level: dev ? 'warn' : 'error'
    },
    translations: langList.reduce((r, v) => ({ ...r, ...{ [v]: { lang } } }), {}),
    loaders: [
        ...createLoader('common', 'common', [/.*/]),
        ...createLoader('validation', 'validation', [/.*/]),
        ...createLoader('account', 'account', [/.*/]),
        ...createLoader('error', 'error'),
        ...createLoader('link', 'link', [/link\/.*/]),
        ...createLoader('login', 'login', [/login|public\/email-login/])
    ]
};

class I18NEx<Params extends Parser.Params<P, M>, P = Parser.PayloadDefault, M = Modifier.DefaultProps> extends I18N<
    Params,
    P,
    M
> {
    constructor(config?: Config<P, M>) {
        super(config);
    }

    public readonly langList = langList;
    public readonly defaultLocale = defaultLocale;
}

export const i18n = new I18NEx(config);
