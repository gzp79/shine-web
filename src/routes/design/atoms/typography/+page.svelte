<script lang="ts">
    import Typography, { type Variant } from '@atoms/Typography.svelte';
    import { Story } from '../../_components';

    const variants: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'code'];
</script>

<Story>
    {#each variants as variant (variant)}
        <div class="mb-4">
            <Typography variant="h6" element="h2" weight="bold" class="text-primary">Variant: {variant}</Typography>
            <Typography {variant} element="p">The quick brown fox jumps over the lazy dog</Typography>
            <Typography {variant} element="p" weight="emphasis">The quick brown fox jumps over the lazy dog</Typography>
            <Typography {variant} element="p" underline weight="bold">
                The quick brown fox jumps over the lazy dog
            </Typography>
        </div>
    {/each}
</Story>
