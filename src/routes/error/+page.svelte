<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import App from '@lib/app/App.svelte';
    import AppContent from '@lib/app/AppContent.svelte';
    import { t } from '@lib/i18n/i18n.svelte';
    import { logUser } from '@lib/loggers';
    import Button from '@atoms/Button.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';

    let errorType = $derived(page.url.searchParams.get('type'));
    //let errorStatus = $derived(page.url.searchParams.get('status'));
    let targetUrl = $derived(page.url.searchParams.get('redirectUrl'));

    let redirectUrl = $derived.by(() => {
        if (
            errorType === 'auth-login-required' ||
            errorType === 'auth-token-expired' ||
            errorType === 'auth-error' ||
            errorType === 'auth-session-expired'
        ) {
            let params: Record<string, string> = {
                prompt: 'true'
            };
            if (errorType !== 'auth-login-required') {
                params['hint'] = 'login-expired';
            }
            if (targetUrl) {
                params['target'] = encodeURIComponent(targetUrl);
            }
            const searchParams = new URLSearchParams(params);
            return `/login?${searchParams}`;
        } else if (errorType === 'auth-email-login') {
            return 'public/email-login';
        }

        return undefined;
    });

    $effect(() => {
        if (redirectUrl) {
            logUser(`Redirecting to ${redirectUrl}`);
            {
                goto(redirectUrl);
            }
        }
    });

    let message = $derived.by(() => {
        switch (errorType) {
            case 'auth-register-external-id-conflict':
                return $t('error.authRegisterExternalIdConflict');
            default:
                return page.error?.message ?? '';
        }
    });
</script>

{#if !redirectUrl}
    <App>
        <AppContent>
            <ErrorCard error={{ errorKind: 'other', message }}>
                {#snippet actions()}
                    <Button color="primary" href={targetUrl || '/game'}>{$t('common.back')}</Button>
                {/snippet}
            </ErrorCard>
        </AppContent>
    </App>
{/if}
