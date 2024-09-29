<script lang="ts">
    import Typography, { type Variant } from '$atoms/Typography.svelte';

    const variants: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption'];
</script>

<div class="flex flex-col gap-4">
    {#each variants as variant}
        <div class="mb-4">
            <Typography variant="h6" class="text-primary" weight="bold">Variant: {variant}</Typography>
            <Typography {variant}>The quick brown fox jumps over the lazy dog</Typography>
            <Typography {variant} weight="emphasis">The quick brown fox jumps over the lazy dog</Typography>
            <Typography {variant} underline weight="bold">The quick brown fox jumps over the lazy dog</Typography>
        </div>
    {/each}
</div>
