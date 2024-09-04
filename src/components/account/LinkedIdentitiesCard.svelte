<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { LinkedIdentity } from '$lib/api/identity_api';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import LinkedIdentityCard from './_LinkedIdentityCard.svelte';

    interface Props {
        identities: LinkedIdentity[] | Promise<LinkedIdentity[]>;
        onUnlink: (provider: string, providerUserId: string) => Promise<void>;
    }
    const { identities, onUnlink }: Props = $props();

    // Using disableVersion and dataVersion, we can prevent multiple unlink requests by disabling the button until the list refresh has been completed.
    let dataVersion = $state(0);
</script>

<Card variant="top" caption={$t('account.linkedIdentities')}>
    <ResourceFetch fetch={identities} onState={(st) => st === 'completed' && (dataVersion += 1)}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        {#snippet content(identities: LinkedIdentity[], _isDirty: boolean)}
            {#each identities as identity (`${identity.provider}/${identity.providerUserId}`)}
                <LinkedIdentityCard {identity} {onUnlink} {dataVersion} />
            {/each}
        {/snippet}

        {#snippet error(err: Error)}
            <ErrorCard error={err} />
        {/snippet}
    </ResourceFetch>
</Card>
