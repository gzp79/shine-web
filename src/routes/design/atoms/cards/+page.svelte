<script lang="ts">
    import { range } from '$src/components/types';
    import { Google } from '$atoms/icons/social';
    import Card, { type Width } from '$atoms/Card.svelte';
    import { Settings } from '$atoms/icons/common';
    import Button from '$atoms/Button.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';
    import { lorem } from '../../_components/lorem';
    import CheckBox from '../../_components/CheckBox.svelte';

    let showContent = $state(3);
    let showActions = $state(true);
    let width = $state<Width>('default');

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Width" options={['default', 'fit', 'full']} bind:value={width} />
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
    <CheckBox label="Actions" bind:value={showActions} />
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

{#snippet actionPart()}
    <Button>Action 1</Button>
    <Button>Action 2</Button>
{/snippet}

{#snippet iconPart()}
    <Google />
{/snippet}

<Story variant="center">
    <Card
        caption="Card with title and body"
        {width}
        children={showContent ? contentPart : undefined}
        actions={showActions ? actionPart : undefined}
    />

    <Card
        caption="Card with title, body and icon"
        {width}
        icon={iconPart}
        children={showContent ? contentPart : undefined}
        actions={showActions ? actionPart : undefined}
    />

    <Card
        {width}
        icon={iconPart}
        children={showContent ? contentPart : undefined}
        actions={showActions ? actionPart : undefined}
    />

    <Card
        caption="Card with nested cards                       "
        {width}
        actions={showActions ? actionPart : undefined}
    >
        {#snippet icon()}
            <Settings color="warning" />
        {/snippet}

        {#each range(0, 4) as _i}
            <Card caption="Google" width="full">
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
    </Card>
</Story>
