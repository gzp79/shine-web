<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import { type AppError, async } from '$lib/utils';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import Stack from '$atoms/Stack.svelte';
    import ErrorCard from '$components/ErrorCard.svelte';
    import Story from '../../_components/_Story.svelte';

    let fetchRandomFunction = async () => {
        await async.delay(1000);
        return `${uuid()}`;
    };

    let triggerFunctionChange = $state(0);
    let fetchFunction = $derived.by(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        triggerFunctionChange;
        // construct a new function to trigger a refetch
        return () => fetchRandomFunction();
    });

    let triggerInvalidate: ResourceFetch<string> = null!;
</script>

{#snippet loading()}
    <LoadingCard />
{/snippet}

{#snippet content(token: string, isDirty: boolean)}
    {token} - {isDirty}
{/snippet}

{#snippet error(err: AppError)}
    <div class="self-center">
        <ErrorCard error={err} />
    </div>
{/snippet}

<Story variant="center">
    <Box border legend="Resource loading">
        <ResourceFetch fetch={async.never} {content} {error} {loading} />
    </Box>
    <Box border legend="Resource error">
        <ResourceFetch fetch={() => async.error(new Error('Test error'))} {content} {error} {loading} />
    </Box>

    <Box border legend="Resource alter fetch">
        <Stack align="center">
            <Button onclick={() => triggerFunctionChange++}>Trigger load</Button>
            <ResourceFetch fetch={fetchFunction} {content} {error} {loading} />
        </Stack>
    </Box>

    <Box border legend="Resource alter dataVersion">
        <Stack align="center">
            <Button onclick={() => triggerInvalidate.invalidate()}>Trigger load</Button>
            <ResourceFetch bind:this={triggerInvalidate} fetch={fetchRandomFunction} {content} {error} {loading} />
        </Stack>
    </Box>
</Story>
