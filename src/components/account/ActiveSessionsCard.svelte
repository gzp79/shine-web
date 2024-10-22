<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { ActiveSession } from '$src/lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import ActiveSessionCard from './_ActiveSessionCard.svelte';
    import { type AppError } from '$lib/utils';

    interface Props {
        sessions: ActiveSession[] | Promise<ActiveSession[]>;
    }
    const { sessions }: Props = $props();
</script>

<Card caption={$t('account.activeSessions')}>
    <ResourceFetch fetch={sessions}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        <!-- todo: generic fails on svelte-check -->
        <!-- eslint-disable @typescript-eslint/no-explicit-any -->
        {#snippet content(sessions: /*ActiveSession[]*/ any, _isDirty: boolean)}
            {#each sessions as session (session.fingerprint)}
                <ActiveSessionCard {session} />
            {/each}
        {/snippet}

        {#snippet error(err: AppError)}
            <div class="self-center">
                <ErrorCard error={err} />
            </div>
        {/snippet}
    </ResourceFetch>
</Card>
