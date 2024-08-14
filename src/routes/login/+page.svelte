<script lang="ts">
    import Button from '$components/Button.svelte';
    import Turnstile from '$components/Turnstile.svelte';
    import { identityApi } from '$lib/api/identity_api';
    import { languageStore } from '$lib/i18n/i18n.svelte';
    import { themeStore } from '$lib/theme/theme.svelte';
    import ThemeSwitch from '$lib/theme/ThemeSwitch.svelte';

    interface Props {
        data: {
            providers: string[];
        };
    }

    let { data }: Props = $props();

    const theme = themeStore();
    const language = languageStore();

    let captcha = $state('');
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

{#each data.providers as provider}
    <h1>{provider}</h1>
{/each}

<ThemeSwitch />
<Turnstile
    siteKey="3x00000000000000000000FF"
    theme={captchaTheme}
    size="compact"
    language={captchaLang}
    bind:token={captcha}
/>
captcha: {captcha}
<Button label="Guest" disabled={!captcha} href={identityApi.getGuestLoginUrl(captcha, '/game')} />
<a href="/design">Design</a>
