<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props<T> {
        use: () => T;
        children: Snippet;
    }
    let { children, use: useContext }: Props<T> = $props();

    useContext();
</script>

{@render children()}
