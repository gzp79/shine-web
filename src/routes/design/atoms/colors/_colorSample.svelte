<script lang="ts">
    import { type ActionColor, type ContainerColor } from '$atoms/types';
    import { onMount } from 'svelte';

    interface Props {
        color: ActionColor | ContainerColor;
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

<div
    bind:this={divRef}
    class="bg-{color} text-on-{color} mx-2 mt-2 flex h-24 w-24 items-center justify-center border-2 border-on-{color} text-center text-xl"
>
    Content
</div>
<p class="text-center">{color}</p>
<p class="text-center">{colorValue}</p>
