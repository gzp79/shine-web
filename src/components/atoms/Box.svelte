<script lang="ts" module>
    export interface Variant {
        color?: Color;
        outline?: boolean;
    }
</script>

<script lang="ts">
    import { setContext, getContext, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { Color } from '../types';

    interface Props extends Record<string, unknown> {
        variant?: Variant;
        border?: boolean;
        shadow?: boolean;
        ghost?: boolean;
        compact?: boolean;
        class?: string;
        children?: Snippet;
    }

    let { border, shadow, variant, compact, ghost, class: className, children, ...rest }: Props = $props();

    const colorRotation = ['surface', 'surface-accent', 'surface-mute'];

    let nestingLevel: number = (getContext<number>('Box_nestingLevel') ?? -1) + 1;
    let colorIndex: number = ((getContext<number>('Box_colorIndex') ?? -1) + 1) % colorRotation.length;

    setContext('Box_nestingLevel', nestingLevel);
    setContext('Box_colorIndex', colorIndex);

    let currentMargin = $derived(nestingLevel < 1 ? 'm-4' : nestingLevel < 3 ? 'm-2' : 'm-1');

    let colors = $derived.by(() => {
        if (variant) {
            if (variant?.outline) {
                return {
                    fgColor: variant?.color,
                    bgColor: colorRotation[(colorIndex + colorRotation.length - 1) % colorRotation.length]
                };
            } else {
                return {
                    fgColor: 'on-' + variant.color,
                    bgColor: variant.color
                };
            }
        } else {
            return {
                fgColor: 'on-' + colorRotation[colorIndex],
                bgColor: colorRotation[colorIndex]
            };
        }
    });

    let boxClass = $derived(
        twMerge(
            'rounded-lg overflow-hidden',
            !compact && `p-4 ${currentMargin}`,
            !ghost && `bg-${colors.bgColor}`,
            `text-${colors.fgColor}`,
            border && `border border-${colors.fgColor}`,
            shadow && `shadow-md shadow-${colors.fgColor}`,
            className
        )
    );
</script>

<div class={boxClass} {...rest}>
    {#if children}
        {@render children()}
    {/if}
</div>
