<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Modal, { type ModalWidth } from '@atoms/layouts/Modal.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { lorem } from '../../storybook/lorem';

    const { Story } = defineMeta({
        component: Modal,
        title: 'Atoms/Layouts/Modal',
        tags: ['autodocs'],
        args: {
            caption: 'Caption',
            closeButton: true,
            closeOnClickOutside: false,
            closeOnEscape: false,
            width: 'big'
        },
        argTypes: {
            caption: {
                control: 'text',
                description: 'Caption text displayed in the modal header',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            closeButton: {
                control: 'boolean',
                description: 'Show a close button (X) in the header',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            closeOnClickOutside: {
                control: 'boolean',
                description: 'Allow closing the modal by clicking outside',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            closeOnEscape: {
                control: 'boolean',
                description: 'Allow closing the modal by pressing Escape',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            hideOnClose: {
                control: 'boolean',
                description: 'When enabled, the modal will not unmount on close, just hide',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            width: {
                control: 'select',
                options: ['small', 'big', 'full', 'fit'] satisfies ModalWidth[],
                description: 'Width preset for the modal',
                table: {
                    type: { summary: 'ModalWidth' },
                    defaultValue: { summary: 'big' }
                }
            },
            layer: { table: { disable: true }, ref: { control: false } },
            open: { table: { disable: true }, ref: { control: false } },
            children: { table: { disable: true }, ref: { control: false } }
        }
    });

    let open0 = $state(false);
    let open1 = $state(false);
    let open2 = $state(false);
    let open3 = $state(false);
</script>

<Story name="Default">
    {#snippet template(args)}
        <Button onclick={() => (open0 = true)}>Open Modal</Button>
        <Modal {...args} bind:open={open0}>
            <Typography>This is a basic modal with default settings.</Typography>
            <Typography>{lorem.medium}</Typography>
        </Modal>
    {/snippet}
</Story>

<Story name="Long Content">
    {#snippet template(args)}
        <Button onclick={() => (open0 = true)}>Open Modal</Button>
        <Modal {...args} bind:open={open0}>
            <Stack>
                <Typography italic>{lorem.long}</Typography>
                {#each Array(50) as _, index (index)}
                    <Typography>Line {index + 1}: {lorem.short}</Typography>
                {/each}
            </Stack>
        </Modal>
    {/snippet}
</Story>

<Story name="Nested Modals">
    {#snippet template(args)}
        <Typography>
            Nested modals work by opening a second modal while the first is still open. Each modal has its own z-index
            layer.
        </Typography>
        <Typography>Use separate isOpen state for each modal to control them independently.</Typography>
        <Button onclick={() => (open0 = true)}>Open Modal</Button>

        <Modal {...args} bind:open={open0} class="top-5">
            <Stack spacing={4}>
                <Typography class="h-32">This is the first modal</Typography>
                <Button variant="outline" onclick={() => (open0 = !open0)}>Toggle first</Button>
                <Button variant="outline" onclick={() => (open1 = !open1)}>Toggle second</Button>
            </Stack>
        </Modal>

        <Modal {...args} bind:open={open1}>
            <Stack spacing={4}>
                <Typography>This is the second modal.</Typography>
                <Button variant="outline" onclick={() => (open0 = !open0)}>Toggle first</Button>
                <Button variant="outline" onclick={() => (open1 = !open1)}>Toggle second</Button>
            </Stack>
        </Modal>
    {/snippet}
</Story>
