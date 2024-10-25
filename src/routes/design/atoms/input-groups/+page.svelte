<script lang="ts">
    import { colorList } from '$atoms/types';
    import Button from '$atoms/Button.svelte';
    import InputGroup from '$atoms/InputGroup.svelte';
    import * as flags from '$atoms/icons/flags';
    import { Select, settingsStore, Story } from '../../_components';

    let color = $state('primary');
    let size = $state('md');

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
{/snippet}

<Story variant="center">
    <InputGroup {size} {color}>
        <Button outline>Profile</Button>
        <Button>Settings</Button>
        <Button>Config</Button>
        <Button outline>Messages</Button>
        <Button outline>Tools</Button>
        <Button>Account</Button>
    </InputGroup>

    <InputGroup vertical {size} {color}>
        <Button outline>Profile</Button>
        <Button>Settings</Button>
        <Button>Config</Button>
        <Button outline>Messages</Button>
        <Button outline>Tools</Button>
        <Button>Account</Button>
    </InputGroup>

    <InputGroup vertical {size} {color}>
        <Button outline>Profile</Button>
        <Button>Settings</Button>
        <Button outline>Messages</Button>
        <Button>Account</Button>
    </InputGroup>

    <InputGroup {size} {color}>
        <Button>Merge</Button>
        <Button startIcon={flags.FlagGB} />
    </InputGroup>

    <InputGroup {size} {color}>
        <Button outline>Merge</Button>
        <Button outline startIcon={flags.FlagGB} />
    </InputGroup>
</Story>
