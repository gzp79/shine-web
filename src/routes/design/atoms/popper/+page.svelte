<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import Popper from '$atoms/Popper.svelte';
    import { FlagGB, FlagHU } from '$src/components/atoms/icons/flags';
    import { logDesigner } from '$src/lib/loggers';
    import Story from '../../_components/Story.svelte';

    let open = $state(false);
</script>

<Story variant="center">
    <p class="min-h-[1000px]"></p>

    <Box border>
        <Button id="mybutton1">Click</Button>
        <Button id="mybutton1">Click</Button>
        <Button id="mybutton1">Click</Button>
        <Popper trigger="#mybutton1" clickable>This is a popper</Popper>
    </Box>

    <Box border>
        <Button id="mybutton2">Hover</Button>
        <Button id="mybutton2">Hover</Button>
        <Button id="mybutton2">Hover</Button>
        <Popper trigger="#mybutton2" hoverable>This is a popper</Popper>
    </Box>

    <Box border>
        <Button id="mybutton3">Click | Hover</Button>
        <Button id="mybutton3">Click | Hover</Button>
        <Button id="mybutton3">Click | Hover</Button>
        <Popper trigger="#mybutton3" hoverable clickable>This is a popper</Popper>
    </Box>

    <Box border>
        <Button startIcon={FlagHU} />
        <Popper clickable alignWidth display="flex flex-col items-center justify-center rounded-lg border bg-base-100">
            <Button startIcon={FlagHU} onclick={() => logDesigner('hu')} />
            <Button startIcon={FlagGB} onclick={() => logDesigner('hu')} />
        </Popper>
    </Box>

    <Box border>
        <Button onclick={() => (open = true)}>Open</Button>
        <Popper display="flex items-center rounded-lg border bg-base-100 p-1" bind:open>
            <Button onclick={() => (open = false)}>Close</Button>
        </Popper>
    </Box>

    <p class="min-h-[1000px]"></p>
</Story>
