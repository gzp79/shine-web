<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Typography from '@atoms/Typography.svelte';
    import { allIcons as animatedIcons } from '@atoms/icons/animated';
    import { allIcons as clientIcons } from '@atoms/icons/clients';
    import { allIcons as commonIcons } from '@atoms/icons/common';
    import { allIcons as flagIcons } from '@atoms/icons/flags';
    import { allIcons as socialIcons } from '@atoms/icons/social';
    import type { IconSize } from '@atoms/icons/types';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import type { ActionColor } from '@atoms/types';

    const { Story } = defineMeta({
        title: 'Atoms/Theme/Icons',
        args: {
            size: 'md' as IconSize,
            color: 'primary' as ActionColor,
            disabled: false,
            iconId: 0
        },
        argTypes: {
            size: {
                control: 'select',
                options: ['xs', 'sm', 'md', 'lg', 'full'] satisfies IconSize[],
                description: 'Icon size',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            color: {
                control: 'select',
                options: ['primary', 'secondary', 'info', 'warning', 'danger', 'success'] satisfies ActionColor[],
                description: 'Icon color',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'primary' }
                }
            },
            disabled: {
                control: 'boolean',
                description: 'Disabled state',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            iconId: {
                control: { type: 'number', min: 0, step: 1 },
                description: 'Icon index (uses modulo to wrap around available icons)',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '0' }
                }
            }
        }
    });
</script>

{#snippet iconGrid(args: any, icons: Record<string, any>)}
    {@const { size, color, disabled } = args}
    <div class="flex flex-wrap justify-center gap-2">
        {#each Object.entries(icons) as [name, IconComponent] (name)}
            <Box {color} ghost class="flex flex-col items-center justify-center border">
                <IconComponent {disabled} {size} />
                <Typography variant="h6">{name}</Typography>
            </Box>
        {/each}
    </div>
{/snippet}

<Story name="Common Icons">
    {#snippet template(args)}
        {@render iconGrid(args, commonIcons)}
    {/snippet}
</Story>

<Story name="Client Icons">
    {#snippet template(args)}
        {@render iconGrid(args, clientIcons)}
    {/snippet}
</Story>

<Story name="Flag Icons">
    {#snippet template(args)}
        {@render iconGrid(args, flagIcons)}
    {/snippet}
</Story>

<Story name="Social Icons">
    {#snippet template(args)}
        {@render iconGrid(args, socialIcons)}
    {/snippet}
</Story>

<Story name="Animated Icons">
    {#snippet template(args)}
        {@render iconGrid(args, animatedIcons)}
    {/snippet}
</Story>

{#snippet sizeDemo(args: any, icons: Record<string, any>, category: string)}
    {@const { iconId, color, disabled, size } = args}
    {#each Object.entries(icons) as [name, IconComponent], i}
        {#if i === iconId % Object.keys(icons).length}
            <Stack align="center">
                <Box border {color} class="w-96 h-96 flex items-center justify-center">
                    <IconComponent {disabled} {size} />
                </Box>
                <Typography>{category} ({name})</Typography>
            </Stack>
        {/if}
    {/each}
{/snippet}

<Story name="Size Demonstration">
    {#snippet template(args)}
        <Stack direction="row" wrap justify="center" spacing={4}>
            {@render sizeDemo(args, commonIcons, 'Common')}
            {@render sizeDemo(args, clientIcons, 'Client')}
            {@render sizeDemo(args, flagIcons, 'Flag')}
            {@render sizeDemo(args, socialIcons, 'Social')}
            {@render sizeDemo(args, animatedIcons, 'Animated')}
        </Stack>
    {/snippet}
</Story>
