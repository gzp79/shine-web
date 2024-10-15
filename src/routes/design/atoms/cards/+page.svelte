<script lang="ts">
    import { sizeList } from '$components/types';
    import Box from '$atoms/Box.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import Story from '../../_components/Story.svelte';
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
        <div class="flex flex-col items-center">
            <p>Some children</p>
            <p>Some children</p>
            <p>Some children</p>
            <p>Some children</p>
            <ErrorCard
                caption="Nested error card"
                error={{
                    errorKind: 'other',
                    message: 'This is the nested error message'
                }}
            />
            <p>Some children</p>
            <p>Some children</p>
            <p>Some children</p>
            <p>Some children</p>
            <p>Some children</p>
        </div>
    </ErrorCard>
</Story>
