<script lang="ts" module>
    export type Status = 'loading' | 'completed' | 'error';
</script>

<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import type { AppError, Nullable } from '$lib/utils';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props<T> {
        initial?: T;
        fetch: () => Promise<T>;
        loading: Snippet;
        content: Snippet<[data: T, isDirty: boolean]>;
        error: Snippet<[error: AppError]>;

        // read only bindable props indicating the current state
        readonly status?: Status;
        // read only bindable props updated on each successful fetch
        readonly dataVersion?: number;
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

    let resourceState = $state<Nullable<T>>(initial ?? null);
    let errorState = $state<Nullable<AppError>>(null);
    let invalidateCount = $state(0);

    export function invalidate() {
        invalidateCount += 1;
    }

    const fetchResource = async (): Promise<void> => {
        try {
            resourceState = await fetch();
            status = 'completed';
            dataVersion += 1;
        } catch (err) {
            resourceState = null;
            status = 'error';
            errorState = err as AppError;
        }
    };

    $effect(() => {
        status = 'loading';
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        invalidateCount;
        fetchResource();
    });
</script>

{#if errorState}
    {@render error(errorState)}
{:else if resourceState}
    {@render content(resourceState, status !== 'completed')}
{:else}
    {@render loading()}
{/if}
