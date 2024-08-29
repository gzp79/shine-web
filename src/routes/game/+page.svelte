<script lang="ts">
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import CurrentUser from '$src/components/account/CurrentUser.svelte';

    let currentUser = currentUserStore();
</script>

<h1>Game</h1>
<CurrentUser user={currentUser.user} />
