<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { LinkedIdentity } from '$lib/api/identity-api';
    import { type AppError } from '$lib/utils';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import LinkedIdentityCard from './_LinkedIdentityCard.svelte';

    interface Props {
        identities: () => Promise<LinkedIdentity[]>;
        onUnlink: (provider: string, providerUserId: string) => Promise<void>;
    }
    const { identities, onUnlink }: Props = $props();

    let dataVersion = $state(0);
</script>

<Card caption={$t('account.linkedIdentities')}>
    <ResourceFetch fetch={identities} bind:dataVersion>
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
            <div class="self-center">
                <ErrorCard error={err} />
            </div>
        {/snippet}
    </ResourceFetch>
</Card>
