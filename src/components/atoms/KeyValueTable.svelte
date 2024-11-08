<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import { type Size } from './types';
    import CompileTailwindClasses from './CompileTailwindClasses.svelte';

    interface Item {
        key: string;
        value: Snippet | string;
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

<CompileTailwindClasses classList={['table-xs table-sm table-md table-lg']} />

<table class={tableClass}>
    <tbody>
        {#each filteredItems as item}
            <tr class="border-none">
                <th class="w-min-content text-nowrap">{item.key}</th>
                <td class={twMerge('w-full text-ellipsis', item.class)}>
                    {#if typeof item.value === 'string'}
                        {item.value}
                    {:else}
                        {@render item.value()}
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>
