<script lang="ts">
    import LangSwitch from '$lib/i18n/LangSwitch.svelte';
    import ThemeSwitch from '$lib/theme/ThemeSwitch.svelte';
    import InputGroup from '$atoms/InputGroup.svelte';
</script>

<InputGroup variant="ghost">
    <LangSwitch />
    <ThemeSwitch />
</InputGroup>
