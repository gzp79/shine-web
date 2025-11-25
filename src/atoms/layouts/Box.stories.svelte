<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { lorem } from '@storybook-ext/lorem';
    import Typography from '@atoms/Typography.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import type { ActionColor } from '@atoms/types';

    const { Story } = defineMeta({
        component: Box,
        title: 'Atoms/Layouts/Box',
        tags: ['autodocs'],
        args: {
            border: false,
            shadow: false,
            ghost: false,
            width: undefined,
            color: undefined,
            legend: undefined,
            padding: undefined,
            margin: undefined,
            overflow: undefined
        },
        argTypes: {
            color: {
                control: 'select',
                options: [undefined, 'primary', 'secondary', 'info', 'success', 'warning', 'danger'],
                description: 'Color variant for the box',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            border: {
                control: 'boolean',
                description: 'Show border',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            shadow: {
                control: 'boolean',
                description: 'Show shadow',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            ghost: {
                control: 'boolean',
                description: 'Transparent background',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            width: {
                control: 'select',
                options: ['small', 'big', 'fit', 'full'],
                description: 'Width variant',
                table: {
                    type: { summary: 'Width' },
                    defaultValue: { summary: 'fit' }
                }
            },
            legend: {
                control: 'text',
                description: 'Legend text (renders as fieldset)',
                table: {
                    type: { summary: 'string | Legend' }
                }
            },
            padding: {
                control: 'object',
                description: 'Custom padding (Spacing type)',
                table: {
                    type: { summary: 'Spacing' }
                }
            },
            margin: {
                control: 'object',
                description: 'Custom margin (Spacing type)',
                table: {
                    type: { summary: 'Spacing' }
                }
            },
            overflow: {
                control: 'select',
                options: [undefined, 'y', 'x', 'auto', 'hidden'],
                description: 'Overflow behavior',
                table: {
                    type: { summary: 'Overflow type' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            children: { control: false, table: { disable: true } }
        }
    });
</script>

<Story name="Default" args={{ margin: 4 }}>
    {#snippet template(args)}
        <Box {...args}>
            <Typography variant="text">Default Box with standard padding and background</Typography>
        </Box>
    {/snippet}
</Story>

<Story name="Color Variants">
    {#snippet template(args)}
        {@const { color, ...otherArgs } = args}
        <div class="flex flex-col gap-4">
            {#each ['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as colorValue (colorValue)}
                <Box {...otherArgs} color={colorValue as ActionColor}>
                    <Typography variant="text">{colorValue} variant</Typography>
                </Box>
            {/each}
        </div>
    {/snippet}
</Story>

<Story name="With Border">
    {#snippet template(args)}
        {@const { border, ...otherArgs } = args}
        <div class="flex flex-col gap-4">
            <Box {...otherArgs} border>
                <Typography variant="text">Box with border</Typography>
            </Box>
            <Box {...otherArgs} border color="primary">
                <Typography variant="text">Primary box with border</Typography>
            </Box>
            <Box {...otherArgs} border color="danger">
                <Typography variant="text">Danger box with border</Typography>
            </Box>
        </div>
    {/snippet}
</Story>

<Story name="With Shadow">
    {#snippet template(args)}
        {@const { shadow, ...otherArgs } = args}
        <div class="flex flex-col gap-4">
            <Box {...otherArgs} shadow>
                <Typography variant="text">Box with shadow</Typography>
            </Box>
            <Box {...otherArgs} border shadow color="info">
                <Typography variant="text">Info box with border and shadow</Typography>
            </Box>
        </div>
    {/snippet}
</Story>

<Story name="Ghost Mode">
    {#snippet template(args)}
        {@const { ghost, ...otherArgs } = args}
        <div class="bg-container p-8">
            <Box {...otherArgs} ghost border>
                <Typography variant="text">Ghost box (transparent background)</Typography>
            </Box>
        </div>
    {/snippet}
</Story>

<Story name="With Legend">
    {#snippet template(args)}
        {@const { legend, ...otherArgs } = args}
        <div class="flex flex-col gap-4">
            <Box {...otherArgs} border legend="Simple Legend">
                <Typography variant="text">Box with a legend renders as a fieldset element</Typography>
            </Box>
            <Box {...otherArgs} border legend={{ text: 'Styled Legend', color: 'info', size: 'lg' }} color="warning">
                <Typography variant="text">Legend with custom styling</Typography>
            </Box>
        </div>
    {/snippet}
</Story>

<Story name="Nesting">
    {#snippet template(args)}
        <Box border legend="Level 0 (Container)">
            <Typography variant="text">Boxes automatically rotate colors when nested</Typography>
            <Box border legend="Level 1 (Sub-Container)">
                <Typography variant="text">Second level nesting</Typography>
                <Box border legend="Level 2 (Surface)">
                    <Typography variant="text">Third level nesting</Typography>
                    <Box {...args} legend="Level 3 (Container again)">
                        <Typography variant="text">Fourth level - updated from controls</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    {/snippet}
</Story>

<Story name="Overflow">
    {#snippet template(args)}
        {@const { overflow, ...otherArgs } = args}
        <div class="flex flex-col gap-4">
            <Box {...otherArgs} border overflow="y" class="max-h-32">
                <Typography>Vertical Scroll (y)</Typography>
                <Typography variant="text">{lorem.long}</Typography>
            </Box>
            <Box {...otherArgs} border overflow="x" class="w-64">
                <Typography>Horizontal Scroll (x)</Typography>
                <div class="w-[800px]"><Typography variant="text">{lorem.long}</Typography></div>
            </Box>
            <Box {...otherArgs} border overflow="auto" class="max-h-32">
                <Typography>Auto Overflow</Typography>
                <Typography variant="text">{lorem.long}</Typography>
            </Box>
            <Box {...otherArgs} border overflow="hidden" class="max-h-32">
                <Typography>Hidden Overflow</Typography>
                <Typography variant="text">{lorem.long}</Typography>
            </Box>
        </div>
    {/snippet}
</Story>
