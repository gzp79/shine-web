<script lang="ts">
    import { afterNavigate, goto } from '$app/navigation';
    import { page } from '$app/state';
    import { identityApi } from '$lib/api/identity-api';
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import { logUser } from '$lib/loggers';
    import { type Snippet, onMount } from 'svelte';
    import Button from '@atoms/Button.svelte';
    import LoadingCard from '@atoms/LoadingCard.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import { setCurrentUserStore } from '@features/account/currentUser.svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    let currentUserStore = setCurrentUserStore({
        load: () => identityApi.getCurrentUser(fetch),
        startEmailConfirmation: () => identityApi.startEmailConfirmation(),
        startEmailChange: (email: string) => identityApi.startEmailChange(email),
        getLogoutUrl: (all: boolean, redirectUrl: string) => identityApi.getLogoutUrl(all, redirectUrl)
    });
    $effect(() => {
        currentUserStore.refresh();
    });

    // For links we ask for prompt always, but once the prompt is completed, a silent parameter is added to the link URL
    // not to start en infinite loop of prompts
    let isPromptForLink = $derived(
        page.url.pathname.startsWith('/link') && page.url.searchParams.get('silent') !== 'true'
    );

    let loginUrl = $derived.by(() => {
        const targetPath = page.url.pathname;
        const targetParams = page.url.searchParams;
        const hint = page.url.searchParams.get('hint') || '';

        const params = new URLSearchParams();
        if (targetPath.startsWith('/link')) {
            params.set('prompt', 'true');
            targetParams.set('silent', 'true');
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
        if (currentUserStore.isContent && !currentUserStore.content.isAuthenticated) {
            logUser('Login required');
            goto(loginUrl);
        } else if (isPromptForLink) {
            goto(loginUrl);
        }
    });

    onMount(() => {
        const handleDocumentVisibility = async () => {
            if (document.visibilityState === 'visible') {
                logUser('Refresh user after document focus...');
                currentUserStore.refresh();
            }
        };

        document.addEventListener('visibilitychange', handleDocumentVisibility);

        return () => {
            document.removeEventListener('visibilitychange', handleDocumentVisibility);
        };
    });

    afterNavigate(() => {
        logUser('Refresh user after navigation...');
        currentUserStore.refresh();
    });
</script>

<App>
    {#if currentUserStore.isError}
        <AppContent>
            <div class="flex h-full items-center justify-center">
                <ErrorCard caption={$t('account.failedToLoadUserInfo')} error={currentUserStore.error}>
                    {#snippet actions()}
                        <Button onclick={() => currentUserStore.refresh({ force: true })}>{$t('common.retry')}</Button>
                    {/snippet}
                </ErrorCard>
            </div>
        </AppContent>
    {:else if currentUserStore.isEmpty || isPromptForLink}
        <AppContent>
            <div class="flex h-full items-center justify-center">
                <LoadingCard label={$t('common.loading')} />
            </div>
        </AppContent>
    {:else if currentUserStore.content.isAuthenticated}
        {@render children()}
    {/if}
</App>
