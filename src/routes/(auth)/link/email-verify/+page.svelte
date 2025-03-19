<script lang="ts">
    import { page } from '$app/state';
    import { identityApi } from '$lib/api/identity-api';
    import AppContent from '$lib/app/AppContent.svelte';
    import Button from '$atoms/Button.svelte';
    import ErrorCard from '$components/ErrorCard.svelte';
    import { getCurrentUserStore } from '$features/account/currentUser.svelte';

    let currentUserStore = getCurrentUserStore();
    const task = async () => {
        await identityApi.completeEmailOperation(page.url.searchParams.get('token') ?? '');
        currentUserStore.refresh({ force: true });
    };
</script>

<AppContent class="flex flex-col items-center justify-center">
    {#await task()}
        <p>Loading...</p>
    {:then _}
        <p>Email verified</p>
        <Button href="/account">Done</Button>
    {:catch error}
        <ErrorCard {error} />
        <Button href="/">Home</Button>
    {/await}
</AppContent>
