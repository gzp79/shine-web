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
        actions?: Snippet;
    }

    let { icon, caption, shadow, ghost, children, actions }: Props = $props();
</script>

<Box compact border {shadow} {ghost} class="grid max-w-xl grid-rows items-center">
    <div class="flex max-h-80 flex-col items-center overflow-y-auto px-4 pt-4 md:flex-row md:items-start">
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
    {#if actions}
        <div class="my-2 mx-2 flex flex-col align-middle md:flex-row md:self-end">
            {@render actions()}
        </div>
    {/if}
</Box>
