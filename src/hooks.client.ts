import { config } from '$config';

if (config.environment === 'mock') {
    console.info('Starting browser mock worker...');

    const { worker } = await import('$mocks/browser');
    await worker.start({
        onUnhandledRequest(request, print) {
            const url = new URL(request.url);

            const passThrough: [string, RegExp][] = [['https://challenges.cloudflare.com/', /.*/]];
            if (passThrough.some(([host, path]) => request.url.startsWith(host) && path.test(url.pathname))) {
                console.debug(`Passing through ${request.url}`);
                return;
            }

            const proxyToLocal: [string, RegExp][] = [
                ['https://scytta.com:4443', /^\/node_modules\//],
                ['https://scytta.com:4443', /^\/.svelte-kit\//],
                ['https://scytta.com:4443', /^\/src\//],
                ['https://scytta.com:4443', /^\/@id\/.*/],
                ['https://scytta.com:4443', /.*\/__data.json.*/],
                ['https://scytta.com:4443', /^\/favicon.*/],
                ['https://scytta.com:4443', /^\/assets\//]
            ];
            if (proxyToLocal.some(([host, path]) => request.url.startsWith(host) && path.test(url.pathname))) {
                console.debug(`Proxy to local ${request.url}`);
                throw new Error('Proxy to local is not implemented');
                return;
            }

            print.warning();
            throw new Error(`No handler for ${request.url}`);
        }
    });
}

export {};
