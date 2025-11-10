<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { lorem } from '../routes/design/_components';
    import Stack from './Stack.svelte';
    import Typography, { type Props as TypographyProps, type Variant, type Weight } from './Typography.svelte';

    const { Story } = defineMeta({
        component: Typography,
        title: 'Atoms/Typography',
        tags: ['autodocs'],
        args: {
            variant: 'h1' as Variant
        },
        argTypes: {
            variant: {
                control: 'select',
                options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'footnote', 'code', 'legend'] satisfies Variant[],
                description: 'Typography variant (required)',
                table: {
                    type: { summary: 'Variant' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            weight: {
                control: 'select',
                options: ['normal', 'emphasis', 'bold'] satisfies Weight[],
                description: 'Font weight',
                table: {
                    type: { summary: 'Weight' },
                    defaultValue: { summary: 'normal' }
                }
            },
            underline: {
                control: 'boolean',
                description: 'Whether to underline the text',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            element: {
                control: 'text',
                description: 'Override the HTML element',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'auto (based on variant)' }
                }
            }
        }
    });
</script>

<Story name="Default">The quick brown fox</Story>

<Story name="All Variants">
    {#snippet template(args)}
        {@const { variant, children, ...otherArgs } = args}
        <Stack>
            <Typography {...otherArgs} variant="h1">Heading 1 - The quick brown fox</Typography>
            <Typography {...otherArgs} variant="h2">Heading 2 - The quick brown fox</Typography>
            <Typography {...otherArgs} variant="h3">Heading 3 - The quick brown fox</Typography>
            <Typography {...otherArgs} variant="h4">Heading 4 - The quick brown fox</Typography>
            <Typography {...otherArgs} variant="h5">Heading 5 - The quick brown fox</Typography>
            <Typography {...otherArgs} variant="h6">Heading 6 - The quick brown fox</Typography>
            <Typography {...otherArgs} variant="text">Text - The quick brown fox jumps over the lazy dog.</Typography>
            <Typography {...otherArgs} variant="footnote">
                Footnote - The quick brown fox jumps over the lazy dog.
            </Typography>
            <Typography {...otherArgs} variant="code">Code - const value = 'The quick brown fox';</Typography>
            <Typography {...otherArgs} variant="legend">Legend - Form field legend text</Typography>
        </Stack>
    {/snippet}
</Story>

<Story name="All Weights">
    {#snippet template(args)}
        {@const { weight, children, ...otherArgs } = args}
        <Stack>
            <Typography {...otherArgs} weight="normal">Normal Weight Heading</Typography>
            <Typography {...otherArgs} weight="emphasis">Emphasis Weight Heading</Typography>
            <Typography {...otherArgs} weight="bold">Bold Weight Heading</Typography>
        </Stack>
    {/snippet}
</Story>

<Story name="Headings Hierarchy" asChild>
    <Stack>
        <Typography variant="h1">Chapter Title (H1)</Typography>
        <Typography variant="text">Introduction paragraph with regular text explaining the chapter content.</Typography>

        <Typography variant="h2">Section Title (H2)</Typography>
        <Typography variant="text">Section content with more detailed information about the topic.</Typography>

        <Typography variant="h3">Subsection Title (H3)</Typography>
        <Typography variant="text">Subsection content breaking down the information further.</Typography>

        <Typography variant="h4">Detail Title (H4)</Typography>
        <Typography variant="text">Detailed information about a specific aspect.</Typography>
    </Stack>
</Story>

<Story name="Custom Element" asChild>
    <Stack>
        <Typography variant="h3" element="div">Div element styles as H3 (for semantic purposes)</Typography>
        <Typography variant="text" element="span">Span element styled as text</Typography>
    </Stack>
</Story>

<Story name="Long Text Wrapping" asChild>
    <Stack>
        <Typography variant="h2">
            This is a very long heading that demonstrates text wrapping behavior when the content exceeds the available
            width of the container
        </Typography>
        <Typography variant="text">
            {lorem}
        </Typography>
    </Stack>
</Story>
