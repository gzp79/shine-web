<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import LoadingCard from './LoadingCard.svelte';

    const { Story } = defineMeta({
        component: LoadingCard,
        title: 'Components/LoadingCard',
        tags: ['autodocs'],
        args: {
            label: 'Loading...',
            size: 'md',
            animation: 'dots',
            showLabel: true
        },
        argTypes: {
            label: {
                control: 'text',
                description: 'Loading message to display',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'localized "Loading"' }
                }
            },
            size: {
                control: 'select',
                options: ['xs', 'sm', 'md', 'lg'],
                description: 'Size of the loading animation and text',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            animation: {
                control: 'select',
                options: ['dots', 'spinner', 'ring', 'ball', 'infinite'],
                description: 'Type of loading animation',
                table: {
                    type: { summary: 'dots | spinner | ring | ball | infinite' },
                    defaultValue: { summary: 'dots' }
                }
            },
            showLabel: {
                control: 'boolean',
                description: 'Whether to show the loading label text',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true' }
                }
            },
            class: {
                control: 'text',
                description: 'Custom class for additional styling',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            }
        }
    });
</script>

<Story name="Default" />

<Story name="All Animations">
    {#snippet template(args)}
        {@const { animation, ...otherArgs } = args}
        <Stack direction="row" wrap spacing={4} class="p-4">
            <Box border class="h-48">
                <LoadingCard {...otherArgs} animation="dots" />
            </Box>
            <Box border class="h-48">
                <LoadingCard {...otherArgs} animation="spinner" />
            </Box>
            <Box border class="h-48">
                <LoadingCard {...otherArgs} animation="ring" />
            </Box>
            <Box border class="h-48">
                <LoadingCard {...otherArgs} animation="ball" />
            </Box>
            <Box border class="h-48">
                <LoadingCard {...otherArgs} animation="infinite" />
            </Box>
        </Stack>
    {/snippet}
</Story>

<Story name="All Sizes">
    {#snippet template(args)}
        {@const { size, ...otherArgs } = args}
        <Stack direction="row" wrap spacing={4} class="p-4">
            <Box border class="h-32">
                <LoadingCard {...otherArgs} size="xs" label="Extra Small Loading" />
            </Box>
            <Box border class="h-40">
                <LoadingCard {...otherArgs} size="sm" label="Small Loading" />
            </Box>
            <Box border class="h-48">
                <LoadingCard {...otherArgs} size="md" label="Medium Loading" />
            </Box>
            <Box border class="h-56">
                <LoadingCard {...otherArgs} size="lg" label="Large Loading" />
            </Box>
        </Stack>
    {/snippet}
</Story>

<Story name="In Context - Card Loading">
    {#snippet template(args)}
        <div class="space-y-4 p-4">
            <Box border shadow class="h-64">
                <LoadingCard {...args} animation="spinner" label="Loading user profile..." />
            </Box>
        </div>
    {/snippet}
</Story>

<Story name="In Context - Full Page">
    {#snippet template(args)}
        <div class="min-h-screen bg-background-default flex items-center justify-center">
            <LoadingCard {...args} animation="ring" label="Loading application..." />
        </div>
    {/snippet}
</Story>
