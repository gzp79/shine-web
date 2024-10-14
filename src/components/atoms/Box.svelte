<script lang="ts">
    import { setContext, getContext, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        border?: boolean;
        shadow?: boolean;
        // Whether to use a compact layout and reduce margins and padding
        compact?: boolean;
        // Whether to use a ghost box with no background
        ghost?: boolean;
        class?: string;
        children?: Snippet;
    }

    let { border, shadow, compact, ghost, class: className, children }: Props = $props();

    const bgColorClasses = [
        'bg-surface-mute text-on-surface',
        'bg-surface text-on-surface',
        'bg-surface-accent text-on-surface'
    ];
    const borderClasses = ['border-surface', 'border-surface-accent', 'border-surface-mute'];
    const shadowClasses = ['shadow-surface', 'shadow-surface-accent', 'shadow-surface-mute'];

    // Get the current nesting level from the context or default to 0
    let nestingLevel: number = getContext('Box_nestingLevel') ?? 0;
    setContext('Box_nestingLevel', nestingLevel + 1);
    setContext('Box_color', bgColorClasses[nestingLevel % bgColorClasses.length]);

    let boxClass = $derived(
        twMerge(
            'rounded-lg overflow-hidden',
            !compact && (nestingLevel < 1 ? 'm-4' : nestingLevel < 3 ? 'm-2' : 'm-1'),
            !compact && 'p-4',
            !ghost && bgColorClasses[nestingLevel % bgColorClasses.length],
            border && `border ${borderClasses[nestingLevel % borderClasses.length]}`,
            shadow && `shadow-md ${shadowClasses[nestingLevel % shadowClasses.length]}`,
            className
        )
    );
</script>

<div class={boxClass}>
    {#if children}
        {@render children()}
    {/if}
</div>
