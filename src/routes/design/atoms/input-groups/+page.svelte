<script lang="ts">
    import { actionColorList, sizeList } from '$atoms/types';
    import Button, { type Variant } from '$atoms/Button.svelte';
    import InputGroup from '$atoms/InputGroup.svelte';
    import Box from '$atoms/Box.svelte';
    import * as icons from '$atoms/icons/common';
    import { CheckBox, Select, settingsStore, Story } from '../../_components';

    let color = $state('secondary');
    let size = $state('md');
    let variant = $state<Variant>('filled');
    let wide = $state(false);

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={actionColorList} bind:value={color} />
    <Select label="Size" options={sizeList} bind:value={size} />
    <Select label="Variant" options={['filled', 'outline', 'ghost']} bind:value={variant} />
    <CheckBox label="Wide" bind:value={wide} />
{/snippet}

<Story variant="center">
    <Box border compact class="p-1 {wide && 'w-full'}">
        <InputGroup {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <Button>Settings</Button>
            <Button>Config</Button>
        </InputGroup>
    </Box>

    <Box border compact class="p-1 {wide && 'w-full'}">
        <InputGroup vertical {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <Button>Settings</Button>
            <Button>Config</Button>
        </InputGroup>
    </Box>

    <Box border compact class="p-1 {wide && 'w-full'}">
        <InputGroup {variant} {wide} {size} {color}>
            <Button>Merge</Button>
            <Button wide={false} startIcon={icons.DropDown} />
        </InputGroup>
    </Box>
</Story>
