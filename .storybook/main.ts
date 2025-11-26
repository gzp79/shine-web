import type { StorybookConfig } from '@storybook/sveltekit';
import svelteConfig from '../svelte.config.js';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)', 'examples/**/*.stories.@(js|ts|svelte)'],
    addons: [
        '@storybook/addon-svelte-csf',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
        '@storybook/addon-themes'
    ],
    framework: {
        name: '@storybook/sveltekit',
        options: {}
    },
    staticDirs: ['../static', '../static-generated'],
    async viteFinal(config) {
        // Merge Svelte aliases into Storybook Vite config
        if (svelteConfig.kit && svelteConfig.kit.alias) {
            config.resolve = config.resolve || {};
            config.resolve.alias = {
                ...(config.resolve.alias || {}),
                ...svelteConfig.kit.alias
            };
        }
        return config;
    }
};

export default config;
