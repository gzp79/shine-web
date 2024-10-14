<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        variant?: 'dense' | 'center' | 'full';
        children: Snippet;
    }
    let { variant = "full", children }: Props = $props();

    let variantClass = {
        full: 'flex-col',
        dense: 'flex-row flex-wrap justify-center',
        center: 'flex-col items-center'
    };

    let storyClass = $derived(twMerge('flex w-full gap-2 p-4', variantClass[variant]));
</script>

<div class={storyClass}>
    {@render children()}
</div>
