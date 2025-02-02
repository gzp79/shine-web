<script lang="ts">
    import { page } from '$app/state';
    import Button from '$components/atoms/Button.svelte';
    import Modal from '$components/atoms/Modal.svelte';
    import ActiveSessionsCard from '$lib/account/ActiveSessionsCard.svelte';
    import ActiveTokensCard from '$lib/account/ActiveTokensCard.svelte';
    import CurrentUserCard from '$lib/account/CurrentUserCard.svelte';
    import LinkedIdentitiesCard from '$lib/account/LinkedIdentitiesCard.svelte';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import { providerIcon } from '$lib/account/utils.svelte';
    import { identityApi } from '$lib/api/identity-api';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';

    interface Props {
        data: {
            providers: string[];
        };
    }
    let { data }: Props = $props();

    let currentUser = currentUserStore();
    let showLink = $state(false);

    let logout = identityApi.getLogoutUrl(false, '/');
    let logoutAll = identityApi.getLogoutUrl(true, '/');
    let sessions = identityApi.getActiveSessions();

    let identities = $state(identityApi.getLinkedIdentities());
    let unlinkIdentity = async (provider: string, providerUserId: string) => {
        await identityApi.unlinkIdentity(provider, providerUserId);
        identities = identityApi.getLinkedIdentities();
    };
    let linkIdentity = () => {
        showLink = true;
    };

    let tokens = $state(identityApi.getActiveTokens());
    let revokeToken = async (tokenHash: string) => {
        await identityApi.revokeToken(tokenHash);
        tokens = identityApi.getActiveTokens();
    };
</script>

<AppContent class="my-auto flex flex-col items-center overflow-y-auto px-4">
    <CurrentUserCard user={() => Promise.resolve(currentUser.user)} onLogout={logout} onLogoutAll={logoutAll} />
    <ActiveSessionsCard sessions={() => sessions} />
    <LinkedIdentitiesCard identities={() => identities} onUnlink={unlinkIdentity} onLink={linkIdentity} />
    <ActiveTokensCard tokens={() => tokens} onRevoke={revokeToken} />

    <Modal closeButton closeOnClickOutside caption={$t('account.linkTitle')} bind:isOpen={showLink} class="max-w-min">
        {#each data.providers as provider}
            <Button
                variant="outline"
                wide
                startIcon={providerIcon(provider)}
                class="mx-0"
                href={identityApi.getExternalLinkUrl(provider, page.url.pathname)}
            >
                {provider}
            </Button>
        {/each}
    </Modal>
</AppContent>
