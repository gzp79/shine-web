<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { refreshLanguage } from '$lib/i18n/i18n.svelte';
    import { refreshTheme } from '$lib/theme/theme.svelte';
    import '../app.css';

    afterNavigate(() => {
        refreshTheme();
        refreshLanguage();
    });
</script>

<slot />
