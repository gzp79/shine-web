import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import fs from 'fs';

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

console.log('To enable log messages, run "localStorage.debug = \'app:*\';" in the browser console');
console.log('To disable log messages, run "localStorage.removeItem(\'debug\');" in the browser console');

export default defineConfig({
    plugins: [sveltekit()],
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
