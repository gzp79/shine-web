<script lang="ts" module>
    import { type Variant as BoxVariant } from '$atoms/Box.svelte';

    export type Width = 'default' | 'fit' | 'full';
    export type Variant = BoxVariant;
</script>

<script lang="ts">
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Box from '$atoms/Box.svelte';
    import Typography from '$atoms/Typography.svelte';

    interface Props {
        icon?: Snippet;
        caption?: string;

        shadow?: boolean;
        variant?: Variant;
        // indicates if the card should have a fixed width of 90% of the parent container
        width?: Width;

        children?: Snippet;
        actions?: Snippet;

        role?: string;
    }

    let { icon, caption, shadow, variant, width = 'default', children, actions, role }: Props = $props();

    const widthVariants: Record<Width, string> = {
        default: 'max-w-xl w-[90%]',
        fit: 'max-w-xl w-fit',
        full: 'w-full'
    };

    let boxClass = $derived(
        twMerge(
            'm-2 overflow-hidden',
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
            'relative z-10 col-start-2 flex w-full flex-grow flex-col px-2',
            !actions && 'pb-2',
            variant?.outline && `text-on-surface`
        )
    );
</script>

<Box compact border {variant} {shadow} class={boxClass} {role}>
    {#if icon}
        <div class="max-icon-lg min-icon-md m-2 w-fit">
            {@render icon()}
        </div>
    {/if}

    <div class="relative max-h-96 w-full overflow-y-auto bg-inherit pe-2 {!icon && 'ps-2'}">
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
