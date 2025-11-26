<script lang="ts">
    import { page } from '$app/state';
    import { config } from '@config';
    import { identityApi } from '@lib/api/identity-api';
    import { t } from '@lib/i18n/i18n.svelte';
    import { logUser } from '@lib/loggers';
    import Typography from '@atoms/Typography.svelte';
    import Logo from '@atoms/icons/Logo.svelte';
    import { Dots } from '@atoms/icons/animated';
    import Button from '@atoms/inputs/Button.svelte';
    import Toggle from '@atoms/inputs/Toggle.svelte';
    import ValidatedTextArea from '@atoms/inputs/ValidatedTextArea.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Modal from '@atoms/layouts/Modal.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { afterBFCacheRestore } from '@atoms/types/bfcache';
    import { EmailSchema } from '@atoms/types/validator';
    import AppContent from '@components/AppContent.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import Turnstile from '@components/Turnstile.svelte';
    import { setDefaultCurrentUserStore } from '@features/account/currentUserStore.svelte';
    import { getExternalLoginProviders, getSanitizedReturnUrl } from '@features/account/providers.remote';
    import { providerIcon } from '@features/account/providers.svelte';
    import { getAssetUrls } from '@features/assets/assets.remote';

    let currentUserStore = setDefaultCurrentUserStore();
    currentUserStore.refresh();

    let prompt = $derived(page.url.searchParams.get('prompt'));
    let returnUrl = $derived.by(() => {
        const rawUrl = page.url.searchParams.get('returnUrl') ?? '';
        const target = decodeURIComponent(rawUrl) ?? '/game';
        const sanitizedURL = getSanitizedReturnUrl(target).current;
        if (sanitizedURL) {
            logUser(`Sanitized returnUrl: [${sanitizedURL}]`);
        }
        return sanitizedURL;
    });

    let providers = $derived(getExternalLoginProviders().current);

    type HintInfo = {
        loginText?: string;
        allowGuest: boolean;
    };
    let extraInfo: HintInfo = $derived.by(() => {
        let hint = page.url.searchParams.get('hint') || '';
        switch (hint) {
            case 'login-expired':
                return {
                    loginText: $t('login.info.loginExpired'),
                    allowGuest: true
                };
            case 'email-confirm':
                return {
                    loginText: $t('login.info.emailConfirm'),
                    allowGuest: false
                };
            case 'email-change':
                return {
                    loginText: $t('login.info.emailChange'),
                    allowGuest: false
                };
            default:
                return {
                    allowGuest: true
                };
        }
    });

    let hasCaptcha = !config.turnstile.disable;
    if (!hasCaptcha) {
        console.warn('Captcha is disabled');
    }

    // when captcha is disabled use a test (site) key that always passes the server side validation
    let captcha = $state(hasCaptcha ? '' : '1x00000000000000000000AA');
    let waitLoading = $state(true);
    let showLoading = $derived(waitLoading || !captcha || !returnUrl);
    let rememberMe = $state(true);

    let showEmailInput = $state(false);
    let email = $state('');
    let isEmailValid = $state(false);
    const emailLogin = () => {
        showEmailInput = true;
    };

    $effect(() => {
        if (returnUrl !== undefined) {
            if (!prompt) {
                if (currentUserStore.isContent && currentUserStore.content.isAuthenticated) {
                    logUser(`Redirecting user with an active session to ${returnUrl}`);
                    window.location.href = returnUrl;
                } else {
                    // if we have no authenticated user, try the token flow
                    // if it fails user will land on the error page, that should be redirected to the login with a prompt
                    logUser(`Trying the remember me token with returnUrl [${returnUrl}]`);
                    window.location.href = identityApi.getTokenLoginUrl(returnUrl);
                }
            } else {
                logUser('Prompt for login');
                setTimeout(
                    () => {
                        waitLoading = false;
                    },
                    hasCaptcha ? 5000 : 1000
                );
            }
        }
    });

    afterBFCacheRestore(() => {
        currentUserStore.refresh({ force: true });
    });
</script>

<AppContent layout="fullscreen">
    {#if currentUserStore.isError}
        <ErrorCard caption={$t('account.failedToLoadUserInfo')} error={currentUserStore.error}>
            {#snippet actions()}
                <Button onclick={() => currentUserStore.refresh({ force: true })}>{$t('common.retry')}</Button>
            {/snippet}
        </ErrorCard>
    {:else}
        {#await getAssetUrls(['loginBackground', 'loginBackground_alt']) then backgroundUrls}
            <div
                class="absolute pointer-events-none left-0 top-0 size-full bg-cover bg-center bg-no-repeat opacity-[0.25]"
                style="background-image: {backgroundUrls.map((url) => `url('${url}')`).join(', ')};"
            ></div>
        {/await}

        <Logo class="h-[20vh] lg:h-[20vh] w-full shrink-0 fill-current p-4 text-on-surface" />

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={0}>
            <Stack
                class="w-full shrink-0 p-2 lg:flex-1 lg:max-w-[70vw] lg:h-[70vh] lg:w-auto"
                justify={{ xs: 'center', lg: 'start' }}
                align={{ xs: 'center', lg: 'start' }}
            >
                <Typography variant="h1" class="hidden lg:block">{$t('login.title')}</Typography>
                <Typography variant="h3" class="hidden lg:block px-4">{extraInfo.loginText}</Typography>
                <Typography variant="h5" class="lg:hidden">{extraInfo.loginText ?? $t('login.title')}</Typography>
                <!-- <div
                            class="rounded border w-[80%] max-w-[600px] aspect-video ms-16 mt-16 my-auto overflow-hidden hidden lg:block"
                        >
                        </div> -->
            </Stack>

            <Stack align="center" justify={{ xs: 'start', lg: 'center' }}>
                <Box border padding={0} overflow="y" class="max-h-[40vh] lg:max-h-[55vh]">
                    <Stack class="m-4">
                        <Button
                            color="secondary"
                            wide
                            disabled={!captcha}
                            onclick={emailLogin}
                            startIcon={providerIcon('email')}
                            class="m-2"
                        >
                            {$t('login.email')}
                        </Button>
                        {#if providers && returnUrl}
                            {#each providers as provider (provider)}
                                <Button
                                    color="secondary"
                                    wide
                                    disabled={!captcha}
                                    href={identityApi.getExternalLoginUrl(provider, rememberMe, captcha, returnUrl)}
                                    startIcon={providerIcon(provider)}
                                    class="m-2"
                                >
                                    {provider}
                                </Button>
                            {/each}
                        {/if}
                    </Stack>
                </Box>

                <Toggle bind:value={rememberMe} onLabel={$t('login.rememberMe')} />
            </Stack>

            {#if currentUserStore.isAuthenticated || extraInfo.allowGuest}
                <div class="ms-4 h-auto w-px bg-on-surface hidden lg:block"></div>
                <div class="my-4 self-center w-[80vw] h-px bg-on-surface block lg:hidden"></div>

                <Stack direction="column" justify="center" align="center">
                    {#if currentUserStore.isAuthenticated}
                        <Button
                            color="secondary"
                            disabled={!captcha}
                            href={returnUrl}
                            startIcon={providerIcon('continue')}
                            class="m-2"
                        >
                            {currentUserStore.content.name}
                        </Button>
                    {/if}

                    {#if extraInfo.allowGuest && returnUrl}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!captcha}
                            href={identityApi.getGuestLoginUrl(captcha, returnUrl)}
                            startIcon={providerIcon('guest')}
                            class="m-2"
                        >
                            {$t('login.guest')}
                        </Button>
                    {/if}
                </Stack>
            {/if}
        </Stack>

        <Modal width="fit" hideOnClose open={showLoading} class="bg-info text-on-info">
            <Stack align="center">
                <Typography variant="h3">
                    {$t('login.loadingCaptcha')}
                    <Dots size="md" class="inline-block" />
                </Typography>
                {#if hasCaptcha}
                    <Turnstile siteKey={config.turnstile.siteKey} size="normal" bind:token={captcha} />
                {/if}
            </Stack>
        </Modal>

        <Modal open={!showLoading && showEmailInput} caption={$t('login.emailModalTitle')}>
            <Stack>
                <ValidatedTextArea
                    rows="single"
                    placeholder={$t('account.emailModal.update.newEmail')}
                    class="w-full"
                    validate={EmailSchema}
                    bind:text={email}
                    bind:valid={isEmailValid}
                />
                <Stack direction="row" spacing={1} class="justify-end">
                    <Button onclick={() => (showEmailInput = false)}>{$t('common.cancel')}</Button>
                    <Button
                        color="secondary"
                        disabled={!isEmailValid}
                        href={identityApi.getEmailLoginUrl(email, rememberMe, captcha, returnUrl!)}
                    >
                        {$t('login.emailModalContinue')}
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    {/if}
</AppContent>
