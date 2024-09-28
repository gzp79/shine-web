<script lang="ts">
    import Grid from '$atoms/Grid.svelte';
    import GridItem from '$atoms/GridItem.svelte';
    import { range } from '$src/components/types';
</script>

{#snippet item(vale: string)}
    <div
        class="rounded-4 flex h-full w-full items-center justify-center overflow-hidden text-nowrap border p-1 text-center"
    >
        {vale}
    </div>
{/snippet}

<div class="w-full items-center">
    <div class="sticky top-0 flex justify-center bg-base-200 p-1">
        <div class="inline-block">
            Size:
            <span class="inline-block">XS</span>
            <span class="hidden md:inline-block">MD</span>
            <span class="hidden lg:inline-block">LG</span>
            <span class="hidden xl:inline-block">XL</span>
        </div>
    </div>

    <div class="inline-block">Column 3</div>
    <div class="m-3">
        <Grid columns={3}>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
            <GridItem size={3}>{@render item('s=3')}</GridItem>
            <GridItem size={2}>{@render item('s=2')}</GridItem>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Responsive column</div>
    <div class="m-3">
        <Grid>
            <GridItem size={{ xs: 6, md: 8, lg: 4 }}>{@render item('xs=6 md=8 lg=4')}</GridItem>
            <GridItem size={{ xs: 6, md: 4, lg: 1 }}>{@render item('xs=6 md=4 lg=1')}</GridItem>
            <GridItem size={{ xs: 6, md: 4, lg: 1 }}>{@render item('xs=6 md=4 lg=1')}</GridItem>
            <GridItem size={{ xs: 6, md: 8, lg: 2 }}>{@render item('xs=6 md=8 lg=2')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Responsive columns xs=3 md=4 lg=6</div>
    <div class="m-3">
        <Grid columns={{ xs: 3, md: 4, lg: 6 }}>
            <GridItem size={2}>{@render item('s=2')}</GridItem>
            <GridItem size={2}>{@render item('s=2')}</GridItem>
            <GridItem size={3}>{@render item('s=3')}</GridItem>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Start column</div>
    <div class="m-3">
        <Grid columns={4}>
            <GridItem start={4}>{@render item('o=4')}</GridItem>
            <GridItem start={3}>{@render item('o=3')}</GridItem>
            <GridItem start={2} size={2}>{@render item('o=2')}</GridItem>
            <GridItem start={1}>{@render item('o=1')}</GridItem>
            <GridItem start={3}>{@render item('o=3')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Multi row span</div>
    <div class="m-3">
        <Grid columns={4}>
            {#each range(0, 5) as _i}
                <GridItem>{@render item(`item`)}</GridItem>
            {/each}
            <GridItem size={2} span={2}>{@render item('SPAN')}</GridItem>
            {#each range(0, 7) as _i}
                <GridItem>{@render item(`item`)}</GridItem>
            {/each}
        </Grid>
    </div>

    <div class="inline-block">Spacing 0</div>
    <div class="m-3">
        <Grid spacing={0} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Spacing 4</div>
    <div class="m-3">
        <Grid spacing={4} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Spacing c=1 r=4</div>
    <div class="m-3">
        <Grid spacing={{ col: 1, row: 4 }} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Spacing xs=1 md=4 lg=8</div>
    <div class="m-3">
        <Grid spacing={{ xs: 1, md: 4, lg: 8 }} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </div>

    <div class="inline-block">Spacing xs=(1,4) md=(2,4) lg=(4,4)</div>
    <div class="m-3">
        <Grid spacing={{ col: { xs: 1, md: 2, lg: 4 }, row: 4 }} columns={2}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    </div>
</div>
