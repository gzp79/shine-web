<script lang="ts">
    import { lorem } from '$components/lorem';
    import { Google } from '$src/components/atoms/icons/social';
    import CheckBox from '$components/settings/CheckBox.svelte';
    import Select from '$components/settings/Select.svelte';
    import { setSettings } from '../../+layout.svelte';
    import IconCard from '$src/components/atoms/IconCard.svelte';
    import KeyValueTable from '$src/components/atoms/KeyValueTable.svelte';
    import { Settings } from '$src/components/atoms/icons/common';
    import { range } from '$src/components/types';

    let showImage = $state(true);
    let showCaption = $state(true);
    let showContent = $state(3);
    let showAction = $state(2);

    setSettings(settings);
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

<div class="flex w-full flex-col items-center">
    <IconCard
        caption={showCaption ? 'This is a caption' : undefined}
        icon={showImage ? imagePart : undefined}
        children={contentPart}
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

                <KeyValueTable
                    size="xs"
                    items={[
                        ['Provider', 'google'],
                        ['User ID', '1 - updated properties'],
                        ['Date', '2021-09-01'],
                        ['Status', 'active']
                    ]}
                />
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
</div>
