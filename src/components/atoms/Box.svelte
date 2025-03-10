<script lang="ts" module>
    import { type Snippet, getContext, setContext } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ActionColor, ElementProps } from './types';

    export type Variant = {
        color: ActionColor;
    };

    export interface BoxInfo {
        bgColor: string;
        fgColor: string;
        fgColor1: string;
        fgColor2: string;
        border: string;
    }
</script>

<script lang="ts">
    interface Props extends ElementProps {
        variant?: Variant;
        border?: boolean;
        shadow?: boolean;
        ghost?: boolean;
        compact?: boolean;
        level?: number;
        class?: string;
        children?: Snippet;
    }

    let { border, shadow, variant, compact, ghost, level, class: className, children, ...rest }: Props = $props();

    const colorRotation = ['container', 'sub-container', 'surface'];

    let nestingLevel: number = (getContext<number>('Box_nestingLevel') ?? -1) + 1;
    let colorIndex: number = level ?? ((getContext<number>('Box_colorIndex') ?? -1) + 1) % colorRotation.length;

    setContext('Box_nestingLevel', nestingLevel);
    setContext('Box_colorIndex', colorIndex);

    let currentMargin = $derived(nestingLevel < 1 ? 'm-4' : nestingLevel < 3 ? 'm-2' : 'm-1');

    let colors = $derived.by(() => {
        if (variant) {
            return {
                fgColor: 'on-' + variant.color,
                fgColor1: variant.color + '-1',
                fgColor2: variant.color + '-2',
                bgColor: variant.color,
                border: 'on-' + variant.color
            };
        } else {
            return {
                fgColor: 'on-' + colorRotation[colorIndex],
                fgColor1: 'primary-1',
                fgColor2: 'primary-2',
                bgColor: colorRotation[colorIndex],
                border: 'on-' + colorRotation[(colorIndex + colorRotation.length - 1) % colorRotation.length]
            };
        }
    });

    // convert props into state, so it can be updated and children reactively
    let context = $state({} as BoxInfo);
    $effect(() => {
        context.fgColor = colors.fgColor;
        context.fgColor1 = colors.fgColor1;
        context.fgColor2 = colors.fgColor2;
        context.bgColor = colors.bgColor;
        context.border = colors.border;
    });
    setContext('Box_props', context);

    let boxClass = $derived(
        twMerge(
            'rounded-lg',
            !compact && `p-4 ${currentMargin}`,
            !ghost && `bg-${colors.bgColor}`,
            `text-${colors.fgColor}`,
            border && `border border-${colors.border}`,
            shadow && `shadow-md shadow-${colors.fgColor}`,
            className
        )
    );
</script>

<div class={boxClass} {...rest}>
    {@render children?.()}
</div>
