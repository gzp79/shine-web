<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import Typography from '@atoms/Typography.svelte';
    import PropertyList from '@atoms/data/PropertyList.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import Alert, { type Variant } from './Alert.svelte';

    const { Story } = defineMeta({
        component: Alert,
        title: 'Components/Alert',
        tags: ['autodocs'],
        args: {
            variant: 'info' as Variant,
            caption: 'Alert Title',
            shadow: true,
            showIcon: true
        },
        argTypes: {
            variant: {
                control: 'select',
                options: ['info', 'success', 'warning', 'error'],
                description: 'Visual style variant of the alert',
                table: {
                    type: { summary: 'Variant' },
                    defaultValue: { summary: 'info' }
                }
            },
            caption: {
                control: 'text',
                description: 'The main heading/title of the alert',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            shadow: {
                control: 'boolean',
                description: 'Enable drop shadow for the alert',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            showIcon: {
                control: 'boolean',
                description: 'Whether to show the icon',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true' }
                }
            },
            children: { table: { disable: true }, ref: { control: false } },
            actions: { table: { disable: true }, ref: { control: false } }
        }
    });
</script>

<Story name="Default" />

<Story name="All Variants">
    {#snippet template(args)}
        {@const { variant, caption, ...otherArgs } = args}
        <Stack direction="column" spacing={4} class="p-4">
            <Alert {...otherArgs} variant="info" caption="Information Alert">
                This is an informational message that provides helpful context to the user.
            </Alert>

            <Alert {...otherArgs} variant="success" caption="Success Alert">
                The operation completed successfully!
            </Alert>

            <Alert {...otherArgs} variant="warning" caption="Warning Alert">
                Please review the following items before continuing.
            </Alert>

            <Alert {...otherArgs} variant="error" caption="Error Alert">
                An error occurred while processing your request.
            </Alert>
        </Stack>
    {/snippet}
</Story>

<Story name="With Detailed Content">
    {#snippet template(args)}
        {@const { ...otherArgs } = args}
        <Stack direction="column" spacing={4} class="p-4">
            <Alert {...otherArgs}>
                <Stack spacing={2}>
                    <Typography variant="text">The following configuration values are missing or invalid:</Typography>
                    <Box border>
                        <PropertyList
                            size="xs"
                            items={[
                                { key: 'API_KEY', value: 'Missing' },
                                { key: 'BASE_URL', value: 'Invalid format' },
                                { key: 'TIMEOUT', value: 'Out of range' }
                            ]}
                        />
                    </Box>
                </Stack>
            </Alert>

            <Alert {...otherArgs}>
                <Stack spacing={2}>
                    <Typography variant="text">Please correct the following errors before submitting:</Typography>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Email address is required</li>
                        <li>Password must be at least 8 characters</li>
                        <li>Terms and conditions must be accepted</li>
                    </ul>
                </Stack>
            </Alert>
        </Stack>
    {/snippet}
</Story>

<Story name="With Actions">
    {#snippet template()}
        <Stack direction="column" spacing={4} class="p-4">
            <Alert variant="warning" caption="Unsaved Changes" shadow>
                <Typography variant="text">
                    You have unsaved changes that will be lost if you leave this page.
                </Typography>

                {#snippet actions()}
                    <Button color="secondary" variant="outlined" size="sm" onclick={action('discard')}>Discard</Button>
                    <Button color="primary" size="sm" onclick={action('save')}>Save Changes</Button>
                {/snippet}
            </Alert>

            <Alert variant="error" caption="Connection Failed" shadow>
                <Typography variant="text">
                    Unable to connect to the server. Please check your internet connection and try again.
                </Typography>

                {#snippet actions()}
                    <Button color="primary" size="sm" onclick={action('retry')}>Retry</Button>
                {/snippet}
            </Alert>

            <Alert variant="info" caption="New Feature Available" shadow>
                <Typography variant="text">
                    We've added a new feature to help you work more efficiently. Would you like to learn more?
                </Typography>

                {#snippet actions()}
                    <Button color="secondary" variant="text" size="sm" onclick={action('dismiss')}>Dismiss</Button>
                    <Button color="primary" size="sm" onclick={action('learn-more')}>Learn More</Button>
                {/snippet}
            </Alert>
        </Stack>
    {/snippet}
</Story>
