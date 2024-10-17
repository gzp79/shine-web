<script lang="ts">
    import { colorList } from '$components/types';
    import Button from '$atoms/Button.svelte';
    import InputGroup from '$atoms/InputGroup.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';

    let color = $state('primary');
    let size = $state('md');

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
{/snippet}

<Story variant="dense">
    <InputGroup {size} {color}>
        <Button>Profile</Button>
        <Button>Settings</Button>
        <Button>Messages</Button>
    </InputGroup>
    <InputGroup vertical {size} {color}>
        <Button>Profile</Button>
        <Button>Settings</Button>
        <Button>Messages</Button>
        <Button>Account</Button>
    </InputGroup>

    <InputGroup {size} {color}>
        <Button outline>Profile</Button>
        <Button>Settings</Button>
        <Button outline>Messages</Button>
        <Button>Account</Button>
    </InputGroup>
    <InputGroup vertical {size} {color}>
        <Button outline>Profile</Button>
        <Button>Settings</Button>
        <Button outline>Messages</Button>
        <Button>Account</Button>
    </InputGroup>
</Story>
