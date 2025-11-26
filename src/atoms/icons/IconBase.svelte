<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ActionColor } from '../types';
    import TailwindClasses from '../utilities/TailwindClasses.svelte';
    import type { IconSize } from './types';

    export const TRANSPARENCY = 0.3;

    export interface IconProps {
        color?: ActionColor;
        size?: IconSize;
        disabled?: boolean;
        class?: string;
    }

    export interface Props extends IconProps {
        viewBox: number[];
        children: Snippet;
    }
</script>

<script lang="ts">
    let { color, size = 'full', disabled = false, class: className, viewBox, children }: Props = $props();
    let svgClass = $derived(
        twMerge(
            color ? `stroke-on-${color}` : 'stroke-current',
            color ? `fill-on-${color}` : 'fill-current',
            `icon-${size}`,
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
        'icon-xs icon-sm icon-md icon-lg icon-full'
    ]}
/>

<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox.join(' ')} class={svgClass}>
    {@render children()}
</svg>
