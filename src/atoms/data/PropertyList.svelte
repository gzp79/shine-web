<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import { type ElementProps, type Size } from '../types';
    import TailwindClasses from '../utilities/TailwindClasses.svelte';

    export interface DescriptionListItem {
        /** Key or label for the item */
        key: string;
        /** Additional CSS classes for the key cell */
        keyClass?: string;
        /** Value for the item, either as a string or a Svelte snippet */
        value: string | Snippet;
        /** Additional CSS classes for the value cell */
        valueClass?: string;
    }

    interface Props extends ElementProps {
        /** List of items to display */
        items: (DescriptionListItem | null)[];
        /** Size of the list */
        size?: Size;
        /** Whether the table should take full width of its container */
        wide?: boolean;
        /** Additional CSS classes for the table */
        class?: string;
    }

    const { items, size = 'md', wide = false, class: className, id, role }: Props = $props();

    const filteredItems = $derived(items.filter((x) => x !== null) as DescriptionListItem[]);
    const tableClass = $derived(
        twMerge('table', wide ? 'w-full table-fixed' : 'table-auto max-w-full', `table-${size}`, className)
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
                    <td class={twMerge('[word-break:break-word]', item.valueClass)}>
                        {item.value}
                    </td>
                {:else}
                    <td class={twMerge('[word-break:break-word] min-w-0', item.valueClass)}>
                        {@render item.value()}
                    </td>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>
