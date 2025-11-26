<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { z } from 'zod';
    import Typography from '@atoms/Typography.svelte';
    import ValidatedTextArea from '@atoms/inputs/ValidatedTextArea.svelte';
    import { type InputVariant } from '@atoms/inputs/types';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { type ActionColor, type Size } from '@atoms/types';
    import { rawValidationMessage } from '@atoms/types/validation-messages';

    const { Story } = defineMeta({
        component: ValidatedTextArea,
        title: 'Atoms/Inputs/ValidatedTextArea',
        tags: ['autodocs'],
        args: {
            variant: 'filled' as InputVariant,
            placeholder: 'Enter some text...',
            color: 'primary' as ActionColor,
            size: 'md' as Size,
            preserveErrorSpace: false,
            resizable: false,
            disabled: false
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
            preserveErrorSpace: {
                control: 'boolean',
                description: 'Reserve space for validation message even when no error',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            text: { table: { disable: true }, ref: { control: false } },
            valid: { table: { disable: true }, ref: { control: false } },
            validate: { table: { disable: true }, ref: { control: false } },
            onenter: { table: { disable: true }, ref: { control: false } },
            onblur: { table: { disable: true }, ref: { control: false } }
        }
    });
</script>

<script lang="ts">
    let text = $state('');
    let valid = $state(false);
</script>

<Story name="Default">
    {#snippet template(args)}
        <ValidatedTextArea
            {...args}
            validate={z.string().min(3, rawValidationMessage('At least 3 characters required'))}
            placeholder="Enter at least 3 characters..."
        />
    {/snippet}
</Story>

<Story name="Validation: String Length">
    {#snippet template(args)}
        {@const { validate, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Minimum 5 characters</Typography>
            <ValidatedTextArea
                {...otherArgs}
                rows="single"
                validate={z.string().min(5, rawValidationMessage('Minimum 5 characters required'))}
                bind:text
                bind:valid
            />
            <Typography>Current Value: [{text}]</Typography>
            <Typography>Valid: {valid ? '✓ Yes' : '✗ No'}</Typography>
        </Stack>
    {/snippet}
</Story>

<Story name="Validation: Email">
    {#snippet template(args)}
        {@const { validate, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Valid email address</Typography>
            <ValidatedTextArea
                {...otherArgs}
                rows="single"
                validate={z.email(rawValidationMessage('Please enter a valid email address'))}
                bind:text
                bind:valid
            />
            <Typography>Current Value: [{text}]</Typography>
            <Typography>Valid: {valid ? '✓ Yes' : '✗ No'}</Typography>
        </Stack>
    {/snippet}
</Story>

<Story name="Validation: URL">
    {#snippet template(args)}
        {@const { validate, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Valid URL</Typography>
            <ValidatedTextArea
                {...otherArgs}
                rows="single"
                validate={z.url(rawValidationMessage('Please enter a valid URL'))}
                bind:text
                bind:valid
            />
            <Typography>Current Value: [{text}]</Typography>
            <Typography>Valid: {valid ? '✓ Yes' : '✗ No'}</Typography>
        </Stack>
    {/snippet}
</Story>

<Story name="Validation: Success Message">
    {#snippet template(args)}
        {@const { validate, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Success message (minimum 5 characters)</Typography>
            <ValidatedTextArea
                {...otherArgs}
                rows="single"
                validate={(text) => {
                    if (text.length === 0) return undefined;
                    if (text.length < 5) return { error: 'Too short' };
                    return { success: 'Perfect!' };
                }}
                bind:text
                bind:valid
            />
            <Typography>Current Value: [{text}]</Typography>
            <Typography>Valid: {valid ? '✓ Yes' : '✗ No'}</Typography>
        </Stack>
    {/snippet}
</Story>

<Story name="Validation: Warning Message">
    {#snippet template(args)}
        {@const { validate, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Warning message (maximum 5 characters)</Typography>
            <ValidatedTextArea
                {...otherArgs}
                rows="single"
                validate={(text) => {
                    if (text.length === 0) return undefined;
                    if (text.length > 5) return { warning: 'Getting quite long...' };
                    return undefined;
                }}
                bind:text
                bind:valid
            />
            <Typography>Current Value: [{text}]</Typography>
            <Typography>Valid: {valid ? '✓ Yes' : '✗ No'}</Typography>
        </Stack>
    {/snippet}
</Story>

<Story name="Validation: Info Message">
    {#snippet template(args)}
        {@const { validate, ...otherArgs } = args}
        <Stack>
            <Typography variant="h4">Info message with character count</Typography>
            <ValidatedTextArea
                {...otherArgs}
                rows="single"
                validate={(text) => {
                    return { info: `Character count: ${text.length}` };
                }}
                bind:text
                bind:valid
            />
            <Typography>Current Value: [{text}]</Typography>
            <Typography>Valid: {valid ? '✓ Yes' : '✗ No'}</Typography>
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
                    <ValidatedTextArea {...otherArgs} validate={z.string().min(3)} />

                    <Box padding={4}>
                        <Stack>
                            <Typography>Level 1 - Sub-Container</Typography>
                            <ValidatedTextArea {...otherArgs} validate={z.string().min(3)} />

                            <Box padding={4}>
                                <Stack>
                                    <Typography>Level 2 - Surface</Typography>
                                    <ValidatedTextArea {...otherArgs} validate={z.string().min(3)} />

                                    <Box padding={4}>
                                        <Stack>
                                            <Typography>Level 3 - Container (Cycles)</Typography>
                                            <ValidatedTextArea {...otherArgs} validate={z.string().min(3)} />
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>

            <Typography variant="h4">Colored Boxes</Typography>
            <Stack direction="row" wrap>
                <Box color="danger" padding={2}>
                    <Stack>
                        <Typography>Danger Box</Typography>
                        <ValidatedTextArea {...otherArgs} validate={z.string().email()} />
                    </Stack>
                </Box>
                <Box color="success" padding={2}>
                    <Stack>
                        <Typography>Success Box</Typography>
                        <ValidatedTextArea {...otherArgs} validate={z.string().min(3)} />
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    {/snippet}
</Story>
