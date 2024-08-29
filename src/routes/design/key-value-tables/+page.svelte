<script lang="ts">
    import { defaultSize, sizeList } from '$components/types';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import { setSettings } from '../+layout.svelte';
    import Button from '$atoms/Button.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import Select from '$components/settings/Select.svelte';

    let size = $state(defaultSize);

    setSettings(settings);
</script>

{#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
{/snippet}

{#snippet simpleValue()}
    value
{/snippet}

{#snippet buttonValue()}
    <Button label="This is a button" />
{/snippet}

{#snippet toggleValue()}
    <Toggle value={true} />
{/snippet}

{#snippet nestedValue()}
    <Card variant="fieldset">
        <KeyValueTable
            size="xs"
            items={[
                ['key simple', simpleValue],
                ['key button', buttonValue],
                ['key toggle', toggleValue]
            ]}
        />
    </Card>
{/snippet}

<Card caption="Strings" variant="fieldset" class="flex flex-col items-center">
    <KeyValueTable
        {size}
        items={[
            ['key1', 'value'],
            ['key2', 'value'],
            ['key', 'value with long string'],
            ['key with long string', 'value'],
            ['key with long string', 'value with long string']
        ]}
    />
</Card>

<Card caption="Snippets" variant="fieldset" class="flex flex-col items-center">
    <KeyValueTable
        {size}
        items={[
            ['key simple', simpleValue],
            ['key button', buttonValue],
            ['key toggle', toggleValue],
            ['key nest', nestedValue],
            ['settings', settings]
        ]}
    />
</Card>
