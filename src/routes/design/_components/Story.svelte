<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        dense?: boolean;
        center?: boolean;
        children: Snippet;
    }
    let { dense, center, children }: Props = $props();

    let storyClass = $derived(
        twMerge(['flex w-full gap-2 p-4', dense ? 'flex-wrap justify-center' : 'flex-col', center && 'items-center'])
    );
</script>

<div class={storyClass}>
    {@render children()}
</div>
