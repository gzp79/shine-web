<script lang="ts">
    import type { Snippet } from 'svelte';
    import Card from '$components/Card.svelte';

    interface Props {
        caption?: string;
        children: Snippet;
    }
    let { caption, children }: Props = $props();
</script>

<Card {caption} variant="fieldset">
    <form class="form-control inline-grid w-fit auto-cols-min grid-cols-2 items-center gap-4">
        {@render children()}
    </form>
</Card>
