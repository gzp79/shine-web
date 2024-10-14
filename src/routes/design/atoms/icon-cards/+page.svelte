<script lang="ts">
    import { lorem } from '$components/lorem';
    import { Google } from '$atoms/icons/social';
    import IconCard from '$atoms/IconCard.svelte';
    import { Settings } from '$atoms/icons/common';
    import { range } from '$src/components/types';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import CheckBox from '../../_components/CheckBox.svelte';
    import Select from '../../_components/Select.svelte';
    import Story from '../../_components/Story.svelte';

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
        <p>{lorem}</p>
    {:else if showContent > 2}
        <p>{lorem.slice(0, 250)}</p>
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
    <IconCard
        caption={showCaption ? 'This is a simple card' : undefined}
        icon={showImage ? imagePart : undefined}
        children={showContent > 0 ? contentPart : undefined}
    />

    <IconCard
        caption={showCaption ? 'This is a ghost chard' : undefined}
        icon={showImage ? imagePart : undefined}
        children={showContent > 0 ? contentPart : undefined}
        ghost
    />

    <IconCard caption="Identities">
        {#snippet icon()}
            <Settings color="warning" />
        {/snippet}

        {#each range(0, 4) as _i}
            <IconCard caption="Google">
                {#snippet icon()}
                    <Google />
                {/snippet}
                <p>Provider: google</p>
                <p>User Id: 1234567890</p>
                <p>Date: 2021-09-01</p>
                <p>Status: active</p>
            </IconCard>
        {/each}
    </IconCard>

    <IconCard caption="Top level">
        {#snippet icon()}
            <Settings color="warning" />
        {/snippet}
        <IconCard caption="2nd level">
            {#snippet icon()}
                <Settings color="info" />
            {/snippet}
            <IconCard caption="3rd level">
                {#snippet icon()}
                    <Settings color="error" />
                {/snippet}
                <p>{lorem.slice(0, 500)}</p>
            </IconCard>
        </IconCard>
    </IconCard>
</Story>
