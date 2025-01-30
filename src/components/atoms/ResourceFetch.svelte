<script lang="ts" module>
    export type Status = 'loading' | 'completed' | 'error';
</script>

<script lang="ts" generics="T">
    import type { AppError, Nullable } from '$lib/utils';
    import type { Snippet } from 'svelte';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props<T> {
        initial?: T;
        fetch: () => Promise<T>;
        loading: Snippet;
        content: Snippet<[data: T, isDirty: boolean]>;
        error: Snippet<[error: AppError]>;

        // read only bindable props indicating the current state
        status?: Status;
        // read only bindable props updated on each successful fetch
        dataVersion?: number;
    }
    let {
        initial,
        fetch,
        loading,
        content,
        error,
        status = $bindable('loading'),
        dataVersion = $bindable(0)
    }: Props<T> = $props();

    let loadingState = $state(false);
    let resourceState = $state<Nullable<T>>(initial ?? null);
    let errorState = $state<Nullable<AppError>>(null);

    type FetchError = { __fetch_error: AppError };
    const fetchResource = async (): Promise<T | null | FetchError> => {
        let result;
        try {
            result = await fetch();
        } catch (err) {
            result = { __fetch_error: err as AppError };
        }
        return result;
    };

    $effect(() => {
        loadingState = true;
        status = 'loading';
        fetchResource().then((data) => {
            if (data instanceof Object && '__fetch_error' in data) {
                resourceState = null;
                status = 'error';
                errorState = data.__fetch_error;
            } else {
                resourceState = data;
                status = 'completed';
            }
            dataVersion += 1;
            loadingState = false;
        });
    });
</script>

{#if errorState}
    {@render error(errorState)}
{:else if resourceState}
    {@render content(resourceState, loadingState)}
{:else}
    {@render loading()}
{/if}
