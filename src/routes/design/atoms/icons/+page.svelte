<script lang="ts">
    import { type Component } from 'svelte';
    import { colorList, sizeList, type Color, type Size } from '$components/types';
    import { Check, Cross, Dark, DarkAndLight, Hamburger, Info, Light, Settings, Warning } from '$atoms/icons/common';
    import { Chrome, Edge, Opera, Safari, Firefox, Mobile, Android, IPhone, Mac } from '$atoms/icons/clients';
    import { Infinity, Spinner, Ball, Dots, Ring } from '$atoms/icons/animated';
    import { Discord, Github, Google, Twitter } from '$atoms/icons/social';
    import { FlagGB, FlagHU } from '$atoms/icons/flags';
    import IconCard from '$atoms/IconCard.svelte';
    import Typography from '$atoms/Typography.svelte';
    import Box from '$atoms/Box.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Checkbox from '../../_components/CheckBox.svelte';
    import Story from '../../_components/Story.svelte';

    let size = $state<Size>('md');
    let color = $state<Color>('primary');
    let disabled = $state(false);

    const gridClass = 'flex flex-wrap justify-center gap-2';

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
    <Select label="Color" options={colorList} bind:value={color} />
    <Checkbox label="Disabled" bind:value={disabled} />
{/snippet}

{#snippet icon(Shape: Component, name: string)}
    <Box ghost class="flex flex-col items-center justify-center border">
        <Shape {disabled} {size} {color} />
        <Typography variant="h6">{name}</Typography>
    </Box>
{/snippet}

<Story center>
    <IconCard caption="Common">
        <div class={gridClass}>
            {@render icon(Check, 'Check')}
            {@render icon(Cross, 'Cross')}
            {@render icon(Hamburger, 'Hamburger')}
            {@render icon(Settings, 'Settings')}
            {@render icon(Info, 'Info')}
            {@render icon(Warning, 'Warning')}
            {@render icon(Light, 'Light')}
            {@render icon(Dark, 'Dark')}
            {@render icon(DarkAndLight, 'Dark and Light')}
        </div>
    </IconCard>

    <IconCard caption="User agents">
        <div class={gridClass}>
            {@render icon(Chrome, 'Chrome')}
            {@render icon(Edge, 'Edge')}
            {@render icon(Opera, 'Opera')}
            {@render icon(Safari, 'Safari')}
            {@render icon(Firefox, 'Firefox')}
            {@render icon(Mobile, 'Mobile')}
            {@render icon(Android, 'Android')}
            {@render icon(IPhone, 'IPhone')}
            {@render icon(Mac, 'Mac')}
        </div>
    </IconCard>

    <IconCard caption="Flags">
        <div class={gridClass}>
            {@render icon(FlagHU, 'HU')}
            {@render icon(FlagGB, 'GB')}
        </div>
    </IconCard>

    <IconCard caption="Social">
        <div class={gridClass}>
            {@render icon(Discord, 'Discord')}
            {@render icon(Github, 'Github')}
            {@render icon(Google, 'Google')}
            {@render icon(Twitter, 'Twitter')}
        </div>
    </IconCard>

    <IconCard caption="Loader">
        <div class={gridClass}>
            {@render icon(Spinner, 'Spinner')}
            {@render icon(Ball, 'Ball')}
            {@render icon(Dots, 'Dots')}
            {@render icon(Ring, 'Ring')}
            {@render icon(Infinity, 'Infinity')}
        </div>
    </IconCard>
</Story>
