export const config = {
    environment: 'mock',

    serviceUrl: 'https://mocked.com',
    webUrl: 'https://local-web.scytta.com:4443',
    contentUrl: 'https://local-web.scytta.com:4443',

    turnstile: {
        siteKey: '1x00000000000000000000BB'
    },

    mocks: ['user.noUserInfo', 'user.defaultLoginProvider']
};
