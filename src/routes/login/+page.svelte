<script lang="ts">
    import { page } from '$app/state';
    import { assets } from '$assets';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import Logo from '$atoms/icons/Logo.svelte';
    import { Dots } from '$atoms/icons/animated';
    import Turnstile from '$components/Turnstile.svelte';
    import Modal from '$components/atoms/Modal.svelte';
    import Typography from '$components/atoms/Typography.svelte';
    import { config } from '$config';
    import { providerIcon } from '$lib/account/utils.svelte';
    import { identityApi } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { logUser } from '$lib/loggers';
    import { onMount } from 'svelte';

    interface Props {
        data: {
            providers: string[];
        };
    }
    let { data }: Props = $props();

    let redirectUrl = $derived.by(() => {
        const target = page.url.searchParams.get('target');
        return target ? `/game/${decodeURIComponent(target)}` : '/game';
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

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const prompt = params.get('prompt');

        if (!prompt) {
            const target = page.url.searchParams.get('target');
            const loginUrl = target ? `/login?prompt=true&target=${target}` : '/login?prompt=true';
            window.location.href = identityApi.getTokenLoginUrl(redirectUrl, loginUrl);
            logUser(`Trying the remember me token with redirectUrl [${redirectUrl}] and loginUrl [${loginUrl}]`);
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
        <div class="flex h-full flex-col items-center">
            <Box border class="mx-0 h-full w-full overflow-y-auto px-8 py-2">
                <div class="flex flex-col items-center justify-center">
                    {#each data.providers as provider}
                        <Button
                            variant="outline"
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

        <Button
            color="primary"
            disabled={!captcha}
            href={identityApi.getGuestLoginUrl(captcha, redirectUrl)}
            startIcon={providerIcon('guest')}
            class="m-0"
        >
            {$t('login.guest')}
        </Button>
    </div>

    <Modal isOpen={showLoading} innerClass="bg-info text-on-info">
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
