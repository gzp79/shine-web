<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { type Snippet } from 'svelte';
    import LangSwitch from '@lib/i18n/LangSwitch.svelte';
    import { refreshLanguage } from '@lib/i18n/i18n.svelte';
    import ThemeSwitch from '@lib/theme/ThemeSwitch.svelte';
    import { refreshTheme } from '@lib/theme/theme.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import App from '@components/App.svelte';
    import AppToolbar from '@components/AppToolbar.svelte';
    import '../app.css';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    afterNavigate(() => {
        refreshTheme();
        refreshLanguage();
    });
</script>

<App>
    <AppToolbar>
        <InputGroup size="sm" vertical>
            <LangSwitch />
            <ThemeSwitch />
        </InputGroup>
    </AppToolbar>

    {@render children()}
</App>
