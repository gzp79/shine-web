<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { LinkedIdentity } from '$src/lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import LinkedIdentityCard from './_LinkedIdentityCard.svelte';
    import { type AppError } from '$src/lib/utils';

    interface Props {
        identities: LinkedIdentity[] | Promise<LinkedIdentity[]>;
        onUnlink: (provider: string, providerUserId: string) => Promise<void>;
    }
    const { identities, onUnlink }: Props = $props();

    let dataVersion = $state(0);
</script>

<Card variant="top" caption={$t('account.linkedIdentities')}>
    <ResourceFetch fetch={identities} onState={(st) => st === 'completed' && (dataVersion += 1)}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        <!-- todo: generic fails on svelte-check -->
        <!-- eslint-disable @typescript-eslint/no-explicit-any -->
        {#snippet content(identities: /*LinkedIdentity[]*/ any, _isDirty: boolean)}
            {#each identities as identity (`${identity.provider}/${identity.providerUserId}`)}
                <LinkedIdentityCard {identity} {onUnlink} {dataVersion} />
            {/each}
        {/snippet}

        {#snippet error(err: AppError)}
            <ErrorCard error={err} />
        {/snippet}
    </ResourceFetch>
</Card>
