<script lang="ts" module>
    import { t } from '$lib/i18n/i18n.svelte';
    import LoadingCard from '@atoms/LoadingCard.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Card from '@atoms/layouts/Card.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import ActiveTokenItem from './ActiveTokenItem.svelte';
    import { getActiveTokenStore } from './activeTokenStore.svelte';
</script>

<script lang="ts">
    const tokenStore = getActiveTokenStore();
    tokenStore.refresh();
</script>

<Card caption={$t('account.activeTokens')}>
    {#if tokenStore.isEmpty}
        <LoadingCard />
    {:else if tokenStore.isError}
        <ErrorCard error={tokenStore.error} />
    {:else}
        <Stack>
            {#each tokenStore.content as token (token.tokenHash)}
                <ActiveTokenItem {token} />
            {/each}
        </Stack>
    {/if}
</Card>
