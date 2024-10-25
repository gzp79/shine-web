<script lang="ts" module>
    export type State = 'loading' | 'completed' | 'error';
</script>

<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import type { AppError } from '$lib/utils';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props<T> {
        initial?: T;
        fetch: T | Promise<T>;
        loading: Snippet;
        content: Snippet<[data: T, isDirty: boolean]>;
        error: Snippet<[error: AppError]>;
        onState?: (state: State) => void;
    }
    let { initial, fetch, loading, content, error, onState }: Props<T> = $props();

    let loadingState = $state(false);
    let resourceState = $state((initial ?? null) as T | null);

    const fetchResource = async (): Promise<void> => {
        onState?.('loading');
        loadingState = true;
        try {
            resourceState = await fetch;
            onState?.('completed');
        } catch (err) {
            resourceState = null;
            onState?.('error');
            throw err;
        } finally {
            loadingState = false;
        }
    };
</script>

{#await fetchResource()}
    {#if !resourceState}
        {@render loading()}
    {/if}
{:catch err}
    {@render error(err)}
{/await}

{#if resourceState !== null}
    {@render content(resourceState, loadingState)}
{/if}
