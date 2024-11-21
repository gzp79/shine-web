<script lang="ts" module>
    import Typography from '$atoms/Typography.svelte';
    import Alert from '$atoms/Alert.svelte';
    import Card from '$atoms/Card.svelte';
    import { Story } from '../../_components';
    import type { PageData } from './$types';
    import type { Fetch } from '$lib/utils';

    export type Data = Partial<{ ok: boolean; error?: Error }>;
    export async function fetchData(fetch: Fetch): Promise<Data> {
        try {
            const res = await fetch('https://example.com/user');
            const data = await res.json();
            return {
                ok: true,
                ...data
            };
        } catch (error) {
            return { ok: false, error: error as Error };
        }
    }
</script>

<script lang="ts">
    let { data }: { data: PageData } = $props();
</script>

{#snippet renderData(data: Data)}
    {#if data.ok}
        <Typography variant="code"><pre>{JSON.stringify(data, null, 2)}</pre></Typography>
    {:else}
        <Alert variant="error" caption="Mock failed">{data.error?.message}</Alert>
    {/if}
{/snippet}

<Story>
    <Card width="fit" caption="Client side fetch">
        {#await fetchData(fetch)}
            <p>Loading...</p>
        {:then data}
            {@render renderData(data)}
        {:catch error}
            <Alert variant="error" caption="Mock failed">{error.message}</Alert>
        {/await}
    </Card>

    <Card width="fit" caption="Server side fetch">
        {@render renderData(data.serverData)}
    </Card>

    <Card width="fit" caption="Server streamed fetch">
        {#await data.streamedData}
            <p>Loading...</p>
        {:then data}
            {@render renderData(data)}
        {:catch error}
            <Alert variant="error" caption="Mock failed">{error.message}</Alert>
        {/await}
    </Card>
</Story>
