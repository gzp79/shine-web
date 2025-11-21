<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { lorem } from '@storybook-ext/lorem';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Modal from '@atoms/layouts/Modal.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { layoutWidthList } from './types';

    const { Story } = defineMeta({
        component: Modal,
        title: 'Atoms/Layouts/Modal',
        args: {
            caption: 'Caption',
            closeButton: true,
            closeOnClickOutside: true,
            closeOnEscape: true,
            width: 'fit'
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
                options: layoutWidthList,
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

<Story name="Multiple Modals">
    {#snippet template(args)}
        {@const { caption, closeOnEscape, closeOnClickOutside, ...otherArgs } = args}
        <Button onclick={() => (open0 = true)}>Open First</Button>
        <Button onclick={() => (open1 = true)}>Open Second</Button>
        <Button onclick={() => (open2 = true)}>Open Third</Button>

        <Modal caption="First Modal" closeOnEscape={true} closeOnClickOutside={true} {...otherArgs} bind:open={open0}>
            <Stack spacing={4}>
                <Typography class="h-32">This is the first modal</Typography>
                <Typography>Closes on escape.</Typography>
                <Typography>Closes on click outside.</Typography>
                <Button variant="outline" onclick={() => (open0 = !open0)}>Toggle First</Button>
                <Button variant="outline" onclick={() => (open1 = !open1)}>Toggle Second</Button>
                <Button variant="outline" onclick={() => (open2 = !open2)}>Toggle Third</Button>
            </Stack>
        </Modal>

        <Modal caption="Second Modal" closeOnEscape={true} closeOnClickOutside={false} {...otherArgs} bind:open={open1}>
            <Stack spacing={4}>
                <Typography>This is the second modal.</Typography>
                <Typography>Closes on escape</Typography>
                <Typography>Does not close on click outside</Typography>
                <Button variant="outline" onclick={() => (open0 = !open0)}>Toggle First</Button>
                <Button variant="outline" onclick={() => (open1 = !open1)}>Toggle Second</Button>
                <Button variant="outline" onclick={() => (open2 = !open2)}>Toggle Third</Button>
            </Stack>
        </Modal>

        <Modal caption="Third Modal" closeOnEscape={false} closeOnClickOutside={false} {...otherArgs} bind:open={open2}>
            <Stack spacing={4}>
                <Typography>This is the third modal.</Typography>
                <Typography>Does not close on escape</Typography>
                <Typography>Does not close on click outside</Typography>
                <Button variant="outline" onclick={() => (open0 = !open0)}>Toggle First</Button>
                <Button variant="outline" onclick={() => (open1 = !open1)}>Toggle Second</Button>
                <Button variant="outline" onclick={() => (open2 = !open2)}>Toggle Third</Button>
            </Stack>
        </Modal>
    {/snippet}
</Story>
