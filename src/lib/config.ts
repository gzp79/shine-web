import { dev } from '$app/environment';

export const config = {
    serviceUrl: 'https://cloud.scytta.com',
    webUrl: dev ? 'https://local-web.scytta.com:4443/login' : 'https://www.scytta.com',
    contentUrl: dev ? 'https://local-web.scytta.com:4443/login' : 'https://www.scytta.com',

    turnstileSiteKey: '0x4AAAAAAAQ-4vBocJkM5FBI'
};
