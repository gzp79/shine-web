<script lang="ts" module>
    import { twMerge } from 'tailwind-merge';
    import { setContext, type Snippet } from 'svelte';
    import type { ElementProps, Color, Size } from './types';
    import type { Variant } from './Button.svelte';

    export interface GroupInfo {
        size: Size;
        color?: Color;
        wide?: boolean;
        vertical: boolean;
        variant: Variant;
    }
</script>

<script lang="ts">
    interface Props extends ElementProps {
        size?: Size;
        color?: Color;
        vertical?: boolean;
        wide?: boolean;
        variant?: Variant;
        class?: string;
        children: Snippet;
        div?: HTMLElement;
    }

    let {
        size = 'md',
        color,
        vertical = false,
        variant = 'filled',
        wide,
        class: className,
        children,
        div = $bindable(),
        ...rest
    }: Props = $props();

    let divClass = $derived(
        twMerge(
            'inline-flex', //
            vertical && 'flex-col',
            wide && 'w-full',
            className
        )
    );

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

<div class={divClass} bind:this={div} {...rest}>
    {@render children()}
</div>
