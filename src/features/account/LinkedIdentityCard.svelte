<script lang="ts" module>
    import { page } from '$app/state';
    import { t } from '$lib/i18n/i18n.svelte';
    import Button from '@atoms/Button.svelte';
    import LoadingCard from '@atoms/LoadingCard.svelte';
    import Stack from '@atoms/Stack.svelte';
    import { Link } from '@atoms/icons/common';
    import Card from '@atoms/layouts/Card.svelte';
    import Modal from '@atoms/layouts/Modal.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
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
        if (identityStore.isDirty) {
            showLinkModal = false;
        }
    });
</script>

<Card caption={$t('account.linkedIdentities')}>
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
            startIcon={Link}
            disabled={identityStore.isDirty}
            onclick={() => (showLinkModal = true)}
        >
            {$t('account.link')}
        </Button>
    {/snippet}
</Card>

<Modal closeButton closeOnClickOutside caption={$t('account.linkTitle')} bind:isOpen={showLinkModal} class="max-w-min">
    {#each providers as provider (provider)}
        <Button
            variant="outline"
            wide
            startIcon={providerIcon(provider)}
            class="mx-0"
            href={identityStore.service.getLinkUrl(provider, page.url.pathname)}
        >
            {provider}
        </Button>
    {/each}
</Modal>
