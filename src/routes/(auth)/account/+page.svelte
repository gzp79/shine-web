<script lang="ts">
    import { identityApi } from '@lib/api/identity-api';
    import Stack from '@atoms/layouts/Stack.svelte';
    import AppContent from '@components/AppContent.svelte';
    import LoadingCard from '@components/LoadingCard.svelte';
    import ActiveSessionsCard from '@features/account/ActiveSessionCard.svelte';
    import ActiveTokensCard from '@features/account/ActiveTokenCard.svelte';
    import CurrentUserCard from '@features/account/CurrentUserCard.svelte';
    import LinkedIdentitiesCard from '@features/account/LinkedIdentityCard.svelte';
    import { setActiveSessionStore } from '@features/account/activeSessionStore.svelte';
    import { setActiveTokenStore } from '@features/account/activeTokenStore.svelte';
    import { setLinkedIdentityStore } from '@features/account/linkedIdentityStore.svelte';
    import { getExternalLoginProviders } from '@features/account/providers.remote';

    const getProviders = getExternalLoginProviders();
    let activeTokeStore = setActiveTokenStore({
        load: () => identityApi.getActiveTokens(),
        revoke: (tokenHash: string) => identityApi.revokeToken(tokenHash)
    });
    activeTokeStore.refresh();

    let activeSessionStore = setActiveSessionStore({
        load: () => identityApi.getActiveSessions()
    });
    activeSessionStore.refresh();

    let linkedIdentityStore = setLinkedIdentityStore({
        load: () => identityApi.getLinkedIdentities(),
        unlink: (provider: string, providerUserId: string) => identityApi.unlinkIdentity(provider, providerUserId),
        getLinkUrl: (provider: string, redirect: string) => identityApi.getExternalLinkUrl(provider, redirect)
    });
    linkedIdentityStore.refresh();
</script>

<AppContent layout="flow">
    <Stack spacing={4} align="center">
        {#if getProviders.current}
            <CurrentUserCard />
            <ActiveSessionsCard />
            <LinkedIdentitiesCard providers={getProviders.current} />
            <ActiveTokensCard />
        {:else}
            <LoadingCard />
        {/if}
    </Stack>
</AppContent>
