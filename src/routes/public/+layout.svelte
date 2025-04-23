<script lang="ts">
    import App from '$lib/app/App.svelte';
    import { type Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();
</script>

<App>
    {@render children()}
</App>
