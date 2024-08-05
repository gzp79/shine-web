import { config } from '$lib/config';
import { fetchError, type Fetch } from '$lib/utils';
import debug from 'debug';

const log = debug('app:auth_api');

export const GUEST_PROVIDER_ID = 'guest';

export type CurrentUser = {
    userId: string;
    name: string;
    email?: string;
    isEmailConfirmed: boolean;
    roles: string[];
    session_length: number;
};

export type LinkedIdentity = {
    //userId: string,
    provider: string;
    providerUserId: string;
    linked_at: Date;
    name?: string;
    email?: string;
};

export type LinkedIdentities = {
    links: LinkedIdentity[];
};

export type ActiveSession = {
    //userId: string,
    created_at: Date;
    agent: string;
    country?: string;
    region?: string;
    city?: string;
};

export type ActiveSessions = {
    sessions: ActiveSession[];
};

export type ActiveToken = {
    //userId: string,
    tokenFingerprint: string;
    kind: string;
    createdAt: Date;
    expireAt: Date;
    isExpired: boolean;
    agent: string;
    country?: string;
    region?: string;
    city: string;
};

export type ActiveTokens = {
    tokens: ActiveToken[];
};

class IdentityApi {
    constructor(
        public readonly serviceUrl: string,
        public readonly webUrl: string
    ) {}

    async getCurrentUser(fetch: Fetch): Promise<CurrentUser | null> {
        const url = `${this.serviceUrl}/identity/api/auth/user/info`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store'
        });
        if (response.ok) {
            return await response.json();
        } else if (response.status == 401) {
            log('No current user found: ', await response.text());
            return null;
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
            cache: 'no-store'
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

    async getLinkedIdentities(): Promise<LinkedIdentities> {
        const url = `${this.serviceUrl}/identity/api/auth/user/links`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw await fetchError('Failed to getLinkedIdentities', response);
        }

        return await response.json();
    }

    async unlinkIdentity(provider: string, providerUserId: string): Promise<void> {
        const url = `${this.serviceUrl}/identity/api/auth/user/links/${provider}/${providerUserId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw await fetchError('Failed to unlinkIdentity', response);
        }
    }

    async getActiveSessions(): Promise<ActiveSessions> {
        const url = `${this.serviceUrl}/identity/api/auth/user/sessions`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw await fetchError('Failed to getActiveSessions', response);
        }

        return await response.json();
    }

    async getActiveTokens(): Promise<ActiveTokens> {
        const url = `${this.serviceUrl}/identity/api/auth/user/tokens`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw await fetchError('Failed to getActiveTokens', response);
        }

        return await response.json();
    }
}

export const identityApi = new IdentityApi(config.serviceUrl, config.webUrl);
