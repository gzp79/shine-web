<script lang="ts">
    import type { Snippet } from 'svelte';
    import { type Size } from '$components/types';
    import { twMerge } from 'tailwind-merge';
    import CompileTailwindClasses from './utils/CompileTailwindClasses.svelte';

    interface Props {
        items: ([string, Snippet | string] | null)[];
        size?: Size;
    }
    const { items, size = 'md' }: Props = $props();

    const filteredItems = $derived(items.filter((x) => x !== null));
    const tableClass = $derived(twMerge('table rounded-none', `table-${size}`));
</script>

<CompileTailwindClasses classList={['table-xs table-sm table-md table-lg']} />

<table class={tableClass}>
    <tbody>
        {#each filteredItems as [key, value]}
            <tr class="border-none">
                <th class="w-min-content text-nowrap">{key}</th>
                <td class="w-full">
                    {#if typeof value === 'string'}
                        {value}
                    {:else}
                        {@render value()}
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>
