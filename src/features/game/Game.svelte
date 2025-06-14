<script lang="ts" module>
    import { config } from '@config';
    import { fetchError } from '@lib/utils';

    export const GAME_BASE_NAME = 'shine-client';

    export async function fetchLatestGameUrl(fetch: typeof globalThis.fetch): Promise<string> {
        const targetBaseUrl = config.gameUrl;
        logGame.log('fetchLatestGameUrl', targetBaseUrl);
        const latestUrl = `${targetBaseUrl}/latest.json`;
        const response = await fetch(latestUrl);

        if (!response.ok) {
            const error = await fetchError('Failed to fetch latest game version', response);
            throw error;
        }

        const { version } = await response.json();
        logGame.log('fetchLatestGameUrl version', version);

        // Return the full URL to the WASM file
        return `${targetBaseUrl}/${version}/${GAME_BASE_NAME}_bg.wasm`;
    }
</script>

<script lang="ts">
    import { onMount, untrack } from 'svelte';
    import { logGame } from '@lib/loggers';
    import { type AppError, OtherError } from '@lib/utils';
    import ProgressBar from '@atoms/ProgressBar.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';

    interface IGameContext {
        default: (wasm: Promise<ArrayBuffer>) => Promise<void>;
        start_game: (canvasId: string) => void;
        stop_game: () => void;
    }

    interface Props {
        readonly url: string;
    }

    const { url }: Props = $props();
    const jsUrl = url.replace(/_bg\.wasm$/, '.js');

    let id = $props.id();

    let current = $state(0);
    let total = $state(0);
    let progress = $state(0);
    let status = $state<'loading' | 'ready' | AppError>('loading');
    let wasmModule: Blob | undefined = undefined;
    let jsModule: IGameContext | undefined = undefined;

    $effect(() => {
        const p = total > 0 ? (current / total) * 100 : 0;
        const clampP = Math.max(0, Math.min(100, p));
        if (clampP > untrack(() => progress)) {
            progress = clampP;
        }
    });

    let progressText = $derived.by(() => {
        if (total > 0) {
            let scale = 1;
            let metric = 'B';
            if (total >= 1024 * 1024) {
                scale = 1024 * 1024;
                metric = 'MB';
            } else if (total >= 1024) {
                scale = 1024;
                metric = 'KB';
            }

            const currentScaled = current / scale;
            const totalScaled = total / scale;
            return `${currentScaled.toFixed(2)} / ${totalScaled.toFixed(2)} ${metric}`;
        } else {
            return '';
        }
    });

    const startGame = async (jsBlob: Blob, buffer: Uint8Array<ArrayBufferLike>[]) => {
        console.log('Importing JS');
        // loading the JS module through an object url makes it as distinct script and instantiates a new module scope
        jsModule = await import(/* @vite-ignore */ URL.createObjectURL(jsBlob));
        if (!jsModule?.default || !jsModule?.start_game || !jsModule?.stop_game) {
            throw new Error('WASM module does not export required functions');
        }

        console.log('Initializing game');
        wasmModule = new Blob(buffer, { type: 'application/wasm' });
        await jsModule.default(wasmModule.arrayBuffer());

        console.log('Starting game');
        jsModule.start_game(`#game-canvas-${id}`);
    };

    const fetchGame = async (url: string, signal: AbortSignal) => {
        try {
            let jsBlob;
            {
                const response = await fetch(jsUrl, { signal });
                if (response.status !== 200 || !response.body) {
                    console.error('Failed to fetch JS module:', response.statusText);
                    throw new Error(`JS: ${response.status} ${response.statusText || ''}`.trim());
                }
                jsBlob = await response.blob();
            }

            const wasmBuffer = [];
            {
                const response = await fetch(url, { signal });
                if (response.status !== 200 || !response.body) {
                    throw new Error(`WASM: ${response.status} ${response.statusText || ''}`.trim());
                }

                total = Number(response.headers.get('Content-Length')) || 0;
                current = 0;

                const reader = response.body.getReader();
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        current = total;
                        break;
                    }
                    current += value.byteLength;
                    wasmBuffer.push(value);
                }
            }

            startGame(jsBlob, wasmBuffer);
            status = 'ready';
        } catch (error) {
            jsModule = undefined;
            status = new OtherError('Failed to run game', error instanceof Error ? error.message : 'Unknown error');
        }
    };

    onMount(() => {
        const controller = new AbortController();

        fetchGame(url, controller.signal).catch((error) => {
            console.error('Error fetching game:', error);
        });

        return () => {
            controller.abort();
            jsModule?.stop_game?.();
            jsModule = undefined;
            wasmModule = undefined;
        };
    });
</script>

<div class="h-full w-full flex items-center justify-center">
    {#if status === 'loading'}
        <ProgressBar percent={progress} label={progressText} class="max-w-[80%]" />
    {:else if status === 'ready'}
        <canvas id="game-canvas-{id}" class="w-full h-full"></canvas>
    {:else}
        <ErrorCard error={status} />
    {/if}
</div>
