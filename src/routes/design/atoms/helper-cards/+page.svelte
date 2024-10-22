<script lang="ts">
    import { range, sizeList } from '$components/types';
    import Box from '$atoms/Box.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import Story from '../../_components/Story.svelte';
    import Button from '$src/components/atoms/Button.svelte';
</script>

<Story variant="dense">
    {#each sizeList as size}
        <Box border>
            <LoadingCard {size} label="Loading {size}" />
        </Box>
    {/each}
</Story>

<Story variant="center">
    <ErrorCard
        caption="Error card"
        error={{
            errorKind: 'other',
            message: 'This is the error message'
        }}
    />
    <ErrorCard
        caption="Error card"
        error={{
            errorKind: 'other',
            message: 'This is the error message',
            detail: {
                code: '123',
                id: 'This is some detail'
            }
        }}
    />
    <ErrorCard
        caption="Error card"
        error={{
            errorKind: 'other',
            message: 'This is the error message',
            detail: {
                code: '123',
                id: 'This is some detail'
            }
        }}
    >
        {#each range(0, 3) as i}
            <p>Some children {i}</p>
        {/each}
        <ErrorCard
            caption="Nested error card"
            error={{
                errorKind: 'other',
                message: 'This is the nested error message'
            }}
        />
        {#each range(0, 5) as i}
            <p>Some children {3 + i}</p>
        {/each}
        {#snippet actions()}
            <Button>Retry</Button>
        {/snippet}
    </ErrorCard>
</Story>
