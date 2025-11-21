// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            '@config': './src/config',
            '@mocks': './src/mocks',
            '@generated': './src/generated',
            '@assets': './src/generated/assets',
            '@lib': './src/lib',
            '@atoms': './src/atoms',
            '@components': './src/components',
            '@features': './src/features',
            '@storybook-ext': './src/storybook'
        },
        experimental: {
            remoteFunctions: true
        }
    },

    compilerOptions: {
        experimental: {
            async: true
        }
    }
};

export default config;
