<script lang="ts">
    import { type Component } from 'svelte';
    import { colorList, defaultColor, defaultSize, sizeList } from '$components/types';
    import IconCard from '$atoms/IconCard.svelte';
    import { Chrome, Edge, Opera, Safari, Firefox, Mobile, Android, IPhone, Mac } from '$atoms/icons/clients';
    import { Check, Cross, Dark, DarkAndLight, Hamburger, Info, Light, Settings, Warning } from '$atoms/icons/common';
    import { Infinity, Spinner, Ball, Dots, Ring } from '$atoms/icons/animated';
    import { Discord, Github, Google, Twitter } from '$atoms/icons/social';
    import { FlagGB, FlagHU } from '$atoms/icons/flags';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Checkbox from '../../_components/CheckBox.svelte';
    import Story from '../../_components/Story.svelte';
    import ImageCard from '$src/components/atoms/ImageCard.svelte';

    let size = $state(defaultSize);
    let color = $state(defaultColor);
    let disabled = $state(false);

    const gridClass = 'flex flex-wrap justify-center gap-2';

    settingsStore().set(settings);
</script>

<!-- {#snippet icon(Shape: Component, name: string)}
    <div class="flex flex-col items-center rounded-lg border">
        <div class="m-2">
            <div class="m-2 flex items-center justify-center">
                <Shape {disabled} {size} {color} />
            </div>
            <p class="text-center">{name}</p>
        </div>
    </div>
{/snippet} -->

{#snippet icon(Shape: Component, name: string)}
    <ImageCard caption={name} dense ghost>
        {#snippet image()}
            <Shape {disabled} {size} {color} />
        {/snippet}
    </ImageCard>
{/snippet}

{#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
    <Select label="Color" options={colorList} bind:value={color} />
    <Checkbox label="Disabled" bind:value={disabled} />
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
