<script lang="ts">
    import type { Snippet } from 'svelte';
    import { goto } from '$app/navigation';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import App from '$lib/app/App.svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    const currentUser = currentUserStore();
    $effect(() => {
        if (currentUser.isAuthenticated) {
            goto('/');
        }
    });
</script>

<App>
    {@render children()}
</App>
