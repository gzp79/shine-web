<script lang="ts">
    import { identityApi } from '$lib/api/identity-api';
    import { languageStore } from '$lib/i18n/i18n.svelte';
    import { themeStore } from '$lib/theme/theme.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import Turnstile from '$components/Turnstile.svelte';
    import Button from '$atoms/Button.svelte';
    import Menu from '$atoms/SimpleMenu.svelte';
    import MenuItem from '$atoms/SimpleMenuItem.svelte';
    import { config } from '$config';
    import Toggle from '$components/atoms/Toggle.svelte';

    interface Props {
        data: {
            providers: string[];
        };
    }

    let { data }: Props = $props();

    const theme = themeStore();
    const language = languageStore();

    let captcha = $state('');
    let rememberMe = $state(true);

    const captchaTheme = $derived.by(() => {
        if (theme.current === 'dark') {
            return 'dark';
        } else if (theme.current === 'light') {
            return 'light';
        } else {
            return 'auto';
        }
    });
    const captchaLang = $derived(language.current);
</script>

<AppContent>
    <div class="flex flex-col items-center justify-center">
        <Menu>
            {#each data.providers as provider}
                <MenuItem
                    ><Button
                        disabled={!captcha}
                        href={identityApi.getExternalLoginUrl(provider, rememberMe, captcha, '/game')}
                        >{provider}</Button
                    ></MenuItem
                >
            {/each}
            <Button disabled={!captcha} href={identityApi.getGuestLoginUrl(captcha, '/game')}>Guest</Button>
        </Menu>
        <Toggle bind:value={rememberMe} onLabel="Remember me"></Toggle>

        <Turnstile
            siteKey={config.turnstile.siteKey}
            theme={captchaTheme}
            size="compact"
            language={captchaLang}
            bind:token={captcha}
        />
    </div>
</AppContent>
