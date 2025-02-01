<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import Button from '$atoms/Button.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import LoadingCard from '$components/atoms/LoadingCard.svelte';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    let redirectUrl = $derived.by(() => {
        const target = page.url.searchParams.get('target');
        return target ? `/game/${decodeURIComponent(target)}` : '/game';
    });

    const currentUser = currentUserStore();
    $effect(() => {
        if (currentUser.isNull) currentUser.refresh();
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
        {void goto(redirectUrl)}
    {:else}
        {@render children()}
    {/if}
</App>
