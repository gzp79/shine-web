/* cspell: disable */
import { dev } from '$app/environment';
import lang from '$src/translations/lang.json';
import I18N, { type Config, type Modifier, type Parser } from 'sveltekit-i18n';

/* cspell: enable */

const langList = Object.keys(lang);
const defaultLocale = 'en';

function createLoader(key: string, routes?: RegExp[]) {
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
    loaders: [...createLoader('common', [/.*/]), ...createLoader('tools')]
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
