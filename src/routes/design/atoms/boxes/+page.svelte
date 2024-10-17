<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import { colorList, range } from '$src/components/types';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';

    let color = $state('primary');

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
{/snippet}

<Story variant="center">
    <Box>
        Default default box
        <Box>
            Nested default box
            <Box>
                Nested default box
                <Box>
                    Nested default box
                    <Box>
                        Nested default box
                        <Box>Nested default box</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>

    <Box border>
        Default box with border
        <Box border>
            Nested box with border
            <Box border>
                Nested box with border
                <Box border>
                    Nested box with border
                    <Box border>
                        Nested box with border
                        <Box border>Nested box with border</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>

    <Box border shadow>
        Default box with border and shadow
        <Box border shadow>
            Nested box with border and shadow
            <Box border shadow>
                Nested box with border and shadow
                <Box border shadow>
                    Nested box with border and shadow
                    <Box border shadow>
                        Nested box with border and shadow
                        <Box border shadow>Nested box with border and shadow</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box border>Nested box with border</Box>
        <Box shadow>Nested box with shadow</Box>
        <Box border shadow>Nested box with border and shadow</Box>
        <Box ghost border>Nested box with ghost and border</Box>
        <Box ghost shadow>Nested box with ghost and shadow</Box>
        <Box ghost border shadow>Nested box with ghost and border and shadow</Box>
        <Box class="border border-[red] bg-[blue] shadow-lg shadow-[black]">Nested box with custom class</Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border>Nested box with border</Box>
            <Box shadow>Nested box with shadow</Box>
            <Box border shadow>Nested box with border and shadow</Box>
            <Box ghost border>Nested box with ghost and border</Box>
            <Box ghost shadow>Nested box with ghost and shadow</Box>
            <Box ghost border shadow>Nested box with ghost and border and shadow</Box>
            <Box class="border border-[red] bg-[blue] shadow-lg shadow-[black]">Nested box with custom class</Box>
        </Box>
    </Box>
    <Box border shadow>
        <Box>
            <Box>
                <Box border>Nested box with border</Box>
                <Box shadow>Nested box with shadow</Box>
                <Box border shadow>Nested box with border and shadow</Box>
                <Box ghost border>Nested box with ghost and border</Box>
                <Box ghost shadow>Nested box with ghost and shadow</Box>
                <Box ghost border shadow>Nested box with ghost and border and shadow</Box>
                <Box class="border border-[red] bg-[blue] shadow-lg shadow-[black]">Nested box with custom class</Box>
            </Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border {color}>Nested box with border</Box>
            <Box shadow {color}>Nested box with shadow</Box>
            <Box border shadow {color}>Nested box with border and shadow</Box>
            <Box ghost border {color}>Nested box with ghost and border</Box>
            <Box ghost shadow {color}>Nested box with ghost and shadow</Box>
            <Box ghost border shadow {color}>Nested box with ghost and border and shadow</Box>
        </Box>
    </Box>

    <Box border shadow>
        Some custom class with dense layout
        <Box border class="flex flex-row flex-wrap justify-center">
            {#each range(0, 7) as _i}
                <Box border compact class="w-max whitespace-nowrap p-3">Nested compact box</Box>
            {/each}
        </Box>
    </Box>
</Story>
