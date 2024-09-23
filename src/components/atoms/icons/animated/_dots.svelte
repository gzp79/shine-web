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
    <circle cx="4" cy="12" r="3">
        <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-6; 0,0"
            keyTimes="0; 0.2857; 1"
            dur="1.05s"
            repeatCount="indefinite"
        />
    </circle>
    <circle cx="12" cy="12" r="3">
        <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-6; 0,0"
            keyTimes="0; 0.2857; 1"
            dur="1.05s"
            begin="0.1s"
            repeatCount="indefinite"
        />
    </circle>
    <circle cx="20" cy="12" r="3">
        <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-6; 0,0"
            keyTimes="0; 0.2857; 1"
            dur="1.05s"
            begin="0.2s"
            repeatCount="indefinite"
        />
    </circle>
</svg>
