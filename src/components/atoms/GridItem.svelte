<script lang="ts">
    import type { Snippet } from 'svelte';
    import CompileTailwindClasses from './CompileTailwindClasses.svelte';
    import { type ResponsiveProp, toResponsiveClass } from './types';

    type Spans = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';

    interface Props {
        size?: Spans | ResponsiveProp<Spans>;
        start?: Spans | ResponsiveProp<Spans>;
        span?: Spans | ResponsiveProp<Spans>;

        children: Snippet;
    }

    let { size, start: offset, span, children }: Props = $props();

    let itemClass = $derived(
        [
            size && toResponsiveClass(size, (size) => `col-span-${size}`),
            offset && toResponsiveClass(offset, (offset) => `col-start-${offset}`),
            span && toResponsiveClass(span, (span) => `row-span-${span}`)
        ]
            .filter((x) => x)
            .join(' ')
    );
</script>

<CompileTailwindClasses
    classList={[
        'col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12',
        'sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12',
        'md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6 md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12',
        'lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12',
        'xl:col-span-1 xl:col-span-2 xl:col-span-3 xl:col-span-4 xl:col-span-5 xl:col-span-6 xl:col-span-7 xl:col-span-8 xl:col-span-9 xl:col-span-10 xl:col-span-11 xl:col-span-12',
        'row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6 row-span-7 row-span-8 row-span-9 row-span-10 row-span-11 row-span-12',
        'sm:row-span-1 sm:row-span-2 sm:row-span-3 sm:row-span-4 sm:row-span-5 sm:row-span-6 sm:row-span-7 sm:row-span-8 sm:row-span-9 sm:row-span-10 sm:row-span-11 sm:row-span-12',
        'md:row-span-1 md:row-span-2 md:row-span-3 md:row-span-4 md:row-span-5 md:row-span-6 md:row-span-7 md:row-span-8 md:row-span-9 md:row-span-10 md:row-span-11 md:row-span-12',
        'lg:row-span-1 lg:row-span-2 lg:row-span-3 lg:row-span-4 lg:row-span-5 lg:row-span-6 lg:row-span-7 lg:row-span-8 lg:row-span-9 lg:row-span-10 lg:row-span-11 lg:row-span-12',
        'xl:row-span-1 xl:row-span-2 xl:row-span-3 xl:row-span-4 xl:row-span-5 xl:row-span-6 xl:row-span-7 xl:row-span-8 xl:row-span-9 xl:row-span-10 xl:row-span-11 xl:row-span-12',
        'col-start-1 col-start-2 col-start-3 col-start-4 col-start-5 col-start-6 col-start-7 col-start-8 col-start-9 col-start-10 col-start-11 col-start-12',
        'sm:col-start-1 sm:col-start-2 sm:col-start-3 sm:col-start-4 sm:col-start-5 sm:col-start-6 sm:col-start-7 sm:col-start-8 sm:col-start-9 sm:col-start-10 sm:col-start-11 sm:col-start-12',
        'md:col-start-1 md:col-start-2 md:col-start-3 md:col-start-4 md:col-start-5 md:col-start-6 md:col-start-7 md:col-start-8 md:col-start-9 md:col-start-10 md:col-start-11 md:col-start-12',
        'lg:col-start-1 lg:col-start-2 lg:col-start-3 lg:col-start-4 lg:col-start-5 lg:col-start-6 lg:col-start-7 lg:col-start-8 lg:col-start-9 lg:col-start-10 lg:col-start-11 lg:col-start-12',
        'xl:col-start-1 xl:col-start-2 xl:col-start-3 xl:col-start-4 xl:col-start-5 xl:col-start-6 xl:col-start-7 xl:col-start-8 xl:col-start-9 xl:col-start-10 xl:col-start-11 xl:col-start-12'
    ]}
/>

<div class={itemClass}>
    {@render children()}
</div>
