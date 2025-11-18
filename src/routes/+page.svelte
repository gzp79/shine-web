<script lang="ts">
    import LangSwitch from '@lib/i18n/LangSwitch.svelte';
    import ThemeSwitch from '@lib/theme/ThemeSwitch.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import App from '@components/App.svelte';
    import AppContent from '@components/AppContent.svelte';
    import AppToolbar from '@components/AppToolbar.svelte';
</script>

<App>
    <AppToolbar>
        <InputGroup size="sm" vertical>
            <LangSwitch />
            <ThemeSwitch />
        </InputGroup>
    </AppToolbar>
    <AppContent layout="centered">
        <Button href="/game" preload="code" color="secondary" size="lg">Play</Button>
    </AppContent>
</App>
