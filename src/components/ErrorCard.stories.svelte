<script context="module" lang="ts">
    import { FetchError, InternalError, OtherError, SchemaError } from '$lib/utils';
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import ErrorCard from './ErrorCard.svelte';

    const { Story } = defineMeta({
        component: ErrorCard,
        title: 'Components/ErrorCard',
        tags: ['autodocs'],
        args: {
            caption: undefined,
            error: new OtherError('Something went wrong', { code: 'UNKNOWN_ERROR' }),
            width: 'fit',
            shadow: true,
            showDetails: true,
            showErrorKind: false
        },
        argTypes: {
            caption: {
                control: 'text',
                description: 'Custom caption/title for the error',
                table: {
                    type: { summary: 'string | undefined' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            width: {
                control: 'select',
                options: ['full', 'fit', 'small', 'big'],
                description: 'Width of the error card',
                table: {
                    type: { summary: 'Width' },
                    defaultValue: { summary: 'fit' }
                }
            },
            shadow: {
                control: 'boolean',
                description: 'Enable drop shadow for the error card',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true' }
                }
            },
            showDetails: {
                control: 'boolean',
                description: 'Whether to show detailed error information',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true' }
                }
            },
            showErrorKind: {
                control: 'boolean',
                description: 'Whether to show the error kind/type badge',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            children: { table: { disable: true }, ref: { control: false } },
            actions: { table: { disable: true }, ref: { control: false } },
            error: { table: { disable: true }, ref: { control: false } }
        }
    });

    const simpleError = new OtherError('A simple error message', { debug: 'internal details' });
    const complexError = new InternalError('Database connection failed', {
        host: 'db.example.com',
        port: 5432,
        database: 'production',
        error: {
            code: 'ECONNREFUSED',
            errno: -111,
            syscall: 'connect',
            address: '10.0.0.1'
        },
        timestamp: '2025-11-15T10:30:00.000Z',
        retryAttempts: 3
    });
</script>

<Story name="Default" />

<Story name="With Actions">
    {#snippet template(args)}
        <ErrorCard {...args} error={complexError} caption="Operation Failed">
            {#snippet actions()}
                <Button color="primary" size="sm" onclick={action('dismiss-clicked')}>Dismiss</Button>
                <Button color="secondary" size="sm" onclick={action('retry-clicked')}>Retry</Button>
            {/snippet}
        </ErrorCard>
    {/snippet}
</Story>

<Story name="With Custom Content">
    {#snippet template(args)}
        <ErrorCard {...args} error={complexError}>
            <Stack direction="row" spacing={1} class="border-t border-b pt-3 pb-3">
                <Button size="xs" onclick={action('report-clicked')}>Report</Button>
                <Typography>this issue to the support team.</Typography>
            </Stack>
            {#snippet actions()}
                <Button color="primary" size="sm" onclick={action('dismiss-clicked')}>Dismiss</Button>
                <Button color="secondary" size="sm" onclick={action('retry-clicked')}>Retry</Button>
            {/snippet}
        </ErrorCard>
    {/snippet}
</Story>
