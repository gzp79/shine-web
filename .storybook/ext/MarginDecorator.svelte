<script lang="ts">
    import type { Snippet } from 'svelte';

    let { use, children }: { use?: number; children: Snippet } = $props();
</script>

<div class="bg-[red]">
    {`use: ${use}`}
    {@render children()}
</div>
