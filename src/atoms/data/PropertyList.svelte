<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import { type ElementProps, type Size } from '../types';
    import TailwindClasses from '../utilities/TailwindClasses.svelte';

    export interface DescriptionListItem {
        key: string;
        value: string | Snippet;
        valueClass?: string;
        keyClass?: string;
    }

    interface Props extends ElementProps {
        items: (DescriptionListItem | null)[];
        size?: Size;
        /** Whether the table should take full width of its container */
        fullWidth?: boolean;
        class?: string;
    }

    const { items, size = 'md', fullWidth = false, class: className, id, role }: Props = $props();

    const filteredItems = $derived(items.filter((x) => x !== null) as DescriptionListItem[]);
    const tableClass = $derived(
        twMerge('table', fullWidth ? 'w-full table-fixed' : 'table-auto max-w-full', `table-${size}`, className)
    );
</script>

<TailwindClasses classList={['table-xs', 'table-sm', 'table-md', 'table-lg']} />

<table {id} {role} class={tableClass}>
    <colgroup>
        <col class="w-1/3" />
        <col class="w-2/3" />
    </colgroup>
    <tbody>
        {#each filteredItems as item (item.key)}
            <tr>
                <th class={twMerge('truncate', item.keyClass)} title={item.key}>
                    {item.key}
                </th>
                {#if typeof item.value === 'string'}
                    <td class={twMerge('break-words', item.valueClass)}>
                        {item.value}
                    </td>
                {:else}
                    <td class={twMerge('min-w-0', item.valueClass)}>
                        {@render item.value()}
                    </td>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>
