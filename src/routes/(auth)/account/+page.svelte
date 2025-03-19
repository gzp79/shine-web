<script lang="ts">
    import { identityApi } from '$lib/api/identity-api';
    import AppContent from '$lib/app/AppContent.svelte';
    import Stack from '$atoms/Stack.svelte';
    import ActiveSessionsCard from '$features/account/ActiveSessionCard.svelte';
    import ActiveTokensCard from '$features/account/ActiveTokenCard.svelte';
    import CurrentUserCard from '$features/account/CurrentUserCard.svelte';
    import LinkedIdentitiesCard from '$features/account/LinkedIdentityCard.svelte';
    import { setActiveSessionStore } from '$features/account/activeSessionStore.svelte';
    import { setActiveTokenStore } from '$features/account/activeTokenStore.svelte';
    import { setLinkedIdentityStore } from '$features/account/linkedIdentityStore.svelte';

    interface Props {
        data: {
            providers: string[];
        };
    }
    let { data }: Props = $props();

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

<AppContent class="p-4">
    <Stack spacing={4} align="center">
        <CurrentUserCard />
        <ActiveSessionsCard />
        <LinkedIdentitiesCard providers={data.providers} />
        <ActiveTokensCard />
    </Stack>
</AppContent>
