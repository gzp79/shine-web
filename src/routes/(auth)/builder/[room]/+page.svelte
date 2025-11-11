<script lang="ts">
    import { page } from '$app/state';
    import { builderApi } from '$lib/api/builder-api';
    import { onMount } from 'svelte';
    import Button from '@atoms/Button.svelte';
    import Typography from '@atoms/Typography.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import TextArea from '@atoms/inputs/TextArea.svelte';

    type ChatMessage = {
        from: string;
        text: string;
    };

    let room = $derived(page.params.room || '');
    let isConnected = $state(false);
    let currentMessage = $state('');
    let history: ChatMessage[] = $state.raw([]);

    let socket: WebSocket | undefined;
    const connect = () => {
        let url = builderApi.getConnectUrl(room);

        socket = new WebSocket(url);
        socket.addEventListener('open', () => {
            isConnected = true;
        });
        socket.addEventListener('close', () => {
            isConnected = false;
        });
        socket.addEventListener('message', (event) => {
            console.log('message: ', event.data);
            const msg = JSON.parse(event.data);
            if (msg.type === 'chat' && msg.text.startsWith('@ping ')) {
                const now = new Date().getTime();
                const prev = parseInt(msg.text.substring(6));
                msg.text = `Roundtrip: ${now - prev}ms`;
            }
            history.push(msg);
            while (history.length > 10) {
                history.shift();
            }
            history = [...history];
        });
    };

    const sendMessage = () => {
        if (!currentMessage) {
            return;
        }

        const msg = {
            type: 'chat',
            text: currentMessage
        };
        if (currentMessage === '@ping') {
            msg.text = `@ping ${new Date().getTime()}`;
        }

        socket?.send(JSON.stringify(msg));
        currentMessage = '';
    };

    onMount(() => {
        connect();
    });
</script>

<Typography variant="h1">Room: {room}</Typography>

<InputGroup class="w-full">
    <TextArea placeholder="Text..." rows={3} disabled={!isConnected} onEnter={sendMessage} bind:text={currentMessage} />
    {#if isConnected}
        <Button onclick={sendMessage}>Send</Button>
    {:else}
        <Button onclick={connect}>Reconnect</Button>
    {/if}
</InputGroup>

<div class="h-full overflow-scroll">
    <!-- eslint-disable-next-line svelte/require-each-key -->
    {#each history as msg}
        <div><i class="inline-block bg-info">{msg.from + ' >'}</i>{msg.text}</div>
    {/each}
</div>
