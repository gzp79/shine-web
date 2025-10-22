<script lang="ts">
    import { page } from '$app/state';
    import App from '@lib/app/App.svelte';
    import AppContent from '@lib/app/AppContent.svelte';
    import { t } from '@lib/i18n/i18n.svelte';
    import { logUser } from '@lib/loggers';
    import Button from '@atoms/Button.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import type { Hint } from '../login/+page.svelte';

    let errorType = $derived(page.url.searchParams.get('type'));
    //let errorStatus = $derived(page.url.searchParams.get('status'));

    type Handler = {
        url: string;
        message: string;
        auto: boolean;
    };
    let handler: Handler = $derived.by(() => {
        let returnUrl = page.url.searchParams.get('returnUrl');

        const handler: Handler = {
            url: '/game',
            message: page.error?.message ?? '',
            auto: false
        };

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
                const hint: Hint = 'login-expired';
                params['hint'] = hint;
            }
            if (returnUrl) {
                params['returnUrl'] = encodeURIComponent(returnUrl);
            }
            const searchParams = new URLSearchParams(params);

            handler.url = `/login?${searchParams}`;
            handler.auto = errorType !== 'auth-error';
        } else if (errorType === 'auth-email-login') {
            handler.url = 'public/email-login';
            handler.auto = true;
        } else if (errorType === 'auth-register-external-id-conflict') {
            handler.url = '/account';
            handler.message = $t('error.authRegisterExternalIdConflict');
            handler.auto = false;
        }

        return handler;
    });

    $effect(() => {
        if (handler.auto) {
            logUser(`Redirecting to ${handler.url}`);
            window.location.href = handler.url;
        }
    });
</script>

<App>
    <AppContent>
        {#if !handler.auto}
            <ErrorCard error={{ errorKind: 'other', message: handler.message }}>
                {#snippet actions()}
                    <Button color="primary" href={handler.url}>{$t('common.back')}</Button>
                {/snippet}
            </ErrorCard>
        {/if}
    </AppContent>
</App>
