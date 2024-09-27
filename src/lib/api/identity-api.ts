import { logAPI } from '$lib/loggers';
import { type Fetch, fetchCacheOption, fetchError } from '$lib/utils';
import config from '../../config';

export const GUEST_PROVIDER_ID = 'guest';

export type CurrentUser = {
    isAuthenticated: boolean;
    isLinked: boolean;
    userId: string;
    name: string;
    email?: string;
    isEmailConfirmed: boolean;
    roles: string[];
    sessionLength: number;
};

export type LinkedIdentity = {
    //userId: string,
    provider: string;
    providerUserId: string;
    linkedAt: Date;
    name?: string;
    email?: string;
};

export type LinkedIdentities = {
    links: LinkedIdentity[];
};

export type ActiveSession = {
    //userId: string,
    fingerprint: string;
    createdAt: Date;
    agent: string;
    country?: string;
    region?: string;
    city?: string;
};

export type TokenKind = 'singleAccess' | 'persistent' | 'access';

export type ActiveSessions = {
    sessions: ActiveSession[];
};

export type ActiveToken = {
    //userId: string,
    tokenFingerprint: string;
    kind: TokenKind;
    createdAt: Date;
    expireAt: Date;
    isExpired: boolean;
    agent: string;
    country?: string;
    region?: string;
    city?: string;
};

export type ActiveTokens = {
    tokens: ActiveToken[];
};

class IdentityApi {
    constructor(
        public readonly serviceUrl: string,
        public readonly webUrl: string
    ) {}

    async getCurrentUser(fetch: Fetch): Promise<CurrentUser> {
        logAPI('getCurrentUser...');
        const url = `${this.serviceUrl}/identity/api/auth/user/info`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });
        if (response.ok) {
            const user = await response.json();
            logAPI('getCurrentUser completed,', user);
            user.isAuthenticated = true;
            return user;
        } else if (response.status == 401) {
            logAPI('getCurrentUser failed with 401');
            return {
                isAuthenticated: false,
                isLinked: false,
                userId: '',
                name: '',
                isEmailConfirmed: false,
                roles: [],
                sessionLength: 0
            };
        } else {
            const error = await fetchError('Failed to getCurrentUser', response);
            logAPI('getCurrentUser failed with error', error);
            throw error;
        }
    }

    getTokenLoginUrl(redirect: string, login: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const loginUrl = encodeURIComponent(`${this.webUrl}${login}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/token/login?redirectUrl=${redirectUrl}&loginUrl=${loginUrl}&errorUrl=${errorUrl}&rememberMe=false`;
    }

    getGuestLoginUrl(captcha: string, redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/token/login?redirectUrl=${redirectUrl}&errorUrl=${errorUrl}&rememberMe=true&captcha=${captcha}`;
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

        const providers = await response.json();
        logAPI('getExternalLoginProviders completed,', providers);

        return providers.providers;
    }

    getExternalLoginUrl(provider: string, rememberMe: boolean, captcha: string, redirect: string): string {
        const redirectUrl = encodeURIComponent(`${this.webUrl}${redirect}`);
        const errorUrl = encodeURIComponent(`${this.webUrl}/error`);
        return `${this.serviceUrl}/identity/auth/${provider}/login?redirectUrl=${redirectUrl}&errorUrl=${errorUrl}&rememberMe=${rememberMe}&captcha=${captcha}`;
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

        const identities: LinkedIdentities = await response.json();
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

        const sessions: ActiveSessions = await response.json();
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

        const tokens: ActiveTokens = await response.json();
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
}

export const identityApi = new IdentityApi(config.serviceUrl, config.webUrl);
