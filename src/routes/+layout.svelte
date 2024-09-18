<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import type { Snippet } from 'svelte';
    import { refreshLanguage } from '$lib/i18n/i18n.svelte';
    import { refreshTheme } from '$lib/theme/theme.svelte';
    import type { CurrentUser } from '$lib/api/identity-api';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import '../app.css';

    interface Props {
        data: {
            streamed: {
                currentUser: Promise<CurrentUser>;
            };
        };
        children: Snippet;
    }
    let { data, children }: Props = $props();
    let { currentUser } = data.streamed;

    afterNavigate(() => {
        refreshTheme();
        refreshLanguage();
    });
</script>

{#await currentUser}
    <div class="flex h-full items-center justify-center">
        <LoadingCard />
    </div>
{:then _user}
    {@render children()}
{/await}
