<script lang="ts">
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ElementProps } from '../types';
    import { type ResponsiveProp, toResponsiveClass } from '../types/responsive-prop';
    import { type Spacing, toSpacingClasses } from '../types/spacing';

    type Direction = 'row' | 'column';
    type Alignment = 'start' | 'center' | 'end' | 'stretch';

    interface Props extends ElementProps {
        direction?: 'row' | 'column' | ResponsiveProp<Direction>;
        spacing?: Spacing;
        align?: Alignment | ResponsiveProp<Alignment>;
        justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
        wrap?: boolean;
        grow?: boolean;
        class?: string;
        children?: Snippet;
    }

    let {
        direction = 'column',
        spacing = 2,
        align = 'stretch',
        justify,
        wrap,
        grow,
        children,
        class: className,
        ...rest
    }: Props = $props();

    let spacingClass = $derived(toSpacingClasses(spacing, { all: 'gap', x: 'gap-x', y: 'gap-y' }));
    let directionClass = $derived(
        toResponsiveClass(direction, (m, dir) => (dir === 'row' ? [`${m}flex-row`] : [`${m}flex-col`]))
    );
    let alignClass = $derived(
        toResponsiveClass(align, (m, a) => {
            switch (a) {
                case 'start':
                    return `${m}items-start`;
                case 'center':
                    return `${m}items-center`;
                case 'end':
                    return `${m}items-end`;
                case 'stretch':
                    return `${m}items-stretch`;
            }
        })
    );

    let clsStack = $derived(
        twMerge(
            'flex',
            directionClass,
            spacingClass,
            alignClass,
            justify && `justify-${justify}`,
            wrap && 'flex-wrap',
            grow && '[&>*]:flex-1',
            className
        )
    );
</script>

<div class={clsStack} {...rest}>
    {@render children?.()}
</div>
