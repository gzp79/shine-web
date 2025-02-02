<script lang="ts" module>
    export interface GlyphProps {
        size?: Size;
        disabled?: boolean;
        class?: string;
    }
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import CompileTailwindClasses from '../CompileTailwindClasses.svelte';
    import type { Size } from '../types';

    interface Props extends GlyphProps {
        viewBox: number[];
        children: Snippet;
    }

    let { size, disabled = false, class: className, viewBox, children }: Props = $props();
    let svgClass = $derived(
        twMerge(
            size ? `icon-${size}` : 'w-auto h-full',
            className,
            disabled && '!opacity-30'
            //disabled && 'grayscale'
        )
    );
</script>

<CompileTailwindClasses classList={['icon-xs icon-sm icon-md icon-lg']} />

<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox.join(' ')} class={svgClass}>
    {@render children()}
</svg>
