<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import TailwindClasses from '../TailwindClasses.svelte';
    import { type ResponsiveProp, toResponsiveClass, toResponsiveProp } from '../types/responsive-prop';
    import { type Spacing, toSpacingClasses } from '../types/spacing';

    type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    interface Props {
        spacing?: Spacing;
        columns?: Columns | ResponsiveProp<Columns>;
        dense?: boolean;
        class?: string;
        children: Snippet;
    }

    let { spacing = toResponsiveProp(2), columns, dense, class: className, children }: Props = $props();

    let spacingClass = $derived(toSpacingClasses(spacing, { all: 'gap', x: 'gap-x', y: 'gap-y' }));

    let containerClass = $derived(
        twMerge(
            'grid',
            'auto-rows-fr',
            'auto-cols-fr',
            columns && toResponsiveClass(columns, (m, s) => `${m}grid-cols-${s}`),
            dense && 'grid-flow-dense',
            spacingClass,
            className
        )
    );
</script>

<TailwindClasses
    classList={[
        'grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12',
        'md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6 md:grid-cols-7 md:grid-cols-8 md:grid-cols-9 md:grid-cols-10 md:grid-cols-11 md:grid-cols-12',
        'lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 lg:grid-cols-7 lg:grid-cols-8 lg:grid-cols-9 lg:grid-cols-10 lg:grid-cols-11 lg:grid-cols-12',
        'xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 xl:grid-cols-7 xl:grid-cols-8 xl:grid-cols-9 xl:grid-cols-10 xl:grid-cols-11 xl:grid-cols-12'
    ]}
/>

<div class={containerClass}>
    {@render children()}
</div>
