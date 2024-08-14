<script lang="ts">
    import { currentUserStore } from '$lib/account/currentUser.svelte';

    let currentUser = currentUserStore();
</script>

<h1>Game</h1>
{currentUser.user.name}
{currentUser.user.userId}
