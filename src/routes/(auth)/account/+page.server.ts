import { redirect } from '@sveltejs/kit';
import { identityApi } from '@lib/api/identity-api';

export const load = async ({ fetch }: { fetch: typeof window.fetch }) => {
    try {
        const providers = await identityApi.getExternalLoginProviders(fetch);
        return { providers };
    } catch {
        throw redirect(303, '/error?redirectUrl=/account');
    }
};
