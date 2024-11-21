import type { Nullable } from '$lib/utils';
import { type Snippet } from 'svelte';

let settings = $state<Nullable<Snippet>>(null);

export function settingsStore() {
    return {
        get(): Nullable<Snippet> {
            return settings;
        },

        set(value: Nullable<Snippet>) {
            settings = value;
        }
    };
}
