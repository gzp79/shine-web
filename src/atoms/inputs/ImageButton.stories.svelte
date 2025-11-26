<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import Typography from '@atoms/Typography.svelte';
    import { Check, Hamburger } from '@atoms/icons/common';
    import { Google } from '@atoms/icons/social';
    import ImageButton from '@atoms/inputs/ImageButton.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import { type InputVariant, inputSizeList, inputVariantList } from '@atoms/inputs/types';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { type ActionColor, actionColorList } from '@atoms/types';

    const { Story } = defineMeta({
        component: ImageButton,
        title: 'Atoms/Inputs/ImageButton',
        tags: ['autodocs'],
        args: {
            src: '/assets/get_google_play.svg',
            alt: 'Placeholder',
            color: 'primary' as ActionColor,
            size: 'md',
            variant: 'filled' as InputVariant,
            wide: false,
            disabled: false,
            highlight: false
        },
        argTypes: {
            src: {
                control: 'text',
                description: 'Image source URL',
                table: {
                    type: { summary: 'string' }
                }
            },
            alt: {
                control: 'text',
                description: 'Image alt text',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: '""' }
                }
            },
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
                options: inputSizeList,
                description: 'Button size',
                table: {
                    type: { summary: 'InputSize' },
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
            preload: { table: { disable: true }, ref: { control: false } },
            id: { table: { disable: true }, ref: { control: false } },
            role: { table: { disable: true }, ref: { control: false } }
        }
    });

    const href = 'https://example.com';
    const pngImage = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';
    const svgImage = '/assets/get_google_play.svg';
</script>

<Story name="Default" />

<Story name="All Colors">
    {#snippet template(args)}
        {@const { color, ...otherArgs } = args}
        <Stack>
            {#each actionColorList as color (color)}
                <Stack direction="row" align="center">
                    <Typography class="w-20">{color}</Typography>
                    <ImageButton {...otherArgs} {color} src={pngImage} />
                    <ImageButton {...otherArgs} {color} src={svgImage} />
                    <ImageButton {...otherArgs} {color} src={Google} />
                    <ImageButton {...otherArgs} {color} src={Check} />
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
                    <Typography class="w-16">{size}</Typography>
                    <ImageButton {...otherArgs} {size} src={pngImage} />
                    <ImageButton {...otherArgs} {size} src={svgImage} />
                    <ImageButton {...otherArgs} {size} src={Google} />
                    <ImageButton {...otherArgs} {size} src={Hamburger} />
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
                    <ImageButton {...otherArgs} {variant} src={pngImage} />
                    <ImageButton {...otherArgs} {variant} src={svgImage} />
                    <ImageButton {...otherArgs} {variant} src={Google} />
                    <ImageButton {...otherArgs} {variant} src={Check} />
                </Stack>
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="Action Types">
    {#snippet template(args)}
        <Stack>
            <Stack direction="row" align="center">
                <Typography class="w-26">No action</Typography>
                <ImageButton {...args} src={svgImage} />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-26">href</Typography>
                <ImageButton {...args} src={svgImage} {href} />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-26">onclick</Typography>
                <ImageButton {...args} src={svgImage} onclick={action('clicked')} />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-26">href + onclick</Typography>
                <ImageButton {...args} src={svgImage} {href} onclick={action('clicked')} />
            </Stack>
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
                    <Stack direction="row" wrap>
                        <ImageButton {...otherArgs} src={pngImage} />
                        <ImageButton {...otherArgs} src={svgImage} />
                        <ImageButton {...otherArgs} src={Google} />
                        <ImageButton {...otherArgs} src={Check} />
                    </Stack>

                    <Box padding={4}>
                        <Stack>
                            <Typography>Level 1 - Sub-Container</Typography>
                            <Stack direction="row" wrap>
                                <ImageButton {...otherArgs} src={pngImage} />
                                <ImageButton {...otherArgs} src={svgImage} />
                                <ImageButton {...otherArgs} src={Google} />
                                <ImageButton {...otherArgs} src={Check} />
                            </Stack>

                            <Box padding={4}>
                                <Stack>
                                    <Typography>Level 2 - Surface</Typography>
                                    <Stack direction="row" wrap>
                                        <ImageButton {...otherArgs} src={pngImage} />
                                        <ImageButton {...otherArgs} src={svgImage} />
                                        <ImageButton {...otherArgs} src={Google} />
                                        <ImageButton {...otherArgs} src={Check} />
                                    </Stack>
                                    <Box padding={4}>
                                        <Stack>
                                            <Typography>Level 3 - Container (Cycles)</Typography>
                                            <Stack direction="row" wrap>
                                                <ImageButton {...otherArgs} src={pngImage} />
                                                <ImageButton {...otherArgs} src={svgImage} />
                                                <ImageButton {...otherArgs} src={Google} />
                                                <ImageButton {...otherArgs} src={Check} />
                                            </Stack>
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
                        <ImageButton {...otherArgs} src={pngImage} />
                        <ImageButton {...otherArgs} src={svgImage} />
                        <ImageButton {...otherArgs} src={Google} />
                        <ImageButton {...otherArgs} src={Check} />
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
                <ImageButton {...otherArgs} src={pngImage} />
                <ImageButton {...otherArgs} src={svgImage} />
                <ImageButton {...otherArgs} src={Google} />
                <ImageButton {...otherArgs} src={Check} />
            </InputGroup>

            <Typography variant="h4">Outline Variant</Typography>
            <InputGroup {size} {color} variant="outline">
                <ImageButton {...otherArgs} src={pngImage} />
                <ImageButton {...otherArgs} src={svgImage} />
                <ImageButton {...otherArgs} src={Google} />
                <ImageButton {...otherArgs} src={Check} />
            </InputGroup>

            <Typography variant="h4">Ghost Variant</Typography>
            <InputGroup {size} {color} variant="ghost">
                <ImageButton {...otherArgs} src={pngImage} />
                <ImageButton {...otherArgs} src={svgImage} />
                <ImageButton {...otherArgs} src={Google} />
                <ImageButton {...otherArgs} src={Check} />
            </InputGroup>

            <Typography variant="h4">With Icons</Typography>
            <InputGroup {size} {color} {variant}>
                <ImageButton {...otherArgs} src={pngImage} />
                <ImageButton {...otherArgs} src={svgImage} />
                <ImageButton {...otherArgs} src={Google} />
                <ImageButton {...otherArgs} src={Check} />
            </InputGroup>

            <Typography variant="h4">All Sizes</Typography>
            <Stack>
                {#each inputSizeList as size (size)}
                    <InputGroup {size} {color} {variant}>
                        <ImageButton {...otherArgs} src={pngImage} />
                        <ImageButton {...otherArgs} src={svgImage} />
                        <ImageButton {...otherArgs} src={Google} />
                        <ImageButton {...otherArgs} src={Check} />
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
                    <ImageButton {...otherArgs} src={pngImage} />
                    <ImageButton {...otherArgs} src={svgImage} />
                    <ImageButton {...otherArgs} src={Google} />
                    <ImageButton {...otherArgs} src={Check} />
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Outline Variant</Typography>
                <InputGroup {size} {color} variant="outline" vertical>
                    <ImageButton {...otherArgs} src={pngImage} />
                    <ImageButton {...otherArgs} src={svgImage} />
                    <ImageButton {...otherArgs} src={Google} />
                    <ImageButton {...otherArgs} src={Check} />
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Ghost Variant</Typography>
                <InputGroup {size} {color} variant="ghost" vertical>
                    <ImageButton {...otherArgs} src={pngImage} />
                    <ImageButton {...otherArgs} src={svgImage} />
                    <ImageButton {...otherArgs} src={Google} />
                    <ImageButton {...otherArgs} src={Check} />
                </InputGroup>
            </Stack>
        </Stack>
    {/snippet}
</Story>
