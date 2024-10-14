<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import { range } from '$src/components/types';
    import Story from '../../_components/Story.svelte';
</script>

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
        <Box class="border border-[red] bg-[blue] shadow-lg shadow-[black]">Nested box with custom class</Box>
        <Box border ghost>Nested ghost box with border</Box>
        <Box border shadow ghost>Nested ghost box with border and shadow</Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border>Nested box with border</Box>
            <Box shadow>Nested box with shadow</Box>
            <Box border shadow>Nested box with border and shadow</Box>
            <Box class="border border-[red] bg-[blue] shadow-lg shadow-[black]">Nested box with custom class</Box>
            <Box border shadow ghost>Nested ghost box with border and shadow</Box>
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
