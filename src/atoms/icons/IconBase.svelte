<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import TailwindClasses from '../TailwindClasses.svelte';
    import type { ActionColor, Size } from '../types';

    export const TRANSPARENCY = 0.3;

    export interface IconProps {
        color?: ActionColor;
        size?: Size;
        disabled?: boolean;
        class?: string;
    }
</script>

<script lang="ts">
    interface Props extends IconProps {
        viewBox: number[];
        children: Snippet;
    }

    let { color, size, disabled = false, class: className, viewBox, children }: Props = $props();
    let svgClass = $derived(
        twMerge(
            color ? `stroke-on-${color}` : 'stroke-current',
            color ? `fill-on-${color}` : 'fill-current',
            size ? `icon-${size}` : 'w-full h-full',
            disabled && '!opacity-30',
            //disabled && 'grayscale'
            className
        )
    );
</script>

<TailwindClasses
    classList={[
        'stroke-surface stroke-primary stroke-info stroke-warning stroke-danger stroke-success',
        'fill-surface fill-primary fill-info fill-warning fill-danger fill-success',
        'icon-xs icon-sm icon-md icon-lg'
    ]}
/>

<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox.join(' ')} class={svgClass}>
    {@render children()}
</svg>
