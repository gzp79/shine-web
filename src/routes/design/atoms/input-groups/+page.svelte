<script lang="ts">
    import { colorList, sizeList } from '$atoms/types';
    import Button from '$atoms/Button.svelte';
    import InputGroup from '$atoms/InputGroup.svelte';
    import Box from '$atoms/Box.svelte';
    import * as icons from '$atoms/icons/common';
    import { CheckBox, Select, settingsStore, Story } from '../../_components';

    let color = $state('primary');
    let size = $state('md');
    let wide = $state(false);

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
    <Select label="Size" options={sizeList} bind:value={size} />
    <CheckBox label="Wide" bind:value={wide} />
{/snippet}

<Story variant="center">
    <Box border compact class="p-1 {wide && 'w-full'}">
        <InputGroup {wide} {size} {color}>
            <Button outline>Profile</Button>
            <Button>Settings</Button>
            <Button>Config</Button>
            <Button outline>Messages</Button>
            <Button outline>Tools</Button>
            <Button>Account</Button>
        </InputGroup>
    </Box>

    <Box border compact class="p-1 {wide && 'w-full'}">
        <InputGroup {wide} vertical {size} {color}>
            <Button outline>Profile</Button>
            <Button>Settings</Button>
            <Button>Config</Button>
            <Button outline>Messages</Button>
            <Button outline>Tools</Button>
            <Button>Account</Button>
        </InputGroup>
    </Box>

    <Box border compact class="p-1 {wide && 'w-full'}">
        <InputGroup {wide} {size} {color}>
            <Button>Merge</Button>
            <Button wide={false} startIcon={icons.DropDown} />
        </InputGroup>
    </Box>

    <Box border compact class="p-1 {wide && 'w-full'}">
        <InputGroup {wide} {size} {color}>
            <Button outline>Merge</Button>
            <Button outline wide={false} startIcon={icons.DropDown} />
        </InputGroup>
    </Box>
</Story>
