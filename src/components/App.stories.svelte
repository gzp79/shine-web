<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import type { Component } from 'svelte';
    import LangSwitch from '@lib/i18n/LangSwitch.svelte';
    import ThemeSwitch from '@lib/theme/ThemeSwitch.svelte';
    import Typography from '@atoms/Typography.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import App, { type Props } from '@components/App.svelte';
    import AppContent, { type Layout } from '@components/AppContent.svelte';
    import AppToolbar from '@components/AppToolbar.svelte';

    const { Story } = defineMeta<unknown, Component<Props & { layout: Layout }>>({
        title: 'Components/App',
        component: App,
        parameters: {
            layout: 'fullscreen'
        },
        args: {
            showToolbar: true,
            layout: 'centered'
        },
        argTypes: {
            showToolbar: {
                control: 'boolean',
                description: 'Whether to show the toolbar area',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true' }
                }
            },
            layout: {
                control: 'select',
                options: ['centered', 'flow', 'fullscreen'],
                description: 'Preset layout option for AppContent',
                table: {
                    type: { summary: 'Layout' },
                    defaultValue: { summary: 'centered' }
                }
            },
            children: { table: { disable: true }, ref: { control: false } }
        }
    });
</script>

{#snippet toolbar()}
    <InputGroup vertical size="xs">
        <LangSwitch />
        <ThemeSwitch />
    </InputGroup>
{/snippet}

<Story name="Basic">
    {#snippet template(args)}
        {@const { showToolbar, layout } = args}
        <App {showToolbar}>
            <AppToolbar>
                {@render toolbar()}
            </AppToolbar>

            <AppContent {layout}>
                <Box color="primary" class="max-w-md p-8">
                    <Typography variant="h1">Welcome</Typography>
                    <Typography>
                        This is the basic App layout without a toolbar. The content is centered using the layout prop.
                    </Typography>
                </Box>
            </AppContent>
        </App>
    {/snippet}
</Story>

<Story name="Some Complex Content" args={{ layout: 'flow' }}>
    {#snippet template(args)}
        {@const { showToolbar, layout } = args}
        <App {showToolbar}>
            <AppToolbar>
                {@render toolbar()}
            </AppToolbar>

            <AppContent {layout}>
                <Stack spacing={6}>
                    <Typography variant="h1">Scrollable Content</Typography>
                    <Typography>
                        This story uses layout="flow" which enables scrolling. Scroll down to see more content.
                    </Typography>
                    {#each Array(20) as _, i (i)}
                        <Box color={i % 2 === 0 ? 'primary' : 'secondary'} class="p-6">
                            <Typography variant="h3">Item {i + 1}</Typography>
                            <Typography>
                                This demonstrates scrollable content within the app. The toolbar remains fixed at the
                                top.
                            </Typography>
                        </Box>
                    {/each}
                </Stack>
            </AppContent>
        </App>
    {/snippet}
</Story>
