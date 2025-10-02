<script lang="ts">
    import { getAssetUrl } from '@lib/assets.remote';
    import Typography from '@atoms/Typography.svelte';
    import { Story } from '../../_components';

    const assetUrl = getAssetUrl('loginBackground');
</script>

<Story variant="dense">
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
</Story>
