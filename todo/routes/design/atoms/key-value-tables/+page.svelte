<script lang="ts">
    import { sizeList, type Size } from '$components/types';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    //import Button from '$atoms/Button.svelte';
    //import Toggle from '$atoms/Toggle.svelte';
    import Box from '$atoms/Box.svelte';
    import Story from '../../_components/Story.svelte';
    //import { settingsStore } from '../../_components/currentSettings.svelte';
    //import Select from '../../_components/Select.svelte';

    let size = $state<Size>('md');

    let count = $state(1);
    $effect(() => {
        const interval = setInterval(() => {
            count = count + 1;
        }, 1000);
        return () => clearInterval(interval);
    });

    //settingsStore().set(settings);
</script>

<!-- {#snippet settings()}
    <Select label="Size" options={sizeList} bind:value={size} />
{/snippet} -->

{#snippet simpleValue()}
    value
{/snippet}

{#snippet buttonValue()}
    <!-- <Button>This is a button</Button> -->
{/snippet}

{#snippet toggleValue()}
    <!-- <Toggle value={true} /> -->
{/snippet}

{#snippet nestedValue()}
    <Box border>
        <KeyValueTable
            size="xs"
            items={[
                ['key simple', simpleValue],
                ['key button', buttonValue],
                ['key toggle', toggleValue]
            ]}
        />
    </Box>
{/snippet}

<Story>
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
                ['key simple', simpleValue],
                ['counter', count.toString()],
                ['key button', buttonValue],
                ['key toggle', toggleValue],
                ['key nest', nestedValue]
                //['settings', settings]
            ]}
        />
    </Box>
</Story>
