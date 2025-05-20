import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vitest/config';
import { vitePluginAssetConverter as assetConverter } from './scripts/asset-converter';
import { config } from './src/generated/config';

// Determine the environment
console.log(`Environment: (${config.environment})`);

if (config.environment === 'dev') {
    process.env.DEBUG = 'log:user, warn:*';
}

const additionalAssets = [];
if (config.environment !== 'prod') {
    additionalAssets.push({
        src: 'static-generated/assets/*',
        dest: ''
    });
}

if (config.environment === 'mock') {
    console.log('  Mocking');
    additionalAssets.push({
        src: 'static-generated/mockServiceWorker.js',
        dest: ''
    });
}

let https;
if (fs.existsSync('certificates/cert.key')) {
    console.log('  Protocol: https');
    // Accept self-signed certificates
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    https = {
        key: fs.readFileSync('certificates/cert.key'),
        cert: fs.readFileSync('certificates/cert.crt'),
        ca: fs.readFileSync('certificates/ca.crt')
    };
} else {
    throw new Error('No certificates were found, using http for serving');
}

export default defineConfig({
    plugins: [
        assetConverter(),
        tailwindcss(),
        sveltekit(),
        viteStaticCopy({
            targets: [...additionalAssets]
        })
    ],
    server: {
        https: https,
        port: parseInt(new URL(config.webUrl).port),
        host: new URL(config.webUrl).hostname,
        proxy: {}
    },
    preview: {
        https: https,
        port: parseInt(new URL(config.webUrl).port),
        host: new URL(config.webUrl).hostname,
        proxy: {}
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
