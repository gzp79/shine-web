<script lang="ts" module>
    import { twMerge } from 'tailwind-merge';
    import { setContext, type Snippet } from 'svelte';
    import type { ElementProps, ActionColor, Size } from './types';
    import type { Variant } from './Button.svelte';

    export interface GroupInfo {
        size: Size;
        color?: ActionColor;
        wide?: boolean;
        vertical: boolean;
        variant: Variant;
    }
</script>

<script lang="ts">
    interface Props extends ElementProps {
        size?: Size;
        color?: ActionColor;
        vertical?: boolean;
        wide?: boolean;
        variant?: Variant;
        class?: string;
        children: Snippet;
        element?: string;
        div?: HTMLElement;
    }

    let {
        size = 'md',
        color = 'secondary',
        vertical = false,
        variant = 'filled',
        wide,
        class: className,
        element = 'div',
        children,
        div = $bindable(),
        ...rest
    }: Props = $props();

    let divClass = $derived(twMerge('inline-flex', vertical && 'flex-col', wide && 'w-full', className));

    // convert props into state, so it can be updated and children reactively
    let context = $state<GroupInfo>({ size, color, vertical, variant, wide });
    $effect(() => {
        context.size = size;
        context.color = color;
        context.vertical = vertical;
        context.variant = variant;
        context.wide = wide;
    });
    setContext('InputGroup_props', context);
</script>

<svelte:element this={element} class={divClass} bind:this={div} {...rest}>
    {@render children()}
</svelte:element>
