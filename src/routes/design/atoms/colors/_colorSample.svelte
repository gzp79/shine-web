<script lang="ts">
    import { type Color } from '$components/types';
    import CompileTailwindClasses from '$src/components/atoms/utils/CompileTailwindClasses.svelte';
    import { onMount } from 'svelte';

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

<CompileTailwindClasses
    classList={[
        'bg-surface bg-primary bg-info bg-warning bg-danger bg-success',
        'bg-surface-mute bg-primary-mute bg-info-mute bg-warning-mute bg-danger-mute bg-success-mute',
        'bg-surface-accent bg-primary-accent bg-info-accent bg-warning-accent bg-danger-accent bg-success-accent',
        'text-on-surface text-on-primary text-on-info text-on-warning text-on-danger text-on-success'
    ]}
/>

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
