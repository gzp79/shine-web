<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();
</script>

<form class="form-control inline-grid w-full auto-cols-min grid-cols-2 items-center gap-4">
    {@render children()}
</form>
