if (ENABLE_MOCK) {
    console.log('starting browser mock worker');

    const { worker } = await import('$mocks/browser');
    await worker.start({
        onUnhandledRequest(request, print) {
            const url = new URL(request.url);

            const passThrough = [
                /^\/node_modules\//,
                /^\/.svelte-kit\//,
                /^\/src\//,
                /.*\/_data.json.*/,
                /^\/favicon.*/
            ];
            if (passThrough.some((regex) => regex.test(url.pathname))) {
                console.log(`passing through ${request.url}`);
                return;
            }

            print.warning();
        }
    });
}

export {};
