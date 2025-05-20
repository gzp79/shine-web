export const config = {
    environment: 'mock',

    identityUrl: 'https://cloud.scytta.com',
    builderUrl: 'https://cloud.scytta.com',
    webUrl: 'https://scytta.com:4443',
    assetUrl: 'https://scytta.com:4443',

    turnstile: {
        siteKey: '1x00000000000000000000BB'
    },

    mocks: ['user.noUserInfo', 'user.defaultLoginProvider']
};
