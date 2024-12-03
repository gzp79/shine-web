<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        children: Snippet;
        class?: string;
    }

    let { children, class: className }: Props = $props();

    let mainClass = $derived(twMerge('h-full w-full overflow-y-auto', className));
</script>

<main class={mainClass}>
    {@render children()}
</main>
