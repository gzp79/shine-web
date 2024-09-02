<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props<T> {
        initial?: T;
        fetch: () => Promise<T>;
        loading: Snippet;
        content: Snippet<[data: T, isDirty: boolean]>;
        error: Snippet<[error: Error]>;
        isLoading?: boolean;
    }
    let { initial, fetch, loading, content, error, isLoading = $bindable() }: Props<T> = $props();
    let previousResource = $state((initial ?? null) as T | null);
    const fetchResource = async (): Promise<T> => {
        isLoading = true;
        const resource = await fetch();
        previousResource = resource;
        isLoading = false;
        return resource;
    };
</script>

{#await fetchResource()}
    {#if previousResource === null}
        {@render loading()}
    {:else}
        {@render content(previousResource, true)}
    {/if}
{:then resource}
    {@render content(resource, false)}
{:catch err}
    {@render error(err)}
{/await}
