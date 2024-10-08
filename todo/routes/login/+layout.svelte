<script lang="ts">
    import { goto } from '$app/navigation';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import type { Snippet } from 'svelte';

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

{@render children()}
