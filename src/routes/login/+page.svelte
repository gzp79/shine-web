<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { assets } from '$assets';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import Logo from '$atoms/icons/Logo.svelte';
    import { Dots } from '$atoms/icons/animated';
    import Turnstile from '$components/Turnstile.svelte';
    import ErrorCard from '$components/atoms/ErrorCard.svelte';
    import LoadingCard from '$components/atoms/LoadingCard.svelte';
    import Modal from '$components/atoms/Modal.svelte';
    import Typography from '$components/atoms/Typography.svelte';
    import { config } from '$config';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import { providerIcon } from '$lib/account/utils.svelte';
    import { identityApi } from '$lib/api/identity-api';
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import { logUser } from '$lib/loggers';

    interface Props {
        data: {
            providers: string[];
        };
    }
    let { data }: Props = $props();

    const currentUser = currentUserStore();
    $effect(() => {
        if (currentUser.isNull) currentUser.refresh();
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
            if (currentUser.isAuthenticated) {
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
                <LoadingCard label={$t('common.loading')} />
            </div>
        </AppContent>
    {:else}
        <div class="relative flex h-full flex-col items-center justify-center">
            <div
                class="pointer-events-none absolute left-0 top-0 size-full bg-cover bg-center bg-no-repeat opacity-[0.25]"
                style="background-image: url('{assets.loginBackground}'), url('{assets.loginBackground_alt}');"
            ></div>

            <Logo class="h-[20%] w-full fill-current p-4 text-on-surface" />
            <div class="justify-cetner mb-4 flex h-[70%] flex-row items-center">
                <div class="me-8 flex h-full w-0 items-center justify-start overflow-clip lg:w-[50vw]">
                    <Typography variant="h1">{$t('login.title')}</Typography>
                </div>

                <div class="flex h-full flex-col items-center justify-center">
                    <Box border class="mx-0 h-full w-full overflow-y-auto px-8 py-2 min-h-32 max-h-min">
                        <div class="flex flex-col items-center justify-center">
                            {#each data.providers as provider}
                                <Button
                                    color="secondary"
                                    wide
                                    disabled={!captcha}
                                    href={identityApi.getExternalLoginUrl(provider, rememberMe, captcha, redirectUrl)}
                                    startIcon={providerIcon(provider)}
                                    class="m-2"
                                >
                                    {provider}
                                </Button>
                            {/each}
                        </div>
                    </Box>

                    <Toggle bind:value={rememberMe} onLabel={$t('login.rememberMe')} />
                </div>

                <div class="mx-3 h-full border-l border-on-surface md:mx-8"></div>

                <div class="flex h-full flex-col items-center justify-center">
                    {#if currentUser.isAuthenticated}
                        <Button
                            color="secondary"
                            disabled={!captcha}
                            href={redirectUrl}
                            startIcon={providerIcon('continue')}
                            class="m-2"
                        >
                            {$t('login.continueAs', { name: currentUser.user.name })}
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
                </div>
            </div>

            <Modal isOpen={showLoading} class="bg-info text-on-info">
                <Typography variant="h3">
                    {$t('login.loadingCaptcha')}
                    <Dots class="inline-block h-8 w-8" />
                </Typography>
            </Modal>

            <div class="hidden">
                {#if hasCaptcha}
                    <Turnstile siteKey={config.turnstile.siteKey} size="compact" bind:token={captcha} />
                {/if}
            </div>
        </div>
    {/if}
</App>
