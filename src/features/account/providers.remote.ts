import { query } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { identityApi } from '@lib/api/identity-api';

export const getExternalLoginProviders = query(async (): Promise<string[]> => {
    try {
        const providers = await identityApi.getExternalLoginProviders(fetch);
        return providers;
    } catch {
        throw redirect(303, '/error?redirectUrl=/account');
    }
});
