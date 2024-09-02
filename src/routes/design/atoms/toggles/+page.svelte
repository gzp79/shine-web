<script lang="ts">
    import { colorList, defaultColor, sizeList } from '$components/types';
    import Card from '$atoms/Card.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import Select from '$components/settings/Select.svelte';
    import CheckBox from '$components/settings/CheckBox.svelte';
    import { setSettings } from '../../+layout.svelte';

    let value = $state(true);
    let color = $state(defaultColor);
    let disabled = $state(false);

    setSettings(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
    <CheckBox label="Value" bind:value />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

<div class="flex flex-wrap justify-center gap-2">
    <Card variant="fieldset">
        <div class="flex flex-col items-start">
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value />
            {/each}
        </div>
    </Card>
    <Card variant="fieldset">
        <div class="flex flex-col items-start">
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value onLabel="on" />
            {/each}
        </div>
    </Card>
    <Card variant="fieldset">
        <div class="flex flex-col items-start">
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value offLabel="off" />
            {/each}
        </div>
    </Card>
    <Card variant="fieldset">
        <div class="flex flex-col items-start">
            {#each sizeList as size}
                <Toggle {color} {size} {disabled} bind:value onLabel="on" offLabel="off" />
            {/each}
        </div>
    </Card>
</div>
