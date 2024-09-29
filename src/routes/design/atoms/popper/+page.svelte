<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import Popper from '$atoms/Popper.svelte';
    import { FlagGB, FlagHU } from '$src/components/atoms/icons/flags';
    import { logDesigner } from '$src/lib/loggers';
    import Story from '../../_components/Story.svelte';

    let open = $state(false);
</script>

<Story center>
    <p class="min-h-[1000px]"></p>

    <Box border>
        <Button id="mybutton1" label="Click" />
        <Button id="mybutton1" label="Click" />
        <Button id="mybutton1" label="Click" />
        <Popper trigger="#mybutton1" clickable>This is a popper</Popper>
    </Box>

    <Box border>
        <Button id="mybutton2" label="Hover" />
        <Button id="mybutton2" label="Hover" />
        <Button id="mybutton2" label="Hover" />
        <Popper trigger="#mybutton2" hoverable>This is a popper</Popper>
    </Box>

    <Box border>
        <Button id="mybutton3" label="Click&Hover" />
        <Button id="mybutton3" label="Click&Hover" />
        <Button id="mybutton3" label="Click&Hover" />
        <Popper trigger="#mybutton3" hoverable clickable>This is a popper</Popper>
    </Box>

    <Box border>
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
    </Box>

    <Box border>
        <Button label="Open" onclick={() => (open = true)} />
        <Popper display="flex items-center rounded-lg border bg-base-100 p-1" bind:open>
            <Button label="Close" onclick={() => (open = false)} />
        </Popper>
    </Box>

    <p class="min-h-[1000px]"></p>
</Story>
