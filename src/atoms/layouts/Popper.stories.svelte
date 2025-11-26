<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Popper, { type Behavior, type Placement } from '@atoms/layouts/Popper.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';

    const allPlacements = [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
    ] satisfies Placement[];

    const { Story } = defineMeta({
        component: Popper,
        title: 'Atoms/Layouts/Popper',
        args: {
            behavior: 'click',
            includeContent: false,
            placement: 'bottom',
            alignWidth: false,
            offset: 0,
            animate: 'fade'
        },
        argTypes: {
            behavior: {
                control: 'select',
                options: ['click', 'hover', 'manual'] satisfies Behavior[],
                description: 'What should trigger the popper to open',
                table: {
                    type: { summary: 'Behavior' },
                    defaultValue: { summary: 'click' }
                }
            },
            includeContent: {
                control: 'boolean',
                description: 'Whether to include content clicks in the "safe zone"',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            placement: {
                control: 'select',
                options: allPlacements,
                description: 'Placement of the popper relative to the reference element',
                table: {
                    type: { summary: 'Placement' },
                    defaultValue: { summary: 'bottom' }
                }
            },
            alignWidth: {
                control: 'boolean',
                description: 'Align the width of the popper to the reference element',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            offset: {
                control: 'number',
                description: 'Offset distance from the reference element',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '4' }
                }
            },
            animate: {
                control: 'select',
                options: ['fade', 'none'],
                description: 'Animation for popper open/close',
                table: {
                    type: { summary: 'fade | none' },
                    defaultValue: { summary: 'fade' }
                }
            },
            trigger: { table: { disable: true }, ref: { control: false } },
            reference: { table: { disable: true }, ref: { control: false } },
            layer: { table: { disable: true }, ref: { control: false } },
            open: { table: { disable: true }, ref: { control: false } },
            children: { table: { disable: true }, ref: { control: false } }
        }
    });

    let manualOpen = $state(false);

    const behaviorToTitle = (behavior: Behavior | undefined) => {
        switch (behavior) {
            case 'click':
                return 'Click Behavior';
            case 'hover':
                return 'Hover Behavior';
            case 'manual':
                return 'Manual Control';
            default:
                return 'Default (Click) Behavior';
        }
    };
</script>

<Story name="Default">
    {#snippet template(args)}
        {#key args.behavior}
            {@const { children, behavior, ...otherArgs } = args}
            <Box border width="full" overflow="auto" class="min-h-[300px] max-h-[300px]">
                <Stack align="center">
                    <div class="h-[400px] flex items-start">
                        <Typography>↓ Scroll down to the button...</Typography>
                    </div>

                    <Box border>
                        {#key behavior}
                            <Button onclick={() => (manualOpen = true)}>{behaviorToTitle(behavior)}</Button>
                            <Popper {behavior} bind:open={manualOpen} {...otherArgs}>
                                <Box border shadow>
                                    <Typography variant="h4">Popper</Typography>
                                    <Typography>Behavior: {behavior}.</Typography>
                                    <Typography variant="footnote">Try scrolling!</Typography>
                                    {#if behavior === 'manual'}
                                        <Button onclick={() => (manualOpen = false)}>Close</Button>
                                    {/if}
                                </Box>
                            </Popper>
                        {/key}
                    </Box>

                    <div class="h-[400px] flex items-end">
                        <Typography>↑ End of scroll area</Typography>
                    </div>
                </Stack>
            </Box>
        {/key}
    {/snippet}
</Story>

<Story name="Multiple Poppers">
    {#snippet template(args)}
        {#key args.behavior}
            {@const { children, ...otherArgs } = args}
            <Stack align="center" gap={4}>
                <div class="flex gap-8 items-center justify-center">
                    <Box border>
                        <Button>First Popper</Button>
                        <Popper behavior="click" placement="top" {...otherArgs}>
                            <Box border shadow>
                                <Typography variant="h3">First Popper</Typography>
                                <Typography>This is the first popper content.</Typography>
                            </Box>
                        </Popper>
                    </Box>

                    <Box border>
                        <Button>Second Popper</Button>
                        <Popper behavior="click" placement="bottom" {...otherArgs}>
                            <Box border shadow>
                                <Typography variant="h3">Second Popper</Typography>
                                <Typography>This is the second popper content.</Typography>
                            </Box>
                        </Popper>
                    </Box>
                </div>

                <div class="h-[200px]"></div>
            </Stack>
        {/key}
    {/snippet}
</Story>
