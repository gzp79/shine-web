<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { ActiveSession } from '$src/lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import ActiveSessionCard from './_ActiveSessionCard.svelte';

    interface Props {
        sessions: ActiveSession[] | Promise<ActiveSession[]>;
    }
    const { sessions }: Props = $props();
</script>

<Card variant="top" caption={$t('account.activeSessions')}>
    <ResourceFetch fetch={sessions}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        {#snippet content(sessions: ActiveSession[], _isDirty: boolean)}
            {#each sessions as session (session.fingerprint)}
                <ActiveSessionCard {session} />
            {/each}
        {/snippet}

        {#snippet error(err: Error)}
            <ErrorCard error={err} />
        {/snippet}
    </ResourceFetch>
</Card>
