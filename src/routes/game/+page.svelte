<script lang="ts">
    import { identityApi } from '$lib/api/identity-api';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import CurrentUserCard from '$lib/account/CurrentUserCard.svelte';
    import ActiveSessionsCard from '$lib/account/ActiveSessionsCard.svelte';
    import LinkedIdentitiesCard from '$lib/account/LinkedIdentitiesCard.svelte';
    import ActiveTokensCard from '$lib/account/ActiveTokensCard.svelte';
    import AppContent from '$lib/app/AppContent.svelte';

    let currentUser = currentUserStore();
    let logout = identityApi.getLogoutUrl(false, '/');
    let logoutAll = identityApi.getLogoutUrl(true, '/');

    let sessions = identityApi.getActiveSessions();

    let identities = $state(identityApi.getLinkedIdentities());
    let unlinkIdentity = async (provider: string, providerUserId: string) => {
        await identityApi.unlinkIdentity(provider, providerUserId);
        identities = identityApi.getLinkedIdentities();
    };

    let tokens = $state(identityApi.getActiveTokens());
    let revokeToken = async (tokenFingerprint: string) => {
        await identityApi.revokeToken(tokenFingerprint);
        tokens = identityApi.getActiveTokens();
    };
</script>

<AppContent class="my-auto flex flex-col items-center overflow-y-auto px-4">
    <CurrentUserCard user={() => Promise.resolve(currentUser.user)} onLogout={logout} onLogoutAll={logoutAll} />
    <ActiveSessionsCard sessions={() => sessions} />
    <LinkedIdentitiesCard identities={() => identities} onUnlink={unlinkIdentity} />
    <ActiveTokensCard tokens={() => tokens} onRevoke={revokeToken} />
</AppContent>
