<script lang="ts" module>
    export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
    export type Weight = 'normal' | 'emphasis' | 'bold';
</script>

<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import type { Snippet } from 'svelte';

    interface Props {
        variant: Variant;

        underline?: boolean;
        weight?: Weight;
        class?: string;

        children: Snippet;
    }
    let { variant, underline, weight = 'normal', class: className, children }: Props = $props();

    let variantElement = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        body1: 'p',
        body2: 'p',
        caption: 'p'
    };

    const variantClasses = {
        h1: 'text-4xl',
        h2: 'text-3xl',
        h3: 'text-2xl',
        h4: 'text-xl',
        h5: 'text-lg',
        h6: 'text-base',
        body1: 'text-base',
        body2: 'text-sm',
        caption: 'text-xs'
    };

    const weightClasses = {
        normal: 'font-normal',
        emphasis: 'font-semibold',
        bold: 'font-bold'
    };

    let element = $derived(variantElement[variant]);
    let textClass = $derived(
        twMerge([variantClasses[variant], weightClasses[weight], underline && 'underline', className])
    );
</script>

<svelte:element this={element} class={textClass}>{@render children()}</svelte:element>
