import { setCookie, type Maybe } from '$lib/utils';
import type { Cookies } from '@sveltejs/kit';

export type Theme = 'light' | 'dark' | 'system';
export const themeList: Theme[] = ['light', 'dark', 'system'];
export const defaultTheme = 'system' as Theme;

let rune = $state(defaultTheme);

export interface ThemeProps {
    theme: Theme;
}

export async function loadThemeServerSide(cookies: Cookies): Promise<ThemeProps> {
    let theme = (cookies.get('theme') || '').toLowerCase() as Theme;
    if (!themeList.includes(theme)) {
        theme = defaultTheme;
    }

    return {
        theme
    };
}

export async function loadTheme(themeProps: Maybe<ThemeProps>): Promise<void> {
    rune = themeProps?.theme ?? defaultTheme;
}

export function themeStore() {
    $effect(() => {
        console.log('Setting theme:', rune);
        setCookie('theme', rune);
        if (rune === 'system') document.body.removeAttribute('data-theme');
        else document.body.setAttribute('data-theme', rune);
    });

    return {
        get current() {
            return rune;
        },
        set current(value: Theme) {
            rune = value;
        }
    };
}
