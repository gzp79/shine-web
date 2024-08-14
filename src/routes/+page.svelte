<script>
    import { themeStore } from '$lib/theme/theme.svelte';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import { goto } from '$app/navigation';

    themeStore();
    const currentUser = currentUserStore();

    $effect(() => {
        if (!currentUser.user.isAuthenticated) {
            goto('/login');
        } else {
            goto('/game');
        }
    });
</script>
