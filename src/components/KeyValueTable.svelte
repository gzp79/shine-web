<script lang="ts">
    import type { Snippet } from 'svelte';
    import { type Size, tableSizeMap } from './types';

    interface Props {
        size?: Size;
        items: Record<any, any>;
        key?: Snippet<[key: any]>;
        value?: Snippet<[value: any]>;
    }

    const { size = 'md', items, key = defaultView, value = defaultView }: Props = $props();

    const tableSize = $derived(tableSizeMap[size]);
</script>

{#snippet defaultView(data: any)}
    {data}
{/snippet}

<table class="table {tableSize}">
    <tbody>
        {#each Object.entries(items) as item}
            <tr class="border-none">
                <th class="w-min-content items-start text-nowrap">{@render key(item[0])}</th>
                <td class="w-full">{@render value(item[1])}</td>
            </tr>
        {/each}
    </tbody>
</table>
