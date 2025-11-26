<script lang="ts">
    import { identityApi } from '@lib/api/identity-api';
    import Button from '@atoms/inputs/Button.svelte';
    import AppContent from '@components/AppContent.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import LoadingCard from '@components/LoadingCard.svelte';

    function redirect(url: string) {
        window.location.href = url;
    }
</script>

<AppContent class="flex flex-col items-center justify-center">
    {#await identityApi.createSingleAccessToken()}
        <LoadingCard />
    {:then token}
        <LoadingCard />
        {redirect(`/public/mobile?token=${encodeURIComponent(token)}`)}
    {:catch error}
        <ErrorCard {error}>
            {#snippet actions()}
                <Button href="/">$t('common.home')</Button>
            {/snippet}
        </ErrorCard>
    {/await}
</AppContent>
