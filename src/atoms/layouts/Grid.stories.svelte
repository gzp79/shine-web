<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import MediaSizeIndicator from '@storybook-ext/MediaSizeIndicator.svelte';
    import Grid from '@atoms/layouts/Grid.svelte';
    import GridItem from '@atoms/layouts/GridItem.svelte';
    import { range } from '@atoms/types';

    const { Story } = defineMeta({
        component: Grid,
        title: 'Atoms/Layouts/Grid',
        tags: ['autodocs'],
        args: {
            columns: undefined,
            spacing: 2,
            dense: false
        },
        argTypes: {
            columns: {
                control: 'select',
                options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                description: 'Number of columns in the grid (can be responsive)',
                table: {
                    type: { summary: 'Columns | ResponsiveProp<Columns>' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            spacing: {
                control: 'select',
                options: [0, 0.5, 1, 2, 3, 4, 8, 12],
                description: 'Spacing between grid items (Spacing type)',
                table: {
                    type: { summary: 'Spacing' },
                    defaultValue: { summary: '2' }
                }
            },
            dense: {
                control: 'boolean',
                description: 'Enable dense grid flow to fill holes',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            children: { table: { disable: true }, ref: { control: false } }
        }
    });
</script>

{#snippet item(value: string)}
    <div
        class="rounded-4 flex h-full w-full items-center justify-center text-nowrap border border-on-primary p-1 text-center text-on-primary"
    >
        {value}
    </div>
{/snippet}

<Story name="Default">
    {#each range(0, 6) as i (i)}
        <GridItem>{@render item(`item ${i + 1}`)}</GridItem>
    {/each}
</Story>

<Story name="Fixed Columns" args={{ columns: 3 }}>
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs}>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
            <GridItem size={3}>{@render item('s=3')}</GridItem>
            <GridItem size={2}>{@render item('s=2')}</GridItem>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
        </Grid>
    {/snippet}
</Story>

<Story name="Responsive Columns">
    {#snippet template(args)}
        {@const { columns, children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs} columns={{ xs: 3, md: 4, lg: 6 }}>
            <GridItem size={1}>{@render item('s=1')}</GridItem>
            <GridItem size={2}>{@render item('s=2')}</GridItem>
            <GridItem size={3}>{@render item('s=3')}</GridItem>
            <GridItem size={4}>{@render item('s=4')}</GridItem>
        </Grid>
    {/snippet}
</Story>

<Story name="Responsive Item Sizes">
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs}>
            <GridItem size={{ xs: 6, md: 8, lg: 4 }}>{@render item('xs=6 md=8 lg=4')}</GridItem>
            <GridItem size={{ xs: 6, md: 4, lg: 1 }}>{@render item('xs=6 md=4 lg=1')}</GridItem>
            <GridItem size={{ xs: 6, md: 4, lg: 1 }}>{@render item('xs=6 md=4 lg=1')}</GridItem>
            <GridItem size={{ xs: 6, md: 8, lg: 2 }}>{@render item('xs=6 md=8 lg=2')}</GridItem>
        </Grid>
    {/snippet}
</Story>

<Story name="Column Start Position" args={{ columns: 4 }}>
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs}>
            <GridItem start={4}>{@render item('start=4')}</GridItem>
            <GridItem start={3}>{@render item('start=3')}</GridItem>
            <GridItem start={2} size={2}>{@render item('start=2 size=2')}</GridItem>
            <GridItem start={1}>{@render item('start=1')}</GridItem>
            <GridItem start={3}>{@render item('start=3')}</GridItem>
        </Grid>
    {/snippet}
</Story>

<Story name="Multi Row Span" args={{ columns: 4 }}>
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs}>
            {#each range(0, 5) as i (i)}
                <GridItem>{@render item('item')}</GridItem>
            {/each}
            <GridItem size={2} span={2}>{@render item('SPAN 2x2')}</GridItem>
            {#each range(0, 7) as i (i)}
                <GridItem>{@render item('item')}</GridItem>
            {/each}
        </Grid>
    {/snippet}
</Story>

<Story name="Dense Grid" args={{ columns: 5, dense: true }}>
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs}>
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
    {/snippet}
</Story>

<Story name="Full Width Items">
    {#snippet template(args)}
        {@const { columns, children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs} columns={{ xs: 2, md: 4, lg: 8 }}>
            <GridItem size="full">{@render item('full width')}</GridItem>
            {#each range(0, 8) as i (i)}
                <GridItem>{@render item('item')}</GridItem>
            {/each}
        </Grid>
    {/snippet}
</Story>

<Story name="Full Width Items Dense">
    {#snippet template(args)}
        {@const { columns, dense, children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs} columns={{ xs: 3, md: 4, lg: 6 }} dense>
            {#each range(0, 6) as i (i)}
                <GridItem>{@render item('before')}</GridItem>
            {/each}
            <GridItem size="full">{@render item('full width')}</GridItem>
            {#each range(0, 6) as i (i)}
                <GridItem>{@render item('after')}</GridItem>
            {/each}
        </Grid>
    {/snippet}
</Story>

<Story name="Spacing Variations" args={{ columns: 2 }}>
    {#snippet template(args)}
        {@const { spacing, children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <div class="flex flex-col gap-8">
            <div>
                <h3 class="mb-2 text-sm font-bold">Spacing 0</h3>
                <Grid {...otherArgs} spacing={0}>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                </Grid>
            </div>
            <div>
                <h3 class="mb-2 text-sm font-bold">Spacing 4</h3>
                <Grid {...otherArgs} spacing={4}>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                </Grid>
            </div>
            <div>
                <h3 class="mb-2 text-sm font-bold">Spacing 8</h3>
                <Grid {...otherArgs} spacing={8}>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                </Grid>
            </div>
        </div>
    {/snippet}
</Story>

<Story name="Column and Row Spacing" args={{ columns: 2 }}>
    {#snippet template(args)}
        {@const { spacing, children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs} spacing={{ col: 1, row: 4 }}>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
            <GridItem>{@render item('item')}</GridItem>
        </Grid>
    {/snippet}
</Story>

<Story name="Responsive Spacing" args={{ columns: 2 }}>
    {#snippet template(args)}
        {@const { spacing, children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <div class="flex flex-col gap-8">
            <div>
                <h3 class="mb-2 text-sm font-bold">Spacing xs=1 md=4 lg=8</h3>
                <Grid {...otherArgs} spacing={{ xs: 1, md: 4, lg: 8 }}>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                </Grid>
            </div>
            <div>
                <h3 class="mb-2 text-sm font-bold">Column Spacing xs=1 md=2 lg=4, Row Spacing 4</h3>
                <Grid {...otherArgs} spacing={{ col: { xs: 1, md: 2, lg: 4 }, row: 4 }}>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                    <GridItem>{@render item('item')}</GridItem>
                </Grid>
            </div>
        </div>
    {/snippet}
</Story>

<Story name="Complex Layout" args={{ columns: 4, spacing: 2 }}>
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <MediaSizeIndicator />
        <Grid {...otherArgs}>
            <GridItem size={4}>{@render item('Header (4 cols)')}</GridItem>
            <GridItem size={1} span={3}>{@render item('Sidebar (3 rows)')}</GridItem>
            <GridItem size={3}>{@render item('Content 1')}</GridItem>
            <GridItem size={3}>{@render item('Content 2')}</GridItem>
            <GridItem size={2}>{@render item('Content 3')}</GridItem>
            <GridItem size={1}>{@render item('Small')}</GridItem>
            <GridItem size={4}>{@render item('Footer (4 cols)')}</GridItem>
        </Grid>
    {/snippet}
</Story>
