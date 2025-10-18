import { query } from '$app/server';
import { redirect } from '@sveltejs/kit';
import z from 'zod';
import { identityApi } from '@lib/api/identity-api';

export const getExternalLoginProviders = query(async (): Promise<string[]> => {
    try {
        const providers = await identityApi.getExternalLoginProviders(fetch);
        return providers;
    } catch {
        throw redirect(303, '/error?returnUrl=/account');
    }
});

export const getSanitizedReturnUrl = query(z.string(), async (rawUrl: string): Promise<string> => {
    console.log('Raw return URL:', rawUrl);
    try {
        const parsed = new URL(rawUrl, 'http://localhost');
        if (parsed.origin === 'http://localhost' && rawUrl.startsWith('/')) {
            const sanitized = parsed.pathname + parsed.search + parsed.hash;
            console.info('Sanitized return URL:', sanitized);
            return sanitized;
        }
    } catch (e) {
        console.error(`Failed to parse return URL (${rawUrl}):`, e);
    }
    console.info('Returning default /game URL');
    return '/game';
});
