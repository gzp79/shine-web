<script lang="ts" module>
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ElementProps } from './types';
    import Box, { type Variant as BoxVariant } from './Box.svelte';
    import Typography from './Typography.svelte';

    export type Width = 'default' | 'fit' | 'full';
    export type Variant = BoxVariant;
</script>

<script lang="ts">
    interface Props extends ElementProps {
        icon?: Snippet;
        caption?: string;

        shadow?: boolean;
        variant?: Variant;
        width?: Width;

        children?: Snippet;
        actions?: Snippet;
    }

    let { icon, caption, shadow, variant, width = 'default', children, actions, ...rest }: Props = $props();

    const widthVariants: Record<Width, string> = {
        default: 'max-w-xl w-[100%]',
        fit: 'max-w-xl w-fit',
        full: 'w-full'
    };

    let boxClass = $derived(
        twMerge(
            'm-1 overflow-hidden md:m-2',
            'min-h-min',
            'grid',
            icon ? 'grid-cols-[fit-content(10%),auto]' : 'grid-cols-1',
            widthVariants[width]
        )
    );
</script>

<Box compact border {variant} {shadow} class={boxClass} {...rest}>
    {#if icon}
        <div class="m-2 flex h-12 w-12 items-center justify-center">
            {@render icon()}
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

        <div class="max-h-md min-h-3 overflow-y-auto overflow-x-hidden bg-inherit px-2">
            {#if children}
                <div class="min-h-min w-full px-2 {icon && caption && 'ps-4'} ">
                    {@render children()}
                </div>
            {/if}

            <div class="sticky flex h-fit w-full flex-row justify-end bg-inherit px-2 py-1">
                {#if actions}
                    {@render actions()}
                {/if}
            </div>
        </div>
    </div>
</Box>
