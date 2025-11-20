<script lang="ts">
    import Typography from '@atoms/Typography.svelte';
    import App from '@components/App.svelte';
    import AppContent from '@components/AppContent.svelte';
    import { getAssetUrl } from '@features/assets/assets.remote';

    let assetKey = $state('loginBackground');
    let assetUrl = $derived(getAssetUrl(assetKey));
</script>

<App>
    <AppContent>
        <Stack>
            <TextArea label="Asset Key" bind:value={assetKey} rows="single" />
            {#if assetUrl.loading}
                <Typography variant="h1" class="mb-4">Loading asset...</Typography>
            {:else if assetUrl.error}
                <Typography variant="h1" class="mb-4 text-red-600">
                    Error loading asset: {assetUrl.error.message}
                </Typography>
            {:else}
                <Typography variant="h1" class="mb-4">
                    {assetUrl.current}
                </Typography>
                <img src={assetUrl.current} alt={assetUrl.current} />
            {/if}
        </Stack>
    </AppContent>
</App>
