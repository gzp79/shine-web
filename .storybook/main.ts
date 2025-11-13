import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
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
    staticDirs: ['../static', '../static-generated']
};
export default config;
