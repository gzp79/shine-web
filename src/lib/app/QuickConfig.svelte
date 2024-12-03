<script lang="ts">
    import InputGroup from '$atoms/InputGroup.svelte';
    import LangSwitch from '$lib/i18n/LangSwitch.svelte';
    import ThemeSwitch from '$lib/theme/ThemeSwitch.svelte';
</script>

<InputGroup variant="ghost">
    <LangSwitch />
    <ThemeSwitch />
</InputGroup>
