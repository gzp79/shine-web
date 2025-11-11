<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Button from '@atoms/inputs/Button.svelte';
    import type { ActionColor, InputVariant, Size } from '@atoms/types';

    const { Story } = defineMeta({
        component: Button,
        title: 'Atoms/Inputs/Button',
        tags: ['autodocs'],
        args: {
            color: 'primary' as ActionColor,
            size: 'md' as Size,
            variant: 'filled' as InputVariant
        },
        argTypes: {
            color: {
                control: 'select',
                options: ['primary', 'secondary', 'info', 'warning', 'danger', 'success'] satisfies ActionColor[],
                description: 'Button color',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            size: {
                control: 'select',
                options: ['xs', 'sm', 'md', 'lg'] satisfies Size[],
                description: 'Button size',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            variant: {
                control: 'select',
                options: ['filled', 'outline', 'ghost'] satisfies InputVariant[],
                description: 'Button variant',
                table: {
                    type: { summary: 'InputVariant' },
                    defaultValue: { summary: 'filled' }
                }
            },
            wide: {
                control: 'boolean',
                description: 'Full width button',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
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
            highlight: {
                control: 'boolean',
                description: 'Highlight the button',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            href: {
                control: 'text',
                description: 'Link destination (renders as anchor)',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            }
        }
    });
</script>

<Story name="Default">Click Me</Story>

<Story name="All Colors">
    {#snippet template(args)}
        {@const { color, children, ...otherArgs } = args}
        <div class="flex flex-wrap gap-2">
            <Button {...otherArgs} color="primary">Primary</Button>
            <Button {...otherArgs} color="secondary">Secondary</Button>
            <Button {...otherArgs} color="info">Info</Button>
            <Button {...otherArgs} color="warning">Warning</Button>
            <Button {...otherArgs} color="danger">Danger</Button>
            <Button {...otherArgs} color="success">Success</Button>
        </div>
    {/snippet}
</Story>

<Story name="All Sizes">
    {#snippet template(args)}
        {@const { size, children, ...otherArgs } = args}
        <div class="flex flex-wrap items-center gap-2">
            <Button {...otherArgs} size="xs">Extra Small</Button>
            <Button {...otherArgs} size="sm">Small</Button>
            <Button {...otherArgs} size="md">Medium</Button>
            <Button {...otherArgs} size="lg">Large</Button>
        </div>
    {/snippet}
</Story>

<Story name="All Variants">
    {#snippet template(args)}
        {@const { variant, children, ...otherArgs } = args}
        <div class="flex flex-wrap gap-2">
            <Button {...otherArgs} variant="filled">Filled</Button>
            <Button {...otherArgs} variant="outline">Outline</Button>
            <Button {...otherArgs} variant="ghost">Ghost</Button>
        </div>
    {/snippet}
</Story>

<!-- <Story name="With Icons">
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <div class="flex flex-wrap gap-2">
            <Button {...otherArgs} startIcon={Home}>Home</Button>
            <Button {...otherArgs} endIcon={ChevronRight}>Next</Button>
            <Button {...otherArgs} startIcon={Download} endIcon={ChevronRight}>Download</Button>
        </div>
    {/snippet}
</Story>

<Story name="Icon Only">
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <div class="flex flex-wrap items-center gap-2">
            <Button {...otherArgs} startIcon={Home} size="xs" />
            <Button {...otherArgs} startIcon={Settings} size="sm" />
            <Button {...otherArgs} startIcon={Download} size="md" />
            <Button {...otherArgs} startIcon={Home} size="lg" />
        </div>
    {/snippet}
</Story> -->

<Story name="States">
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
                <Button {...otherArgs}>Normal</Button>
                <Button {...otherArgs} disabled>Disabled</Button>
                <Button {...otherArgs} highlight>Highlighted</Button>
            </div>
            <div class="flex flex-wrap gap-2">
                <Button {...otherArgs} variant="outline">Normal</Button>
                <Button {...otherArgs} variant="outline" disabled>Disabled</Button>
                <Button {...otherArgs} variant="outline" highlight>Highlighted</Button>
            </div>
        </div>
    {/snippet}
</Story>
<!-- 
<Story name="Wide Buttons">
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <div class="space-y-2">
            <Button {...otherArgs} wide>Full Width Button</Button>
            <Button {...otherArgs} wide startIcon={Download}>Download Now</Button>
            <Button {...otherArgs} wide variant="outline">Sign Up</Button>
        </div>
    {/snippet}
</Story> -->
<!-- 
<Story name="As Links">
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <div class="flex flex-wrap gap-2">
            <Button {...otherArgs} href="/">Internal Link</Button>
            <Button {...otherArgs} href="https://example.com">External Link</Button>
            <Button {...otherArgs} href="#section">Hash Link</Button>
            <Button {...otherArgs} href="mailto:test@example.com" startIcon={Download}>Email Link</Button>
        </div>
    {/snippet}
</Story> -->

<Story name="Color Variants Matrix" asChild>
    <div class="space-y-6">
        {#each ['filled', 'outline', 'ghost'] as variant (variant)}
            <div class="space-y-2">
                <h3 class="text-lg font-semibold capitalize">{variant}</h3>
                <div class="flex flex-wrap gap-2">
                    <Button {variant} color="primary">Primary</Button>
                    <Button {variant} color="secondary">Secondary</Button>
                    <Button {variant} color="info">Info</Button>
                    <Button {variant} color="warning">Warning</Button>
                    <Button {variant} color="danger">Danger</Button>
                    <Button {variant} color="success">Success</Button>
                </div>
            </div>
        {/each}
    </div>
</Story>
