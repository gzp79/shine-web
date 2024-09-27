<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import { afterNavigate, goto } from '$app/navigation';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import { logUser } from '$lib/loggers';
    import { t } from '$lib/i18n/i18n.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import Button from '$src/components/atoms/Button.svelte';

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

{#if currentUser.error}
    {#await goto('/error', { state: currentUser.error })}{/await}
    <ErrorCard caption={$t('account.failedToLoadUserInfo')} error={currentUser.error}>
        <Button color="error" label={$t('common.retry')} onclick={() => currentUser.refresh()} />
    </ErrorCard>
{:else if !currentUser.isLoaded}
    <div class="flex h-full items-center justify-center">
        <LoadingCard label={$t('account.login')} />
    </div>
{:else if currentUser.isAuthenticated}
    {@render children()}
{:else}
    {#await goto('/login')}{/await}
{/if}
