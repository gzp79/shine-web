<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import ProgressBar from '@atoms/ProgressBar.svelte';
    import Stack from '@atoms/Stack.svelte';
    import { actionColorList, sizeList } from '@atoms/types';
    import { Slider, Story, settingsStore } from '../../_components';

    let progress = $state(50);
    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Slider label="progress" min={0} max={100} bind:value={progress} />
{/snippet}

<Story variant="dense">
    <Box border legend="Sizes" class="w-lgv">
        <Stack>
            {#each sizeList as size (size)}
                <ProgressBar percent={progress} {size} />
            {/each}
        </Stack>
    </Box>

    <Box border legend="Sizes" class="w-lgv">
        <Stack>
            {#each sizeList as size (size)}
                <ProgressBar percent={progress} label={`${progress}%`} {size} />
            {/each}
        </Stack>
    </Box>

    <Box border legend="Colors" class="w-lgv">
        <Stack>
            {#each actionColorList as color (color)}
                <ProgressBar percent={progress} label={`${progress}%`} {color} />
            {/each}
        </Stack>
    </Box>
</Story>
