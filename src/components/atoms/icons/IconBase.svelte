<script lang="ts" module>
    export interface IconProps {
        color?: Color;
        size?: Size;
        disabled?: boolean;
        class?: string;
    }
</script>

<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import type { Snippet } from 'svelte';
    import CompileTailwindClasses from '../CompileTailwindClasses.svelte';
    import type { Color, Size } from '../types';

    interface Props extends IconProps {
        viewBox: number[];
        children: Snippet;
    }

    let { color, size, disabled = false, class: className, viewBox, children }: Props = $props();
    let svgClass = $derived(
        twMerge(
            color ? `stroke-${color}` : 'stroke-current',
            color ? `fill-${color}` : 'fill-current',
            size ? `icon-${size}` : 'w-full h-full',
            className,
            disabled ? 'grayscale' : ''
        )
    );
</script>

<CompileTailwindClasses
    classList={[
        'stroke-surface stroke-primary stroke-info stroke-warning stroke-danger stroke-success',
        'fill-surface fill-primary fill-info fill-warning fill-danger fill-success',
        'icon-xs icon-sm icon-md icon-lg'
    ]}
/>

<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox.join(' ')} class={svgClass}>
    {@render children()}
</svg>
