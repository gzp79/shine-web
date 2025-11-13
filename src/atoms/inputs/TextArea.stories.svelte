<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import TextArea from '@atoms/inputs/TextArea.svelte';
    import type { ActionColor, InputVariant, Size } from '@atoms/types';

    const { Story } = defineMeta({
        component: TextArea,
        title: 'Atoms/Inputs/TextArea',
        tags: ['autodocs'],
        args: {
            variant: 'filled' as InputVariant,
            color: 'primary' as ActionColor,
            size: 'md' as Size,
            rows: 3
        },
        argTypes: {
            variant: {
                control: 'select',
                options: ['filled', 'outline', 'ghost'] satisfies InputVariant[],
                description: 'TextArea variant',
                table: {
                    type: { summary: 'InputVariant' },
                    defaultValue: { summary: 'filled' }
                }
            },
            color: {
                control: 'select',
                options: ['primary', 'secondary', 'info', 'warning', 'danger', 'success'] satisfies ActionColor[],
                description: 'TextArea color',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            size: {
                control: 'select',
                options: ['xs', 'sm', 'md', 'lg'] satisfies Size[],
                description: 'TextArea size',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            rows: {
                control: 'number',
                description: 'Number of rows (or "single" for single line)',
                table: {
                    type: { summary: 'number | "single" | [number, number]' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            placeholder: {
                control: 'text',
                description: 'Placeholder text',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: '""' }
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
            resizable: {
                control: 'boolean',
                description: 'Allow manual resizing',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            }
        }
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <TextArea {...args} placeholder="Enter your text here..." />
    {/snippet}
</Story>

<Story name="All Variants">
    {#snippet template(args)}
        {@const { variant, ...otherArgs } = args}
        <div class="space-y-3">
            <TextArea {...otherArgs} variant="filled" placeholder="Filled variant" />
            <TextArea {...otherArgs} variant="outline" placeholder="Outline variant" />
            <TextArea {...otherArgs} variant="ghost" placeholder="Ghost variant" />
        </div>
    {/snippet}
</Story>

<Story name="All Colors">
    {#snippet template(args)}
        {@const { color, ...otherArgs } = args}
        <div class="space-y-3">
            <TextArea {...otherArgs} color="primary" placeholder="Primary color" />
            <TextArea {...otherArgs} color="secondary" placeholder="Secondary color" />
            <TextArea {...otherArgs} color="info" placeholder="Info color" />
            <TextArea {...otherArgs} color="warning" placeholder="Warning color" />
            <TextArea {...otherArgs} color="danger" placeholder="Danger color" />
            <TextArea {...otherArgs} color="success" placeholder="Success color" />
        </div>
    {/snippet}
</Story>

<Story name="All Sizes">
    {#snippet template(args)}
        {@const { size, ...otherArgs } = args}
        <div class="space-y-3">
            <TextArea {...otherArgs} size="xs" placeholder="Extra Small" />
            <TextArea {...otherArgs} size="sm" placeholder="Small" />
            <TextArea {...otherArgs} size="md" placeholder="Medium" />
            <TextArea {...otherArgs} size="lg" placeholder="Large" />
        </div>
    {/snippet}
</Story>

<Story name="Single Line Mode">
    {#snippet template(args)}
        {@const { ...otherArgs } = args}
        <div class="space-y-3">
            <TextArea {...otherArgs} rows="single" placeholder="Acts like an input field" />
            <TextArea {...otherArgs} rows="single" variant="outline" placeholder="Single line outline" />
            <TextArea {...otherArgs} rows="single" variant="ghost" placeholder="Single line ghost" />
        </div>
    {/snippet}
</Story>

<Story name="Different Row Counts">
    {#snippet template(args)}
        {@const { rows, ...otherArgs } = args}
        <div class="space-y-3">
            <TextArea {...otherArgs} rows={2} placeholder="2 rows" />
            <TextArea {...otherArgs} rows={4} placeholder="4 rows" />
            <TextArea {...otherArgs} rows={8} placeholder="8 rows" />
        </div>
    {/snippet}
</Story>

<Story name="Resizable">
    {#snippet template(args)}
        {@const { ...otherArgs } = args}
        <div class="space-y-3">
            <div class="space-y-2">
                <p class="text-sm font-semibold">Not Resizable (default)</p>
                <TextArea {...otherArgs} resizable={false} placeholder="Cannot be resized" />
            </div>
            <div class="space-y-2">
                <p class="text-sm font-semibold">Resizable</p>
                <TextArea {...otherArgs} resizable={true} placeholder="Can be resized by dragging corner" />
            </div>
        </div>
    {/snippet}
</Story>

<Story name="States">
    {#snippet template(args)}
        {@const { ...otherArgs } = args}
        <div class="space-y-3">
            <TextArea {...otherArgs} placeholder="Normal state" />
            <TextArea {...otherArgs} disabled placeholder="Disabled state" />
            <TextArea {...otherArgs} text="Pre-filled text" />
        </div>
    {/snippet}
</Story>

<Story name="Variant & Color Matrix" asChild>
    <div class="space-y-6">
        {#each ['filled', 'outline', 'ghost'] as variant (variant)}
            <div class="space-y-3">
                <h3 class="text-sm font-semibold capitalize">{variant}</h3>
                <div class="grid grid-cols-2 gap-3">
                    <TextArea {variant} color="primary" placeholder="Primary" rows={2} />
                    <TextArea {variant} color="secondary" placeholder="Secondary" rows={2} />
                    <TextArea {variant} color="info" placeholder="Info" rows={2} />
                    <TextArea {variant} color="warning" placeholder="Warning" rows={2} />
                    <TextArea {variant} color="danger" placeholder="Danger" rows={2} />
                    <TextArea {variant} color="success" placeholder="Success" rows={2} />
                </div>
            </div>
        {/each}
    </div>
</Story>
