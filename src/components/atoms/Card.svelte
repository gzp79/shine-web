<script lang="ts" module>
    import { isSnippet } from '$lib/utils';
    import { type Component, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Box, { type Variant as BoxVariant } from './Box.svelte';
    import Typography from './Typography.svelte';
    import type { ElementProps } from './types';

    export type Width = 'default' | 'fit' | 'full';
    export type Variant = BoxVariant;
</script>

<script lang="ts">
    interface Props extends ElementProps {
        icon?: Snippet | Component;
        caption?: string;

        shadow?: boolean;
        variant?: Variant;
        width?: Width;

        children?: Snippet;
        actions?: Snippet;
    }

    let { icon, caption, shadow, variant, width = 'default', children, actions, ...rest }: Props = $props();

    const widthVariants: Record<Width, string> = {
        default: 'max-w-xl w-full',
        fit: 'max-w-full w-fit',
        full: 'w-full'
    };

    let boxClass = $derived(
        twMerge(
            'm-1 md:m-2 p-1 md:p-2',
            'min-h-min',
            'grid',
            icon ? 'grid-cols-[fit-content(10%)_minmax(0,1fr)]' : 'grid-cols-1',
            widthVariants[width]
        )
    );
</script>

<Box compact border {variant} {shadow} class={boxClass} {...rest}>
    {#if icon}
        <div class="my-2 ms-2 flex h-10 w-10 items-center justify-center md:h-12 md:w-12">
            {#if isSnippet(icon)}
                {@render icon()}
            {:else}
                {@const Icon = icon}
                <Icon />
            {/if}
        </div>
    {/if}

    <div class="flex h-full w-full flex-col bg-inherit">
        {#if caption}
            <Typography
                variant="h4"
                element="p"
                weight="emphasis"
                class="h-fit w-full py-1 pe-2 {!icon && 'text-center'}"
            >
                {caption}
            </Typography>
        {/if}

        <div class="max-h-md min-h-3 overflow-y-auto overflow-x-hidden bg-inherit md:px-1">
            {#if children}
                <div class="min-h-min w-full px-1 md:px-4 {icon && caption && 'ps-2'}">
                    {@render children()}
                </div>
            {/if}

            <div class="sticky flex h-fit w-full flex-row justify-end bg-inherit px-1 py-1 md:px-2">
                {#if actions}
                    {@render actions()}
                {/if}
            </div>
        </div>
    </div>
</Box>
