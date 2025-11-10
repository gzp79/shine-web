<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Stack from './Stack.svelte';
    import Toggle from './Toggle.svelte';
    import type { ActionColor, Size } from './types';

    const { Story } = defineMeta({
        component: Toggle,
        title: 'Atoms/Toggle',
        tags: ['autodocs'],
        args: {
            color: 'primary' as ActionColor,
            size: 'md' as Size,
            value: false
        },
        argTypes: {
            color: {
                control: 'select',
                options: ['primary', 'secondary', 'info', 'warning', 'danger', 'success'] satisfies ActionColor[],
                description: 'Toggle color',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'primary' }
                }
            },
            size: {
                control: 'select',
                options: ['xs', 'sm', 'md', 'lg'] satisfies Size[],
                description: 'Toggle size',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            value: {
                control: 'boolean',
                description: 'Toggle state (bindable)',
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
            offLabel: {
                control: 'text',
                description: 'Label when toggle is off',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            onLabel: {
                control: 'text',
                description: 'Label when toggle is on',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            }
        }
    });
</script>

<Story name="Default" />

<Story name="All Colors">
    {#snippet template(args)}
        {@const { color, ...otherArgs } = args}
        <Stack>
            <Toggle {...otherArgs} color="primary" onLabel="Primary" />
            <Toggle {...otherArgs} color="secondary" onLabel="Secondary" />
            <Toggle {...otherArgs} color="info" onLabel="Info" />
            <Toggle {...otherArgs} color="warning" onLabel="Warning" />
            <Toggle {...otherArgs} color="danger" onLabel="Danger" />
            <Toggle {...otherArgs} color="success" onLabel="Success" />
        </Stack>
    {/snippet}
</Story>

<Story name="All Sizes">
    {#snippet template(args)}
        {@const { size, ...otherArgs } = args}
        <Stack>
            <Toggle {...otherArgs} size="xs" onLabel="Extra Small" />
            <Toggle {...otherArgs} size="sm" onLabel="Small" />
            <Toggle {...otherArgs} size="md" onLabel="Medium" />
            <Toggle {...otherArgs} size="lg" onLabel="Large" />
        </Stack>
    {/snippet}
</Story>

<Story name="With Labels">
    {#snippet template(args)}
        {@const { ...otherArgs } = args}
        <Stack>
            <Toggle {...otherArgs} onLabel="On" />
            <Toggle {...otherArgs} offLabel="Off" />
            <Toggle {...otherArgs} offLabel="Disabled" onLabel="Enabled" />
            <Toggle {...otherArgs} offLabel="Light Mode" onLabel="Dark Mode" />
        </Stack>
    {/snippet}
</Story>

<Story name="States">
    {#snippet template(args)}
        {@const { disabled, value, ...otherArgs } = args}
        <Stack>
            <Toggle {...otherArgs} value={false} offLabel="Off" onLabel="On" />
            <Toggle {...otherArgs} value={true} offLabel="Off" onLabel="On" />
            <Toggle {...otherArgs} disabled value={false} offLabel="Off" onLabel="On" />
            <Toggle {...otherArgs} disabled value={true} offLabel="Off" onLabel="On" />
        </Stack>
    {/snippet}
</Story>
