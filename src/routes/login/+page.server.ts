import { identityApi } from '$lib/api/identity_api';

export const load = async ({ fetch }) => {
    const providers = await identityApi.getExternalLoginProviders(fetch);
    console.log('after load:', providers);
    return { providers };
};
