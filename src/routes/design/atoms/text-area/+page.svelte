<script lang="ts">
    import { actionColorList, sizeList, type ActionColor, type Size } from '$atoms/types';
    import TextArea from '$atoms/TextArea.svelte';
    import { CheckBox, Select, settingsStore, Story } from '../../_components';
    import { logDesigner } from '$lib/loggers';

    let color = $state<ActionColor>('secondary');
    let size = $state<Size>('md');
    let disabled = $state(false);

    const onEnter = (text: string) => {
        logDesigner(`Text value: [${text}]`);
    };

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={actionColorList} bind:value={color} />
    <Select label="Size" options={sizeList} bind:value={size} />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

<Story variant="dense">
    <TextArea {size} {color} placeholder="Default..." {onEnter} />
    <TextArea rows={[1, 10]} {size} {color} placeholder="Auto grow 1..10 rows" {onEnter} />
    <TextArea rows={4} {size} {color} placeholder="4 rows..." {onEnter} />
    <TextArea rows="single" {size} {color} placeholder="Single line..." {onEnter} />
</Story>
