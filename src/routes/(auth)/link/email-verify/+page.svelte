<script lang="ts">
    import { page } from '$app/state';
    import { identityApi } from '$lib/api/identity-api';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import Button from '@atoms/Button.svelte';
    import Typography from '@atoms/Typography.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import LoadingCard from '@components/LoadingCard.svelte';
    import { getCurrentUserStore } from '@features/account/currentUser.svelte';

    let currentUserStore = getCurrentUserStore();
    const task = async () => {
        await identityApi.completeEmailOperation(page.url.searchParams.get('token') ?? '');
        currentUserStore.refresh({ force: true });
    };
</script>

<AppContent class="flex flex-col items-center justify-center">
    {#await task()}
        <LoadingCard />
    {:then _}
        <Typography variant="h1" class="text-center">{$t('link.emailVerified')}</Typography>
        <Button href="/account">$t('common.done')</Button>
    {:catch error}
        <ErrorCard {error}>
            {#snippet actions()}
                <Button href="/">$t('common.home')</Button>
            {/snippet}
        </ErrorCard>
    {/await}
</AppContent>
