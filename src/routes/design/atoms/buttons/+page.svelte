<script lang="ts">
    import { logDesigner } from '$src/lib/loggers';
    import { colorList, sizeList } from '$atoms/types';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import { Firefox } from '$atoms/icons/clients';
    import { Settings, Warning } from '$atoms/icons/common';
    import { Spinner } from '$atoms/icons/animated';
    import { Twitter } from '$atoms/icons/social';
    import { Select, settingsStore, Story } from '../../_components';

    let color = $state('primary');
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
    <Select label="Color" options={colorList.filter((x) => x !== 'surface')} bind:value={color} />
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
                <Button outline {size} {color} startIcon={Settings} {...btnAction} />
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
            <Button {color} outline {...btnAction}>Button</Button>
            <Button {color} outline disabled {...btnAction}>Button</Button>
        </div>
    </Box>

    <Box border class="flex h-max flex-wrap">
        <div class="flex flex-col justify-center">
            <Button {color} {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} outline {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} outline disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} disabled {...btnAction} startIcon={Warning}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} outline {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} outline disabled {...btnAction} startIcon={Warning}>Button</Button>
        </div>
    </Box>
</Story>
