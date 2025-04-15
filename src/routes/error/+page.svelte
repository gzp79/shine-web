<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
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
            logUser(`Redirecting to login page (${errorType})`);
            return targetUrl ? `/login?prompt=true&target=${encodeURIComponent(targetUrl)}` : '/login?prompt=true';
        }

        return '';
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

{#if redirectUrl}
    {goto(redirectUrl)}
{:else}
    <ErrorCard error={{ errorKind: 'other', message }}>
        {#snippet actions()}
            <Button color="primary" href={targetUrl || '/game'}>{$t('common.back')}</Button>
        {/snippet}
    </ErrorCard>
{/if}
