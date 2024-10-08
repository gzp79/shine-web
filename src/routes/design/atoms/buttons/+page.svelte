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

<Story dense>
    <Box border class="flex h-max w-max flex-col">
        {#each sizeList as size}
            <div class="w-max">
                <Button {size} {color} {...btnAction}>
                    Button-{size}
                </Button>
            </div>
        {/each}
    </Box>

    <Box border class="flex h-max w-max flex-col">
        {#each sizeList as size}
            <div class="w-max">
                <Button {size} {color} startIcon={Settings} {onclick} />
            </div>
        {/each}
    </Box>

    <Box border class="flex h-max w-max flex-col">
        {#each sizeList as size}
            <div class="w-max">
                <Button {size} {color} startIcon={Twitter} {onclick}>
                    Button-{size}
                </Button>
            </div>
        {/each}
    </Box>

    <Box border class="flex h-max w-max flex-col">
        {#each sizeList as size}
            <div class="w-max">
                <Button {size} {color} endIcon={Twitter} {onclick}>
                    Button-{size}
                </Button>
            </div>
        {/each}
    </Box>

    <Box border class="flex h-max w-max flex-col">
        {#each sizeList as size}
            <div class="w-max">
                <Button {size} {color} startIcon={Twitter} endIcon={Twitter} {onclick}>
                    Button-{size}
                </Button>
            </div>
        {/each}
    </Box>

    <Box border class="flex h-max w-max flex-col">
        <div class="w-max">
            <Button {color} {...btnAction} startIcon={Settings} />
        </div>
        <div class="w-max">
            <Button {color} {...btnAction} startIcon={Settings}>Button</Button>
        </div>
        <div class="w-max">
            <Button {color} {...btnAction} endIcon={Settings}>Button</Button>
        </div>
        <div class="w-max">
            <Button {color} {...btnAction} startIcon={Settings} endIcon={Spinner}>Button</Button>
        </div>
    </Box>

    <Box border class="flex h-max w-max flex-row">
        <div class="flex flex-col justify-center">
            <Button {color} {onclick}>Button</Button>
            <Button {color} disabled {onclick}>Button</Button>
        </div>
        <div class="flex flex-col justify-center">
            <Button {color} outline {onclick}>Button</Button>
            <Button {color} outline disabled {onclick}>Button</Button>
        </div>
    </Box>

    <Box border class="flex h-max w-max flex-wrap">
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
