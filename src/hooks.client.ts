import { enabledMocks } from '$config';

if (enabledMocks) {
    console.log('starting browser mock worker');

    const { worker } = await import('$mocks/browser');
    await worker.start({
        onUnhandledRequest(request, print) {
            const url = new URL(request.url);

            const passThrough: [string, RegExp][] = [
                ['https://local-web.scytta.com:4443', /^\/node_modules\//],
                ['https://local-web.scytta.com:4443', /^\/.svelte-kit\//],
                ['https://local-web.scytta.com:4443', /^\/src\//],
                ['https://local-web.scytta.com:4443', /^\/@id\/.*/],
                ['https://local-web.scytta.com:4443', /.*\/__data.json.*/],
                ['https://local-web.scytta.com:4443', /^\/favicon.*/],

                ['https://challenges.cloudflare.com/', /.*/]
            ];
            if (passThrough.some(([host, path]) => request.url.startsWith(host) && path.test(url.pathname))) {
                console.debug(`Passing through ${request.url}`);
                return;
            }

            print.warning();
            throw new Error(`No handler for ${request.url}`);
        }
    });
}

export {};
