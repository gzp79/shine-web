<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import Popper from '$atoms/Popper.svelte';
    import InputGroup from '$atoms/InputGroup.svelte';
    import * as flags from '$atoms/icons/flags';
    import * as icons from '$atoms/icons/common';
    import { Story } from '../../_components';

    let open = $state(false);
</script>

<Story variant="center">
    <p class="min-h-[1000px]"></p>

    <Box border id="reference1">
        <Button id="trigger1">Click</Button>
        <Button id="trigger1">Click</Button>
        <Button id="trigger1">Click</Button>
        <Popper trigger="#trigger1" reference="#reference1" behavior="click">
            <Box border class="m-0">This is a popper</Box>
        </Popper>
    </Box>

    <Box border id="reference2">
        <Button id="trigger2">Hover</Button>
        <Button id="trigger2">Hover</Button>
        <Button id="trigger2">Hover</Button>
        <Popper trigger="#trigger2" reference="#reference2" behavior="hover">
            <Box border class="m-0">This is a popper</Box>
        </Popper>
    </Box>

    <Box border id="reference3">
        <Button id="trigger3">Toggle</Button>
        <Button id="trigger3">Toggle</Button>
        <Button id="trigger3">Toggle</Button>
        <Popper trigger="#trigger3" reference="#reference3" behavior="toggle">
            <Box border class="m-0">This is a popper</Box>
        </Popper>
    </Box>

    <Box border>
        <Button onclick={() => (open = true)}>Manual</Button>
        <Popper behavior="manual" bind:open>
            <Box border class="m-0">
                Click close to close
                <Button onclick={() => (open = false)}>Close</Button>
            </Box>
        </Popper>
    </Box>

    <Box border>
        <InputGroup id="dropDown">
            <Button onclick={() => console.log('act')}>Logout</Button>
            <Button id="dropDownTrigger" startIcon={icons.DropDown} />
        </InputGroup>
        <Popper
            behavior="click"
            alignWidth
            display="flex flex-col items-center justify-center rounded-lg border bg-base-100"
            trigger="#dropDownTrigger"
            reference="#dropDown"
        >
            <InputGroup vertical>
                <Button wide endIcon={flags.FlagHU} onclick={() => console.log('select 1')}>Switch account</Button>
                <Button wide endIcon={flags.FlagGB} onclick={() => console.log('select 2')}>Logout</Button>
                <Button wide endIcon={flags.FlagHU} onclick={() => console.log('select 3')}>
                    Logout from all session
                </Button>
            </InputGroup>
        </Popper>
    </Box>

    <p class="min-h-[1000px]"></p>
</Story>
