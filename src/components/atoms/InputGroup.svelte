<script lang="ts" module>
    import { type Snippet, getContext, setContext } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { BoxInfo } from './Box.svelte';
    import type { ActionColor, ElementProps, InputVariant, Size } from './types';

    export interface GroupInfo {
        size: Size;
        color?: ActionColor;
        wide?: boolean;
        vertical: boolean;
        variant: InputVariant;
    }
</script>

<script lang="ts">
    interface Props extends ElementProps {
        size?: Size;
        color?: ActionColor;
        vertical?: boolean;
        wide?: boolean;
        variant?: InputVariant;
        class?: string;
        children: Snippet;
        element?: string;
        div?: HTMLElement;
    }

    let {
        size = 'md',
        color: baseColor,
        vertical = false,
        variant = 'filled',
        wide,
        class: className,
        element = 'div',
        children,
        div = $bindable(),
        ...rest
    }: Props = $props();

    // Hidden Dependency (Box):
    let box: BoxInfo = getContext('Box_props');

    let colorWithFallback = $derived(baseColor ?? 'primary');

    // convert props into state, so it can be updated and children reactively
    let context = $state({} as GroupInfo);
    $effect(() => {
        context.size = size;
        context.color = variant === 'filled' ? colorWithFallback : (baseColor ?? box?.fgColor ?? colorWithFallback);
        context.vertical = vertical;
        context.variant = variant;
        context.wide = wide;
    });
    setContext('InputGroup_props', context);

    let divClass = $derived(twMerge('inline-flex', vertical && 'flex-col', wide && 'w-full', className));
</script>

<svelte:element this={element} class={divClass} bind:this={div} {...rest}>
    {@render children()}
</svelte:element>
