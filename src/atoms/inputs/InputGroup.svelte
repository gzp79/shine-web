<script lang="ts" module>
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import { getBoxContext } from '../layouts/Box.svelte';
    import { type ActionColor, type ElementProps, createContext } from '../types';
    import type { InputSize, InputVariant } from './types';

    /**
     * Context information provided by InputGroup to its children.
     * Children can access this via getContext('InputGroup_props').
     */
    export interface GroupInfo {
        /** Size for all inputs in the group */
        size: InputSize;
        /** Color for all inputs in the group */
        color?: ActionColor;
        /** Whether inputs should take full width */
        wide?: boolean;
        /** Whether inputs are stacked vertically */
        vertical: boolean;
        /** Visual variant for all inputs in the group */
        variant: InputVariant;
    }
    const [getInputGroupContext, setInputGroupContext] = createContext<GroupInfo>('InputGroup');
    export { getInputGroupContext };
</script>

<script lang="ts">
    interface Props extends ElementProps {
        /** Size for all inputs in the group. Default: 'md' */
        size?: InputSize;
        /** Color for all inputs in the group. Inherits from Box if not specified */
        color?: ActionColor;
        /** Stack inputs vertically instead of horizontally. Default: false */
        vertical?: boolean;
        /** Visual variant for all inputs in the group. Default: 'filled' */
        variant?: InputVariant;
        /** Make inputs take full width. Default: false */
        wide?: boolean;
        /** Additional CSS classes */
        class?: string;
        /** Child inputs to be grouped */
        children: Snippet;
    }

    let {
        size = 'md',
        color: baseColor,
        vertical = false,
        variant = 'filled',
        wide = false,
        class: className,
        children,
        ...rest
    }: Props = $props();

    let boxInfo = getBoxContext();

    // Compute effective color with fallback chain: baseColor -> boxInfo.fgColor -> 'primary'
    let effectiveColor = $derived.by(() => {
        if (variant === 'filled') {
            return baseColor ?? 'primary';
        }
        return baseColor ?? boxInfo?.fgColor ?? 'primary';
    });

    // Create reactive context for children
    // svelte-ignore state_referenced_locally
    let context = $state<GroupInfo>({
        size,
        color: effectiveColor,
        vertical,
        variant,
        wide
    });
    $effect(() => {
        context.size = size;
        context.color = effectiveColor;
        context.vertical = vertical;
        context.variant = variant;
        context.wide = wide;
    });
    setInputGroupContext(context);

    let containerClass = $derived(
        twMerge('inline-flex', vertical ? 'flex-col' : 'flex-row', wide && 'w-full', className)
    );
</script>

<div class={containerClass} {...rest}>
    {@render children()}
</div>
