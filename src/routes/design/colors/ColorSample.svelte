<script lang="ts">
    import { colorBgMap, colorTextContentMap, type Color } from '$components/types';
    import { onMount } from 'svelte';

    interface Props {
        color: Color;
    }
    let { color }: Props = $props();

    let divRef: HTMLDivElement | null = null;
    let colorValue = $state('');

    onMount(() => {
        if (divRef) {
            const   computedStyle = getComputedStyle(divRef);
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

<div bind:this={divRef} class="m-2 flex h-24 w-24 items-center justify-center rounded-lg border {colorBgMap[color]}">
    <p class="text-center {colorTextContentMap[color]}">Content</p>
</div>
<p class="text-center">{color}</p>
<p class="text-center">{colorValue}</p>
