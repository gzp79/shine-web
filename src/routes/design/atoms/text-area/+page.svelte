<script lang="ts">
    import TextArea from '$atoms/TextArea.svelte';
    import { type ActionColor, type Size, actionColorList, sizeList } from '$atoms/types';
    import Box from '$components/atoms/Box.svelte';
    import { logDesigner } from '$lib/loggers';
    import { CheckBox, Select, Separator, Story, settingsStore } from '../../_components';

    let color = $state<ActionColor>('primary');
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

<Story variant="center">
    <Box border>
        <TextArea {size} {color} placeholder="Default..." {onEnter} />
        <TextArea rows={[1, 10]} {size} {color} placeholder="Auto grow 1..10 rows" {onEnter} />
        <TextArea rows={4} {size} {color} placeholder="4 rows..." {onEnter} />
        <TextArea rows="single" {size} {color} placeholder="Single line..." {onEnter} />
    </Box>

    <Separator />

    <div class="border p-2">
        <p>TextArea without color and without a parent box</p>
        <TextArea placeholder="Default" />
        <TextArea variant="outline" placeholder="Outline" />
        <TextArea variant="ghost" placeholder="Ghost" />
    </div>
    <Box border>
        <p>TextArea without color takes the color of the parent box</p>
        <TextArea placeholder="Default" />
        <TextArea variant="outline" placeholder="Outline" />
        <TextArea variant="ghost" placeholder="Ghost" />
        <Box border>
            <TextArea placeholder="Default" />
            <TextArea variant="outline" placeholder="Outline" />
            <TextArea variant="ghost" placeholder="Ghost" />
            <Box border>
                <TextArea placeholder="Default" />
                <TextArea variant="outline" placeholder="Outline" />
                <TextArea variant="ghost" placeholder="Ghost" />
            </Box>
        </Box>
        <Box border shadow variant={{ color }}>
            <TextArea placeholder="Default" />
            <TextArea variant="outline" placeholder="Outline" />
            <TextArea variant="ghost" placeholder="Ghost" />
        </Box>
    </Box>
</Story>
