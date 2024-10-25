<script lang="ts" module>
    export type Width = 'default' | 'fit' | 'full';
    export type Variant = BoxVariant;
</script>

<script lang="ts">
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { ElementProps } from './types';
    import Box, { type Variant as BoxVariant } from './Box.svelte';
    import Typography from './Typography.svelte';

    interface Props extends ElementProps {
        icon?: Snippet;
        caption?: string;

        shadow?: boolean;
        variant?: Variant;
        // indicates if the card should have a fixed width of 90% of the parent container
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
            'grid',
            icon ? 'grid-cols-[min-content,auto]' : 'grid-cols-1',
            widthVariants[width]
        )
    );
    let captionClass = $derived(twMerge('sticky left-0 top-0 z-20 justify-self-start px-0 py-1', 'bg-inherit'));
    let actionClass = $derived(
        twMerge('sticky bottom-0 start-0 z-20 flex flex-row justify-end px-2 py-1', 'bg-inherit')
    );
    let childClass = $derived(
        twMerge(
            'relative z-10 col-start-2 flex w-full flex-col px-1 md:px-2',
            !actions && 'pb-2',
            variant?.outline && `text-on-surface`
        )
    );
</script>

<Box compact border {variant} {shadow} class={boxClass} {...rest}>
    {#if icon}
        <div class="max-icon-lg min-icon-md m-1 w-fit md:m-2">
            {@render icon()}
        </div>
    {/if}

    <div class="relative max-h-96 w-full overflow-y-auto bg-inherit pe-1 md:pe-2 {!icon && 'ps-1 md:ps-2'}">
        {#if caption}
            <Typography variant="h4" element="p" weight="emphasis" class={captionClass}>{caption}</Typography>
        {/if}
        {#if children}
            <div class={childClass}>
                {@render children()}
            </div>
        {/if}
        {#if actions}
            <div class={actionClass}>
                {@render actions()}
            </div>
        {/if}
    </div>
</Box>
