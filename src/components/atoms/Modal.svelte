<script lang="ts" module>
    import type { Nullable } from '$lib/utils';
    import { type Snippet, onMount } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Box from './Box.svelte';
    import { portal } from './Portal.svelte';
    import { Cross } from './icons/common';
    import type { ElementProps } from './types';
</script>

<script lang="ts">
    import Typography from './Typography.svelte';

    interface Props extends ElementProps {
        // Selector for the layer element containing the popper, defaults to document.body
        layer?: string;
        isOpen?: boolean;
        caption?: string;
        closeButton?: boolean;
        closeOnClickOutside?: boolean;
        closeOnEscape?: boolean;
        class?: string;
        children?: Snippet;
    }
    let {
        layer = '#modal',
        isOpen = $bindable(false),
        caption,
        closeButton,
        closeOnClickOutside,
        closeOnEscape,
        class: innerClass,
        children
    }: Props = $props();

    let background = $state<Nullable<HTMLDivElement>>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (event.target === background) isOpen = false;
    };
    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') isOpen = false;
    };
    $effect(() => {
        if (isOpen) {
            if (closeOnClickOutside) background?.addEventListener('click', handleClickOutside);
            if (closeOnEscape) window.document.addEventListener('keydown', handleEscape);
        } else {
            window.removeEventListener('click', handleClickOutside);
            background?.removeEventListener('keydown', handleEscape);
        }
    });

    onMount(() => {
        return () => {
            background?.removeEventListener('click', handleClickOutside);
            window.document.removeEventListener('keydown', handleEscape);
        };
    });

    let innerCls = $derived(
        twMerge(
            'flex flex-col grow',
            'max-h-sm h-full max-w-md min-w-min',
            'overflow-y-auto overflow-x-hidden_',
            'p-2',
            innerClass
        )
    );
</script>

{#if isOpen}
    <div
        use:portal={layer}
        class="fixed inset-0 z-50 m-2 flex select-none items-center justify-center backdrop-blur-sm"
        bind:this={background}
    >
        <Box border level={1} class="flex flex-col rounded-lg p-0 overflow-hidden">
            {#if closeButton || caption}
                <div class="flex items-center justify-between p-2 bg-container">
                    <div>
                        {#if caption}
                            <Typography variant="h5">{caption}</Typography>
                        {/if}
                    </div>
                    {#if closeButton}
                        <button
                            class="relative ms-4 h-8 w-8 select-none text-center rounded-lg align-middle text-on-surface hover:highlight-backdrop"
                            onclick={() => (isOpen = false)}
                        >
                            <Cross
                                size="sm"
                                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                            />
                        </button>
                    {/if}
                </div>
            {/if}

            <div class={innerCls}>
                {@render children?.()}
            </div>
        </Box>
    </div>
{/if}
