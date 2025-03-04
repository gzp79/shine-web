<script lang="ts">
    import { page } from '$app/state';
    import Button from '$components/atoms/Button.svelte';
    import ErrorCard from '$components/atoms/ErrorCard.svelte';
    import { currentUserStore } from '$lib/account/currentUser.svelte';
    import { identityApi } from '$lib/api/identity-api';
    import AppContent from '$lib/app/AppContent.svelte';

    let currentUser = currentUserStore();
    const task = async () => {
        console.log('completeEmailConfirmation', page.url.searchParams.get('token'));
        await identityApi.completeEmailConfirmation(page.url.searchParams.get('token') ?? '');
        console.log('refreshing user');
        currentUser.refresh(true);
        console.log('done');
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
