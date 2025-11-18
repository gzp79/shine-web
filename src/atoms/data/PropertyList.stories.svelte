<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import PropertyList, { type DescriptionListItem } from '@atoms/data/PropertyList.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import type { Size } from '@atoms/types';

    const { Story } = defineMeta({
        component: PropertyList,
        title: 'Atoms/Data/PropertyList',
        tags: ['autodocs'],
        args: {
            size: 'md' as Size,
            wide: false
        },
        argTypes: {
            size: {
                control: 'select',
                options: ['xs', 'sm', 'md', 'lg'] satisfies Size[],
                description: 'Size variant for the table',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            wide: {
                control: 'boolean',
                description: 'Whether the table should take full width of its container',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true' }
                }
            },
            class: {
                control: 'text',
                description: 'Additional CSS classes for the table',
                table: {
                    type: { summary: 'string' }
                }
            },
            items: { table: { disable: true }, control: { type: 'object' } }
        }
    });

    const basicItems: DescriptionListItem[] = [
        { key: 'Username', value: 'john_doe' },
        { key: 'Email', value: 'john.doe@example.com' },
        { key: 'Role', value: 'Administrator' },
        { key: 'Status', value: 'Active' }
    ];

    let data = $state(0);
    /*$effect(() => {
        const interval = setInterval(() => {
            data++;
        }, 1000);

        return () => clearInterval(interval);
    });*/
</script>

<Story
    name="Default"
    args={{
        items: basicItems
    }}
/>

<Story name="Sizes">
    {#snippet template(args)}
        <Stack>
            <Box border width="fit" legend="Extra Small (xs)">
                <PropertyList {...args} items={basicItems} size="xs" />
            </Box>
            <Box border legend="Small (sm)">
                <PropertyList {...args} items={basicItems} size="sm" />
            </Box>
            <Box border legend="Medium (md)">
                <PropertyList {...args} items={basicItems} size="md" />
            </Box>
            <Box border legend="Large (lg)">
                <PropertyList {...args} items={basicItems} size="lg" />
            </Box>
        </Stack>
    {/snippet}
</Story>

<Story name="With Snippets">
    {#snippet template(args)}
        {#snippet buttonSnippet()}
            <Button size="xs" color="primary">Edit Profile</Button>
        {/snippet}

        {#snippet badgeSnippet()}
            <span class="badge badge-success">Verified</span>
        {/snippet}

        <Box border width="fit">
            <PropertyList
                {...args}
                items={[
                    { key: 'Username', value: 'john_doe' },
                    { key: 'Email', value: 'john.doe@example.com' },
                    { key: 'Status', value: badgeSnippet },
                    { key: 'Actions', value: buttonSnippet }
                ]}
            />
        </Box>
    {/snippet}
</Story>

<Story name="With Custom Classes">
    {#snippet template(args)}
        <Box border>
            <PropertyList
                {...args}
                items={[
                    { key: 'Name', value: 'John Doe' },
                    {
                        key: 'Status',
                        value: 'Active',
                        valueClass: 'font-semibold'
                    },
                    {
                        key: 'Error',
                        value: 'Failed authentication',
                        valueClass: 'text-on-danger font-bold'
                    },
                    {
                        key: 'Important',
                        value: 'System administrator',
                        keyClass: 'text-on-warning',
                        valueClass: 'text-on-warning'
                    }
                ]}
            />
        </Box>
    {/snippet}
</Story>

<Story name="Long Content">
    {#snippet template(args)}
        {@const { wide, ...otherArgs } = args}
        <Box border width="small">
            <PropertyList
                wide
                {...otherArgs}
                items={[
                    {
                        key: 'Short key',
                        value: 'This is a very long value that should demonstrate how the component handles text overflow and wrapping in the value column.'
                    },
                    {
                        key: 'This is a really long key name that might wrap',
                        value: 'Short value'
                    },
                    {
                        key: 'URL',
                        value: 'https://example.com/very/long/path/to/some/resource/that/might/need/scrolling'
                    }
                ]}
            />
        </Box>
    {/snippet}
</Story>

<Story name="Null Filtering">
    {#snippet template(args)}
        <Box border>
            <PropertyList
                {...args}
                items={[
                    null,
                    { key: 'Visible 1', value: 'This is shown (surrounded by nulls)' },
                    null,
                    { key: 'Visible 2', value: 'This is also shown (null above)' },
                    { key: 'Visible 3', value: 'And this too (null above)' },
                    null
                ]}
            />
        </Box>
    {/snippet}
</Story>

<Story name="Nested Table">
    {#snippet template(args)}
        {#snippet innerTable()}
            <Box border>
                <PropertyList
                    size="xs"
                    items={[
                        { key: 'Nested 1', value: 'Value A' },
                        { key: 'Nested 2', value: 'Value B' },
                        { key: 'Nested 3', value: 'Value C' }
                    ]}
                />
            </Box>
        {/snippet}

        {#snippet incrementButton()}
            <Button onclick={() => data++} size="xs">Increment</Button>
        {/snippet}

        <Box border>
            <PropertyList
                {...args}
                items={[
                    { key: 'Simple', value: 'Top level value' },
                    { key: 'Complex', value: innerTable },
                    { key: 'Reactive', value: `More data ${data}` },
                    { key: 'Inc', value: incrementButton }
                ]}
            />
        </Box>
    {/snippet}
</Story>

<Story name="Real World Example">
    {#snippet template(args)}
        {#snippet editButton()}
            <Button size="xs" color="primary">Edit</Button>
        {/snippet}

        {#snippet statusBadge()}
            <span class="badge badge-success">Active</span>
        {/snippet}

        {#snippet verifiedBadge()}
            <span class="badge badge-info">✓ Verified</span>
        {/snippet}

        <Box border width="small">
            <h3 class="mb-4 text-lg font-semibold">User Profile</h3>
            <PropertyList
                {...args}
                size="sm"
                items={[
                    { key: 'Full Name', value: 'John Doe' },
                    { key: 'Email', value: 'john.doe@example.com' },
                    { key: 'Phone', value: '+1 (555) 123-4567' },
                    { key: 'Account Status', value: statusBadge },
                    { key: 'Email Status', value: verifiedBadge },
                    { key: 'Member Since', value: 'January 15, 2023' },
                    { key: 'Last Login', value: '2 hours ago' },
                    { key: 'Role', value: 'Administrator', valueClass: 'font-semibold text-primary' },
                    { key: 'Actions', value: editButton }
                ]}
            />
        </Box>
    {/snippet}
</Story>
