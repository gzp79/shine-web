<script lang="ts">
    import { onMount } from 'svelte';
    import { type Color } from '$atoms/types';

    interface Props {
        color: Color;
    }
    let { color }: Props = $props();

    let divRef: HTMLDivElement | null = null;
    let colorValue = $state('');

    onMount(() => {
        if (divRef) {
            const computedStyle = getComputedStyle(divRef);
            const backgroundColor = computedStyle.backgroundColor;

            const context = document.createElement('canvas')?.getContext('2d');
            if (context) {
                context.fillStyle = backgroundColor;
                context.fillRect(0.0, 0.0, 1.0, 1.0);
                const color = context.getImageData(0.0, 0.0, 1.0, 1.0)?.data;

                colorValue = color
                    ? `#${Array.from(color)
                          .slice(0, 3) // Ignore the alpha channel
                          .map((value) => value.toString(16).padStart(2, '0'))
                          .join('')}`
                    : '';
            }
        }
    });
</script>

<div class="relative mx-2 mt-2 flex h-24 w-24 flex-row">
    <div class="h-full flex-1 rounded-s-lg border-y border-s bg-{color}-mute"></div>
    <div bind:this={divRef} class="h-full flex-[1.5] border-y bg-{color}"></div>
    <div class="h-full flex-1 rounded-e-lg border-y border-e bg-{color}-accent"></div>
    <p class="absolute left-0 top-0 flex h-full w-full items-center justify-center text-center text-xl text-on-{color}">
        Content
    </p>
</div>
<p class="text-center">{color}</p>
<p class="text-center">{colorValue}</p>
