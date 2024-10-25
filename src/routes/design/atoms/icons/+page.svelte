<script lang="ts">
    import { type Component } from 'svelte';
    import { colorList, sizeList, type Color, type Size } from '$atoms/types';
    import * as common from '$atoms/icons/common';
    import * as clients from '$atoms/icons/clients';
    import * as animated from '$atoms/icons/animated';
    import * as social from '$atoms/icons/social';
    import * as flags from '$atoms/icons/flags';
    import Card from '$atoms/Card.svelte';
    import Typography from '$atoms/Typography.svelte';
    import Box from '$atoms/Box.svelte';
    import { CheckBox, Select, settingsStore, Story } from '../../_components';

    let size = $state<Size>('md');
    let color = $state<Color>('primary');
    let disabled = $state(false);

    const gridClass = 'flex flex-wrap justify-center gap-2';

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
    <Select label="Color" options={colorList} bind:value={color} />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

{#snippet icon(Shape: Component, name: string)}
    <Box ghost class="flex flex-col items-center justify-center border">
        <Shape {disabled} {size} {color} />
        <Typography variant="h6">{name}</Typography>
    </Box>
{/snippet}

<Story variant="center">
    <Card caption="Common">
        <div class={gridClass}>
            {@render icon(common.Check, 'Check')}
            {@render icon(common.Cross, 'Cross')}
            {@render icon(common.Hamburger, 'Hamburger')}
            {@render icon(common.Settings, 'Settings')}
            {@render icon(common.Info, 'Info')}
            {@render icon(common.Warning, 'Warning')}
            {@render icon(common.Light, 'Light')}
            {@render icon(common.Dark, 'Dark')}
            {@render icon(common.DarkAndLight, 'Dark and Light')}
            {@render icon(common.Fatal, 'Fatal')}
        </div>
    </Card>

    <Card caption="User agents">
        <div class={gridClass}>
            {@render icon(clients.Chrome, 'Chrome')}
            {@render icon(clients.Edge, 'Edge')}
            {@render icon(clients.Opera, 'Opera')}
            {@render icon(clients.Safari, 'Safari')}
            {@render icon(clients.Firefox, 'Firefox')}
            {@render icon(clients.Mobile, 'Mobile')}
            {@render icon(clients.Android, 'Android')}
            {@render icon(clients.IPhone, 'IPhone')}
            {@render icon(clients.Mac, 'Mac')}
        </div>
    </Card>

    <Card caption="Flags">
        <div class={gridClass}>
            {@render icon(flags.FlagHU, 'HU')}
            {@render icon(flags.FlagGB, 'GB')}
        </div>
    </Card>

    <Card caption="Social">
        <div class={gridClass}>
            {@render icon(social.Discord, 'Discord')}
            {@render icon(social.Github, 'Github')}
            {@render icon(social.Google, 'Google')}
            {@render icon(social.Twitter, 'Twitter')}
        </div>
    </Card>

    <Card caption="Loader">
        <div class={gridClass}>
            {@render icon(animated.Spinner, 'Spinner')}
            {@render icon(animated.Ball, 'Ball')}
            {@render icon(animated.Dots, 'Dots')}
            {@render icon(animated.Ring, 'Ring')}
            {@render icon(animated.Infinity, 'Infinity')}
        </div>
    </Card>
</Story>
