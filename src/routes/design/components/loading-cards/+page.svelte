<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import { sizeList } from '$atoms/types';
    import { Story } from '../../_components';
</script>

<Story variant="center">
    {#each sizeList as size}
        <Box border>
            <LoadingCard {size} label="Loading {size}" />
        </Box>
    {/each}
</Story>
