<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import { afterNavigate, goto } from '$app/navigation';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import { logUser } from '$lib/loggers';
    import { t } from '$lib/i18n/i18n.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import Button from '$atoms/Button.svelte';
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import { page } from '$app/stores';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    let currentUser = currentUserStore();
    $effect(() => {
        if (currentUser.isNull) currentUser.refresh();
    });

    let loginUrl = $derived.by(() => {
        const path = $page.url.pathname;
        const queryString = $page.url.search;
        if (path.startsWith('/game/')) {
            const targetPath = path.substring(6);
            const target = queryString ? `${targetPath}?${queryString}` : targetPath;
            return `/login?target=${encodeURIComponent(target)}`;
        } else {
            return '/login';
        }
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

<App>
    {#if currentUser.error}
        <AppContent>
            <div class="flex h-full items-center justify-center">
                <ErrorCard caption={$t('account.failedToLoadUserInfo')} error={currentUser.error}>
                    {#snippet actions()}
                        <Button onclick={() => currentUser.refresh()}>{$t('common.retry')}</Button>
                    {/snippet}
                </ErrorCard>
            </div>
        </AppContent>
    {:else if !currentUser.isLoaded}
        <AppContent>
            <div class="flex h-full items-center justify-center">
                <LoadingCard label={$t('account.loading')} />
            </div>
        </AppContent>
    {:else if currentUser.isAuthenticated}
        {@render children()}
    {:else}
        {#await goto(loginUrl)}{/await}
    {/if}
</App>
