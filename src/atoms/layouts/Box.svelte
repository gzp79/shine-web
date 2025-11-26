<script module lang="ts">
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Typography from '../Typography.svelte';
    import { type ActionColor, type Size, createContext } from '../types';
    import { type Spacing, toSpacingClasses } from '../types/spacing';
    import type { Width } from './types';

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
    const [getBoxContext, setBoxContext] = createContext<BoxInfo>('Box');
    export { getBoxContext };

    const [getBoxNestingLevel, setBoxNestingLevel] = createContext<number>('BoxNestingLevel');
    const [getBoxColorIndex, setBoxColorIndex] = createContext<number>('BoxColorIndex');
</script>

<script lang="ts">
    interface Props {
        color?: ActionColor;
        border?: boolean;
        shadow?: boolean;
        ghost?: boolean;
        width?: Width;
        level?: number;
        legend?: string | Legend;
        padding?: Spacing;
        margin?: Spacing;
        // Overflow controls clipping and scrolling. Supported values:
        // 'y' - inner vertical scrolling (overflow-y-auto)
        // 'x' - inner horizontal scrolling (overflow-x-auto)
        // 'auto' - inner auto scrolling (overflow-auto)
        // 'hidden' - hide overflow on outer element
        overflow?: 'y' | 'x' | 'auto' | 'hidden';
        class?: string;
        children?: Snippet;
    }

    let {
        border,
        shadow,
        color,
        ghost,
        width = 'fit',
        level,
        legend,
        padding = 4,
        margin,
        overflow = 'hidden',
        class: className,
        children
    }: Props = $props();

    const colorRotation = ['container', 'sub-container', 'surface'];

    let nestingLevel: number = (getBoxNestingLevel() ?? -1) + 1;
    let colorIndex: number = level ?? ((getBoxColorIndex() ?? -1) + 1) % colorRotation.length;

    setBoxNestingLevel(nestingLevel);
    setBoxColorIndex(colorIndex);

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
    setBoxContext(context);

    const widthVariants: Record<Width, string> = {
        fit: 'max-w-full w-fit',
        small: 'w-[75%] lg:w-[60%]',
        big: 'w-[95%] lg:w-[80%]',
        full: 'w-full'
    };

    let legendText = $derived.by(() => (typeof legend === 'string' ? legend : legend?.text));

    let paddingClass = $derived(toSpacingClasses(padding, { all: 'p', x: 'px', y: 'py' }));
    let marginClass = $derived(toSpacingClasses(margin, { all: 'm', x: 'mx', y: 'my' }));

    let outerClass = $derived(
        twMerge(
            'rounded-lg',
            'min-h-0 min-w-0',
            'flex flex-col',
            widthVariants[width],
            border && `border border-${colors.border}`,
            !ghost && `bg-${colors.bgColor}`,
            `text-${colors.fgColor}`,
            shadow && `shadow-md shadow-${colors.fgColor}`,
            'overflow-clip',
            marginClass,
            className
        )
    );

    let innerScrollClass = $derived.by(() => {
        switch (overflow) {
            case 'y':
                return 'overflow-y-auto flex-1';
            case 'x':
                return 'overflow-x-auto w-full';
            case 'auto':
                return 'overflow-auto flex-1';
            default:
                return undefined;
        }
    });
    let innerClass = $derived(twMerge(paddingClass, innerScrollClass));

    let legendClass = $derived.by(() => {
        let size = 'text-md';
        let color = `text-${colors.border}`;
        if (typeof legend !== 'string') {
            size = legend?.size ? `text-${legend?.size}` : size;
            color = legend?.color ? `text-on-${legend?.color}` : color;
        }
        return twMerge('mx-3 p-1', size, color);
    });
</script>

{#if legend}
    <fieldset class={outerClass}>
        <Typography variant="legend" class={legendClass}>{legendText}</Typography>
        <div class={innerClass}>
            {@render children?.()}
        </div>
    </fieldset>
{:else}
    <div class={outerClass}>
        <div class={innerClass}>
            {@render children?.()}
        </div>
    </div>
{/if}
