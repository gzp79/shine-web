<script lang="ts">
    import Card from '$atoms/Card.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import Button from '$components/atoms/Button.svelte';
    import { Link } from '$components/atoms/icons/common';
    import type { LinkedIdentity } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { type AppError } from '$lib/utils';
    import LinkedIdentityCard from './LinkedIdentityCard.svelte';

    interface Props {
        identities: () => Promise<LinkedIdentity[]>;
        onUnlink?: (provider: string, providerUserId: string) => Promise<void>;
        onLink?: () => void;
    }
    const { identities, onUnlink, onLink }: Props = $props();

    let dataVersion = $state(0);
</script>

<Card caption={$t('account.linkedIdentities')}>
    <ResourceFetch fetch={identities} bind:dataVersion>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        {#snippet content(identities: LinkedIdentity[], _isDirty: boolean)}
            {#each identities as identity (`${identity.provider}/${identity.providerUserId}`)}
                <LinkedIdentityCard {identity} {onUnlink} {dataVersion} />
            {/each}
        {/snippet}

        {#snippet error(err: AppError)}
            <div class="self-center">
                <ErrorCard error={err} />
            </div>
        {/snippet}
    </ResourceFetch>

    {#snippet actions()}
        {#if onLink}
            <Button color="secondary" startIcon={Link} onclick={onLink}>
                {$t('account.link')}
            </Button>
        {/if}
    {/snippet}
</Card>
