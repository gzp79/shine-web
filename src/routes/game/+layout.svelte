<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import { goto } from '$app/navigation';
    import { currentUserStore, loadCurrentUser } from '$lib/account/currentUser.svelte';
    import type { CurrentUser } from '$lib/api/identity-api';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorPage from '$src/components/ErrorPage.svelte';

    interface Props {
        children: Snippet;
        data: {
            streams: {
                currentUser: Promise<CurrentUser>;
            };
        };
    }
    let { children, data }: Props = $props();

    let currentUser = currentUserStore();
    $effect(() => {
        if (!currentUser.isLoaded) {
            /*await*/ loadCurrentUser(fetch);
        }
    });

    onMount(() => {
        const handleDocumentVisibility = async () => {
            if (document.visibilityState === 'visible') {
                console.log('Checking user after document focus...');
                await loadCurrentUser(fetch);
            }
        };

        document.addEventListener('visibilitychange', handleDocumentVisibility);
        return () => {
            document.removeEventListener('visibilitychange', handleDocumentVisibility);
        };
    });
</script>

{#await data.streams.currentUser}
    <div class="flex h-full items-center justify-center">
        initial
        <LoadingCard />
    </div>
{:then}
    {#if currentUser.error}
        {#await goto('/error', { state: currentUser.error })}{/await}
        <ErrorPage error={currentUser.error} />
    {:else if !currentUser.isLoaded}
        <div class="flex h-full items-center justify-center">
            reload
            <LoadingCard />
        </div>
    {:else if currentUser.isAuthenticated}
        {@render children()}
    {:else}
        {#await goto('/login')}{/await}
    {/if}
{/await}
