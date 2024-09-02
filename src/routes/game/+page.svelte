<script lang="ts">
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import CurrentUserCard from '$src/components/account/CurrentUserCard.svelte';

    let currentUser = currentUserStore();
</script>

<h1>Game</h1>
<CurrentUserCard user={currentUser.user} />
