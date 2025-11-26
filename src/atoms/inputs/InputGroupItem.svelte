<script lang="ts">
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import { getBoxContext } from '../layouts/Box.svelte';
    import { getInputGroupContext } from './InputGroup.svelte';
    import { getGroupBorderClasses } from './types';

    interface Props {
        /** Additional CSS classes */
        class?: string;

        /** Child content to wrap */
        children: Snippet;
    }

    let { children, class: className }: Props = $props();

    let groupInfo = getInputGroupContext();
    if (!groupInfo) {
        throw new Error('InputGroupItem must be used inside an InputGroup component');
    }

    let boxInfo = getBoxContext();

    let borderColor = $derived.by(() => {
        if (groupInfo.variant === 'outline' && boxInfo && !groupInfo.color) {
            return boxInfo.border;
        }
        return `on-${groupInfo.color}`;
    });

    let itemClass = $derived(
        twMerge(...getGroupBorderClasses(groupInfo.vertical, groupInfo.variant, borderColor), className)
    );
</script>

<div class={itemClass}>
    {@render children()}
</div>
