<script lang="ts">
    import { lorem } from '$components/lorem';
    import ImageCard from '$atoms/ImageCard.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import CheckBox from '../../_components/CheckBox.svelte';
    import Select from '../../_components/Select.svelte';

    let showCaption = $state(true);
    let showContent = $state(3);
    let showAction = $state(2);

    const imageUrl = 'https://picsum.photos/id/242/400/600';

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <CheckBox label="Caption" bind:value={showCaption} />
    <Select label="Content detail" options={[0, 1, 2, 3, 4]} bind:value={showContent} />
    <Select label="Action detail" options={[0, 1, 2]} bind:value={showAction} />
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

<div class="flex w-full flex-col items-center">
    <ImageCard
        caption={showCaption ? 'This is a caption' : undefined}
        children={showContent > 0 ? contentPart : undefined}
    >
        {#snippet image()}
            <img src={imageUrl} alt="" />
        {/snippet}
    </ImageCard>

    <ImageCard
        side
        caption={showCaption ? 'This is a caption' : undefined}
        children={showContent > 0 ? contentPart : undefined}
    >
        {#snippet image()}
            <img src={imageUrl} alt="" />
        {/snippet}
    </ImageCard>
</div>
