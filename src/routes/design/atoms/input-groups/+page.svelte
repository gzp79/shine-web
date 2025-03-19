<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import InputGroup from '$atoms/InputGroup.svelte';
    import TextArea from '$atoms/TextArea.svelte';
    import * as icons from '$atoms/icons/common';
    import { type InputVariant, actionColorList, sizeList } from '$atoms/types';
    import { CheckBox, Select, Story, settingsStore } from '../../_components';

    let color = $state('primary');
    let size = $state('md');
    let variant = $state<InputVariant>('filled');
    let wide = $state(false);
    let showPattern = $state(false);

    let pattern = $derived(showPattern ? 'bg-pattern' : '');

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={[...actionColorList.map((x) => [x, x]), ['none', undefined]]} bind:value={color} />
    <Select label="Size" options={sizeList} bind:value={size} />
    <Select label="Variant" options={['filled', 'outline', 'ghost']} bind:value={variant} />
    <CheckBox label="Wide" bind:value={wide} />
    <CheckBox label="Pattern" bind:value={showPattern} />
{/snippet}

<Story variant="center">
    <Box border compact class="p-4 {wide && 'w-full'} {pattern}">
        <InputGroup {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <Button>Settings</Button>
            <Button>Config</Button>
        </InputGroup>
    </Box>

    <Box border compact class="p-4 {wide && 'w-full'} {pattern}">
        <InputGroup vertical {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <Button>Settings</Button>
            <Button>Config</Button>
        </InputGroup>
    </Box>

    <Box border compact class="p-4 {wide && 'w-full'} {pattern}">
        <InputGroup {variant} {wide} {size} {color}>
            <Button>Merge</Button>
            <Button wide={false} startIcon={icons.DropDown} />
        </InputGroup>
    </Box>

    <Box border compact class="p-4 {wide && 'w-full'} {pattern}">
        <InputGroup {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <TextArea placeholder="Enter text..." rows="single" />
            <TextArea placeholder={'Enter\n multiline\n text...'} rows={3} />
            <Button>Config</Button>
        </InputGroup>
    </Box>

    <Box border compact level={1} class="p-4 {wide && 'w-full'} {pattern}">
        <InputGroup {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <TextArea placeholder="Enter text..." rows="single" />
            <TextArea placeholder={'Enter\n multiline\n text...'} rows={3} />
            <Button>Config</Button>
        </InputGroup>
    </Box>

    <Box border compact level={2} class="p-4 {wide && 'w-full'} {pattern}">
        <InputGroup {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <TextArea placeholder="Enter text..." rows="single" />
            <TextArea placeholder={'Enter\n multiline\n text...'} rows={3} />
            <Button>Config</Button>
        </InputGroup>
    </Box>

    <Box border compact class="p-4 {wide && 'w-full'} {pattern}">
        <InputGroup vertical {variant} {wide} {size} {color}>
            <Button>Profile</Button>
            <TextArea placeholder="Enter text..." rows="single" />
            <TextArea placeholder={'Enter\n multiline\n text...'} rows={3} />
            <Button>Config</Button>
        </InputGroup>
    </Box>
</Story>

<style>
    :global(.bg-pattern) {
        --s: 30px; /* control the size*/
        --c1: var(--color-surface);
        --c2: var(--color-container);
        --c3: var(--color-sub-container);
        --_g: 0 120deg, #0000 0;

        background: conic-gradient(at calc(250% / 3) calc(100% / 3), var(--c3) var(--_g)),
            conic-gradient(from -120deg at calc(50% / 3) calc(100% / 3), var(--c2) var(--_g)),
            conic-gradient(from 120deg at calc(100% / 3) calc(250% / 3), var(--c1) var(--_g)),
            conic-gradient(from 120deg at calc(200% / 3) calc(250% / 3), var(--c1) var(--_g)),
            conic-gradient(from -180deg at calc(100% / 3) 50%, var(--c2) 60deg, var(--c1) var(--_g)),
            conic-gradient(from 60deg at calc(200% / 3) 50%, var(--c1) 60deg, var(--c3) var(--_g)),
            conic-gradient(from -60deg at 50% calc(100% / 3), var(--c1) 120deg, var(--c2) 0 240deg, var(--c3) 0);
        background-size: calc(var(--s) * sqrt(3)) var(--s);
    }
</style>
