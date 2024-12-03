<script lang="ts">
    import type { Snippet } from 'svelte';
    import QuickConfig from './QuickConfig.svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="h-full w-full">
    <header class="absolute right-4 top-4 z-10 flex items-center">
        <QuickConfig />
    </header>
    {@render children()}
</div>
