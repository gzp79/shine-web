<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import TailwindClasses from './TailwindClasses.svelte';
    import { type Size } from './types';

    interface Item {
        key: string;
        value: string | Snippet;
        class?: string;
    }
    interface Props {
        items: (Item | null)[];
        size?: Size;
    }
    const { items, size = 'md' }: Props = $props();

    const filteredItems = $derived(items.filter((x) => x !== null));
    const tableClass = $derived(twMerge('table', `table-${size}`));
</script>

<TailwindClasses classList={['table-xs table-sm table-md table-lg']} />

<table class={tableClass}>
    <tbody>
        {#each filteredItems as item (item.key)}
            <tr class="border-none">
                <th class="w-min-content text-nowrap">{item.key}</th>
                {#if typeof item.value === 'string'}
                    <td class="w-full text-ellipsis">
                        <span class={item.class}>{item.value}</span>
                    </td>
                {:else}
                    <td class={twMerge('w-full text-ellipsis', item.class)}>
                        {@render item.value()}
                    </td>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>
