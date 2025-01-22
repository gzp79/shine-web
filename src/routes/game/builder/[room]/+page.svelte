<script lang="ts">
    import { onMount } from 'svelte';
    import { builderApi } from '$lib/api/builder-api';
    import { page } from '$app/stores';
    import Button from '$components/atoms/Button.svelte';
    import InputGroup from '$components/atoms/InputGroup.svelte';
    import TextArea from '$components/atoms/TextArea.svelte';
    import Typography from '$components/atoms/Typography.svelte';

    type ChatMessage = {
        from: string;
        text: string;
    };

    let pg = $page;
    let room = pg.params.room;
    let url = builderApi.getConnectUrl(room);

    let isConnected = $state(false);
    let newText = $state('');
    let message: ChatMessage[] = $state.raw([]);

    $inspect(message);

    let socket: WebSocket | undefined;
    const connect = () => {
        socket = new WebSocket(url);
        socket.addEventListener('open', () => {
            isConnected = true;
        });
        socket.addEventListener('close', () => {
            isConnected = false;
        });
        socket.addEventListener('message', (event) => {
            console.log('message: ', event.data);
            message.push(JSON.parse(event.data));
            while (message.length > 10) {
                message.shift();
            }
            message = [...message];
        });
    };

    const sendMessage = () => {
        if (!newText) {
            return;
        }

        socket?.send(
            JSON.stringify({
                type: 'chat',
                text: newText
            })
        );
        newText = '';
    };

    onMount(() => {
        connect();
    });
</script>

<Typography variant="h1">Room: {room}</Typography>

<InputGroup class="w-full">
    <TextArea placeholder={'Text...'} rows={3} disabled={!isConnected} onEnter={sendMessage} bind:text={newText} />
    {#if isConnected}
        <Button onclick={sendMessage}>Send</Button>
    {:else}
        <Button onclick={connect}>Reconnect</Button>
    {/if}
</InputGroup>

<div class="h-full overflow-scroll">
    {#each message as msg}
        <div><i class="inline-block bg-info">{msg.from + ' >'}</i>{msg.text}</div>
    {/each}
</div>
