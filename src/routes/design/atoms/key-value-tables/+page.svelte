<script lang="ts">
    import { sizeList, type Size } from '$components/types';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import Button from '$atoms/Button.svelte';
    import Box from '$atoms/Box.svelte';
    import Story from '../../_components/Story.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';

    let size = $state<Size>('xs');

    let count = $state(1);
    $effect(() => {
        const interval = setInterval(() => {
            count = count + 1;
        }, 1000);
        return () => clearInterval(interval);
    });

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
{/snippet}

{#snippet simpleValue()}
    value
{/snippet}

{#snippet buttonValue()}
    <Button size="xs">This is a button</Button>
{/snippet}

{#snippet nestedValue()}
    <Box border class="max-w-72">
        <KeyValueTable
            size="xs"
            items={[
                ['simple text', simpleValue],
                ['button', buttonValue]
            ]}
        />
    </Box>
{/snippet}

{#snippet settingsValue()}
    <Box
        border
        ghost
        class="form-control mx-2 inline-grid w-full max-w-72 auto-cols-min grid-cols-2 items-center gap-4"
    >
        {@render settings()}
    </Box>
{/snippet}

<Story variant="center">
    <Box border>
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
    </Box>

    <Box border>
        <KeyValueTable
            {size}
            items={[
                ['simple', simpleValue],
                ['counter', count.toString()],
                ['button', buttonValue],
                ['nested Table', nestedValue],
                ['settings', settingsValue]
            ]}
        />
    </Box>
</Story>
