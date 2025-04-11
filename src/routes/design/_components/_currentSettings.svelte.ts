import { type Snippet, onDestroy } from 'svelte';
import type { Nullable } from '@lib/utils';

let settings = $state<Nullable<Snippet>>(null);

export function settingsStore() {
    return {
        get(): Nullable<Snippet> {
            return settings;
        },

        set(value: Nullable<Snippet>) {
            settings = value;

            // Automatically clean up when the component is destroyed
            if (value) {
                onDestroy(() => {
                    settings = null;
                });
            }
        }
    };
}

export const STYLE = {
    border: 'on-container',
    background: 'sub-container',
    foreground: 'on-sub-container'
};
