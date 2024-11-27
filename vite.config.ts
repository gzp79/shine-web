import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vitest/config';

const mocks = (process.env.MOCKS || '').split(',').map((x) => x.trim());

// Determine the environment
const environment = process.env.NODE_ENV || 'dev';
console.log(`Environment: (${environment})`);

const configPath = path.resolve(__dirname, `./config.${environment}.json`);
console.log(`  Using config ${configPath}`);
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const additionalAssets = [];
const enableMock = environment === 'mock';
console.log(`  MOCK ${enableMock}`);

if (enableMock) {
    additionalAssets.push({
        src: 'static_generated/mockServiceWorker.js',
        dest: ''
    });

    console.log(`  Mocks: ${mocks}`);
}

let https;
if (fs.existsSync('certificates/cert.key')) {
    console.log('  Protocol: https');
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
        sveltekit(),
        viteStaticCopy({
            targets: [...additionalAssets]
        })
    ],
    define: {
        VITE_CONFIG: JSON.stringify(config),
        VITE_ENABLE_MOCK: enableMock,
        ...(enableMock ? { VITE_MOCKS: JSON.stringify(mocks) } : {})
    },

    server: {
        https: https,
        port: 4443,
        host: 'local-web.scytta.com',
        proxy: {}
    },
    preview: {
        https: https,
        port: 4443,
        host: 'local-web.scytta.com',
        proxy: {}
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
