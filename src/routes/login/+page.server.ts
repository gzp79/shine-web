import { identityApi } from '$lib/api/identity_api';

export const load = async ({ fetch }) => {
    const providers = await identityApi.getExternalLoginProviders(fetch);

    return { providers };
};
