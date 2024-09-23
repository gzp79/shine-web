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

    const dur = '0.8s';
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={svgClass}>
    <ellipse cx="12" cy="5" rx="4" ry="4">
        <animate
            attributeName="cy"
            values="5;20;20.5;20;5"
            keyTimes="0;0.46875;0.5;0.53125;1"
            {dur}
            repeatCount="indefinite"
        />
        <animate
            attributeName="rx"
            values="4;4;4.8;4;4"
            keyTimes="0;0.46875;0.5;0.53125;1"
            {dur}
            repeatCount="indefinite"
        />
        <animate
            attributeName="ry"
            values="4;4;3;4;4"
            keyTimes="0;0.46875;0.5;0.53125;1"
            {dur}
            repeatCount="indefinite"
        />
    </ellipse>
</svg>
