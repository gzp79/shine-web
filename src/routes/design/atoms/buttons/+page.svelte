<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import { Spinner } from '$atoms/icons/animated';
    import { Firefox } from '$atoms/icons/clients';
    import { Settings, Warning } from '$atoms/icons/common';
    import { Twitter } from '$atoms/icons/social';
    import { type ActionColor, actionColorList, sizeList } from '$atoms/types';
    import { logDesigner } from '$lib/loggers';
    import { Select, Story, settingsStore } from '../../_components';
    import Separator from '../../_components/_Separator.svelte';

    let color = $state<ActionColor>('primary');
    let action = $state('click');
    let href = '#top';

    function onclick() {
        logDesigner('clicked');
    }

    let btnAction = $derived.by(() => {
        switch (action) {
            case 'click':
                return { onclick };
            case 'href':
                return { href };
            default:
                return {};
        }
    });

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={actionColorList} bind:value={color} />
    <Select label="Action" options={['click', 'href', 'none']} bind:value={action} />
{/snippet}

<Story variant="dense">
    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <Button {size} {color} {...btnAction}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <div>
                <Button {size} {color} startIcon={Settings} {...btnAction} />
                <Button variant="outline" {size} {color} startIcon={Settings} {...btnAction} />
                <Button variant="ghost" {size} {color} startIcon={Settings} {...btnAction} />
            </div>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <Button {size} {color} startIcon={Twitter} {...btnAction}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <Button {size} {color} endIcon={Twitter} {...btnAction}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <Button {size} {color} startIcon={Twitter} endIcon={Twitter} {...btnAction}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max w-96 flex-col">
        {#each sizeList as size}
            <Button wide {size} {color} startIcon={Twitter} endIcon={Twitter} {...btnAction}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        <Button {color} {...btnAction} startIcon={Settings} />
        <Button {color} {...btnAction} startIcon={Settings}>Button</Button>
        <Button {color} {...btnAction} endIcon={Settings}>Button</Button>
        <Button {color} {...btnAction} startIcon={Settings} endIcon={Spinner}>Button</Button>
    </Box>

    <Box border class="flex h-max flex-row">
        <div class="flex flex-col justify-center">
            <Button {color} {...btnAction}>Button</Button>
            <Button {color} disabled {...btnAction}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} variant="outline" {...btnAction}>Button</Button>
            <Button {color} variant="outline" disabled {...btnAction}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} variant="ghost" {...btnAction}>Button</Button>
            <Button {color} variant="ghost" disabled {...btnAction}>Button</Button>
        </div>
    </Box>

    <Box border class="flex h-max flex-wrap">
        <div class="flex flex-col justify-center">
            <Button {color} {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} variant="outline" {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} variant="outline" disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} variant="ghost" {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} variant="ghost" disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </div>
    </Box>
    <Box border class="flex h-max flex-wrap">
        <div class="flex flex-col justify-center">
            <Button {color} {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} disabled {...btnAction} startIcon={Warning}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} variant="outline" {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} variant="outline" disabled {...btnAction} startIcon={Warning}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} variant="ghost" {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} variant="ghost" disabled {...btnAction} startIcon={Warning}>Button</Button>
        </div>
    </Box>

    <Separator />

    <div class="border p-2">
        <p>Button without color and without a parent box</p>
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
    </div>
    <Box border>
        <p>Button without color takes the color of the parent box</p>
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Box border>
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Box border>
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
            </Box>
        </Box>
        <Box border shadow variant={{ color }}>
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
        </Box>
    </Box>
</Story>
