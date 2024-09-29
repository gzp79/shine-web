<script lang="ts">
    import Card from '$atoms/Card.svelte';
    import Button from '$atoms/Button.svelte';
    import Popper from '$atoms/Popper.svelte';
    import { FlagGB, FlagHU } from '$src/components/atoms/icons/flags';
    import { logDesigner } from '$src/lib/loggers';

    let open = $state(false);
</script>

<p class="min-h-[1000px]"></p>

<Card caption="Clickable" variant="fieldset">
    <Button id="mybutton1" label="Click" />
    <Button id="mybutton1" label="Click" />
    <Button id="mybutton1" label="Click" />
    <Popper trigger="#mybutton1" clickable>This is a popper</Popper>
</Card>

<Card caption="Hoverable" variant="fieldset">
    <Button id="mybutton2" label="Hover" />
    <Button id="mybutton2" label="Hover" />
    <Button id="mybutton2" label="Hover" />
    <Popper trigger="#mybutton2" hoverable>This is a popper</Popper>
</Card>

<Card caption="Clickable and Hoverable" variant="fieldset">
    <Button id="mybutton3" label="Click&Hover" />
    <Button id="mybutton3" label="Click&Hover" />
    <Button id="mybutton3" label="Click&Hover" />
    <Popper trigger="#mybutton3" hoverable clickable>This is a popper</Popper>
</Card>

<Card caption="LangSelect" variant="fieldset">
    <button class="btn select m-1 h-fit w-fit">
        <FlagHU size="xs" />
    </button>
    <Popper clickable alignWidth display="flex flex-col items-center justify-center rounded-lg border bg-base-100">
        <button class="btn mt-1 h-fit w-full rounded-none" onclick={() => logDesigner('hu')}
            ><FlagHU size="xs" /></button
        >
        <button class="btn mb-1 h-fit w-full rounded-none" onclick={() => logDesigner('gb')}
            ><FlagGB size="xs" /></button
        >
    </Popper>
</Card>

<Card caption="Open from code" variant="fieldset">
    <Button label="Open" onclick={() => (open = true)} />
    <Popper display="flex items-center rounded-lg border bg-base-100 p-1" bind:open>
        <Button label="Close" onclick={() => (open = false)} />
    </Popper>
</Card>

<p class="min-h-[1000px]"></p>
