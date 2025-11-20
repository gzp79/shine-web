<script lang="ts">
    import { type Snippet } from 'svelte';
    import App from '@components/App.svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();
</script>

{@render children()}
