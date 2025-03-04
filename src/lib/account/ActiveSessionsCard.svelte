<script lang="ts">
    import Card from '$atoms/Card.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import type { ActiveSession } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { type AppError } from '$lib/utils';
    import ActiveSessionCard from './ActiveSessionCard.svelte';

    interface Props {
        sessions: () => Promise<ActiveSession[]>;
    }
    const { sessions }: Props = $props();
</script>

<Card caption={$t('account.activeSessions')}>
    <ResourceFetch fetch={sessions}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        {#snippet content(sessions: ActiveSession[], _isDirty: boolean)}
            {#each sessions as session (session.tokenHash)}
                <ActiveSessionCard {session} />
            {/each}
        {/snippet}

        {#snippet error(err: AppError)}
            <ErrorCard error={err} />
        {/snippet}
    </ResourceFetch>
</Card>
