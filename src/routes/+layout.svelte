<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { type Snippet } from 'svelte';
    import { refreshLanguage } from '@lib/i18n/i18n.svelte';
    import { refreshTheme } from '@lib/theme/theme.svelte';
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

<div id="popper"></div>
<div id="modal"></div>
{@render children()}
