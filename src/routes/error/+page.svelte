<script lang="ts">
    import { page } from '$app/state';
    import App from '@components/App.svelte';
    import AppContent from '@components/AppContent.svelte';
    import { t } from '@lib/i18n/i18n.svelte';
    import { logUser } from '@lib/loggers';
    import Button from '@atoms/inputs/Button.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';

    let errorType = $derived(page.url.searchParams.get('type'));
    //let errorStatus = $derived(page.url.searchParams.get('status'));
    let returnUrl = $derived(page.url.searchParams.get('returnUrl'));

    // For some error types, we want to automatically redirect the user
    let autoReturnUrl = $derived.by(() => {
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
            if (returnUrl) {
                params['target'] = encodeURIComponent(returnUrl);
            }
            const searchParams = new URLSearchParams(params);
            return `/login?${searchParams}`;
        } else if (errorType === 'auth-email-login') {
            return 'public/email-login';
        }

        return undefined;
    });

    $effect(() => {
        if (autoReturnUrl) {
            logUser(`Redirecting to ${autoReturnUrl}`);
            {
                window.location.href = autoReturnUrl;
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

{#if !autoReturnUrl}
    <App>
        <AppContent>
            <ErrorCard error={{ errorKind: 'other', message }}>
                {#snippet actions()}
                    <Button color="primary" href={returnUrl || '/game'}>{$t('common.back')}</Button>
                {/snippet}
            </ErrorCard>
        </AppContent>
    </App>
{/if}
