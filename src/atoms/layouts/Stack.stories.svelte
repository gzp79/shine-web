<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Stack from '@atoms/layouts/Stack.svelte';
    import type { SpacingValue } from '@atoms/types/spacing';

    const { Story } = defineMeta({
        component: Stack,
        title: 'Atoms/Layouts/Stack',
        tags: ['autodocs'],
        args: {
            direction: 'column',
            spacing: 2,
            align: 'stretch',
            justify: undefined,
            wrap: false,
            grow: false
        },
        argTypes: {
            direction: {
                control: 'select',
                options: ['row', 'column'],
                description: 'Stack direction (supports responsive props)',
                table: {
                    type: { summary: 'Direction | ResponsiveProp<Direction>' },
                    defaultValue: { summary: 'column' }
                }
            },
            spacing: {
                control: 'select',
                options: [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] satisfies SpacingValue[],
                description: 'Gap between children (supports responsive props and x/y values)',
                table: {
                    type: { summary: 'Spacing' },
                    defaultValue: { summary: 'undefined (gap-2)' }
                }
            },
            align: {
                control: 'select',
                options: ['start', 'center', 'end', 'stretch'],
                description: 'Align items along cross axis',
                table: {
                    type: { summary: 'Alignment' },
                    defaultValue: { summary: 'stretch' }
                }
            },
            justify: {
                control: 'select',
                options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
                description: 'Justify items along main axis',
                table: {
                    type: { summary: 'Justification' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            wrap: {
                control: 'boolean',
                description: 'Allow items to wrap',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            grow: {
                control: 'boolean',
                description: 'Make direct children grow to fill available space on main axis (flex: 1)',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            }
        }
    });
</script>

<Story name="Default">
    <div class="p-4 bg-primary whitespace-nowrap">JavaScript</div>
    <div class="p-4 bg-secondary whitespace-nowrap">TypeScript</div>
    <div class="p-4 bg-info whitespace-nowrap">React</div>
    <div class="p-4 bg-success whitespace-nowrap">Svelte</div>
    <div class="p-4 bg-warning whitespace-nowrap">Vue.js</div>
    <div class="p-4 bg-danger whitespace-nowrap">Angular</div>
    <div class="p-4 bg-primary whitespace-nowrap">Node.js</div>
    <div class="p-4 bg-secondary whitespace-nowrap">Python</div>
</Story>

<Story name="Row Direction">
    {#snippet template(args)}
        <Stack {...args} direction="row">
            <div class="p-4 bg-primary">First</div>
            <div class="p-4 bg-secondary">Second</div>
            <div class="p-4 bg-info">Third</div>
        </Stack>
    {/snippet}
</Story>

<Story name="Column Direction">
    {#snippet template(args)}
        <Stack {...args} direction="column">
            <div class="p-4 bg-primary">First</div>
            <div class="p-4 bg-secondary">Second</div>
            <div class="p-4 bg-info">Third</div>
        </Stack>
    {/snippet}
</Story>

<Story name="Spacing Variations">
    {#snippet template(args)}
        {@const { spacing, ...otherArgs } = args}
        <Stack direction="column" spacing={6}>
            <div>
                <div class="text-on-container mb-2 font-bold">No Spacing (0)</div>
                <Stack {...otherArgs} spacing={0}>
                    <div class="p-2 bg-primary text-sm">Item 1</div>
                    <div class="p-2 bg-secondary text-sm">Item 2</div>
                    <div class="p-2 bg-info text-sm">Item 3</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Small (2)</div>
                <Stack {...otherArgs} spacing={2}>
                    <div class="p-2 bg-primary text-sm">Item 1</div>
                    <div class="p-2 bg-secondary text-sm">Item 2</div>
                    <div class="p-2 bg-info text-sm">Item 3</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Large (8)</div>
                <Stack {...otherArgs} spacing={8}>
                    <div class="p-2 bg-primary text-sm">Item 1</div>
                    <div class="p-2 bg-secondary text-sm">Item 2</div>
                    <div class="p-2 bg-info text-sm">Item 3</div>
                </Stack>
            </div>
        </Stack>
    {/snippet}
</Story>

<Story name="Alignment">
    {#snippet template(args)}
        {@const { align, ...otherArgs } = args}
        <Stack spacing={6}>
            <div>
                <div class="text-on-container mb-2 font-bold">Align Start</div>
                <Stack {...otherArgs} direction="row" align="start" class="h-32 bg-surface">
                    <div class="p-4 bg-primary h-24">Tall</div>
                    <div class="p-4 bg-secondary">Short</div>
                    <div class="p-4 bg-info h-16">Medium</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Align Center</div>
                <Stack {...otherArgs} direction="row" align="center" class="h-32 bg-surface">
                    <div class="p-4 bg-primary h-24">Tall</div>
                    <div class="p-4 bg-secondary">Short</div>
                    <div class="p-4 bg-info h-16">Medium</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Align End</div>
                <Stack {...otherArgs} direction="row" align="end" class="h-32 bg-surface">
                    <div class="p-4 bg-primary h-24">Tall</div>
                    <div class="p-4 bg-secondary">Short</div>
                    <div class="p-4 bg-info h-16">Medium</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Align Stretch (default)</div>
                <Stack {...otherArgs} direction="row" align="stretch" class="h-32 bg-surface">
                    <div class="p-4 bg-primary">Stretched</div>
                    <div class="p-4 bg-secondary">All Same</div>
                    <div class="p-4 bg-info">Height</div>
                </Stack>
            </div>
        </Stack>
    {/snippet}
</Story>

<Story name="Justify">
    {#snippet template(args)}
        {@const { justify, ...otherArgs } = args}
        <Stack spacing={6}>
            <div>
                <div class="text-on-container mb-2 font-bold">Justify Start</div>
                <Stack {...otherArgs} direction="row" justify="start" class="bg-surface p-2">
                    <div class="p-2 bg-primary">A</div>
                    <div class="p-2 bg-secondary">B</div>
                    <div class="p-2 bg-info">C</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Justify Center</div>
                <Stack {...otherArgs} direction="row" justify="center" class="bg-surface p-2">
                    <div class="p-2 bg-primary">A</div>
                    <div class="p-2 bg-secondary">B</div>
                    <div class="p-2 bg-info">C</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Justify End</div>
                <Stack {...otherArgs} direction="row" justify="end" class="bg-surface p-2">
                    <div class="p-2 bg-primary">A</div>
                    <div class="p-2 bg-secondary">B</div>
                    <div class="p-2 bg-info">C</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Justify Between</div>
                <Stack {...otherArgs} direction="row" justify="between" class="bg-surface p-2">
                    <div class="p-2 bg-primary">A</div>
                    <div class="p-2 bg-secondary">B</div>
                    <div class="p-2 bg-info">C</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Justify Around</div>
                <Stack {...otherArgs} direction="row" justify="around" class="bg-surface p-2">
                    <div class="p-2 bg-primary">A</div>
                    <div class="p-2 bg-secondary">B</div>
                    <div class="p-2 bg-info">C</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Justify Evenly</div>
                <Stack {...otherArgs} direction="row" justify="evenly" class="bg-surface p-2">
                    <div class="p-2 bg-primary">A</div>
                    <div class="p-2 bg-secondary">B</div>
                    <div class="p-2 bg-info">C</div>
                </Stack>
            </div>
        </Stack>
    {/snippet}
</Story>

<Story name="Wrap">
    {#snippet template(args)}
        {@const { wrap, ...otherArgs } = args}
        <div class="text-on-container mb-4">
            Toggle direction prop: row wraps to new rows, column wraps to new columns. Stack needs h-full for column
            wrap to work.
        </div>
        <Stack spacing={6}>
            <div>
                <div class="text-on-container mb-2 font-bold">Without Wrap</div>
                <div class="max-w-xl h-64 border-2 border-dashed border-primary p-2 overflow-auto">
                    <Stack {...otherArgs} wrap={false} class="h-full bg-surface p-2">
                        <div class="p-4 h-16 bg-primary whitespace-nowrap">JavaScript</div>
                        <div class="p-4 h-16 bg-secondary whitespace-nowrap">TypeScript</div>
                        <div class="p-4 h-16 bg-info whitespace-nowrap">React</div>
                        <div class="p-4 h-16 bg-success whitespace-nowrap">Svelte</div>
                        <div class="p-4 h-16 bg-warning whitespace-nowrap">Vue.js</div>
                        <div class="p-4 h-16 bg-danger whitespace-nowrap">Angular</div>
                        <div class="p-4 h-16 bg-primary whitespace-nowrap">Node.js</div>
                        <div class="p-4 h-16 bg-secondary whitespace-nowrap">Python</div>
                    </Stack>
                </div>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">With Wrap</div>
                <div class="max-w-xl h-64 border-2 border-dashed border-primary p-2 overflow-auto">
                    <Stack {...otherArgs} wrap={true} class="h-full bg-surface p-2">
                        <div class="p-4 h-16 bg-primary whitespace-nowrap">JavaScript</div>
                        <div class="p-4 h-16 bg-secondary whitespace-nowrap">TypeScript</div>
                        <div class="p-4 h-16 bg-info whitespace-nowrap">React</div>
                        <div class="p-4 h-16 bg-success whitespace-nowrap">Svelte</div>
                        <div class="p-4 h-16 bg-warning whitespace-nowrap">Vue.js</div>
                        <div class="p-4 h-16 bg-danger whitespace-nowrap">Angular</div>
                        <div class="p-4 h-16 bg-primary whitespace-nowrap">Node.js</div>
                        <div class="p-4 h-16 bg-secondary whitespace-nowrap">Python</div>
                    </Stack>
                </div>
            </div>
        </Stack>
    {/snippet}
</Story>

<Story name="Grow Children">
    {#snippet template(args)}
        {@const { grow, ...otherArgs } = args}
        <Stack spacing={6}>
            <div>
                <div class="text-on-container mb-2 font-bold">Row without Grow (content width)</div>
                <Stack {...otherArgs} direction="row" grow={false} class="bg-surface p-2">
                    <div class="p-2 bg-primary">Small</div>
                    <div class="p-2 bg-secondary">Medium Content</div>
                    <div class="p-2 bg-info">A</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Row with Grow (equal widths, flex-1)</div>
                <Stack {...otherArgs} direction="row" grow={true} class="bg-surface p-2">
                    <div class="p-2 bg-primary">Small</div>
                    <div class="p-2 bg-secondary">Medium Content</div>
                    <div class="p-2 bg-info">A</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Column without Grow (content height)</div>
                <Stack {...otherArgs} direction="column" grow={false} class="bg-surface p-2">
                    <div class="p-2 bg-primary text-sm">Item 1</div>
                    <div class="p-2 bg-secondary text-sm">Item 2</div>
                </Stack>
            </div>
            <div>
                <div class="text-on-container mb-2 font-bold">Column with Grow (equal heights, flex-1)</div>
                <Stack {...otherArgs} direction="column" grow={true} class="h-48 bg-surface p-2">
                    <div class="p-2 bg-primary text-sm">Item 1</div>
                    <div class="p-2 bg-secondary text-sm">Item 2</div>
                </Stack>
            </div>
        </Stack>
    {/snippet}
</Story>
