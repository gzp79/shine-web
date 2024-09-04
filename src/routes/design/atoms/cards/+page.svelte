<script lang="ts">
    import { lorem } from '$components/lorem';
    import Card, { listVariants, type Variant } from '$atoms/Card.svelte';
    import Button from '$atoms/Button.svelte';
    import Google from '$atoms/icons/idps/_google.svelte';
    import CheckBox from '$components/settings/CheckBox.svelte';
    import Select from '$components/settings/Select.svelte';
    import { setSettings } from '../../+layout.svelte';

    let variant = $state('top' as Variant);
    let showImage = $state(true);
    let showCaption = $state(true);
    let showContent = $state(4);
    let showAction = $state(2);

    setSettings(settings);

    const caption = $derived(showCaption ? 'Caption' : undefined);
    const image = $derived(showImage ? imagePart : undefined);
    const action = $derived(showAction > 0 ? actionPart : undefined);
</script>

{#snippet settings()}
    <Select label="Variant" options={listVariants} bind:value={variant} />
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

{#snippet actionPart()}
    <Button label="Ok" />
    {#if showAction > 1}
        <Button label="Cancel" color="secondary" />
        <Button label="Maybe" color="warning" />
    {/if}
{/snippet}

<Card {variant} {caption} {image} {action}>
    {@render contentPart()}
</Card>

<Card variant="fieldset">
    <Card variant="data" {caption} {image} {action}>
        {@render contentPart()}
    </Card>
    <Card variant="data" {caption} {image} {action}>
        {@render contentPart()}
    </Card>
    <Card variant="data" {caption} {image} {action}>
        {@render contentPart()}
    </Card>
</Card>
