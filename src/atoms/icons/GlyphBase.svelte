<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import TailwindClasses from '../utilities/TailwindClasses.svelte';
    import type { IconSize } from './types';

    export interface GlyphProps {
        size?: IconSize;
        disabled?: boolean;
        class?: string;
    }
</script>

<script lang="ts">
    interface Props extends GlyphProps {
        viewBox: number[];
        children: Snippet;
    }

    let { size = 'full', disabled = false, class: className, viewBox, children }: Props = $props();
    let svgClass = $derived(
        twMerge(
            size ? `icon-${size}` : 'w-auto h-full',
            className,
            disabled && '!opacity-30'
            //disabled && 'grayscale'
        )
    );
</script>

<TailwindClasses classList={['icon-xs icon-sm icon-md icon-lg']} />

<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox.join(' ')} class={svgClass}>
    {@render children()}
</svg>
