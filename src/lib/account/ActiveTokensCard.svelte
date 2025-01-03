<script lang="ts">
    import { type AppError } from '$lib/utils';
    import { t } from '$lib/i18n/i18n.svelte';
    import type { ActiveToken } from '$lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import ActiveTokenCard from './ActiveTokenCard.svelte';

    interface Props {
        tokens: () => Promise<ActiveToken[]>;
        onRevoke: (tokenHash: string) => Promise<void>;
    }
    const { tokens, onRevoke }: Props = $props();

    let dataVersion = $state(0);
</script>

<Card caption={$t('account.activeTokens')}>
    <ResourceFetch fetch={tokens} bind:dataVersion>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        <!-- todo: generic fails on svelte-check -->
        <!-- eslint-disable @typescript-eslint/no-explicit-any -->
        {#snippet content(tokens: /*ActiveToken[]*/ any, _isDirty: boolean)}
            {#each tokens as token (token.tokenHash)}
                <ActiveTokenCard {token} {onRevoke} {dataVersion} />
            {/each}
        {/snippet}

        {#snippet error(err: AppError)}
            <div class="self-center">
                <ErrorCard error={err} />
            </div>
        {/snippet}
    </ResourceFetch>
</Card>
