<script lang="ts" module>
    import { type Snippet, getContext, setContext } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Typography from '../Typography.svelte';
    import type { ActionColor, ElementProps, Size } from '../types';
    import { type Spacing, toSpacingClasses } from '../types/spacing';

    export type Width = 'small' | 'big' | 'fit' | 'full';

    export type Legend = {
        text: string;
        color?: ActionColor;
        size?: Size;
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
        color?: ActionColor;
        border?: boolean;
        shadow?: boolean;
        ghost?: boolean;
        compact?: boolean;
        width?: Width;
        level?: number;
        legend?: string | Legend;
        padding?: Spacing;
        margin?: Spacing;
        overflow?: 'visible' | 'auto' | 'hidden' | 'scroll';
        class?: string;
        children?: Snippet;
    }

    let {
        border,
        shadow,
        color,
        compact,
        ghost,
        width = 'fit',
        level,
        legend,
        padding,
        margin,
        overflow = 'auto',
        class: className,
        children,
        ...rest
    }: Props = $props();

    const colorRotation = ['container', 'sub-container', 'surface'];

    let nestingLevel: number = (getContext<number>('Box_nestingLevel') ?? -1) + 1;
    let colorIndex: number = level ?? ((getContext<number>('Box_colorIndex') ?? -1) + 1) % colorRotation.length;

    setContext('Box_nestingLevel', nestingLevel);
    setContext('Box_colorIndex', colorIndex);

    let colors = $derived.by(() => {
        if (color) {
            return {
                fgColor: 'on-' + color,
                fgColor1: color + '-1',
                fgColor2: color + '-2',
                bgColor: color,
                border: 'on-' + color
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

    let legendClass = $derived.by(() => {
        let size = 'text-md';
        let color = `text-${colors.border}`;
        if (typeof legend !== 'string') {
            size = legend?.size ? `text-${legend?.size}` : size;
            color = legend?.color ? `text-on-${legend?.color}` : color;
        }
        return twMerge('p-2', size, color);
    });
    let legendText = $derived.by(() => (typeof legend === 'string' ? legend : legend?.text));

    let paddingClass = $derived(toSpacingClasses(padding, { all: 'p', x: 'px', y: 'py' }));
    let marginClass = $derived(toSpacingClasses(margin, { all: 'm', x: 'mx', y: 'my' }));

    const widthVariants: Record<Width, string> = {
        fit: 'max-w-full w-fit',
        small: 'max-w-sm w-full',
        big: 'max-w-3xl w-full',
        full: 'w-full'
    };

    let boxClass = $derived(
        twMerge(
            'rounded-lg',
            'min-w-0', // Allow Box to shrink in flex containers while staying full-width when standalone
            'min-h-min',
            widthVariants[width],
            !compact && 'p-4',
            !ghost && `bg-${colors.bgColor}`,
            `text-${colors.fgColor}`,
            border && `border border-${colors.border}`,
            shadow && `shadow-md shadow-${colors.fgColor}`,
            overflow && `overflow-${overflow}`,
            paddingClass,
            marginClass,
            className
        )
    );
</script>

{#if legend}
    <fieldset class={boxClass} {...rest}>
        <Typography variant="legend" class={legendClass}>{legendText}</Typography>
        {@render children?.()}
    </fieldset>
{:else}
    <div class={boxClass} {...rest}>
        {@render children?.()}
    </div>
{/if}
