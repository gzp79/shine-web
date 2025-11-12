<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Button from '@atoms/Button.svelte';
    import KeyValueTable from '@atoms/data/KeyValueTable.svelte';
    import { type Size, sizeList } from '@atoms/types';
    import { Select, Story, settingsStore } from '../../_components';

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
    <Box border class="max-w-80">
        <KeyValueTable
            size="xs"
            items={[
                { key: 'simple text', value: simpleValue },
                { key: 'button', value: buttonValue }
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
                { key: 'key1', value: 'value' },
                { key: 'key2', value: 'value' },
                { key: 'key', value: 'value with long string' }
            ]}
        />
    </Box>

    <Box border>
        <KeyValueTable
            {size}
            items={[
                { key: 'key1 with long string', value: 'value' },
                { key: 'k', value: 'with a longer value with some dummy text' },
                { key: 'key2', value: 'duplicated key 1st' },
                { key: 'key3', value: 'duplicated key 2nd' }
            ]}
        />
    </Box>

    <Box border>
        <KeyValueTable
            {size}
            items={[
                { key: 'simple', value: simpleValue },
                { key: 'counter', value: count.toString() },
                { key: 'button', value: buttonValue },
                { key: 'nested Table', value: nestedValue },
                { key: 'settings', value: settingsValue }
            ]}
        />
    </Box>
</Story>
