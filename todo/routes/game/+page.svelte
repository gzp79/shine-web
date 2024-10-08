<script lang="ts">
    import { identityApi } from '$src/lib/api/identity-api';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import CurrentUserCard from '$components/account/CurrentUserCard.svelte';
    import ActiveSessionsCard from '$src/components/account/ActiveSessionsCard.svelte';
    import LinkedIdentitiesCard from '$src/components/account/LinkedIdentitiesCard.svelte';
    import ActiveTokensCard from '$src/components/account/ActiveTokensCard.svelte';

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

<div class="w-max-lg overflow-auto">
    <CurrentUserCard user={currentUser.user} onLogout={logout} onLogoutAll={logoutAll} />
    <ActiveSessionsCard {sessions} />
    <LinkedIdentitiesCard {identities} onUnlink={unlinkIdentity} />
    <ActiveTokensCard {tokens} onRevoke={revokeToken} />
</div>
