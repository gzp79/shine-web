<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Typography from './Typography.svelte';
    import { type Snippet } from 'svelte';

    interface Props {
        image: Snippet;
        caption?: string;
        children?: Snippet;
        side?: boolean;
        shadow?: boolean;
        compact?: boolean;
        ghost?: boolean;
    }

    let { image, caption, children, side, shadow, compact, ghost }: Props = $props();
</script>

<Box border {shadow} {compact} {ghost} class="relative min-h-min w-fit">
    <div class="flex {side ? 'flex-row' : 'flex-col'}">
        <div class="flex flex-col items-center justify-center {side && 'me-4'}">
            {@render image()}
        </div>
        <div class="flex max-h-96 w-full flex-col items-center">
            {#if caption}
                <Typography variant="h4" weight="emphasis" class="{children && 'mb-4'} text-center md:text-start">
                    {caption}
                </Typography>
            {/if}
            {#if children}
                <div class="overflow-y-auto">
                    {@render children()}
                </div>
            {/if}
        </div>
    </div>
</Box>
