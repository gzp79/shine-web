// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            $generated: './src/generated',
            $assets: './src/generated/assets',
            $lib: './src/lib',
            $atoms: './src/atoms',
            $components: './src/components',
            $features: './src/features',
            $mocks: './src/mocks',
            $config: './src/config'
        }
    }
};

export default config;
