<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import type { Snippet } from 'svelte';
    import MediaSizeIndicator from '@storybook-ext/MediaSizeIndicator.svelte';
    import { lorem } from '@storybook-ext/lorem';
    import Typography from '@atoms/Typography.svelte';
    import { Info, Warning } from '@atoms/icons/common';
    import { Google } from '@atoms/icons/social';
    import Button from '@atoms/inputs/Button.svelte';
    import Card from '@atoms/layouts/Card.svelte';

    const { Story } = defineMeta({
        component: Card,
        title: 'Atoms/Layouts/Card',
        tags: ['autodocs'],
        args: {
            caption: 'Card Title',
            shadow: false,
            color: undefined,
            width: undefined,
            icon: 'info' as any as Snippet // eslint-disable-line @typescript-eslint/no-explicit-any
        },
        argTypes: {
            caption: {
                control: 'text',
                description: 'Card header/title',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            shadow: {
                control: 'boolean',
                description: 'Show shadow',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            color: {
                control: 'select',
                options: [undefined, 'primary', 'secondary', 'info', 'success', 'warning', 'danger'],
                description: 'Color variant for the card',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            width: {
                control: 'select',
                options: ['small', 'big', 'fit', 'full'],
                description: 'Card width variant',
                table: {
                    type: { summary: 'Width' },
                    defaultValue: { summary: 'fit' }
                }
            },
            icon: {
                control: 'select',
                options: [undefined, 'warning', 'info', 'google'],
                description: 'Icon to display in card header',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                },
                mapping: {
                    warning: Warning,
                    info: Info,
                    google: Google
                }
            },
            children: { table: { disable: true }, ref: { control: false } },
            actions: { table: { disable: true }, ref: { control: false } }
        }
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        {@const { icon, ...otherArgs } = args}
        {#snippet iconSnippet()}
            <svelte:component this={icon} />
        {/snippet}
        <MediaSizeIndicator />
        <Card {...otherArgs} icon={icon ? iconSnippet : null}>
            <Typography>{lorem.short}</Typography>
        </Card>
    {/snippet}
</Story>

<Story name="Default Long Content">
    {#snippet template(args)}
        {@const { icon, ...otherArgs } = args}
        {#snippet iconSnippet()}
            <svelte:component this={icon} />
        {/snippet}
        <MediaSizeIndicator />
        <Card {...otherArgs} icon={icon ? iconSnippet : null}>
            <Typography>{lorem.long}</Typography>
        </Card>
    {/snippet}
</Story>

<Story name="With Actions">
    {#snippet template(args)}
        {@const { icon, caption, ...otherArgs } = args}
        {#snippet iconSnippet()}
            <svelte:component this={icon} />
        {/snippet}
        <MediaSizeIndicator />
        <Card {...otherArgs} icon={icon ? iconSnippet : null} caption="Confirm Action">
            {#snippet actions()}
                <Button color="secondary" size="sm">Cancel</Button>
                <Button color="primary" size="sm">Confirm</Button>
            {/snippet}

            <Typography>{lorem.medium}</Typography>
        </Card>
    {/snippet}
</Story>

<Story name="Complete Card">
    {#snippet template()}
        <MediaSizeIndicator />
        <Card caption="User Profile" shadow>
            {#snippet icon()}
                <Warning />
            {/snippet}

            {#snippet actions()}
                <Button color="secondary" size="sm">Cancel</Button>
                <Button color="primary" size="sm">Save Changes</Button>
            {/snippet}

            <div class="space-y-4">
                <div>
                    <Typography weight="emphasis">Name:</Typography>
                    <Typography>John Doe</Typography>
                </div>
                <div>
                    <Typography weight="emphasis">Email:</Typography>
                    <Typography>john.doe@example.com</Typography>
                </div>
                <div>
                    <Typography weight="emphasis">Bio:</Typography>
                    <Typography>{lorem.short}</Typography>
                </div>
            </div>
        </Card>
    {/snippet}
</Story>
