<script lang="ts">
    import Card from '$components/Card.svelte';
    import { Chrome, Edge, Opera, Safari } from '$components/icons/clients';
    import { Check, Cross, Hamburger, Info, Settings, Warning } from '$components/icons/common';
    import { Discord, Github, Google, Twitter } from '$components/icons/idps';
    import Checkbox from '$components/settings/CheckBox.svelte';
    import Select from '$components/settings/Select.svelte';
    import { colorList, defaultColor, defaultSize, sizeList } from '$components/types';
    import { type Component } from 'svelte';
    import { setSettings } from '../+layout.svelte';

    let size = $state(defaultSize);
    let color = $state(defaultColor);
    let disabled = $state(false);

    setSettings(settings);
</script>

{#snippet icon(shape: Component, name: string)}
    <div class="flex flex-col items-center rounded-lg border">
        <div class="m-2">
            <div class="m-2 flex items-center justify-center">
                <svelte:component this={shape} {disabled} {size} {color} />
            </div>
            <p class="text-center">{name}</p>
        </div>
    </div>
{/snippet}

{#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
    <Select label="Color" options={colorList} bind:value={color} />
    <Checkbox label="Disabled" bind:value={disabled} />
{/snippet}

<Card caption="Common" variant="fieldset" class="flex flex-col items-center">
    <div class="flex flex-wrap justify-center gap-2">
        {@render icon(Check, 'Check')}
        {@render icon(Cross, 'Cross')}
        {@render icon(Hamburger, 'Hamburger')}
        {@render icon(Settings, 'Settings')}
        {@render icon(Info, 'Info')}
        {@render icon(Warning, 'Warning')}
    </div>
</Card>

<Card caption="Clients" variant="fieldset" class="flex flex-col items-center">
    <div class="flex flex-wrap justify-center gap-2">
        {@render icon(Chrome, 'Chrome')}
        {@render icon(Edge, 'Edge')}
        {@render icon(Opera, 'Opera')}
        {@render icon(Safari, 'Safari')}
    </div>
</Card>

<Card caption="Identity providers" variant="fieldset" class="flex flex-col items-center">
    <div class="flex flex-wrap justify-center gap-2">
        {@render icon(Discord, 'Discord')}
        {@render icon(Github, 'Github')}
        {@render icon(Google, 'Google')}
        {@render icon(Twitter, 'Twitter')}
    </div>
</Card>
