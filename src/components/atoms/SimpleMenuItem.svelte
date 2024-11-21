<script lang="ts">
    import { type Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    //let context = getContext<SimpleMenuContext>('SimpleMenu_props');
</script>

{@render children()}
