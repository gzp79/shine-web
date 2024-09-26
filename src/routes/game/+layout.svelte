<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import { afterNavigate, goto } from '$app/navigation';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import { logUser } from '$lib/loggers';
    import ErrorPage from '$components/ErrorPage.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    let currentUser = currentUserStore();
    $effect(() => {
        if (currentUser.isNull) currentUser.refresh();
    });

    onMount(() => {
        const handleDocumentVisibility = async () => {
            if (document.visibilityState === 'visible') {
                logUser('Checking user after document focus...');
                currentUser.refresh();
            }
        };

        document.addEventListener('visibilitychange', handleDocumentVisibility);

        return () => {
            document.removeEventListener('visibilitychange', handleDocumentVisibility);
        };
    });

    afterNavigate(() => {
        currentUserStore().refresh();
    });
</script>

<button onclick={() => currentUser.forget()}>Refresh User</button>

{#if currentUser.error}
    {#await goto('/error', { state: currentUser.error })}{/await}
    <ErrorPage error={currentUser.error} />
{:else if !currentUser.isLoaded}
    <div class="flex h-full items-center justify-center">
        <LoadingCard />
    </div>
{:else if currentUser.isAuthenticated}
    {@render children()}
{:else}
    {#await goto('/login')}{/await}
{/if}
