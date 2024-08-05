import { LocalStore } from '$lib/localStore.svelte';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';
export const themeList = ['light', 'dark', 'system'];

// Store the application theme.
// This is a client-side only store and theme is applied to the body element only on the client side.
export class ThemeStore extends LocalStore<Theme> {
    constructor(value: Theme) {
        super('theme', value, (v) => themeList.includes(v));

        $effect(() => {
            if (browser) {
                if (this.value === 'system') this.applySystemTheme();
                else document.body.setAttribute('data-theme', this.value);
            }
        });
    }

    private applySystemTheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
}

export function themeStore() {
    return new ThemeStore('light');
}
