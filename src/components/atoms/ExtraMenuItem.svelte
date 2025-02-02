<script lang="ts">
    import type { Nullable } from '$lib/utils';
    import { type Snippet, getContext } from 'svelte';
    import { type ExtraMenuContext, getVisualInfo } from './ExtraMenu.svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    let context = getContext<ExtraMenuContext>('ExtraMenu_props');
    let el: Nullable<HTMLElement> = null;
    let offsetHeight = $state(0);

    let style = $derived.by(() => {
        const top = el?.offsetTop ?? 0;
        const visualInfo = getVisualInfo(context.value, top, top + offsetHeight);
        if (visualInfo) {
            return `transform: translate(${visualInfo.offsetX}px, ${visualInfo.offsetY}px); opacity: ${visualInfo.opacity}`;
        } else {
            return 'visibility: hidden;';
        }
    });
</script>

<div bind:this={el} bind:offsetHeight {style}>
    {@render children()}
</div>
