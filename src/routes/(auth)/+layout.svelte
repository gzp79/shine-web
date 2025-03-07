<script lang="ts">
    import { afterNavigate, goto } from '$app/navigation';
    import { page } from '$app/state';
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

    // For links we ask for prompt always, but once the prompt is completed, a silent parameter is added to the link URL
    // not to start en infinite loop of prompts
    let isPromptForLink = $derived(
        page.url.pathname.startsWith('/link') && page.url.searchParams.get('silent') !== 'true'
    );

    let loginUrl = $derived.by(() => {
        const targetPath = page.url.pathname;
        const targetParams = page.url.searchParams;

        const params = new URLSearchParams();
        if (targetPath.startsWith('/link')) {
            params.set('prompt', 'true');
            targetParams.set('silent', 'true');
            const hint = targetPath.split('/').pop();
            if (hint) {
                params.set('hint', hint);
            }
        }
        if ([...targetParams.entries()].length > 0) {
            params.set('target', `${targetPath}?${targetParams}`);
        } else {
            params.set('target', `${targetPath}`);
        }

        return `/login?${params.toString()}`;
    });

    $effect(() => {
        if (currentUser.isNull) {
            logUser('Refreshing current user...');
            currentUser.refresh();
        } else if (currentUser.isLoaded && !currentUser.isAuthenticated) {
            logUser('Login required');
            goto(loginUrl);
        } else if (isPromptForLink) {
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
    {:else if !currentUser.isLoaded || isPromptForLink}
        <AppContent>
            <div class="flex h-full items-center justify-center">
                <LoadingCard label={$t('common.loading')} />
            </div>
        </AppContent>
    {:else if currentUser.isAuthenticated}
        {@render children()}
    {/if}
</App>
