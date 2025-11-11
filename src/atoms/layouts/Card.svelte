<script lang="ts" module>
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Typography from '../Typography.svelte';
    import type { ActionColor, ElementProps } from '../types';
    import Box from './Box.svelte';
    import Stack from './Stack.svelte';

    export type Width = 'small' | 'big' | 'fit' | 'full';
</script>

<script lang="ts">
    interface Props extends ElementProps {
        caption?: string;
        shadow?: boolean;
        color?: ActionColor;
        width?: Width;
        icon?: Snippet | null;
        children?: Snippet;
        actions?: Snippet;
    }

    let { icon, caption, shadow, color, width = 'fit', children, actions }: Props = $props();

    const widthVariants: Record<Width, string> = {
        fit: 'max-w-full w-fit',
        small: 'max-w-sm w-full',
        big: 'max-w-3xl w-full',
        full: 'w-full'
    };

    let boxClass = $derived(twMerge('min-h-min', widthVariants[width]));
    let iconClass = $derived(
        twMerge('flex shrink-0', 'h-12 w-12 md:w-12', 'self-center md:self-start items-center justify-center ')
    );
    let captionClass = $derived(
        twMerge('p-2 md:ps-0 overflow-hidden text-ellipsis', icon ? 'text-center md:text-start' : 'text-center')
    );
    let childClass = $derived(twMerge('max-h-mdv min-h-3 overflow-y-auto overflow-x-hidden', caption && 'md:ps-2'));
</script>

<Box compact border {color} {shadow} class={boxClass}>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0, md: 2 }} align="stretch" class="p-2">
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
