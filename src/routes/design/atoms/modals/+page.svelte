<script lang="ts">
    import Button from '$atoms/Button.svelte';
    import { Story } from '../../_components';
    import Modal from '$components/atoms/Modal.svelte';

    let showModal1 = $state(false);
    let showModal2 = $state(false);
    let showModal3 = $state(false);
    let showModal3b = $state(false);
    let showModal4 = $state(false);
</script>

<Story variant="center">
    <Button onclick={() => (showModal1 = !showModal1)}>Modal1 - default</Button>
    <Button onclick={() => (showModal2 = !showModal2)}>Modal2 - closeOnClickOutside</Button>
    <Button onclick={() => (showModal3 = !showModal3)}>Modal3 - manual, nest</Button>
    <Button onclick={() => (showModal4 = !showModal4)}>Modal5 - big</Button>

    <Modal closeButton bind:isOpen={showModal1}>Model1</Modal>
    <Modal closeOnClickOutside closeOnEscape bind:isOpen={showModal2}>Model2</Modal>
    <Modal bind:isOpen={showModal3}>
        Model3
        <div>content</div>
        <div>content</div>
        <Button onclick={() => (showModal3 = false)}>Close</Button>
        <Button onclick={() => (showModal3b = !showModal3b)}>Modal3b</Button>
    </Modal>
    <Modal bind:isOpen={showModal3b}>
        Model3b
        <Button onclick={() => (showModal3b = false)}>Close 3b</Button>
        <Button
            onclick={() => {
                showModal3 = false;
                showModal3b = false;
            }}>Close 3,3b</Button
        >
    </Modal>
    <Modal closeButton closeOnClickOutside closeOnEscape bind:isOpen={showModal4}>
        Model5
        {#each Array(100) as _}
            <div class="p-4">Content</div>
        {/each}
    </Modal>
</Story>
