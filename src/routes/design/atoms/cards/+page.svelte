<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { range } from '$src/components/types';
    import { Google } from '$atoms/icons/social';
    import Card from '$atoms/Card.svelte';
    import { Settings } from '$atoms/icons/common';
    import Button from '$atoms/Button.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';
    import { lorem } from '../../_components/lorem';
    import CheckBox from '../../_components/CheckBox.svelte';

    let showContent = $state(3);
    let fixedSize = $state(true);

    let cardClass = $derived(twMerge(fixedSize && 'w-[80%]'));

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select
        label="Content detail"
        options={[
            ['None', 0],
            ['Line', 1],
            ['Text block', 2],
            ['Table', 3],
            ['Long', 4]
        ]}
        bind:value={showContent}
    />
    <CheckBox label="Fixed size" bind:value={fixedSize} />
{/snippet}

{#snippet contentPart()}
    {#if showContent == 1}
        <p>{lorem.slice(0, 50)}</p>
    {:else if showContent == 2}
        <p class="text-justify">{lorem.slice(0, 241)}</p>
    {:else if showContent == 3}
        <KeyValueTable
            size="xs"
            items={[
                ['Provider', 'google'],
                ['User Id', '1234567890'],
                ['Date', '2021-09-01'],
                ['Status', 'active']
            ]}
        />
    {:else if showContent == 4}
        <p class="text-justify">{lorem}</p>
    {/if}
{/snippet}

<Story variant="center">
    <Card caption="Card with title and body" {cardClass}>
        {#if showContent > 0}
            {@render contentPart()}
        {/if}
        {#snippet actions()}
            <Button>Action 1</Button>
            <Button>Action 2</Button>
            <Button>Action 3</Button>
        {/snippet}
    </Card>

    <Card caption="Card with title, body and icon" {cardClass}>
        {#snippet icon()}
            <Google />
        {/snippet}
        {#if showContent > 0}
            {@render contentPart()}
        {/if}
        {#snippet actions()}
            <Button>Action 1</Button>
            <Button>Action 2</Button>
        {/snippet}
    </Card>

    <Card {cardClass}>
        {#snippet icon()}
            <Google />
        {/snippet}
        {#if showContent > 0}
            {@render contentPart()}
        {/if}
        {#snippet actions()}
            <Button>Action 1</Button>
            <Button>Action 2</Button>
        {/snippet}
    </Card>

    <Card caption="Nested cards" {cardClass}>
        {#snippet icon()}
            <Settings color="warning" />
        {/snippet}

        {#each range(0, 4) as _i}
            <Card caption="Google" cardClass="w-full">
                {#snippet icon()}
                    <Google />
                {/snippet}
                {#if showContent > 0}
                    {@render contentPart()}
                {/if}
                {#snippet actions()}
                    <Button>Action 1</Button>
                {/snippet}
            </Card>
        {/each}

        {#snippet actions()}
            <Button>Action 1</Button>
            <Button>Action 2</Button>
        {/snippet}
    </Card>
</Story>
