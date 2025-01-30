<script lang="ts">
    import { afterNavigate, goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Button from '$atoms/Button.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import { logUser } from '$lib/loggers';
    import { type Snippet, onMount } from 'svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    let currentUser = currentUserStore();

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

    $effect(() => {
        if (currentUser.isNull) {
            logUser('Refreshing current user...');
            currentUser.refresh();
        } else if (currentUser.isLoaded && !currentUser.isAuthenticated) {
            logUser('Login required');
            goto(loginUrl);
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
        <!-- {:else}
        {void goto(loginUrl)} -->
    {/if}
</App>
