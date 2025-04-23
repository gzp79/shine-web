<script lang="ts">
    import { type Component } from 'svelte';
    import Box from '@atoms/Box.svelte';
    import Card from '@atoms/Card.svelte';
    import Typography from '@atoms/Typography.svelte';
    import { allIcons as animatedIcons } from '@atoms/icons/animated';
    import { allIcons as clientIcons } from '@atoms/icons/clients';
    import { allIcons as commonIcons } from '@atoms/icons/common';
    import { allIcons as flagIcons } from '@atoms/icons/flags';
    import { allIcons as socialIcons } from '@atoms/icons/social';
    import { type ActionColor, type Size, actionColorList, sizeList } from '@atoms/types';
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
            {#each Object.entries(commonIcons) as [name, icn] (name)}
                {@render icon(icn, name)}
            {/each}
        </div>
    </Card>

    <Card caption="User agents">
        <div class={gridClass}>
            {#each Object.entries(clientIcons) as [name, icn] (name)}
                {@render icon(icn, name)}
            {/each}
        </div>
    </Card>

    <Card caption="Flags">
        <div class={gridClass}>
            {#each Object.entries(flagIcons) as [name, icn] (name)}
                {@render icon(icn, name)}
            {/each}
        </div>
    </Card>

    <Card caption="Social">
        <div class={gridClass}>
            {#each Object.entries(socialIcons) as [name, icn] (name)}
                {@render icon(icn, name)}
            {/each}
        </div>
    </Card>

    <Card caption="Animated">
        <div class={gridClass}>
            {#each Object.entries(animatedIcons) as [name, icn] (name)}
                {@render icon(icn, name)}
            {/each}
        </div>
    </Card>
</Story>
