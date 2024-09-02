<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import LinkedIdentityCard, { type ActiveLinkedIdentity } from './LinkedIdentityCard.svelte';

    interface Props {
        identities: ActiveLinkedIdentity[] | (() => Promise<ActiveLinkedIdentity[]>);
        onUnlink: (identity: ActiveLinkedIdentity) => Promise<void>;
    }
    const { identities, onUnlink }: Props = $props();
    let isLoading = $state(true);
    const fetchIdentities = async (): Promise<ActiveLinkedIdentity[]> =>
        typeof identities === 'function' ? await identities() : identities;
</script>

<Card variant="top" caption={$t('account.linkedIdentities')}>
    <ResourceFetch fetch={fetchIdentities} bind:isLoading>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        {#snippet content(identities: ActiveLinkedIdentity[], _isDirty: boolean)}
            {#each identities as identity ([identity.provider, identity.providerUserId])}
                <LinkedIdentityCard {identity} {onUnlink} />
            {/each}
        {/snippet}

        {#snippet error(err: Error)}
            <ErrorCard error={err} />
        {/snippet}
    </ResourceFetch>
</Card>
