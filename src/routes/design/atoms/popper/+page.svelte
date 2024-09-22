<script lang="ts">
    import { colorList, defaultColor, defaultSize, sizeList } from '$components/types';
    import CfgSelect from '$components/settings/Select.svelte';
    import { setSettings } from '../../+layout.svelte';
    import Card from '$atoms/Card.svelte';
    import Button from '$atoms/Button.svelte';
    import Popper, { type Location } from '$atoms/Popper.svelte';
    import { FlagGB, FlagHU } from '$src/components/atoms/icons/flags';

    let size = $state(defaultSize);
    let color = $state(defaultColor);
    let location = $state('auto' as Location);

    let open = $state(false);

    setSettings(settings);
</script>

{#snippet settings()}
    <CfgSelect label="Size" options={sizeList} bind:value={size} />
    <CfgSelect label="Color" options={colorList} bind:value={color} />
    <CfgSelect label="Location" options={['below', 'above', 'auto']} bind:value={location} />
{/snippet}

<p class="min-h-[500px]">a</p>

<Card caption="Clickable" variant="fieldset">
    <Button id="mybutton1" label="Click" />
    <Button id="mybutton1" label="Click" />
    <Button id="mybutton1" label="Click" />
    <Popper trigger="#mybutton1" clickable {location}>This is a popper</Popper>
</Card>

<Card caption="Hoverable" variant="fieldset">
    <Button id="mybutton2" label="Hover" />
    <Button id="mybutton2" label="Hover" />
    <Button id="mybutton2" label="Hover" />
    <Popper trigger="#mybutton2" hoverable {location}>This is a popper</Popper>
</Card>

<Card caption="Clickable and Hoverable" variant="fieldset">
    <Button id="mybutton3" label="Click&Hover" />
    <Button id="mybutton3" label="Click&Hover" />
    <Button id="mybutton3" label="Click&Hover" />
    <Popper trigger="#mybutton3" hoverable clickable {location}>This is a popper</Popper>
</Card>

<Card caption="Focusable" variant="fieldset">
    <Button id="mybutton4" label="Focus" />
    <Button id="mybutton4" label="Focus" />
    <Button id="mybutton4" label="Focus" />
    <Popper trigger="#mybutton4" focusable {location}>This is a popper</Popper>
</Card>

<Card caption="LangSelect" variant="fieldset">
    <button class="btn select m-1 h-fit w-fit">
        <FlagHU size="xs" />
    </button>
    <Popper clickable {location} class="flex flex-col items-center justify-center rounded-lg border bg-base-100">
        <button class="btn h-fit w-fit"><FlagHU size="xs" /></button>
        <button class="btn h-fit w-fit"><FlagGB size="xs" /></button>
    </Popper>
</Card>

<Card caption="Open from code" variant="fieldset">
    <Button label="Open" onclick={() => (open = true)} />
    <Popper {location} class="flex items-center rounded-lg border bg-base-100 p-1" bind:open>
        <Button label="Close" onclick={() => (open = false)} />
    </Popper>
</Card>

<p class="min-h-[500px]">a</p>
