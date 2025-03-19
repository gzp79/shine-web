<script lang="ts">
    import Button from '$atoms/Button.svelte';
    import { range } from '$atoms/types';
    import ErrorCard from '$components/ErrorCard.svelte';
    import { Story } from '../../_components';
</script>

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
