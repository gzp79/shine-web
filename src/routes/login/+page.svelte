<script lang="ts">
    import { identityApi } from '$src/lib/api/identity-api';
    import { languageStore } from '$lib/i18n/i18n.svelte';
    import { themeStore } from '$lib/theme/theme.svelte';
    import Turnstile from '$components/Turnstile.svelte';
    import Button from '$atoms/Button.svelte';
    import config from '../../config';
    import AppContent from '$src/lib/app/AppContent.svelte';

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

<AppContent>
    <Turnstile
        siteKey={config.turnstile.siteKey}
        theme={captchaTheme}
        size="compact"
        language={captchaLang}
        bind:token={captcha}
    />
    <Button disabled={!captcha} href={identityApi.getGuestLoginUrl(captcha, '/game')}>Guest</Button>
</AppContent>
