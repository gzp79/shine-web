<script lang="ts">
    import Button from '@atoms/Button.svelte';
    import { Dark, DarkAndLight, Light } from '@atoms/icons/common';
    import { themeStore } from './theme.svelte';

    let theme = themeStore();

    let icon = $derived.by(() => {
        switch (theme.current) {
            case 'dark':
                return Dark;
            case 'light':
                return Light;
            default:
                return DarkAndLight;
        }
    });
</script>

<Button
    variant="ghost"
    startIcon={icon}
    onclick={() => {
        switch (theme.current) {
            case 'dark':
                theme.current = 'light';
                break;
            case 'light':
                theme.current = 'system';
                break;
            default:
                theme.current = 'dark';
                break;
        }
    }}
/>
