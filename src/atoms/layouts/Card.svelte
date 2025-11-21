<script lang="ts">
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Typography from '../Typography.svelte';
    import type { ActionColor } from '../types';
    import Box from './Box.svelte';
    import Stack from './Stack.svelte';
    import type { Width } from './types';

    interface Props {
        caption?: string;
        shadow?: boolean;
        color?: ActionColor;
        width?: Width;
        icon?: Snippet | null;
        children?: Snippet;
        actions?: Snippet;
    }

    let { icon, caption, shadow, color, width = 'fit', children, actions }: Props = $props();

    let iconClass = $derived(
        twMerge('flex shrink-0', 'h-12 w-12 sm:w-12', 'self-center sm:self-start items-center justify-center ')
    );
    let captionClass = $derived(
        twMerge('p-2 sm:ps-0 overflow-hidden text-ellipsis', icon ? 'text-center sm:text-start' : 'text-center')
    );
    let childClass = $derived(twMerge('max-h-smv min-h-3 overflow-y-auto overflow-x-hidden', caption && 'sm:ps-2'));
</script>

<Box compact border {color} {shadow} {width}>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0, sm: 2 }} align="stretch" class="p-2">
        {#if icon}
            <div class={iconClass}>{@render icon()}</div>
        {/if}

        <Stack direction="column" spacing={0} class="min-w-0 flex-1 overflow-x-hidden">
            {#if caption}
                <Typography variant="h4" element="p" weight="emphasis" class={captionClass}>
                    {caption}
                </Typography>
            {/if}

            {#if children}
                <div class={childClass}>
                    {@render children()}
                </div>
            {/if}

            {#if actions}
                <Stack direction="row" spacing={2} justify="end" class="sticky bottom-0 bg-inherit p-2">
                    {@render actions()}
                </Stack>
            {/if}
        </Stack>
    </Stack>
</Box>
