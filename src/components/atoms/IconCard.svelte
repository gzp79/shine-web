<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import { type Snippet } from 'svelte';
    import Typography from './Typography.svelte';

    interface Props {
        icon?: Snippet;
        caption?: string;

        shadow?: boolean;
        dense?: boolean;
        ghost?: boolean;

        children?: Snippet;
    }

    let { icon, caption, shadow, dense, ghost, children }: Props = $props();
</script>

<Box border {shadow} {dense} {ghost} class="min-h-min overflow-y-auto">
    <div class="flex flex-col items-center md:flex-row md:items-start">
        {#if icon}
            <div class="top-0 mb-2 h-auto max-w-full md:sticky md:mb-0 md:me-4">
                {@render icon()}
            </div>
        {/if}
        <div class="flex max-h-72 w-full flex-col">
            {#if caption}
                <Typography variant="h4" weight="emphasis" class="{children && 'mb-4'} text-center md:text-start"
                    >{caption}</Typography
                >
            {/if}
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
</Box>
