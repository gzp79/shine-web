<script lang="ts" module>
    import { page } from '$app/state';
    import { t } from '@lib/i18n/i18n.svelte';
    import { Link } from '@atoms/icons/common';
    import Button from '@atoms/inputs/Button.svelte';
    import Card from '@atoms/layouts/Card.svelte';
    import Modal from '@atoms/layouts/Modal.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import LoadingCard from '@components/LoadingCard.svelte';
    import LinkedIdentityItem from './LinkedIdentityItem.svelte';
    import { getLinkedIdentityStore } from './linkedIdentityStore.svelte';
    import { providerIcon } from './providers.svelte';
</script>

<script lang="ts">
    interface Props {
        providers: string[];
    }
    const { providers }: Props = $props();

    const identityStore = getLinkedIdentityStore();
    identityStore.refresh();

    let showLinkModal = $state(false);

    $effect(() => {
        // when identities change, close link modal
        let _ = identityStore.content;
        showLinkModal = false;
    });
</script>

<Card width="big" caption={$t('account.linkedIdentities')}>
    {#if identityStore.isEmpty}
        <LoadingCard />
    {:else if identityStore.isError}
        <ErrorCard error={identityStore.error} />
    {:else}
        <Stack>
            {#each identityStore.content as identity (`${identity.provider}/${identity.providerUserId}`)}
                <LinkedIdentityItem {identity} />
            {/each}
        </Stack>
    {/if}

    {#snippet actions()}
        <Button
            color="secondary"
            size="sm"
            startIcon={Link}
            disabled={identityStore.isDirty}
            onclick={() => (showLinkModal = true)}
        >
            {$t('account.link')}
        </Button>
    {/snippet}
</Card>

<Modal width="fit" closeButton closeOnClickOutside caption={$t('account.linkTitle')} bind:open={showLinkModal}>
    <Stack align="stretch">
        {#each providers as provider (provider)}
            <Button
                variant="outline"
                wide
                startIcon={providerIcon(provider)}
                href={identityStore.service.getLinkUrl(provider, page.url.pathname)}
            >
                {provider}
            </Button>
        {/each}
    </Stack>
</Modal>
