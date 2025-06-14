import { config } from '@config';
import { z } from 'zod';
import { logAPI } from '@lib/loggers';
import { type Fetch, SchemaError, fetchCacheOption, fetchError } from '@lib/utils';
import { DateStringSchema, OptionalSchema } from './schema-helpers';

const ProviderSchema = z.object({
    providers: z.array(z.string())
});
export type Provider = z.infer<typeof ProviderSchema>;

const IdentityKindSchema = z.enum(['user']);
export type IdentityKind = z.infer<typeof IdentityKindSchema>;

const CurrentUserDetailsSchema = z.object({
    kind: IdentityKindSchema,
    createdAt: DateStringSchema,
    email: OptionalSchema(z.string())
});

const CurrentUserSchema = z.object({
    userId: z.string(),
    name: z.string(),
    isLinked: z.boolean(),
    isEmailConfirmed: z.boolean(),
    roles: z.array(z.string()),
    sessionLength: z.number(),
    remainingSessionTime: z.number(),
    details: CurrentUserDetailsSchema
});
export type CurrentUser = z.infer<typeof CurrentUserSchema> & { isAuthenticated: boolean };

const LinkedIdentitySchema = z.object({
    //userId: string,
    provider: z.string(),
    providerUserId: z.string(),
    linkedAt: z.string().transform((str) => new Date(str)),
    name: OptionalSchema(z.string()),
    email: OptionalSchema(z.string())
});
export type LinkedIdentity = z.infer<typeof LinkedIdentitySchema>;

const LinkedIdentitiesSchema = z.object({
    links: z.array(LinkedIdentitySchema)
});
export type LinkedIdentities = z.infer<typeof LinkedIdentitiesSchema>;

const ActiveSessionSchema = z.object({
    //userId: string,
    tokenHash: z.string(),
    fingerprint: z.string(),
    createdAt: DateStringSchema,
    agent: z.string(),
    country: OptionalSchema(z.string()),
    region: OptionalSchema(z.string()),
    city: OptionalSchema(z.string())
});
export type ActiveSession = z.infer<typeof ActiveSessionSchema>;

const ActiveSessionsSchema = z.object({
    sessions: z.array(ActiveSessionSchema)
});
export type ActiveSessions = z.infer<typeof ActiveSessionsSchema>;

const TokenKindSchema = z.enum(['singleAccess', 'persistent', 'access', 'emailAccess']);
export type TokenKind = z.infer<typeof TokenKindSchema>;

const ActiveTokenSchema = z.object({
    //userId: string,
    tokenHash: z.string(),
    kind: TokenKindSchema,
    createdAt: DateStringSchema,
    expireAt: DateStringSchema,
    isExpired: z.boolean(),
    agent: z.string(),
    country: OptionalSchema(z.string()),
    region: OptionalSchema(z.string()),
    city: OptionalSchema(z.string())
});
export type ActiveToken = z.infer<typeof ActiveTokenSchema>;

const ActiveTokensSchema = z.object({
    tokens: z.array(ActiveTokenSchema)
});
export type ActiveTokens = z.infer<typeof ActiveTokensSchema>;

async function parseResponse<T extends z.AnyZodObject>(schema: T, response: Response): Promise<z.infer<T>> {
    const data = await response.json();
    try {
        return schema.parse(data);
    } catch (err) {
        console.error('Failed to parse response', data, 'with error', err);
        const error = err as z.ZodError;
        throw new SchemaError(error.message);
    }
}

class IdentityApi {
    constructor(
        public readonly serviceUrl: string,
        public readonly webUrl: string
    ) {}

    async getCurrentUser(fetch: Fetch): Promise<CurrentUser> {
        logAPI('getCurrentUser...');
        const url = `${this.serviceUrl}/identity/api/auth/user/info?method=full`;
        logAPI('getCurrentUser url', url);
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });
        logAPI('getCurrentUser response', response);
        if (response.ok) {
            const user = (await parseResponse(CurrentUserSchema, response)) as CurrentUser;
            logAPI('getCurrentUser completed,', user);
            user.isAuthenticated = true;
            return user;
        } else if (response.status == 401) {
            logAPI('getCurrentUser failed with 401');
            return {
                userId: '',
                name: '',
                isEmailConfirmed: false,
                isLinked: false,
                isAuthenticated: false,
                roles: [],
                sessionLength: 0,
                remainingSessionTime: 0,
                details: {
                    kind: 'user',
                    createdAt: new Date(),
                    email: undefined
                }
            };
        } else {
            const error = await fetchError('Failed to getCurrentUser', response);
            logAPI('getCurrentUser failed with error', error);
            throw error;
        }
    }

    getTokenLoginUrl(redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/token/login?redirectUrl=${redirectUrl}&errorUrl=${errorUrl}&rememberMe=false`;
    }

    getGuestLoginUrl(captcha: string, redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/guest/login?redirectUrl=${redirectUrl}&errorUrl=${errorUrl}&rememberMe=true&captcha=${captcha}`;
    }

    getEmailLoginUrl(email: string, rememberMe: boolean, captcha: string, redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/email/login?email=${email}&redirectUrl=${redirectUrl}&errorUrl=${errorUrl}&rememberMe=${rememberMe}&captcha=${captcha}`;
    }

    async getExternalLoginProviders(fetch: Fetch): Promise<string[]> {
        logAPI('getExternalLoginProviders...');
        const url = `${this.serviceUrl}/identity/api/auth/providers`;
        const response = await fetch(url, {
            method: 'GET',
            //credentials: 'include',
            ...fetchCacheOption('default')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to getExternalLoginProviders', response);
            logAPI('getExternalLoginProviders failed with error', error);
            throw error;
        }

        const providers = await parseResponse(ProviderSchema, response);
        logAPI('getExternalLoginProviders completed,', providers);

        return providers.providers.sort();
    }

    getExternalLoginUrl(provider: string, rememberMe: boolean, captcha: string, redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/${provider}/login?redirectUrl=${redirectUrl}&errorUrl=${errorUrl}&rememberMe=${rememberMe}&captcha=${captcha}`;
    }

    getExternalLinkUrl(provider: string, redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/${provider}/link?redirectUrl=${redirectUrl}&errorUrl=${errorUrl}`;
    }

    getLogoutUrl(terminateAll: boolean, redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/logout?redirectUrl=${redirectUrl}&errorUrl=${errorUrl}&terminateAll=${terminateAll}`;
    }

    async getLinkedIdentities(): Promise<LinkedIdentity[]> {
        logAPI('getLinkedIdentities...');
        const url = `${this.serviceUrl}/identity/api/auth/user/links`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to getLinkedIdentities', response);
            logAPI('getLinkedIdentities failed with error', error);
            throw error;
        }

        const identities = await parseResponse(LinkedIdentitiesSchema, response);
        logAPI('getLinkedIdentities completed,', identities);
        return identities.links;
    }

    async unlinkIdentity(provider: string, providerUserId: string): Promise<void> {
        logAPI('unlinkIdentity...');
        const url = `${this.serviceUrl}/identity/api/auth/user/links/${provider}/${providerUserId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to unlinkIdentity', response);
            logAPI('unlinkIdentity failed with error', error);
            throw error;
        }

        logAPI('getLinkedIdentities completed');
    }

    async getActiveSessions(): Promise<ActiveSession[]> {
        logAPI('getActiveSessions...');
        const url = `${this.serviceUrl}/identity/api/auth/user/sessions`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to getActiveSessions', response);
            logAPI('getActiveSessions failed with error', error);
            throw error;
        }

        const sessions = await parseResponse(ActiveSessionsSchema, response);
        logAPI('getActiveSessions completed,', sessions);
        return sessions.sessions;
    }

    async getActiveTokens(): Promise<ActiveToken[]> {
        logAPI('getActiveTokens...');
        const url = `${this.serviceUrl}/identity/api/auth/user/tokens`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to getActiveTokens', response);
            logAPI('getActiveTokens failed with error', error);
            throw error;
        }

        const tokens = await parseResponse(ActiveTokensSchema, response);
        logAPI('getActiveTokens completed,', tokens);
        return tokens.tokens;
    }

    async revokeToken(fingerprint: string): Promise<void> {
        logAPI('revokeToken...');
        const url = `${this.serviceUrl}/identity/api/auth/user/tokens/${fingerprint}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to revokeToken', response);
            logAPI('revokeToken failed with error', error);
            throw error;
        }

        logAPI('revokeToken completed');
    }

    async startEmailConfirmation(): Promise<void> {
        logAPI('startEmailConfirmation...');
        const url = `${this.serviceUrl}/identity/api/auth/user/email/confirm`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to start email confirmation', response);
            logAPI('startEmailConfirmation failed with error', error);
            throw error;
        }

        logAPI('startEmailConfirmation completed');
    }

    async startEmailChange(newEmail: string): Promise<void> {
        logAPI('startEmailChange...');
        const url = `${this.serviceUrl}/identity/api/auth/user/email/change`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            ...fetchCacheOption('no-store'),
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: newEmail })
        });

        if (!response.ok) {
            const error = await fetchError('Failed to start email confirmation', response);
            logAPI('startEmailChange failed with error', error);
            throw error;
        }

        logAPI('startEmailChange completed');
    }

    async completeEmailOperation(token: string): Promise<void> {
        logAPI('completeEmailOperation...');
        const url = `${this.serviceUrl}/identity/api/auth/user/email/complete?token=${token}`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            const error = await fetchError('Failed to complete email confirmation', response);
            logAPI('completeEmailOperation failed with error', error);
            throw error;
        }

        logAPI('completeEmailOperation completed');
    }
}

export const identityApi = new IdentityApi(config.identityUrl, config.webUrl);
