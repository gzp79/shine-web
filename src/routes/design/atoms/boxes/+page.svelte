<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import { colorList, range } from '$src/components/types';
    import CheckBox from '../../_components/CheckBox.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';

    let color = $state('primary');
    let outline = $state(true);

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
    <CheckBox label="Outline" bind:value={outline} />
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
        <Box border shadow variant={{ color: 'danger' }}>Nested box with color variant</Box>
        <Box border shadow variant={{ color: 'danger', outline: true }}>Nested box with outline color variant</Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border>Nested box with border</Box>
            <Box shadow>Nested box with shadow</Box>
            <Box border shadow>Nested box with border and shadow</Box>
            <Box border shadow variant={{ color: 'danger' }}>Nested box with color variant</Box>
            <Box border shadow variant={{ color: 'danger', outline: true }}>Nested box with outline color variant</Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box>
                <Box border>Nested box with border</Box>
                <Box shadow>Nested box with shadow</Box>
                <Box border shadow>Nested box with border and shadow</Box>
                <Box border shadow variant={{ color: 'danger' }}>Nested box with color variant</Box>
                <Box border shadow variant={{ color: 'danger', outline: true }}
                    >Nested box with outline color variant</Box
                >
            </Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border variant={{ color, outline }}>Colored box with border</Box>
            <Box shadow variant={{ color, outline }}>Colored box with shadow</Box>
            <Box border shadow variant={{ color, outline }}>Colored box with border and shadow</Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box border variant={{ color, outline }}>
            Color variant {color} with {outline ? 'outline' : 'filled'} border
            <Box border shadow variant={{ color: 'danger' }}>Nested box with color variant</Box>
            <Box border shadow variant={{ color: 'danger', outline: true }}>Nested box with outline color variant</Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border variant={{ color, outline }}>
                Color variant {color} with {outline ? 'outline' : 'filled'} border
                <Box border shadow variant={{ color: 'danger' }}>Nested box with color variant</Box>
                <Box border shadow variant={{ color: 'danger', outline: true }}>
                    Nested box with outline color variant
                </Box>
            </Box>
        </Box>
    </Box>

    <Box border shadow>
        Some custom class with dense layout
        <Box border class="flex flex-row flex-wrap justify-center">
            {#each range(0, 7) as _i}
                <Box border compact class="w-max whitespace-nowrap p-3">Nested compact box custom colors</Box>
            {/each}
        </Box>
    </Box>
</Story>
