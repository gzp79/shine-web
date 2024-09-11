<script lang="ts">
    import { colorList, defaultColor, defaultSize, sizeList } from '$components/types';
    import Select from '$atoms/Select.svelte';
    import CfgSelect from '$components/settings/Select.svelte';
    import { setSettings } from '../../+layout.svelte';
    import { Discord, Github, Google, Twitter } from '$src/components/atoms/icons/idps';
    import Card from '$src/components/atoms/Card.svelte';

    let size = $state(defaultSize);
    let color = $state(defaultColor);

    let value = $state();

    setSettings(settings);
</script>

{#snippet settings()}
    <CfgSelect label="Size" options={sizeList} bind:value={size} />
    <CfgSelect label="Color" options={colorList} bind:value={color} />
{/snippet}

{#snippet icon1()}
    <Google />
{/snippet}
{#snippet icon2()}
    <Discord />
{/snippet}
{#snippet icon3()}
    <Twitter />
{/snippet}
{#snippet icon4()}
    <Github />
{/snippet}

<span class="label">Current value: {value}</span>

<Card caption="Common" variant="fieldset">
    <Select
        bind:value
        placeholder="Select a value"
        options={[
            ['v1', 'Value 1'],
            ['v2', 'Value 2'],
            ['v3', 'Value 3'],
            ['v4', 'Value 4'],
            ['v5', 'Value 5']
        ]}
    />
</Card>

<Card caption="Common" variant="fieldset">
    <Select
        bind:value
        placeholder="Select an icon"
        options={[
            ['v1', icon1],
            ['v2', icon2],
            ['v3', icon3],
            ['v4', icon4]
        ]}
    />
</Card>
