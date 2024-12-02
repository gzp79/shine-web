<script lang="ts">
    import { identityApi } from '$lib/api/identity-api';
    import { languageStore } from '$lib/i18n/i18n.svelte';
    import { config } from '$config';
    import Turnstile from '$components/Turnstile.svelte';
    import Button from '$atoms/Button.svelte';
    import Box from '$atoms/Box.svelte';
    import Toggle from '$atoms/Toggle.svelte';
    import Logo from '$atoms/icons/Logo.svelte';
    import * as icons from '$atoms/icons/social';
    import type { Component } from 'svelte';

    interface Props {
        data: {
            providers: string[];
        };
    }

    let { data }: Props = $props();

    const language = languageStore();

    let captcha = $state('');
    let rememberMe = $state(true);

    const captchaLang = $derived(language.current);

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

<div class="flex h-full flex-col items-center justify-center">
    <Logo class="h-[30%] w-full bg-surface fill-current p-4 text-on-surface" />
    <div class="justify-cetner mb-4 flex h-[70%] flex-row items-center overflow-hidden">
        <div class="me-8 h-full lg:w-[50vw]"></div>
        <div class="flex h-full flex-col items-center overflow-hidden">
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
            <Toggle bind:value={rememberMe} onLabel="Remember me" />
        </div>

        <div class="mx-8 h-full border-l border-on-surface"></div>

        <Button
            color="primary"
            disabled={!captcha}
            href={identityApi.getGuestLoginUrl(captcha, '/game')}
            startIcon={providerIcon('guest')}
            class="m-0"
        >
            Guest
        </Button>
    </div>

    <Turnstile siteKey={config.turnstile.siteKey} size="compact" language={captchaLang} bind:token={captcha} />
</div>
