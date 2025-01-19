<script lang="ts">
    import { onMount } from 'svelte';
    import { builderApi } from '$lib/api/builder-api';
    import { page } from '$app/stores';

    let pg = $page;
    let room = pg.params.room;
    let url = builderApi.getConnectUrl(room);

    let socket;
    onMount(() => {
        socket = new WebSocket(url);
        socket.addEventListener('open', () => {
            console.log('Opened');
        });
    });
</script>

<h1>Builder</h1>
<div class="h-full overflow-scroll">
    {url}
</div>
