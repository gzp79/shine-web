import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vitest/config';

// Determine the environment
const environment = process.env.NODE_ENV || 'dev';

const configPath = path.resolve(__dirname, `./config.${environment}.json`);
console.log(`Using config ${configPath}`);
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

let https;
if (fs.existsSync('certificates/cert.key')) {
    console.log('Using https for serving');
    https = {
        key: fs.readFileSync('certificates/cert.key'),
        cert: fs.readFileSync('certificates/cert.crt'),
        ca: fs.readFileSync('certificates/ca.crt')
    };
} else {
    throw new Error('No certificates were found, using http for serving');
}

export default defineConfig({
    plugins: [sveltekit()],
    define: {
        CONFIG: JSON.stringify(config)
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
