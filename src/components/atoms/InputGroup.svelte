<script lang="ts" module>
    export interface GroupInfo {
        size: Size;
        color?: Color;
        wide?: boolean;
        vertical: boolean;
    }
</script>

<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { setContext, type Snippet } from 'svelte';
    import type { ElementProps, Color, Size } from './types';

    interface Props extends ElementProps {
        size?: Size;
        color?: Color;
        vertical?: boolean;
        wide?: boolean;
        class?: string;
        children: Snippet;
    }

    let { size = 'md', color, vertical = false, children, wide, class: className, ...rest }: Props = $props();

    let divClass = $derived(
        twMerge(
            'inline-flex', //
            vertical && 'flex-col',
            wide && 'w-full',
            className
        )
    );

    // convert props into state, so it can be updated and children reactively
    let context = $state({ size, color, vertical, wide });
    $effect(() => {
        context.size = size;
        context.color = color;
        context.vertical = vertical;
        context.wide = wide;
    });
    setContext('InputGroup_props', context);
</script>

<div class={divClass} {...rest}>
    {@render children()}
</div>
