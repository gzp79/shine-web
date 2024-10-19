<script lang="ts">
    import { type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Box from '$atoms/Box.svelte';
    import Typography from '$atoms/Typography.svelte';
    import type { Color } from '../types';

    interface Props {
        icon?: Snippet;
        caption?: string;

        shadow?: boolean;
        color?: Color;
        ghost?: boolean;

        children?: Snippet;
        actions?: Snippet;

        cardClass?: string;
        role?: string;
    }

    let { icon, caption, shadow, color, ghost, children, actions, cardClass, role }: Props = $props();

    let boxClass = $derived(
        twMerge(
            'm-2 justify-items-center overflow-hide max-w-xl',
            'grid',
            icon ? 'grid-cols-[min-content,auto]' : 'grid-cols-1',
            cardClass
        )
    );
</script>

<Box compact border {color} {shadow} {ghost} class={boxClass} {role}>
    {#if icon}
        <div class="max-icon-lg min-icon-md m-2 w-fit">
            {@render icon()}
        </div>
    {/if}

    <div class="relative max-h-96 w-full overflow-y-auto bg-inherit pe-2 {!icon && 'ps-2'} ">
        {#if caption}
            <Typography
                variant="h4"
                element="p"
                weight="emphasis"
                class="sticky left-0 top-0 z-20 justify-self-start bg-inherit px-0 py-1"
            >
                {caption}
            </Typography>
        {/if}
        {#if children}
            <div
                class="relative z-10 col-start-2 flex w-full flex-grow flex-col items-center ps-1 {!actions && 'pb-2'}"
            >
                {@render children()}
            </div>
        {/if}
        {#if actions}
            <div class="sticky bottom-0 start-0 z-20 flex flex-row justify-end bg-inherit px-2 py-1">
                {@render actions()}
            </div>
        {/if}
    </div>
</Box>
