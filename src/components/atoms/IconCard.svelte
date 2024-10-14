<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import { type Snippet } from 'svelte';
    import Typography from './Typography.svelte';

    interface Props {
        icon?: Snippet;
        caption?: string;

        shadow?: boolean;
        ghost?: boolean;

        children?: Snippet;
    }

    let { icon, caption, shadow, ghost, children }: Props = $props();
</script>

<Box compact border {shadow} {ghost}>
    <div class="flex h-max max-h-72 flex-col items-center overflow-y-auto p-4 md:flex-row md:items-start">
        {#if icon}
            <div class="icon-lg top-0 mb-2 h-auto max-w-full md:sticky md:mb-0 md:me-4">
                {@render icon()}
            </div>
        {/if}
        <div class="flex h-full w-full flex-col">
            {#if caption}
                <Typography variant="h4" element="p" weight="emphasis" class="md:text-start {children && 'mb-4'}">
                    {caption}
                </Typography>
            {/if}
            {#if children}
                <div class="h-full pb-2">
                    {@render children()}
                </div>
            {/if}
        </div>
    </div>
</Box>
