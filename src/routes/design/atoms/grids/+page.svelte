<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Grid from '@atoms/Grid.svelte';
    import GridItem from '@atoms/GridItem.svelte';
    import { range } from '@atoms/types';
    import { MediaSize, Story } from '../../_components';
</script>

{#snippet item(value: string)}
    <div
        class="rounded-4 flex h-full w-full items-center justify-center text-nowrap border border-on-primary p-1 text-center text-on-primary"
    >
        {value}
    </div>
{/snippet}

<Story variant="center">
    <MediaSize />

    <Box border legend="Column 3">
        <Grid columns={3}>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
            <GridItem size={3}>{@render item('s=3')}</GridItem>
            <GridItem size={2}>{@render item('s=2')}</GridItem>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Responsive column">
        <Grid>
            <GridItem size={{ xs: 6, md: 8, lg: 4 }}>{@render item('xs=6 md=8 lg=4')}</GridItem>
            <GridItem size={{ xs: 6, md: 4, lg: 1 }}>{@render item('xs=6 md=4 lg=1')}</GridItem>
            <GridItem size={{ xs: 6, md: 4, lg: 1 }}>{@render item('xs=6 md=4 lg=1')}</GridItem>
            <GridItem size={{ xs: 6, md: 8, lg: 2 }}>{@render item('xs=6 md=8 lg=2')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Responsive columns xs=3 md=4 lg=6">
        <Grid columns={{ xs: 3, md: 4, lg: 6 }}>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
            <GridItem size={2}>{@render item('s=2')}</GridItem>
            <GridItem size={3}>{@render item('s=3')}</GridItem>
            <GridItem size={4}>{@render item('s=4')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Start column">
        <Grid columns={4}>
            <GridItem start={4}>{@render item('o=4')}</GridItem>
            <GridItem start={3}>{@render item('o=3')}</GridItem>
            <GridItem start={2} size={2}>{@render item('o=2')}</GridItem>
            <GridItem start={1}>{@render item('o=1')}</GridItem>
            <GridItem start={3}>{@render item('o=3')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Multi row span">
        <Grid columns={4}>
            {#each range(0, 5) as i (i)}
                <GridItem>{@render item('item')}</GridItem>
            {/each}
            <GridItem size={2} span={2}>{@render item('SPAN')}</GridItem>
            {#each range(0, 7) as i (i)}
                <GridItem>{@render item('item')}</GridItem>
            {/each}
        </Grid>
    </Box>

    <Box border legend="Multi row span, dense">
        <Grid columns={5} dense>
            {#each range(0, 6) as i (i)}
                <GridItem size={{ xs: 1, md: 2 }}>{@render item(`item 1.${i}`)}</GridItem>
            {/each}
            <GridItem size={3} span={2}>{@render item('SPAN')}</GridItem>
            <GridItem size={2} span={2}>{@render item('SPAN')}</GridItem>
            {#each range(0, 3) as i (i)}
                <GridItem size={2}>{@render item(`item 2.${i}`)}</GridItem>
            {/each}
            <GridItem size={2} span={2}>{@render item('SPAN')}</GridItem>
            <GridItem size={2} span={2}>{@render item('SPAN')}</GridItem>
            {#each range(0, 5) as i (i)}
                <GridItem size={1}>{@render item(`item 3.${i}`)}</GridItem>
            {/each}
            {#each range(0, 2) as i (i)}
                <GridItem size={3}>{@render item(`item 4.${i}`)}</GridItem>
            {/each}
            {#each range(0, 6) as i (i)}
                <GridItem size={1}>{@render item(`item 5.${i}`)}</GridItem>
            {/each}
        </Grid>
    </Box>

    <Box border legend="Auto sized item">
        <Grid columns={{ xs: 2, md: 4, lg: 8 }}>
            <GridItem size="full">{@render item('full')}</GridItem>
            {#each range(0, 8) as i (i)}
                <GridItem>{@render item('item')}</GridItem>
            {/each}
        </Grid>
    </Box>

    <Box border legend="Auto sized item, dense">
        <Grid columns={{ xs: 3, md: 4, lg: 6 }} dense>
            {#each range(0, 6) as i (i)}
                <GridItem>{@render item('before')}</GridItem>
            {/each}
            <GridItem size="full">{@render item('full')}</GridItem>
            {#each range(0, 6) as i (i)}
                <GridItem>{@render item('after')}</GridItem>
            {/each}
        </Grid>
    </Box>

    <Box border legend="Spacing 0">
        <Grid spacing={0} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Spacing 4">
        <Grid spacing={4} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Spacing c=1 r=4">
        <Grid spacing={{ col: 1, row: 4 }} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Spacing xs=1 md=4 lg=8">
        <Grid spacing={{ xs: 1, md: 4, lg: 8 }} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </Box>

    <Box border legend="Spacing xs=(1,4) md=(2,4) lg=(4,4)">
        <Grid spacing={{ col: { xs: 1, md: 2, lg: 4 }, row: 4 }} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </Box>
</Story>
