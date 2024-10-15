<script lang="ts">
    import { colorList, sizeList } from '$components/types';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import { Firefox } from '$atoms/icons/clients';
    import { Settings, Warning } from '$atoms/icons/common';
    import { logDesigner } from '$src/lib/loggers';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';
    import { Spinner } from '$src/components/atoms/icons/animated';
    import { Twitter } from '$src/components/atoms/icons/social';

    let color = $state('primary');
    let action = $state('href');
    let href = '#top';

    function onclick() {
        logDesigner('clicked');
    }

    let btnAction = $derived(action === 'click' ? { onclick } : { href });

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
    <Select label="Action" options={['click', 'href']} bind:value={action} />
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
                <Button {size} {color} startIcon={Settings} {onclick} />
                <Button outline {size} {color} startIcon={Settings} {onclick} />
            </div>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <Button {size} {color} startIcon={Twitter} {onclick}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <Button {size} {color} endIcon={Twitter} {onclick}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max flex-col">
        {#each sizeList as size}
            <Button {size} {color} startIcon={Twitter} endIcon={Twitter} {onclick}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="flex h-max w-96 flex-col">
        {#each sizeList as size}
            <Button wide {size} {color} startIcon={Twitter} endIcon={Twitter} {onclick}>
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
            <Button {color} {onclick}>Button</Button>
            <Button {color} disabled {onclick}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} outline {onclick}>Button</Button>
            <Button {color} outline disabled {onclick}>Button</Button>
        </div>
    </Box>

    <Box border class="flex h-max flex-wrap">
        <div class="flex flex-col justify-center">
            <Button {color} {onclick} startIcon={Firefox}>Button</Button>
            <Button {color} disabled {onclick} startIcon={Firefox}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} outline {onclick} startIcon={Firefox}>Button</Button>
            <Button {color} outline disabled {onclick} startIcon={Firefox}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} {onclick} startIcon={Warning}>Button</Button>
            <Button {color} disabled {onclick} startIcon={Warning}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} outline {onclick} startIcon={Warning}>Button</Button>
            <Button {color} outline disabled {onclick} startIcon={Warning}>Button</Button>
        </div>
    </Box>
</Story>
