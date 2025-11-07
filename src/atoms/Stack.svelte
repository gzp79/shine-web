<script lang="ts" module>
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ElementProps } from './types';
    import { type ResponsiveProp, toResponsiveClass } from './types/responsive-prop';
</script>

<script lang="ts">
    import { toResponsiveClass, type ResponsiveProp } from './types/responsive-prop';
    import { toSpacingClasses, type SpacingXY } from './types/spacing';

    type Direction = 'row' | 'column';

    interface Props extends ElementProps {
        direction?: 'row' | 'column' | ResponsiveProp<Direction>;
        spacing?: SpacingXY;
        align?: 'start' | 'center' | 'end';
        justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
        wrap?: boolean;
        class?: string;
        children?: Snippet;
    }

    let { direction = 'column', spacing, align, justify, wrap, children, class: className, ...rest }: Props =
        $props();

    let spacingClass = $derived(toSpacingClasses(spacing, { all: 'gap', x: 'gap-x', y: 'gap-y' }) ?? 'gap-2');

    let clsStack = twMerge([
        'flex',
        toResponsiveClass(direction, (m, dir) =>
            (dir === 'row' ? ['flex-row', 'min-w-fit', 'w-full'] : ['flex-col', 'min-h-fit', 'h-full']).map(
                (x) => `${m}${x}`
            )
        ),
        spacingClass,
        align && `items-${align}`,
        justify && `justify-${justify}`,
        wrap && 'flex-wrap',
        className
    ]);
</script>

<div class={clsStack} {...rest}>
    {@render children?.()}
</div>
