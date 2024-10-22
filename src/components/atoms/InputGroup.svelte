<script lang="ts" module>
    import type { Color, Size } from '../types';

    export interface GroupInfo {
        size: Size;
        color?: Color;
        vertical: boolean;
    }
</script>

<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { setContext, type Snippet } from 'svelte';

    interface Props {
        size?: Size;
        color?: Color;
        vertical?: boolean;
        children: Snippet;
    }

    let { size = 'md', color, vertical = false, children }: Props = $props();

    let divClass = $derived(twMerge('inline-flex', vertical && 'flex-col w-max', !vertical && 'h-max'));

    setContext('InputGroup_props', { size, color, vertical });
</script>

<div class={divClass}>
    {@render children()}
</div>
