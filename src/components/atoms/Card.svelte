<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import { type Snippet } from 'svelte';
    import Typography from './Typography.svelte';
    import type { Color } from '../types';

    interface Props {
        icon?: Snippet;
        caption?: string;

        shadow?: boolean;
        color?: Color;
        ghost?: boolean;

        children?: Snippet;
        actions?: Snippet;
    }

    let { icon, caption, shadow, color, ghost, children, actions }: Props = $props();
</script>

<Box compact border {color} {shadow} {ghost} class="grid max-w-lg grid-cols-[min-content,1fr] justify-items-center">
    {#if icon}
        <div class="icon-lg m-2 w-fit">
            {@render icon()}
        </div>
    {/if}

    {#if caption}
        <Typography variant="h4" element="p" weight="emphasis" class="mb-2 justify-self-start align-middle">
            {caption}
        </Typography>
    {/if}
    {#if children}
        <div class="col-start-2 h-full max-h-64 w-full overflow-y-auto">
            {@render children()}
        </div>
    {/if}
    <!-- </div> -->
    {#if actions}
        <div class="col-span-full col-start-1 m-2 flex flex-grow flex-col md:flex-row md:self-end">
            {@render actions()}
        </div>
    {/if}
</Box>
