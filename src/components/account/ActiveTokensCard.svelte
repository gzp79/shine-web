<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { ActiveToken } from '$src/lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import ActiveTokenCard from './_ActiveTokenCard.svelte';

    interface Props {
        tokens: ActiveToken[] | Promise<ActiveToken[]>;
        onRevoke: (tokenFingerprint: string) => Promise<void>;
    }
    const { tokens, onRevoke }: Props = $props();

    let dataVersion = $state(0);
</script>

<Card variant="top" caption={$t('account.activeTokens')}>
    <ResourceFetch fetch={tokens} onState={(st) => st === 'completed' && (dataVersion += 1)}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        <!-- todo: generic fails on svelte-check -->
        <!-- eslint-disable @typescript-eslint/no-explicit-any -->
        {#snippet content(tokens: /*ActiveToken[]*/ any, _isDirty: boolean)}
            {#each tokens as token (token.tokenFingerprint)}
                <ActiveTokenCard {token} {onRevoke} {dataVersion} />
            {/each}
        {/snippet}

        {#snippet error(err: Error)}
            <ErrorCard error={err} />
        {/snippet}
    </ResourceFetch>
</Card>
