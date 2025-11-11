<script lang="ts" module>
    import { t } from '$lib/i18n/i18n.svelte';
    import LoadingCard from '@atoms/LoadingCard.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Card from '@atoms/layouts/Card.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import ActiveSessionItem from './ActiveSessionItem.svelte';
    import { getActiveSessionStore } from './activeSessionStore.svelte';
</script>

<script lang="ts">
    const sessionStore = getActiveSessionStore();
    sessionStore.refresh();
</script>

<Card caption={$t('account.activeSessions')}>
    {#if sessionStore.isEmpty}
        <LoadingCard />
    {:else if sessionStore.isError}
        <ErrorCard error={sessionStore.error} />
    {:else}
        <Stack>
            {#each sessionStore.content as session (session.tokenHash)}
                <ActiveSessionItem {session} />
            {/each}
        </Stack>
    {/if}
</Card>
