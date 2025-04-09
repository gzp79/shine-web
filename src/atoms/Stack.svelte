<script lang="ts" module>
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ElementProps } from './types';
    import { type ResponsiveProp, toResponsiveClass } from './types/responsive-prop';
</script>

<script lang="ts">
    type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    interface Props extends ElementProps {
        direction?: 'row' | 'column';
        spacing?: Spacing | ResponsiveProp<Spacing>;
        align?: 'start' | 'center' | 'end';
        justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
        class?: string;
        children?: Snippet;
    }

    let { direction = 'column', spacing, align, justify, children, class: className, ...rest }: Props = $props();

    let clsStack = twMerge([
        'flex',
        direction === 'row' ? 'flex-row min-w-fit w-full' : 'flex-col min-h-fit h-full',
        spacing !== undefined ? toResponsiveClass(spacing, (spacing) => `gap-${spacing}`) : 'gap-2',
        align && `items-${align}`,
        justify && `justify-${justify}`,
        className
    ]);
</script>

<div class={clsStack} {...rest}>
    {@render children?.()}
</div>
