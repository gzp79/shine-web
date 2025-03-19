import type { Component } from 'svelte';
import * as icons from '$atoms/icons/social';

export const providerIcon = (provider: string): Component | undefined => {
    switch (provider) {
        case 'google':
            return icons.Google;
        case 'twitter':
            return icons.Twitter;
        case 'github':
            return icons.Github;
        case 'discord':
            return icons.Discord;
        case 'gitlab':
            return icons.Gitlab;

        // special cases
        case 'guest':
            return undefined;
        case 'continue':
            return icons.ActiveUser;
        default:
            return undefined;
    }
};
