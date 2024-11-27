<script lang="ts">
    import { actionColorList, range, type ActionColor } from '$atoms/types';
    import Box from '$atoms/Box.svelte';
    import { Select, settingsStore, Story } from '../../_components';

    let color = $state<ActionColor>('warning');

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Variant" options={actionColorList} bind:value={color} />
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
        <Box border shadow variant={{ color }}>Nested box with color variant</Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border>Nested box with border</Box>
            <Box shadow>Nested box with shadow</Box>
            <Box border shadow>Nested box with border and shadow</Box>
            <Box border shadow variant={{ color }}>Nested box with color variant</Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box>
                <Box border>Nested box with border</Box>
                <Box shadow>Nested box with shadow</Box>
                <Box border shadow>Nested box with border and shadow</Box>
                <Box border shadow variant={{ color }}>Nested box with color variant</Box>
            </Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box border variant={{ color }}>Colored box with border</Box>
        <Box shadow variant={{ color }}>Colored box with shadow</Box>
        <Box border shadow variant={{ color }}>Colored box with border and shadow</Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border variant={{ color }}>Colored box with border</Box>
            <Box shadow variant={{ color }}>Colored box with shadow</Box>
            <Box border shadow variant={{ color }}>Colored box with border and shadow</Box>
        </Box>
    </Box>

    <Box border shadow>
        Some custom class with dense layout
        <Box border class="flex flex-row flex-wrap justify-center">
            {#each range(0, 7) as _i}
                <Box border compact class="w-max whitespace-nowrap p-3">Nested custom box</Box>
            {/each}
        </Box>
    </Box>
</Story>
