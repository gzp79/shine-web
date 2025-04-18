<script lang="ts" module>
    export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'text' | 'footnote' | 'code' | 'legend';
    export type Weight = 'normal' | 'emphasis' | 'bold';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        variant: Variant;
        element?: string;

        underline?: boolean;
        weight?: Weight;
        class?: string;

        children: Snippet;
    }
    let { variant, element, underline, weight = 'normal', class: className, children }: Props = $props();

    let variantElement = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        text: 'p',
        footnote: 'p',
        code: 'code',
        legend: 'legend'
    };

    const sharedHClasses = 'text-ellipsis text-pretty';
    const variantClasses = {
        h1: `text-4xl p-2 ${sharedHClasses}`,
        h2: `text-3xl p-1 ${sharedHClasses} `,
        h3: `text-2xl p-0.5 ${sharedHClasses} `,
        h4: `text-xl ${sharedHClasses}`,
        h5: `text-lg ${sharedHClasses}`,
        h6: `text-base ${sharedHClasses}`,
        text: 'text-base',
        footnote: 'text-sm',
        code: 'text-sm',
        legend: 'text-base'
    };

    const weightClasses = {
        normal: 'font-normal',
        emphasis: 'font-semibold',
        bold: 'font-bold'
    };

    let el = $derived(element ?? variantElement[variant]);
    let textClass = $derived(
        twMerge(variantClasses[variant], weightClasses[weight], underline && 'underline', className)
    );
</script>

<svelte:element this={el} class={textClass}>{@render children()}</svelte:element>
