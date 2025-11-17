<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import Typography from '@atoms/Typography.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import TextArea from '@atoms/inputs/TextArea.svelte';
    import { type InputVariant, inputSizeList, inputVariantList } from '@atoms/inputs/types';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { type ActionColor, type Size, actionColorList } from '@atoms/types';

    const { Story } = defineMeta({
        component: TextArea,
        title: 'Atoms/Inputs/TextArea',
        tags: ['autodocs'],
        args: {
            variant: 'filled' as InputVariant,
            color: 'primary' as ActionColor,
            size: 'md' as Size,
            placeholder: 'Enter some text...'
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
                control: { type: 'select' },
                options: [undefined, 'single', 1, 2, 3, 4, 5, 8, 10],
                description: 'Number of rows or "single" for single line input',
                table: {
                    type: { summary: 'number | "single" | [number, number] | undefined' },
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
            },
            text: { table: { disable: true }, ref: { control: false } },
            onEnter: { table: { disable: true }, ref: { control: false } },
            onBlur: { table: { disable: true }, ref: { control: false } },
            id: { table: { disable: true }, ref: { control: false } },
            role: { table: { disable: true }, ref: { control: false } }
        }
    });
</script>

<script lang="ts">
    let text = $state('');
</script>

<Story name="Default" />

<Story name="All Colors">
    {#snippet template(args)}
        {@const { color, placeholder, ...otherArgs } = args}
        <Stack>
            {#each actionColorList as color (color)}
                <TextArea {...otherArgs} {color} placeholder={`Color ${color}`} />
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="All Sizes">
    {#snippet template(args)}
        {@const { size, placeholder, ...otherArgs } = args}
        <Stack>
            {#each inputSizeList as size (size)}
                <TextArea {...otherArgs} {size} placeholder={`Size ${size}`} />
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="All Variants">
    {#snippet template(args)}
        {@const { variant, placeholder, ...otherArgs } = args}
        <Stack>
            {#each inputVariantList as variant (variant)}
                <TextArea {...otherArgs} {variant} placeholder={`Filled ${variant}`} />
            {/each}
        </Stack>
    {/snippet}
</Story>

<Story name="Line Modes">
    {#snippet template(args)}
        {@const { row, resizable, placeholder, ...otherArgs } = args}
        <Stack>
            <TextArea {...otherArgs} rows="single" placeholder="Single line" />
            <TextArea {...otherArgs} rows={2} placeholder="2 rows" />
            <TextArea {...otherArgs} rows={4} placeholder="4 rows" />
            <TextArea {...otherArgs} rows={8} placeholder="8 rows" />
            <TextArea {...otherArgs} resizable placeholder="unlimited, resizable" />
        </Stack>
    {/snippet}
</Story>

<Story name="States">
    {#snippet template(args)}
        {@const { disabled, placeholder, ...otherArgs } = args}
        <Stack>
            <TextArea {...otherArgs} placeholder="Normal state" />
            <TextArea {...otherArgs} disabled placeholder="Disabled state" />
            <TextArea {...otherArgs} text="Pre-filled text" />
        </Stack>
    {/snippet}
</Story>

<Story name="Action Types">
    {#snippet template(args)}
        <TextArea
            {...args}
            bind:text={
                () => text,
                (value) => {
                    text = value;
                    action('text changed')(value);
                }
            }
            onblur={() => action('blurred')}
        />
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
                        <TextArea {...otherArgs} />
                    </Stack>

                    <Box padding={4}>
                        <Stack>
                            <Typography>Level 1 - Sub-Container</Typography>
                            <Stack direction="row" wrap>
                                <TextArea {...otherArgs} />
                            </Stack>

                            <Box padding={4}>
                                <Stack>
                                    <Typography>Level 2 - Surface</Typography>
                                    <Stack direction="row" wrap>
                                        <TextArea {...otherArgs} />
                                    </Stack>
                                    <Box padding={4}>
                                        <Stack>
                                            <Typography>Level 3 - Container (Cycles)</Typography>
                                            <Stack direction="row" wrap>
                                                <TextArea {...otherArgs} />
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
                        <TextArea {...otherArgs} />
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
                <TextArea {...otherArgs} />
                <TextArea {...otherArgs} rows="single" />
                <TextArea {...otherArgs} />
            </InputGroup>

            <Typography variant="h4">Outline Variant</Typography>
            <InputGroup {size} {color} variant="outline">
                <TextArea {...otherArgs} />
                <TextArea {...otherArgs} rows="single" />
                <TextArea {...otherArgs} />
            </InputGroup>

            <Typography variant="h4">Ghost Variant</Typography>
            <InputGroup {size} {color} variant="ghost">
                <TextArea {...otherArgs} />
                <TextArea {...otherArgs} rows="single" />
                <TextArea {...otherArgs} />
            </InputGroup>

            <Typography variant="h4">All Sizes</Typography>
            <Stack>
                {#each inputSizeList as size (size)}
                    <InputGroup {size} {color} {variant}>
                        <TextArea {...otherArgs} />
                        <TextArea {...otherArgs} rows="single" />
                        <TextArea {...otherArgs} />
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
                    <TextArea {...otherArgs} />
                    <TextArea {...otherArgs} rows="single" />
                    <TextArea {...otherArgs} />
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Outline Variant</Typography>
                <InputGroup {size} {color} variant="outline" vertical>
                    <TextArea {...otherArgs} />
                    <TextArea {...otherArgs} rows="single" />
                    <TextArea {...otherArgs} />
                </InputGroup>
            </Stack>

            <Stack>
                <Typography variant="h4">Ghost Variant</Typography>
                <InputGroup {size} {color} variant="ghost" vertical>
                    <TextArea {...otherArgs} />
                    <TextArea {...otherArgs} rows="single" />
                    <TextArea {...otherArgs} />
                </InputGroup>
            </Stack>
        </Stack>
    {/snippet}
</Story>
