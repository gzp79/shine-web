<script lang="ts">
    import Typography from '@atoms/Typography.svelte';
    import TextArea from '@atoms/inputs/TextArea.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import AppContent from '@components/AppContent.svelte';
    import { getAssetUrl } from '@features/assets/assets.remote';

    let assetKey = $state('loginBackground');
    let assetUrl = $derived(getAssetUrl(assetKey));
</script>

<AppContent layout="centered">
    <Stack align="center">
        <TextArea placeholder="Asset Key" rows="single" bind:text={assetKey} class="w-md" />
        {#if assetUrl.loading}
            <Typography>Loading asset...</Typography>
        {:else if assetUrl.error}
            <Typography class="mb-4 text-red-600">
                Error loading asset: {assetUrl.error.message}
            </Typography>
        {:else}
            <Typography>
                {assetUrl.current}
            </Typography>
            <img src={assetUrl.current} alt={assetUrl.current} class="max-w-[60%]" />
        {/if}
    </Stack>
</AppContent>
