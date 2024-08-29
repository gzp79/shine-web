<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();
</script>

<div class="col-span-full flex items-center justify-center">
    {@render children()}
</div>
