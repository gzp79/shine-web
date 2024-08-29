<script lang="ts">
    import type { Snippet } from 'svelte';
    import { sizeMaps, type Size } from '$components/types';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        items: [string, Snippet | string][];
        size?: Size;
    }
    let { items, size = 'md' }: Props = $props();

    const tableClass = $derived(twMerge('table rounded-none', sizeMaps.table[size]));
</script>

<table class={tableClass}>
    <tbody>
        {#each items as [key, value]}
            <tr>
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
