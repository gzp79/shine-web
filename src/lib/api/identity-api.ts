import { type Fetch, fetchCacheOption, fetchError } from '$lib/utils';
import debug from 'debug';
import config from '../../config';

const log = debug('app:auth_api');

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
        const url = `${this.serviceUrl}/identity/api/auth/user/info`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });
        if (response.ok) {
            const user = await response.json();
            user.isAuthenticated = true;
            return user;
        } else if (response.status == 401) {
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
            throw await fetchError('Failed to getCurrentUser', response);
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
        const url = `${this.serviceUrl}/identity/api/auth/providers`;
        const response = await fetch(url, {
            method: 'GET',
            //credentials: 'include',
            ...fetchCacheOption('default')
        });

        if (!response.ok) {
            throw await fetchError('Failed to getLoginProviders', response);
        }

        const providers = await response.json();
        log('providers: ', providers);

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
        const url = `${this.serviceUrl}/identity/api/auth/user/links`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            throw await fetchError('Failed to getLinkedIdentities', response);
        }

        return ((await response.json()) as LinkedIdentities).links;
    }

    async unlinkIdentity(provider: string, providerUserId: string): Promise<void> {
        const url = `${this.serviceUrl}/identity/api/auth/user/links/${provider}/${providerUserId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            throw await fetchError('Failed to unlinkIdentity', response);
        }
    }

    async getActiveSessions(): Promise<ActiveSession[]> {
        const url = `${this.serviceUrl}/identity/api/auth/user/sessions`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            throw await fetchError('Failed to getActiveSessions', response);
        }

        return ((await response.json()) as ActiveSessions).sessions;
    }

    async getActiveTokens(): Promise<ActiveToken[]> {
        const url = `${this.serviceUrl}/identity/api/auth/user/tokens`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            throw await fetchError('Failed to getActiveTokens', response);
        }

        return ((await response.json()) as ActiveTokens).tokens;
    }

    async revokeToken(fingerprint: string): Promise<void> {
        const url = `${this.serviceUrl}/identity/api/auth/user/tokens/${fingerprint}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            ...fetchCacheOption('no-store')
        });

        if (!response.ok) {
            throw await fetchError('Failed to revokeToken', response);
        }
    }
}

export const identityApi = new IdentityApi(config.serviceUrl, config.webUrl);
