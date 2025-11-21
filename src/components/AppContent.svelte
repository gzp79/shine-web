<script module lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    export type Layout = 'centered' | 'flow' | 'fullscreen';

    export interface Props {
        /** Preset layout option */
        layout?: Layout;
        /** Additional CSS classes */
        class?: string;
        /** Content to render inside the main area */
        children: Snippet;
    }
</script>

<script lang="ts">
    let { children, class: className, layout = 'centered' }: Props = $props();

    const layoutClasses: Record<Layout, string> = {
        fullscreen: '',
        centered: 'flex items-center justify-center p-4 md:p-8',
        flow: 'overflow-y-auto p-4 md:p-8'
    };

    let mainClass = $derived(twMerge('h-full w-full', layoutClasses[layout], className));
</script>

<main class={mainClass}>
    {@render children()}
</main>
