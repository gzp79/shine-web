<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { identityApi } from '$lib/api/identity-api';
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import { logUser } from '$lib/loggers';
    import { assets } from '@assets';
    import { config } from '@config';
    import Box from '@atoms/Box.svelte';
    import Button from '@atoms/Button.svelte';
    import LoadingCard from '@atoms/LoadingCard.svelte';
    import Modal from '@atoms/Modal.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Toggle from '@atoms/Toggle.svelte';
    import Typography from '@atoms/Typography.svelte';
    import Logo from '@atoms/icons/Logo.svelte';
    import { Dots } from '@atoms/icons/animated';
    import { afterBFCacheRestore } from '@atoms/types/bfcache';
    import { EmailSchema } from '@atoms/types/validator';
    import ErrorCard from '@components/ErrorCard.svelte';
    import Turnstile from '@components/Turnstile.svelte';
    import ValidatedTextArea from '@components/ValidatedTextArea.svelte';
    import { setCurrentUserStore } from '@features/account/currentUser.svelte';
    import { providerIcon } from '@features/account/providers.svelte';

    interface Props {
        data: {
            providers: string[];
        };
    }
    let { data }: Props = $props();

    let currentUserStore = setCurrentUserStore({
        load: () => identityApi.getCurrentUser(fetch),
        startEmailConfirmation: () => identityApi.startEmailConfirmation(),
        startEmailChange: (email: string) => identityApi.startEmailChange(email),
        getLogoutUrl: (all: boolean, redirectUrl: string) => identityApi.getLogoutUrl(all, redirectUrl)
    });

    let prompt = $derived(page.url.searchParams.get('prompt'));
    let redirectUrl = $derived.by(() => {
        const target = page.url.searchParams.get('redirectUrl');
        return target ? `${decodeURIComponent(target)}` : '/game';
    });

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
    let showLoading = $derived(waitLoading || !captcha);
    let rememberMe = $state(true);
    let providers = $state(data.providers.sort());

    let showEmailInput = $state(false);
    let email = $state('');
    let isEmailValid = $state(false);
    const emailLogin = () => {
        showEmailInput = true;
    };

    $effect(() => {
        if (!prompt) {
            if (currentUserStore.isContent && currentUserStore.content.isAuthenticated) {
                logUser(`Redirecting user with an active session to ${redirectUrl}`);
                goto(redirectUrl);
            } else {
                // if we have no authenticated user, try the token flow
                // if it fails user will land on the error page, that should be redirected to the login with a prompt
                logUser(`Trying the remember me token with redirectUrl [${redirectUrl}]`);
                window.location.href = identityApi.getTokenLoginUrl(redirectUrl);
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
    });

    $effect(() => {
        currentUserStore.refresh();
    });
    afterBFCacheRestore(() => {
        currentUserStore.refresh({ force: true });
    });
</script>

<App>
    <AppContent>
        {#if currentUserStore.isEmpty}
            <LoadingCard label={$t('common.loading')} />
        {:else if currentUserStore.isError}
            <ErrorCard caption={$t('account.failedToLoadUserInfo')} error={currentUserStore.error}>
                {#snippet actions()}
                    <Button onclick={() => currentUserStore.refresh({ force: true })}>{$t('common.retry')}</Button>
                {/snippet}
            </ErrorCard>
        {:else}
            <div class="relative flex flex-col h-full">
                <div
                    class="absolute pointer-events-none left-0 top-0 size-full bg-cover bg-center bg-no-repeat opacity-[0.25]"
                    style="background-image: url('{assets.loginBackground}'), url('{config.assetUrl}/{assets.loginBackground_alt}');"
                ></div>

                <Logo class="h-[20%] w-full shrink-0 fill-current p-4 text-on-surface" />

                <div
                    class="flex flex-col h-[80%] p-4 gap-2 overflow-hidden
                            md:flex-row"
                >
                    <div
                        class="flex flex-col w-full shrink-0 items-center p-2
                                md:h-[80%] md:w-auto md:flex-1 md:max-w-[70%] md:items-start"
                    >
                        <Typography variant="h1" class="hidden md:block">{$t('login.title')}</Typography>
                        {#if extraInfo.loginText}
                            <Typography variant="h3" class="px-4">{extraInfo.loginText}</Typography>
                        {:else}
                            <Typography variant="h2" class="md:hidden">{$t('login.title')}</Typography>
                        {/if}
                        <!-- <div
                            class="rounded border w-[80%] max-w-[600px] aspect-video ms-16 mt-16 my-auto overflow-hidden hidden md:block"
                        >                           
                        </div> -->
                    </div>

                    <div
                        class="flex flex-col max-h-[60%] p-2 overflow-hidden items-center
                               md:flex-none md:self-center"
                    >
                        <Box border class="overflow-y-auto max-h-min">
                            <div class="flex flex-col gap-2 items-center py-2">
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
                                {#each providers as provider (provider)}
                                    <Button
                                        color="secondary"
                                        wide
                                        disabled={!captcha}
                                        href={identityApi.getExternalLoginUrl(
                                            provider,
                                            rememberMe,
                                            captcha,
                                            redirectUrl
                                        )}
                                        startIcon={providerIcon(provider)}
                                        class="m-2"
                                    >
                                        {provider}
                                    </Button>
                                {/each}
                            </div>
                        </Box>

                        <div class="pt-2 shrink-0">
                            <Toggle bind:value={rememberMe} onLabel={$t('login.rememberMe')} />
                        </div>
                    </div>

                    {#if currentUserStore.content.isAuthenticated || extraInfo.allowGuest}
                        <div class="mx-2 h-[80%] w-0 self-center border-l border-on-surface hidden md:block"></div>
                        <div class="my-2 w-[80%] h-0 self-center border-t border-on-surface block md:hidden"></div>

                        <div
                            class="flex flex-col gap-2 bg-gray-200 p-2 rounded shrink-0 items-center
                                    md:self-center"
                        >
                            {#if currentUserStore.content.isAuthenticated}
                                <Button
                                    color="secondary"
                                    disabled={!captcha}
                                    href={redirectUrl}
                                    startIcon={providerIcon('continue')}
                                    class="m-2"
                                >
                                    {currentUserStore.content.name}
                                </Button>
                            {/if}

                            {#if extraInfo.allowGuest}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!captcha}
                                    href={identityApi.getGuestLoginUrl(captcha, redirectUrl)}
                                    startIcon={providerIcon('guest')}
                                    class="m-2"
                                >
                                    {$t('login.guest')}
                                </Button>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>

            {#if hasCaptcha}
                <div class="hidden">
                    <Turnstile siteKey={config.turnstile.siteKey} size="compact" bind:token={captcha} />
                </div>
            {/if}

            <Modal isOpen={showLoading} class="bg-info text-on-info">
                <Typography variant="h3">
                    {$t('login.loadingCaptcha')}
                    <Dots class="inline-block h-8 w-8" />
                </Typography>
            </Modal>

            <Modal isOpen={!showLoading && showEmailInput} caption={$t('login.emailModalTitle')}>
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
                            href={identityApi.getEmailLoginUrl(email, rememberMe, captcha, redirectUrl)}
                        >
                            {$t('login.emailModalContinue')}
                        </Button>
                    </Stack>
                </Stack>
            </Modal>
        {/if}
    </AppContent>
</App>
