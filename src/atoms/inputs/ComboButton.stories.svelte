<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import Typography from '@atoms/Typography.svelte';
    import * as icons from '@atoms/icons/common';
    import ComboButton from '@atoms/inputs/ComboButton.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import { type InputSize, inputSizeList } from '@atoms/inputs/types';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { type ActionColor, actionColorList } from '@atoms/types';
    import Alert from '@components/Alert.svelte';

    const { Story } = defineMeta({
        component: ComboButton,
        title: 'Atoms/Inputs/ComboButton',
        tags: ['autodocs'],
        args: {
            color: 'primary' as ActionColor,
            size: 'md' as InputSize,
            current: 0,
            disabled: false,
            wide: false
        },
        argTypes: {
            items: {
                control: 'object',
                description: 'Array of menu items',
                table: {
                    type: { summary: 'Item[]' },
                    defaultValue: { summary: '[]' }
                }
            },
            color: {
                control: 'select',
                options: actionColorList,
                description: 'Button color',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'primary' }
                }
            },
            current: {
                control: 'number',
                description: 'Currently selected item index',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '0' }
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
            size: {
                control: 'select',
                options: inputSizeList,
                description: 'Button size',
                table: {
                    type: { summary: 'InputSize' },
                    defaultValue: { summary: 'md' }
                }
            },
            wide: {
                control: 'boolean',
                description: 'Full width button',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            }
        }
    });

    const href = 'https://example.com';

    const simpleItems = [
        { caption: 'Option 1', onclick: () => action('clicked')('Option 1') },
        { caption: 'Option 2', onclick: () => action('clicked')('Option 2') },
        { caption: 'Option 3', onclick: () => action('clicked')('Option 3') }
    ];

    const itemsWithIcons = [
        { caption: 'Save', icon: icons.Check, onclick: () => action('clicked')('Save') },
        { caption: 'Settings', icon: icons.Settings, onclick: () => action('clicked')('Settings') },
        { caption: 'Info', icon: icons.Info, onclick: () => action('clicked')('Info') },
        { caption: 'Warning', icon: icons.Warning, onclick: () => action('clicked')('Warning') }
    ];

    const itemsWithHref = [
        { caption: 'Home', href: '/home' },
        { caption: 'About', href: '/about' },
        { caption: 'Contact', href: '/contact' }
    ];

    const mixedItems = [
        { caption: 'Action', icon: icons.Check, onclick: () => action('clicked')('Action') },
        { caption: 'Link', icon: icons.Link, href: href },
        { caption: 'No Action', icon: icons.Info }
    ];
</script>

<Story name="Default" args={{ items: simpleItems }} />

<Story name="With Icons" args={{ items: itemsWithIcons }} />

<Story name="All Colors">
    {#snippet template(args)}
        {@const { color, ...otherArgs } = args}
        <Stack>
            {#each actionColorList as color (color)}
                <Stack direction="row" align="center">
                    <Typography class="w-20">{color}</Typography>
                    <ComboButton {...otherArgs} items={itemsWithIcons} {color} />
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
                    <ComboButton {...otherArgs} items={itemsWithIcons} {size} />
                </Stack>
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="Different Item Types">
    {#snippet template(args)}
        <Stack>
            <Stack direction="row" align="center">
                <Typography class="w-32">Simple items</Typography>
                <ComboButton {...args} items={simpleItems} />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-32">Items with icons</Typography>
                <ComboButton {...args} items={itemsWithIcons} />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-32">Items with href</Typography>
                <ComboButton {...args} items={itemsWithHref} />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-32">Mixed items</Typography>
                <ComboButton {...args} items={mixedItems} />
            </Stack>
        </Stack>
    {/snippet}
</Story>

<Story name="States">
    {#snippet template(args)}
        <Stack>
            <Stack direction="row" align="center">
                <Typography class="w-26">Normal</Typography>
                <ComboButton {...args} items={itemsWithIcons} />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-26">Disabled</Typography>
                <ComboButton {...args} items={itemsWithIcons} disabled />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-26">Wide</Typography>
                <ComboButton {...args} items={itemsWithIcons} wide />
            </Stack>

            <Stack direction="row" align="center">
                <Typography class="w-26">Disabled + Wide</Typography>
                <ComboButton {...args} items={itemsWithIcons} disabled wide />
            </Stack>
        </Stack>
    {/snippet}
</Story>

<Story name="Different Initial Selection">
    {#snippet template(args)}
        <Stack>
            {#each itemsWithIcons as item, index (item.caption)}
                <Stack direction="row" align="center">
                    <Typography class="w-36">Current: {index} ({item.caption})</Typography>
                    <ComboButton {...args} items={itemsWithIcons} current={index} />
                </Stack>
            {/each}
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
                    <ComboButton {...otherArgs} items={itemsWithIcons} />
                    <ComboButton {...otherArgs} items={itemsWithIcons} color="info" />

                    <Box padding={4}>
                        <Stack>
                            <Typography>Level 1 - Sub-Container</Typography>
                            <ComboButton {...otherArgs} items={itemsWithIcons} />
                            <ComboButton {...otherArgs} items={itemsWithIcons} color="info" />

                            <Box padding={4}>
                                <Stack>
                                    <Typography>Level 2 - Surface</Typography>
                                    <ComboButton {...otherArgs} items={itemsWithIcons} />
                                    <ComboButton {...otherArgs} items={itemsWithIcons} color="info" />

                                    <Box padding={4}>
                                        <Stack>
                                            <Typography>Level 3 - Container (Cycles)</Typography>
                                            <ComboButton {...otherArgs} items={itemsWithIcons} />
                                            <ComboButton {...otherArgs} items={itemsWithIcons} color="info" />
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    {/snippet}
</Story>

<Story name="Long Captions">
    {#snippet template(args)}
        {@const longItems = [
            {
                caption: 'Very Long Option Name That Wraps',
                icon: icons.Check,
                onclick: () => action('clicked')('Long 1')
            },
            {
                caption: 'Another Extremely Long Option',
                icon: icons.Settings,
                onclick: () => action('clicked')('Long 2')
            },
            { caption: 'Short', icon: icons.Info, onclick: () => action('clicked')('Short') }
        ]}
        <Stack>
            <Typography variant="h4">Normal Width</Typography>
            <ComboButton {...args} items={longItems} />

            <Typography variant="h4">Wide</Typography>
            <ComboButton {...args} items={longItems} wide />
        </Stack>
    {/snippet}
</Story>

<Story name="In Horizontal Group">
    {#snippet template(args)}
        <Alert variant="error" width="full" caption="Not supported" />
        {@const { size, color, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Filled Variant</Typography>
            <InputGroup {size} {color} variant="filled">
                <ComboButton {...otherArgs} items={simpleItems} />
                <ComboButton {...otherArgs} items={itemsWithIcons} />
                <ComboButton {...otherArgs} items={simpleItems} />
            </InputGroup>

            <Typography variant="h4">Outline Variant</Typography>
            <InputGroup {size} {color} variant="outline">
                <ComboButton {...otherArgs} items={simpleItems} />
                <ComboButton {...otherArgs} items={itemsWithIcons} />
                <ComboButton {...otherArgs} items={simpleItems} />
            </InputGroup>

            <Typography variant="h4">Ghost Variant</Typography>
            <InputGroup {size} {color} variant="ghost">
                <ComboButton {...otherArgs} items={simpleItems} />
                <ComboButton {...otherArgs} items={itemsWithIcons} />
                <ComboButton {...otherArgs} items={simpleItems} />
            </InputGroup>

            <Typography variant="h4">All Sizes</Typography>
            <Stack>
                {#each inputSizeList as size (size)}
                    <InputGroup {size} {color} variant="filled">
                        <ComboButton {...otherArgs} items={simpleItems} />
                        <ComboButton {...otherArgs} items={itemsWithIcons} />
                        <ComboButton {...otherArgs} items={simpleItems} />
                    </InputGroup>
                {/each}
            </Stack>
        </Stack>
    {/snippet}
</Story>

<Story name="In Vertical Group">
    {#snippet template(args)}
        {@const { size, color, ...otherArgs } = args}
        <Alert variant="error" width="full" caption="Not supported" />
        <Stack direction="row" spacing={8} wrap>
            <Stack>
                <Typography variant="h4">Filled Variant</Typography>
                <InputGroup {size} {color} variant="filled" vertical>
                    <ComboButton {...otherArgs} items={simpleItems} />
                    <ComboButton {...otherArgs} items={itemsWithIcons} />
                    <ComboButton {...otherArgs} items={simpleItems} />
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Outline Variant</Typography>
                <InputGroup {size} {color} variant="outline" vertical>
                    <ComboButton {...otherArgs} items={simpleItems} />
                    <ComboButton {...otherArgs} items={itemsWithIcons} />
                    <ComboButton {...otherArgs} items={simpleItems} />
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Ghost Variant</Typography>
                <InputGroup {size} {color} variant="ghost" vertical>
                    <ComboButton {...otherArgs} items={simpleItems} />
                    <ComboButton {...otherArgs} items={itemsWithIcons} />
                    <ComboButton {...otherArgs} items={simpleItems} />
                </InputGroup>
            </Stack>
        </Stack>
    {/snippet}
</Story>
