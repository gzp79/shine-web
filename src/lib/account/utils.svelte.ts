import * as icons from '$atoms/icons/social';
import type { Component } from 'svelte';

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
        default:
            return undefined;
    }
};
