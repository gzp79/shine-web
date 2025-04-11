<script lang="ts">
    import { logDesigner } from '$lib/loggers';
    import Box from '@atoms/Box.svelte';
    import Button from '@atoms/Button.svelte';
    import Stack from '@atoms/Stack.svelte';
    import { Spinner } from '@atoms/icons/animated';
    import { Firefox } from '@atoms/icons/clients';
    import { Settings, Warning } from '@atoms/icons/common';
    import { Twitter } from '@atoms/icons/social';
    import { type ActionColor, actionColorList, sizeList } from '@atoms/types';
    import { Select, Story, settingsStore } from '../../_components';

    let color = $state<ActionColor>('primary');
    let action = $state('click');
    let href = '#bottom';

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
    <Box border class="h-max">
        <Stack>
            {#each sizeList as size (size)}
                <Button {size} {color} {...btnAction}>
                    Button-{size}
                </Button>
            {/each}
        </Stack>
    </Box>

    <Box border class="h-max">
        <Stack>
            <Button {color} {onclick}>Active button</Button>
            <Button {color} disabled {onclick}>Disabled button</Button>
            <Button {color} {href}>Active link</Button>
            <Button {color} disabled {href}>Disabled link</Button>
        </Stack>
    </Box>

    <Box border class="h-max">
        <Stack>
            {#each sizeList as size (size)}
                <Stack direction="row">
                    <Button {size} {color} startIcon={Settings} {...btnAction} />
                    <Button variant="outline" {size} {color} startIcon={Settings} {...btnAction} />
                    <Button variant="ghost" {size} {color} startIcon={Settings} {...btnAction} />
                </Stack>
            {/each}
        </Stack>
    </Box>

    <Box border class="h-max">
        <Stack>
            {#each sizeList as size (size)}
                <Button {size} {color} startIcon={Twitter} {...btnAction}>
                    Button-{size}
                </Button>
            {/each}
        </Stack>
    </Box>

    <Box border class="h-max">
        <Stack>
            {#each sizeList as size (size)}
                <Button {size} {color} endIcon={Twitter} {...btnAction}>
                    Button-{size}
                </Button>
            {/each}
        </Stack>
    </Box>

    <Box border class="h-max">
        <Stack>
            {#each sizeList as size (size)}
                <Button {size} {color} startIcon={Twitter} endIcon={Twitter} {...btnAction}>
                    Button-{size}
                </Button>
            {/each}
        </Stack>
    </Box>

    <Box border class="flex h-max w-96 flex-col">
        {#each sizeList as size (size)}
            <Button wide {size} {color} startIcon={Twitter} endIcon={Twitter} {...btnAction}>
                Button-{size}
            </Button>
        {/each}
    </Box>

    <Box border class="h-max">
        <Stack>
            <Button {color} {...btnAction} startIcon={Settings} />
            <Button {color} {...btnAction} startIcon={Settings}>Button</Button>
            <Button {color} {...btnAction} endIcon={Settings}>Button</Button>
            <Button {color} {...btnAction} startIcon={Settings} endIcon={Spinner}>Button</Button>
        </Stack>
    </Box>

    <Box border class="h-max">
        <Stack direction="row">
            <Stack justify="center">
                <Button {color} {...btnAction}>Button</Button>
                <Button {color} disabled {...btnAction}>Button</Button>
            </Stack>
            <Stack justify="center">
                <Button {color} variant="outline" {...btnAction}>Button</Button>
                <Button {color} variant="outline" disabled {...btnAction}>Button</Button>
            </Stack>
            <Stack justify="center">
                <Button {color} variant="ghost" {...btnAction}>Button</Button>
                <Button {color} variant="ghost" disabled {...btnAction}>Button</Button>
            </Stack>
        </Stack>
    </Box>

    <Box border class="flex h-max flex-wrap">
        <Stack justify="center">
            <Button {color} {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </Stack>
        <Stack justify="center">
            <Button {color} variant="outline" {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} variant="outline" disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </Stack>
        <Stack justify="center">
            <Button {color} variant="ghost" {...btnAction} startIcon={Firefox}>Button</Button>
            <Button {color} variant="ghost" disabled {...btnAction} startIcon={Firefox}>Button</Button>
        </Stack>
    </Box>
    <Box border class="flex h-max flex-wrap">
        <Stack justify="center">
            <Button {color} {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} disabled {...btnAction} startIcon={Warning}>Button</Button>
        </Stack>
        <Stack justify="center">
            <Button {color} variant="outline" {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} variant="outline" disabled {...btnAction} startIcon={Warning}>Button</Button>
        </Stack>
        <Stack justify="center">
            <Button {color} variant="ghost" {...btnAction} startIcon={Warning}>Button</Button>
            <Button {color} variant="ghost" disabled {...btnAction} startIcon={Warning}>Button</Button>
        </Stack>
    </Box>

    <fieldset class="border p-2 h-max">
        <legend>No parent box</legend>
        <Stack direction="row">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
        </Stack>
    </fieldset>
    <Box border class="h-max" legend="Parent box">
        <Stack>
            <Stack direction="row">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
            </Stack>
            <Box border>
                <Stack>
                    <Stack direction="row">
                        <Button>Default</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                    </Stack>
                    <Box border>
                        <Stack direction="row">
                            <Button>Default</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Box border shadow variant={{ color }}>
                <Stack direction="row">
                    <Button>Default</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                </Stack>
            </Box>
        </Stack>
    </Box>
    <div id="bottom"></div>
</Story>
