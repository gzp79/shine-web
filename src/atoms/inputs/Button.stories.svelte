<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import Typography from '@atoms/Typography.svelte';
    import { Dots } from '@atoms/icons/animated';
    import { Check } from '@atoms/icons/common';
    import Button from '@atoms/inputs/Button.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import { type InputSize, type InputVariant, inputSizeList, inputVariantList } from '@atoms/inputs/types';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { type ActionColor, actionColorList } from '@atoms/types';

    const { Story } = defineMeta({
        component: Button,
        title: 'Atoms/Inputs/Button',
        tags: ['autodocs'],
        args: {
            color: 'primary' as ActionColor,
            size: 'md' as InputSize,
            variant: 'filled' as InputVariant,
            wide: false,
            disabled: false,
            highlight: false
        },
        argTypes: {
            color: {
                control: 'select',
                options: actionColorList,
                description: 'Button color',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            size: {
                control: 'select',
                options: inputSizeList,
                description: 'Button size',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            variant: {
                control: 'select',
                options: inputVariantList,
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
            href: { table: { disable: true }, ref: { control: false } },
            onclick: { table: { disable: true }, ref: { control: false } },
            startIcon: { table: { disable: true }, ref: { control: false } },
            endIcon: { table: { disable: true }, ref: { control: false } },
            preload: { table: { disable: true }, ref: { control: false } },
            children: { table: { disable: true }, ref: { control: false } },
            id: { table: { disable: true }, ref: { control: false } },
            role: { table: { disable: true }, ref: { control: false } }
        }
    });

    const href = 'https://example.com';
</script>

<Story name="Default">Click Me</Story>

<Story name="All Colors">
    {#snippet template(args)}
        {@const { color, ...otherArgs } = args}
        <Stack>
            {#each actionColorList as color (color)}
                <Stack direction="row" align="center">
                    <Typography class="w-20">{color}</Typography>
                    <Button {...otherArgs} startIcon={Check} {color}>Click Me</Button>
                    <Button {...otherArgs} startIcon={Check} {color}>Click Me</Button>
                    <Button {...otherArgs} {color}>Click Me</Button>
                </Stack>
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="All Sizes">
    {#snippet template(args)}
        {@const { size, ...otherArgs } = args}
        <Stack>
            {#each inputSizeList as size (size)}
                <Stack direction="row" align="center">
                    <Typography class="w-8">{size}</Typography>
                    <Button {...otherArgs} startIcon={Check} {size} />
                    <Button {...otherArgs} startIcon={Check} {size}>Click Me</Button>
                    <Button {...otherArgs} {size}>Click Me</Button>
                </Stack>
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="All Variants">
    {#snippet template(args)}
        {@const { variant, ...otherArgs } = args}
        <Stack>
            {#each inputVariantList as variant (variant)}
                <Stack direction="row" align="center">
                    <Typography class="w-16">{variant}</Typography>
                    <Button {...otherArgs} startIcon={Check} {variant} />
                    <Button {...otherArgs} startIcon={Check} {variant}>Click Me</Button>
                    <Button {...otherArgs} {variant}>Click Me</Button>
                </Stack>
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="With Icons">
    {#snippet template(args)}
        <Stack>
            <Button {...args} startIcon={Check}>Done</Button>
            <Button {...args} endIcon={Dots}>Loading...</Button>
            <Button {...args} startIcon={Check} endIcon={Dots}>Download</Button>
        </Stack>
    {/snippet}
</Story>

<Story name="Action types">
    {#snippet template(args)}
        {@const { children, ...otherArgs } = args}
        <Stack>
            <Button {...otherArgs}>No action</Button>
            <Button {...otherArgs} {href}>HRef action</Button>
            <Button {...otherArgs} onclick={action('clicked')}>OnClick action</Button>
            <Button {...otherArgs} {href} onclick={action('clicked')}>HRef and OnClick action</Button>
        </Stack>
    {/snippet}
</Story>

<Story name="In Box">
    {#snippet template(args)}
        {@const { ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Nested Boxes - Auto Color Inheritance</Typography>
            <Box padding={4}>
                <Stack>
                    <Typography>Level 0 - Container</Typography>
                    <Button {...otherArgs}>Click Me</Button>
                    <Button {...otherArgs} color="info" startIcon={Check}>Info</Button>

                    <Box padding={4}>
                        <Stack>
                            <Typography>Level 1 - Sub-Container</Typography>
                            <Button {...otherArgs}>Click Me</Button>
                            <Button {...otherArgs} color="info" startIcon={Check}>Info</Button>

                            <Box padding={4}>
                                <Stack>
                                    <Typography>Level 2 - Surface</Typography>
                                    <Button {...otherArgs}>Click Me</Button>
                                    <Button {...otherArgs} color="info" startIcon={Check}>Info</Button>

                                    <Box padding={4}>
                                        <Stack>
                                            <Typography>Level 3 - Container (Cycles)</Typography>
                                            <Button {...otherArgs}>Click Me</Button>
                                            <Button {...otherArgs} color="info" startIcon={Check}>Info</Button>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>

            <Typography variant="h4">Colored Boxes</Typography>
            <Stack direction="row">
                <Box color="danger">
                    <Stack>
                        <Typography>Danger Box</Typography>
                        <Button {...otherArgs}>Click Me</Button>
                        <Button {...otherArgs} color="info" startIcon={Check}>Info</Button>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    {/snippet}
</Story>

<Story name="In Horizontal Group">
    {#snippet template(args)}
        {@const { size, variant, color, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Filled Variant</Typography>
            <InputGroup {size} {color} variant="filled">
                <Button {...otherArgs}>First</Button>
                <Button {...otherArgs}>Second</Button>
                <Button {...otherArgs}>Third</Button>
            </InputGroup>

            <Typography variant="h4">Outline Variant</Typography>
            <InputGroup {size} {color} variant="outline">
                <Button {...otherArgs}>First</Button>
                <Button {...otherArgs}>Second</Button>
                <Button {...otherArgs}>Third</Button>
            </InputGroup>

            <Typography variant="h4">Ghost Variant</Typography>
            <InputGroup {size} {color} variant="ghost">
                <Button {...otherArgs}>First</Button>
                <Button {...otherArgs}>Second</Button>
                <Button {...otherArgs}>Third</Button>
            </InputGroup>

            <Typography variant="h4">With Icons</Typography>
            <InputGroup {size} {color} {variant}>
                <Button {...otherArgs} startIcon={Check}>Done</Button>
                <Button {...otherArgs}>Middle</Button>
                <Button {...otherArgs} endIcon={Dots}>Loading</Button>
            </InputGroup>

            <Typography variant="h4">All Sizes</Typography>
            <Stack direction="row" align="center">
                {#each inputSizeList as size (size)}
                    <InputGroup {size} {color} {variant}>
                        <Button {...otherArgs}>{size.toUpperCase()}</Button>
                        <Button {...otherArgs}>{size.toUpperCase()}</Button>
                    </InputGroup>
                {/each}
            </Stack>
        </Stack>
    {/snippet}
</Story>

<Story name="In Vertical Group">
    {#snippet template(args)}
        {@const { size, variant, color, ...otherArgs } = args}
        <Stack direction="row" spacing={8} wrap>
            <Stack>
                <Typography variant="h4">Filled Variant</Typography>
                <InputGroup {size} {color} variant="filled" vertical>
                    <Button {...otherArgs}>First</Button>
                    <Button {...otherArgs}>Second</Button>
                    <Button {...otherArgs}>Third</Button>
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Outline Variant</Typography>
                <InputGroup {size} {color} variant="outline" vertical>
                    <Button {...otherArgs}>First</Button>
                    <Button {...otherArgs}>Second</Button>
                    <Button {...otherArgs}>Third</Button>
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Ghost Variant</Typography>
                <InputGroup {size} {color} variant="ghost" vertical>
                    <Button {...otherArgs}>First</Button>
                    <Button {...otherArgs}>Second</Button>
                    <Button {...otherArgs}>Third</Button>
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">With Icons</Typography>
                <InputGroup {size} {color} {variant} vertical>
                    <Button {...otherArgs} startIcon={Check}>Done</Button>
                    <Button {...otherArgs} startIcon={Check} endIcon={Dots}>Middle</Button>
                    <Button {...otherArgs} endIcon={Dots}>Loading</Button>
                </InputGroup>
            </Stack>
        </Stack>
    {/snippet}
</Story>
