<script lang="ts">
    import { type Component } from 'svelte';
    import Box from '$atoms/Box.svelte';
    import Card from '$atoms/Card.svelte';
    import Typography from '$atoms/Typography.svelte';
    import * as animated from '$atoms/icons/animated';
    import * as clients from '$atoms/icons/clients';
    import * as icons from '$atoms/icons/common';
    import * as flags from '$atoms/icons/flags';
    import * as social from '$atoms/icons/social';
    import { type ActionColor, type Size, actionColorList, sizeList } from '$atoms/types';
    import { CheckBox, Select, Story, settingsStore } from '../../_components';

    let size = $state<Size>('md');
    let color = $state<ActionColor>('primary');
    let disabled = $state(false);

    const gridClass = 'flex flex-wrap justify-center gap-2';

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
    <Select label="Color" options={actionColorList} bind:value={color} />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

{#snippet icon(Shape: Component, name: string)}
    <Box ghost class="flex flex-col items-center justify-center border bg-{color} text-on-{color}">
        <Shape {disabled} {size} {color} />
        <Typography variant="h6">{name}</Typography>
    </Box>
{/snippet}

<Story variant="center">
    <Card caption="Common">
        <div class={gridClass}>
            {@render icon(icons.Check, 'Check')}
            {@render icon(icons.Cross, 'Cross')}
            {@render icon(icons.Hamburger, 'Hamburger')}
            {@render icon(icons.Settings, 'Settings')}
            {@render icon(icons.Link, 'Link')}
            {@render icon(icons.Info, 'Info')}
            {@render icon(icons.Warning, 'Warning')}
            {@render icon(icons.Light, 'Light')}
            {@render icon(icons.Dark, 'Dark')}
            {@render icon(icons.DarkAndLight, 'Dark and Light')}
            {@render icon(icons.Fatal, 'Fatal')}
            {@render icon(icons.DropDown, 'DropDown')}
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
            {@render icon(social.Gitlab, 'Gitlab')}
            {@render icon(social.Google, 'Google')}
            {@render icon(social.Twitter, 'Twitter')}
            {@render icon(social.ActiveUser, 'ActiveUser')}
        </div>
    </Card>

    <Card caption="Loader">
        <div class={gridClass}>
            {@render icon(animated.Spinner, 'Spinner')}
            {@render icon(animated.Ball, 'Ball')}
            {@render icon(animated.Dots, 'Dots')}
            {@render icon(animated.Ring, 'Ring')}
            {@render icon(animated.Infinite, 'Infinite')}
        </div>
    </Card>
</Story>
