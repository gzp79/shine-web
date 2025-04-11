<script lang="ts" module>
    import { type Snippet, getContext, setContext } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ActionColor, ElementProps, Size } from './types';

    export type Variant = {
        color: ActionColor;
    };

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
    import Typography from './Typography.svelte';

    interface Props extends ElementProps {
        variant?: Variant;
        border?: boolean;
        shadow?: boolean;
        ghost?: boolean;
        compact?: boolean;
        level?: number;
        legend?: string | Legend;
        class?: string;
        children?: Snippet;
    }

    let {
        border,
        shadow,
        variant,
        compact,
        ghost,
        level,
        legend,
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

    let boxClass = $derived(
        twMerge(
            'rounded-lg',
            !compact && 'p-4',
            !ghost && `bg-${colors.bgColor}`,
            `text-${colors.fgColor}`,
            border && `border border-${colors.border}`,
            shadow && `shadow-md shadow-${colors.fgColor}`,
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
