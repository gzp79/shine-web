<script lang="ts">
    import { setContext, getContext, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { Color } from '../types';

    interface Props extends Record<string, unknown> {
        border?: boolean;
        shadow?: boolean;
        color?: Color;
        // Whether to use a compact layout and reduce margins and padding
        compact?: boolean;
        // Whether to use a ghost box with no background
        ghost?: boolean;
        class?: string;
        children?: Snippet;
    }

    let { border, shadow, color, compact, ghost, class: className, children, ...rest }: Props = $props();

    const colorRotation = ['surface-mute', 'surface', 'surface-accent'];

    // Get the current nesting level from the context or default to 0
    let nestingLevel: number = getContext('Box_nestingLevel') ?? 0;
    setContext('Box_nestingLevel', nestingLevel + 1);

    let currentBgColor = $derived(color ?? colorRotation[nestingLevel % colorRotation.length]);
    let currentColor = $derived(color ?? 'surface');
    let currentMargin = $derived(nestingLevel < 1 ? 'm-4' : nestingLevel < 3 ? 'm-2' : 'm-1');

    let boxClass = $derived(
        twMerge(
            'rounded-lg overflow-hidden',
            !compact && `p-4 ${currentMargin}`,
            !ghost && `bg-${currentBgColor} text-on-${color}`,
            !ghost && border && `border border-on-${currentColor}`,
            !ghost && shadow && `shadow-md shadow-on-${currentColor}`,
            ghost && color && `text-${currentColor}`,
            ghost && color && border && `border border-${currentColor}`,
            ghost && color && shadow && `shadow-md shadow-${currentColor}`,
            ghost && !color && `text-on-surface`,
            ghost && !color && border && `border border-on-surface`,
            ghost && !color && shadow && `shadow-md shadow-on-surface`,

            className
        )
    );
</script>

<div class={boxClass} {...rest}>
    {#if children}
        {@render children()}
    {/if}
</div>
