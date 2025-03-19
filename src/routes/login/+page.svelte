<script lang="ts">
    import { assets } from '$assets';
    import { config } from '$config';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { identityApi } from '$lib/api/identity-api';
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import { logUser } from '$lib/loggers';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import Modal from '$atoms/Modal.svelte';
    import Stack from '$atoms/Stack.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import Typography from '$atoms/Typography.svelte';
    import Logo from '$atoms/icons/Logo.svelte';
    import { Dots } from '$atoms/icons/animated';
    import ErrorCard from '$components/ErrorCard.svelte';
    import Turnstile from '$components/Turnstile.svelte';
    import { setCurrentUserStore } from '$features/account/currentUser.svelte';
    import { providerIcon } from '$features/account/providers.svelte';

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
    $effect(() => {
        currentUserStore.refresh();
    });

    let prompt = $derived(page.url.searchParams.get('prompt'));
    let redirectUrl = $derived.by(() => {
        const target = page.url.searchParams.get('target');
        return target ? `${decodeURIComponent(target)}` : '/game';
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

    $effect(() => {
        if (!prompt) {
            if (currentUserStore.isContent && currentUserStore.content.isAuthenticated) {
                logUser(`Redirecting user with an active session to ${redirectUrl}`);
                goto(redirectUrl);
            } else {
                const target = page.url.searchParams.get('target');
                const loginUrl = target ? `/login?prompt=true&target=${target}` : '/login?prompt=true';
                logUser(`Trying the remember me token with redirectUrl [${redirectUrl}] and loginUrl [${loginUrl}]`);
                window.location.href = identityApi.getTokenLoginUrl(redirectUrl, loginUrl);
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
</script>

<App>
    <AppContent>
        {#if currentUserStore.isEmpty}
            <LoadingCard label={$t('common.loading')} />
        {:else if currentUserStore.isError}
            <ErrorCard caption={$t('account.failedToLoadUserInfo')} error={currentUserStore.error}>
                {#snippet actions()}
                    <Button onclick={() => currentUserStore.refresh()}>{$t('common.retry')}</Button>
                {/snippet}
            </ErrorCard>
        {:else}
            <Stack align="center" justify="evenly" class="relative">
                <div
                    class="absolute pointer-events-none left-0 top-0 size-full bg-cover bg-center bg-no-repeat opacity-[0.25]"
                    style="background-image: url('{assets.loginBackground}'), url('{assets.loginBackground_alt}');"
                ></div>

                <Logo class="h-[20%] w-full fill-current p-4 text-on-surface" />
                <Stack direction="row" align="center" justify="evenly" class="h-[70%] p-8">
                    <Stack direction="column" align="start" justify="start" class="w-full hidden lg:block">
                        <Typography variant="h1">{$t('login.title')}</Typography>
                    </Stack>

                    <Stack direction="row" align="center" justify="center" class="h-full">
                        <Stack align="center" justify="center">
                            <Box border class="overflow-y-auto px-8 py-2 min-h-32 max-h-min">
                                <Stack align="center" justify="center">
                                    {#each data.providers as provider}
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
                                </Stack>
                            </Box>

                            <Toggle bind:value={rememberMe} onLabel={$t('login.rememberMe')} />
                        </Stack>

                        <div class="mx-2 h-full border-l border-on-surface md:mx-8"></div>

                        <Stack align="center" justify="center">
                            {#if currentUserStore.content.isAuthenticated}
                                <Button
                                    color="secondary"
                                    disabled={!captcha}
                                    href={redirectUrl}
                                    startIcon={providerIcon('continue')}
                                    class="m-2"
                                >
                                    {$t('login.continueAs', { name: currentUserStore.content.name })}
                                </Button>
                            {/if}

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
                        </Stack>
                    </Stack>
                </Stack>

                <Modal isOpen={showLoading} class="bg-info text-on-info">
                    <Typography variant="h3">
                        {$t('login.loadingCaptcha')}
                        <Dots class="inline-block h-8 w-8" />
                    </Typography>
                </Modal>

                {#if hasCaptcha}
                    <div class="hidden">
                        <Turnstile siteKey={config.turnstile.siteKey} size="compact" bind:token={captcha} />
                    </div>
                {/if}
            </Stack>
        {/if}
    </AppContent>
</App>
