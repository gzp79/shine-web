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
            $components: './src/components',
            $atoms: './src/components/atoms',
            $lib: './src/lib',
            $mocks: './src/mocks',
            $config: './src/config',
            $assets: './src/generated/assets'
        }
    }
};

export default config;
