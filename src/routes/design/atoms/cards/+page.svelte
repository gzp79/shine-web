<script lang="ts">
    import { range } from '$src/components/types';
    import { Google } from '$atoms/icons/social';
    import Card from '$atoms/Card.svelte';
    import { Settings } from '$atoms/icons/common';
    import Button from '$atoms/Button.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import CheckBox from '../../_components/CheckBox.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';
    import { lorem } from '../../_components/lorem';

    let showImage = $state(true);
    let showCaption = $state(true);
    let showContent = $state(3);
    let showAction = $state(2);

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <CheckBox label="Image" bind:value={showImage} />
    <CheckBox label="Caption" bind:value={showCaption} />
    <Select label="Content detail" options={[0, 1, 2, 3, 4]} bind:value={showContent} />
    <Select label="Action detail" options={[0, 1, 2]} bind:value={showAction} />
{/snippet}

{#snippet imagePart()}
    <Google />
{/snippet}

{#snippet contentPart()}
    {#if showContent > 3}
        <p class="text-justify">{lorem}</p>
    {:else if showContent > 2}
        <p class="text-justify">{lorem.slice(0, 241)}</p>
    {:else if showContent > 1}
        <p>{lorem.slice(0, 50)}</p>
        <p>{lorem.slice(0, 50)}</p>
        <p>{lorem.slice(0, 50)}</p>
        <p>{lorem.slice(0, 50)}</p>
        <p>{lorem.slice(0, 50)}</p>
    {:else if showContent > 0}
        <p>{lorem.slice(0, 50)}</p>
    {/if}
{/snippet}

<Story variant="center">
    <Card
        caption={showCaption ? 'This is a simple card' : undefined}
        icon={showImage ? imagePart : undefined}
        children={showContent > 0 ? contentPart : undefined}
    />

    <Card
        caption={showCaption ? 'This is a ghost chard' : undefined}
        icon={showImage ? imagePart : undefined}
        children={showContent > 0 ? contentPart : undefined}
        ghost
    >
        {#snippet actions()}
            <Button>Action 1</Button>
            <Button>Action with long text</Button>
            <Button>Action 2</Button>
            <Button>Action 3</Button>
        {/snippet}
    </Card>

    <Card caption="Identities">
        {#snippet icon()}
            <Settings color="warning" />
        {/snippet}

        {#each range(0, 4) as _i}
            <Card caption="Google">
                {#snippet icon()}
                    <Google />
                {/snippet}
                <p>Provider: google</p>
                <p>User Id: 1234567890</p>
                <p>Date: 2021-09-01</p>
                <p>Status: active</p>
            </Card>
        {/each}

        {#snippet actions()}
            <Button>Action 1</Button>
            <Button>Action with long text</Button>
            <Button>Action 2</Button>
            <Button>Action 3</Button>
        {/snippet}
    </Card>

    <Card caption="Top level">
        {#snippet icon()}
            <Settings color="warning" />
        {/snippet}
        <Card caption="2nd level">
            {#snippet icon()}
                <Settings color="info" />
            {/snippet}
            <Card caption="3rd level">
                {#snippet icon()}
                    <Settings color="error" />
                {/snippet}
                <p>{lorem.slice(0, 500)}</p>
            </Card>
        </Card>
    </Card>
</Story>
