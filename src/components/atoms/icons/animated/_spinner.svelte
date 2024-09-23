<script lang="ts">
    import { colorMaps, sizeMaps } from '$components/types';
    import { twMerge } from 'tailwind-merge';
    import type { IconProps } from '../types';

    let { size = 'md', disabled = false, class: className, color }: IconProps = $props();
    let svgClass = $derived(
        twMerge(
            color ? colorMaps.stroke[color] : 'stroke-current',
            color ? colorMaps.fill[color] : 'fill-current',
            sizeMaps.icon[size],
            className,
            disabled ? 'grayscale' : ''
        )
    );
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={svgClass}>
    <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" stroke-linecap="round">
        <animate
            attributeName="stroke-dasharray"
            values="0 150; 42 150; 42 150"
            keyTimes="0; 0.475; 1"
            dur="1.5s"
            repeatCount="indefinite"
        />
        <animate
            attributeName="stroke-dashoffset"
            values="0; -16; -59"
            keyTimes="0; 0.475; 1"
            dur="1.5s"
            repeatCount="indefinite"
        />
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="3s"
            repeatCount="indefinite"
        />
    </circle>
</svg>
