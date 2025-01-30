<script lang="ts">
    import type { Snippet } from 'svelte';
    import CompileTailwindClasses from './CompileTailwindClasses.svelte';
    import { type ResponsiveProp, toResponsiveClass, toResponsiveProp } from './types';

    type Spaces = 0 | 0.5 | 1 | 2 | 4 | 8 | 12;
    type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    interface Props {
        spacing?:
            | Spaces
            | ResponsiveProp<Spaces>
            | { col: Spaces | ResponsiveProp<Spaces>; row: Spaces | ResponsiveProp<Spaces> };
        columns?: Columns | ResponsiveProp<Columns>;
        dense?: boolean;
        children: Snippet;
    }

    let { spacing = toResponsiveProp(2), columns, dense, children }: Props = $props();

    let spacingClass = $derived(
        typeof spacing === 'object' && 'col' in spacing
            ? [toResponsiveClass(spacing.col, (s) => `gap-x-${s}`), toResponsiveClass(spacing.row, (s) => `gap-y-${s}`)]
            : [toResponsiveClass(spacing, (s) => `gap-${s}`)]
    );

    let containerClass = $derived.by(() =>
        [
            `grid`,
            'auto-rows-fr',
            'auto-cols-fr',
            columns && toResponsiveClass(columns, (s) => `grid-cols-${s}`),
            dense && 'grid-flow-dense',
            ...spacingClass
        ]
            .filter((x) => x)
            .join(' ')
    );
</script>

<CompileTailwindClasses
    classList={[
        'grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12',
        'md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6 md:grid-cols-7 md:grid-cols-8 md:grid-cols-9 md:grid-cols-10 md:grid-cols-11 md:grid-cols-12',
        'lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 lg:grid-cols-7 lg:grid-cols-8 lg:grid-cols-9 lg:grid-cols-10 lg:grid-cols-11 lg:grid-cols-12',
        'xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 xl:grid-cols-7 xl:grid-cols-8 xl:grid-cols-9 xl:grid-cols-10 xl:grid-cols-11 xl:grid-cols-12',
        'gap-0 gap-0.5 gap-1 gap-2 gap-3 gap-4 gap-8 gap-12',
        'md:gap-0 md:gap-0.5 md:gap-1 md:gap-2 md:gap-3 md:gap-4 md:gap-8 md:gap-12',
        'lg:gap-0 lg:gap-0.5 lg:gap-1 lg:gap-2 lg:gap-3 lg:gap-4 lg:gap-8 lg:gap-12',
        'xl:gap-0 xl:gap-0.5 xl:gap-1 xl:gap-2 xl:gap-3 xl:gap-4 xl:gap-8 xl:gap-12',
        'gap-x-0 gap-x-0.5 gap-x-1 gap-x-2 gap-x-3 gap-x-4 gap-x-8 gap-x-12',
        'md:gap-x-0 md:gap-x-0.5 md:gap-x-1 md:gap-x-2 md:gap-x-3 md:gap-x-4 md:gap-x-8 md:gap-x-12',
        'lg:gap-x-0 lg:gap-x-0.5 lg:gap-x-1 lg:gap-x-2 lg:gap-x-3 lg:gap-x-4 lg:gap-x-8 lg:gap-x-12',
        'xl:gap-x-0 xl:gap-x-0.5 xl:gap-x-1 xl:gap-x-2 xl:gap-x-3 xl:gap-x-4 xl:gap-x-8 xl:gap-x-12',
        'gap-y-0 gap-y-0.5 gap-y-1 gap-y-2 gap-y-3 gap-y-4 gap-y-8 gap-y-12',
        'md:gap-y-0 md:gap-y-0.5 md:gap-y-1 md:gap-y-2 md:gap-y-3 md:gap-y-4 md:gap-y-8 md:gap-y-12',
        'lg:gap-y-0 lg:gap-y-0.5 lg:gap-y-1 lg:gap-y-2 lg:gap-y-3 lg:gap-y-4 lg:gap-y-8 lg:gap-y-12',
        'xl:gap-y-0 xl:gap-y-0.5 xl:gap-y-1 xl:gap-y-2 xl:gap-y-3 xl:gap-y-4 xl:gap-y-8 xl:gap-y-12'
    ]}
/>

<div class={containerClass}>
    {@render children()}
</div>
