<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import Popper from '$atoms/Popper.svelte';
    import { FlagGB, FlagHU } from '$atoms/icons/flags';
    import InputGroup from '$atoms/InputGroup.svelte';
    import { Story } from '../../_components';

    let open = $state(false);
</script>

<Story variant="center">
    <p class="min-h-[1000px]"></p>

    <Box border>
        <Button id="myButton1">Click</Button>
        <Button id="myButton1">Click</Button>
        <Button id="myButton1">Click</Button>
        <Popper trigger="#myButton1" clickable>
            <Box border class="m-0">This is a popper</Box>
        </Popper>
    </Box>

    <Box border>
        <Button id="myButton2">Hover</Button>
        <Button id="myButton2">Hover</Button>
        <Button id="myButton2">Hover</Button>
        <Popper trigger="#myButton2" hoverable>
            <Box border class="m-0">This is a popper</Box>
        </Popper>
    </Box>

    <Box border>
        <Button id="myButton3">Click | Hover</Button>
        <Button id="myButton3">Click | Hover</Button>
        <Button id="myButton3">Click | Hover</Button>
        <Popper trigger="#myButton3" hoverable clickable>
            <Box border class="m-0">This is a popper</Box>
        </Popper>
    </Box>

    <Box border>
        <InputGroup id="dropDown">
            <Button onclick={() => console.log('act')}>Logout</Button>
            <Button id="dropDownTrigger" startIcon={FlagHU} />
        </InputGroup>
        <Popper
            clickable
            alignWidth
            display="flex flex-col items-center justify-center rounded-lg border bg-base-100"
            trigger="#dropDownTrigger"
            reference="#dropDown"
        >
            <InputGroup vertical>
                <Button wide endIcon={FlagHU} onclick={() => console.log('select 1')}>Switch account</Button>
                <Button wide endIcon={FlagGB} onclick={() => console.log('select 2')}>Logout</Button>
                <Button wide endIcon={FlagHU} onclick={() => console.log('select 3')}>Logout from all session</Button>
            </InputGroup>
        </Popper>
    </Box>

    <Box border>
        <Button onclick={() => (open = true)}>Open</Button>
        <Popper bind:open>
            <Box border class="m-0">
                Click close to close
                <Button onclick={() => (open = false)}>Close</Button>
            </Box>
        </Popper>
    </Box>

    <p class="min-h-[1000px]"></p>
</Story>
