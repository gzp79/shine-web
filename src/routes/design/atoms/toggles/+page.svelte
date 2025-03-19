<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Stack from '$atoms/Stack.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import { type ActionColor, actionColorList, sizeList } from '$atoms/types';
    import { CheckBox, Select, Story, settingsStore } from '../../_components';

    let value = $state(true);
    let color = $state<ActionColor>('primary');
    let disabled = $state(false);

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={actionColorList} bind:value={color} />
    <CheckBox label="Value" bind:value />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

<Story variant="dense">
    <Box border>
        <Stack>
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value />
            {/each}
        </Stack>
    </Box>
    <Box border>
        <Stack>
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value onLabel="on" />
            {/each}
        </Stack>
    </Box>
    <Box border>
        <Stack>
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value offLabel="off" />
            {/each}
        </Stack>
    </Box>
    <Box border>
        <Stack>
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value onLabel="on" offLabel="off" />
            {/each}
        </Stack>
    </Box>
</Story>
