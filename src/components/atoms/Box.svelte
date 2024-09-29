<script lang="ts">
    import { setContext, getContext, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        border?: boolean;
        shadow?: boolean;
        // Whether to use a dense layout and reduce margins
        dense?: boolean;
        // Whether to use a ghost box with no background
        ghost?: boolean;
        class?: string;
        children?: Snippet;
    }

    let { border, shadow, dense, ghost, class: className, children }: Props = $props();

    // Get the current nesting level from the context or default to 0
    let nestingLevel: number = getContext('Box_nestingLevel') ?? 0;
    setContext('Box_nestingLevel', nestingLevel + 1);

    const bgColorClasses = ['bg-base-100', 'bg-base-200', 'bg-base-300'];
    const borderClasses = ['border-primary', 'border-secondary', 'border-base-100'];
    const shadowClasses = ['shadow-primary', 'shadow-secondary', 'shadow-base-100'];

    let boxClass = $derived(
        twMerge([
            'rounded-lg p-4',
            !dense && (nestingLevel < 1 ? 'm-4' : nestingLevel < 3 ? 'm-2' : 'm-1'),
            !ghost && bgColorClasses[nestingLevel % bgColorClasses.length],
            border && `border ${borderClasses[nestingLevel % borderClasses.length]}`,
            shadow && `shadow-md ${shadowClasses[nestingLevel % shadowClasses.length]}`,
            className
        ])
    );
</script>

<div class={boxClass}>
    {#if children}
        {@render children()}
    {/if}
</div>
