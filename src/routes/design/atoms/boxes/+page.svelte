<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import { range } from '$src/components/types';
    import Story from '../../_components/Story.svelte';
</script>

<Story center>
    <Box border shadow>
        Default box with border
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

    <Box border shadow>
        <Box border shadow>
            <Box border shadow>
                <Box border shadow>
                    <Box border shadow>
                        <Box border shadow>Nested boxes with border and shadow</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>

    <Box border shadow>
        <Box border>Nested box with border</Box>
        <Box shadow>Nested box with shadow</Box>
        <Box border shadow>Nested box with border and shadow</Box>
        <Box class="border border-secondary bg-primary shadow-lg shadow-secondary">Nested box with class</Box>
        <Box border ghost>Nested ghost box with border</Box>
    </Box>

    <Box border shadow>
        <Box>
            <Box border>Nested box with border</Box>
            <Box shadow>Nested box with shadow</Box>
            <Box border shadow>Nested box with border and shadow</Box>
            <Box class="border border-secondary bg-primary shadow-lg shadow-secondary">Nested box with class</Box>
        </Box>
    </Box>

    <Box border shadow>
        Some custom class with dense layout
        <Box border class="flex flex-row flex-wrap justify-center">
            {#each range(0, 7) as _i}
                <Box border dense class="w-max whitespace-nowrap">Nested dense box</Box>
            {/each}
        </Box>
    </Box>
</Story>
