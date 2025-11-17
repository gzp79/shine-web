<script lang="ts">
    import { type Snippet } from 'svelte';
    import App from '@lib/app/App.svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();
</script>

<App>
    {@render children()}
</App>
