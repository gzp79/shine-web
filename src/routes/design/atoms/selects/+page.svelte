<script lang="ts">
    import { colorList, defaultColor, defaultSize, sizeList } from '$components/types';
    import Select, { type Location } from '$atoms/Select.svelte';
    import CfgSelect from '$components/settings/Select.svelte';
    import { setSettings } from '../../+layout.svelte';
    import { Discord, Github, Google, Twitter } from '$src/components/atoms/icons/idps';
    import Card from '$src/components/atoms/Card.svelte';

    let size = $state(defaultSize);
    let color = $state(defaultColor);
    let location = $state('auto' as Location);

    let value = $state();

    setSettings(settings);
</script>

{#snippet settings()}
    <CfgSelect label="Size" options={sizeList} bind:value={size} />
    <CfgSelect label="Color" options={colorList} bind:value={color} />
    <CfgSelect label="Location" options={['below', 'above', 'auto']} bind:value={location} />
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

<p class="min-h-[1500px]">a</p>

<Card caption="Common" variant="top">
    <Card caption="Common" variant="fieldset">
        <select>
            <option value="">Select a value</option>
            <option value="v1">Value 1</option>
            <option value="v2">Value 2</option>
            <option value="v3">Value 3</option>
            <option value="v4">Value 4</option>
        </select>
        <Select
            {size}
            {color}
            {location}
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
            {size}
            {color}
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
</Card>

<Card caption="Common" variant="fieldset">
    <Select
        {size}
        {color}
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

<Card caption="Common" variant="fieldset">
    <Select
        {size}
        {color}
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

<Card caption="Common" variant="fieldset">
    <Select
        {size}
        {color}
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

<Card caption="Common" variant="fieldset">
    <Select
        {size}
        {color}
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

<Card caption="Common" variant="fieldset">
    <Select
        {size}
        {color}
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

<Card caption="Common" variant="fieldset">
    <Select
        {size}
        {color}
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
