<script lang="ts">
    import { identityApi } from '$lib/api/identity-api';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import Button from '@atoms/Button.svelte';
    import LoadingCard from '@atoms/LoadingCard.svelte';
    import Typography from '@atoms/Typography.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';

    function redirect(url: string) {
        window.location.href = url;
    }
</script>

<AppContent class="flex flex-col items-center justify-center">
    {#await identityApi.createSingleAccessToken()}
        <LoadingCard />
    {:then token}
        <Typography variant="h1" class="text-center">{$t('link.startingShine')}</Typography>
        {redirect(`shine://open&token=${encodeURIComponent(token)}`)}
    {:catch error}
        <ErrorCard {error}>
            {#snippet actions()}
                <Button href="/">$t('common.home')</Button>
            {/snippet}
        </ErrorCard>
    {/await}
</AppContent>
