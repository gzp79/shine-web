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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" class={svgClass}>
    <g fill="none" fill-rule="evenodd" stroke-width="2">
        <circle cx="22" cy="22" r="1">
            <animate
                attributeName="r"
                begin="0s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
            />
            <animate
                attributeName="stroke-opacity"
                begin="0s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
            />
        </circle>
        <circle cx="22" cy="22" r="1">
            <animate
                attributeName="r"
                begin="-0.9s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
            />
            <animate
                attributeName="stroke-opacity"
                begin="-0.9s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
            />
        </circle>
    </g>
</svg>
