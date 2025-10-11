import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { spawn } from 'child_process';
import fs from 'fs';
import { type Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vitest/config';
import { config } from './src/generated/config';

// Determine the environment
console.log(`Environment: (${config.environment})`);

if (['dev', 'local'].includes(config.environment)) {
    process.env.DEBUG = 'log:user, log:game, warn:*, info:*';
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

export function vitePluginAssetConverter(): Plugin[] {
    return [
        {
            name: 'vite-plugin-asset-converter',
            buildStart: async () => {
                console.log('Building assets...');

                return new Promise((resolve, reject) => {
                    const child = spawn(
                        'pnpm',
                        ['run', 'convert:web:ui', '--out=../shine-web/static-generated/assets'],
                        {
                            cwd: '../shine-assets',
                            stdio: 'inherit',
                            shell: true
                        }
                    );

                    child.on('close', (code) => {
                        if (code === 0) {
                            console.log('Assets built successfully');
                            fs.writeFileSync(
                                'static-generated/assets/latest.json',
                                JSON.stringify({ version: 'custom' }, null, 2)
                            );
                            resolve(undefined);
                        } else {
                            console.error(`Asset build failed with code ${code}`);
                            reject(new Error(`Asset build process exited with code ${code}`));
                        }
                    });

                    child.on('error', (error) => {
                        console.error('Failed to start asset build process:', error);
                        reject(error);
                    });
                });
            },
            watchChange(id, change) {
                console.log(`File changed: ${id}`);
                console.log('Change details:', change);
            }
        }
    ];
}

export default defineConfig({
    plugins: [
        ['local'].includes(config.environment) ? vitePluginAssetConverter() : [],
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
        strictPort: true,
        hmr: {
            clientPort: parseInt(new URL(config.webUrl).port),
            port: parseInt(new URL(config.webUrl).port) + 1
        },
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
