<script lang="ts">
    import { type Component } from 'svelte';
    import Box from '@atoms/Box.svelte';
    import Button from '@atoms/Button.svelte';
    import Modal from '@atoms/Modal.svelte';
    import Stack from '@atoms/Stack.svelte';
    import * as icons from '@atoms/icons/social';
    import { Story } from '../../_components';

    let showModal1a = $state(false);
    let showModal1b = $state(false);
    let showModal1c = $state(false);
    let showModal1d = $state(false);
    let showModal1e = $state(false);
    let showModal1f = $state(false);

    let showModal2a = $state(false);
    let showModal2b = $state(false);
</script>

<Story variant="center">
    <Box border>
        <Stack align="center">
            <Button onclick={() => (showModal1a = true)}>Caption</Button>
            <Button onclick={() => (showModal1b = true)}>X</Button>
            <Button onclick={() => (showModal1c = true)}>Caption and X</Button>
            <Button onclick={() => (showModal1d = true)}>No header</Button>
            <Button onclick={() => (showModal1e = true)}>Big content</Button>
            <Button onclick={() => (showModal1f = true)}>ButtonList</Button>
            <Button onclick={() => (showModal2a = true)}>Manual</Button>
        </Stack>

        <Modal closeOnClickOutside closeOnEscape caption="Model" bind:isOpen={showModal1a}>
            This is the content<br />
            Close with Escape or click outside
        </Modal>
        <Modal closeOnClickOutside closeOnEscape closeButton bind:isOpen={showModal1b}>
            This is the content<br />
            Close with X, Escape or click outside
        </Modal>
        <Modal closeButton caption="Model" bind:isOpen={showModal1c}>
            This is the content<br />
            It can be closed only with the X button
        </Modal>
        <Modal closeOnClickOutside closeOnEscape bind:isOpen={showModal1d}>
            This is the content<br />
            Close with Escape or click outside
        </Modal>
        <Modal closeButton closeOnClickOutside closeOnEscape caption="Long" bind:isOpen={showModal1e}>
            {#each Array(100) as _, id (id)}
                <div class="p-4">Content {id}</div>
            {/each}
        </Modal>
        <Modal
            closeButton
            closeOnClickOutside
            closeOnEscape
            caption="Link my account to the selection"
            bind:isOpen={showModal1f}
            class="max-w-min"
        >
            {#each [['google', icons.Google], ['discord', icons.Discord], ['a long provide name', icons.Gitlab]] as [provider, icon] (provider)}
                <Button variant="outline" wide startIcon={icon as Component}>
                    {provider}
                </Button>
            {/each}
        </Modal>

        <Modal bind:isOpen={showModal2a} caption="Model" class="flex-col items-center">
            <p>Some content</p>
            <Button onclick={() => (showModal2a = false)}>Close</Button>
            <Button onclick={() => (showModal2b = true)}>Open Top</Button>
        </Modal>
        <Modal bind:isOpen={showModal2b}>
            <Button onclick={() => (showModal2b = false)}>Close</Button>
            <Button
                onclick={() => {
                    showModal2a = false;
                    showModal2b = false;
                }}
            >
                Close All
            </Button>
        </Modal>
    </Box>
</Story>
