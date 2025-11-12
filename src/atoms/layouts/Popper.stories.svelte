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
        tags: ['autodocs'],
        args: {
            behavior: 'click',
            includeContent: false,
            placement: 'top',
            alignWidth: false,
            offset: 4
        },
        argTypes: {
            behavior: {
                control: 'select',
                options: ['click', 'toggle', 'hover', 'manual'] satisfies Behavior[],
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
            case 'toggle':
                return 'Toggle Behavior';
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
                                <Typography variant="h1">Popper content</Typography>
                                <Typography>This popper opens on {behavior}.</Typography>
                                <Typography>Click outside to close.</Typography>
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
    {/snippet}
</Story>

<!-- <Story name="Dropdown Menu">
    {#snippet template(args)}
        {@const { trigger, reference, ...otherArgs } = args}
        <div class="h-[400px] overflow-auto border-2 border-dashed border-gray-300 p-4">
            <div class="h-[100px] flex items-center justify-center bg-gray-50">
                <p class="text-sm text-gray-500">Scroll to see behavior</p>
            </div>

            <Box border class="my-4">
                <InputGroup id="dropDownMenu">
                    <Button>Actions</Button>
                    <Button id="dropDownMenuTrigger" startIcon={icons.DropDown} />
                </InputGroup>
                <Popper
                    alignWidth
                    display="flex flex-col rounded-lg border bg-base-100 shadow-lg"
                    trigger="#dropDownMenuTrigger"
                    reference="#dropDownMenu"
                    {...otherArgs}
                >
                    <InputGroup vertical>
                        <Button wide color="info">Edit Profile</Button>
                        <Button wide color="warning">Settings</Button>
                        <Button wide color="danger">Logout</Button>
                    </InputGroup>
                </Popper>
            </Box>

            <div class="h-[100px]"></div>
        </div>
    {/snippet}
</Story> -->
