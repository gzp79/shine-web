<script lang="ts">
    import { identityApi } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { config } from '$config';
    import Turnstile from '$components/Turnstile.svelte';
    import Button from '$atoms/Button.svelte';
    import Box from '$atoms/Box.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import Logo from '$atoms/icons/Logo.svelte';
    import * as icons from '$atoms/icons/social';
    import { onMount, type Component } from 'svelte';
    import { assets } from '$assets';
    import Typography from '$components/atoms/Typography.svelte';
    import { Dots } from '$atoms/icons/animated';

    interface Props {
        data: {
            providers: string[];
        };
    }

    let { data }: Props = $props();

    let captcha = $state('');
    let showLoading = $state(true);
    let rememberMe = $state(true);

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const prompt = params.get('prompt');

        if (!prompt) {
            window.location.href = identityApi.getTokenLoginUrl('/game', '/login?prompt=true');
            console.log('Trying the remember me path');
        } else {
            console.log('Prompt for login');
            setTimeout(() => {
                showLoading = false;
            }, 5000); // 5 seconds
        }
    });

    const providerIcon = (provider: string): Component | undefined => {
        switch (provider) {
            case 'google':
                return icons.Google;
            case 'twitter':
                return icons.Twitter;
            case 'github':
                return icons.Github;
            case 'discord':
                return icons.Discord;
            //case 'guest': return icons.Guest;
            //case 'gitlab': return icons.Gitlab;
            default:
                return undefined;
        }
    };
</script>

<div class="relative flex h-full flex-col items-center justify-center">
    <div
        class="pointer-events-none absolute left-0 top-0 size-full bg-cover bg-center bg-no-repeat opacity-[0.1] grayscale"
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
                            href={identityApi.getExternalLoginUrl(provider, rememberMe, captcha, '/game')}
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
            href={identityApi.getGuestLoginUrl(captcha, '/game')}
            startIcon={providerIcon('guest')}
            class="m-0"
        >
            {$t('login.guest')}
        </Button>
    </div>

    {#if showLoading || !captcha}
        <div class="absolute inset-0 flex select-none items-center justify-center p-4 backdrop-blur-sm">
            <Typography variant="h3" class="rounded-lg border border-on-surface bg-info p-2 text-on-info">
                {$t('login.loadingCaptcha')}
                <Dots class="inline-block h-8 w-8" />
            </Typography>
        </div>
    {/if}

    <div class="hidden">
        <Turnstile siteKey={config.turnstile.siteKey} size="compact" bind:token={captcha} />
    </div>
</div>
