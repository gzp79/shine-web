<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Button from '@atoms/Button.svelte';
    import Stack from '@atoms/Stack.svelte';
    import { MediaSize, Story } from '../../_components';
</script>

<Story variant="center">
    <MediaSize />

    <Box border legend="Default">
        <Stack>
            <Button size="xs">Item 1</Button>
            <Button size="md">Item 2</Button>
            <Button size="lg">Item 3</Button>
        </Stack>
    </Box>

    <Box border legend="Align center, justify: end">
        <Box class="h-96">
            <Stack align="center" justify="end">
                <Button size="xs">Item 1</Button>
                <Button size="md">Item 2</Button>
                <Button size="lg">Item 3</Button>
            </Stack>
        </Box>
    </Box>

    <Box border legend="Align center, Justify evenly">
        <Box class="w-128">
            <Stack direction="row" justify="evenly" align="center">
                <Button size="xs">Item 1</Button>
                <Button size="md">Item 2</Button>
                <Button size="lg">Item 3</Button>
            </Stack>
        </Box>
    </Box>

    <Box border legend="Align center, Justify center, spacing xs:1,md:4,lg:6">
        <Box class="w-128">
            <Stack direction="row" align="center" justify="center" spacing={{ xs: 1, md: 4, lg: 6 }}>
                <Button size="xs">Item 1</Button>
                <Button size="md">Item 2</Button>
                <Button size="lg">Item 3</Button>
            </Stack>
        </Box>
    </Box>
</Story>
