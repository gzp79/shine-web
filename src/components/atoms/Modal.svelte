<script lang="ts" module>
    import { onMount, type Snippet } from 'svelte';
    import Box from './Box.svelte';
    import Button from './Button.svelte';
    import type { ElementProps } from './types';
    import { twMerge } from 'tailwind-merge';
    import * as icons from './icons/common';
    import type { Nullable } from '$lib/utils';
    import { portal } from './Portal.svelte';
</script>

<script lang="ts">
    interface Props extends ElementProps {
        // Selector for the layer element containing the popper, defaults to document.body
        layer?: string;
        isOpen?: boolean;
        closeButton?: boolean;
        closeOnClickOutside?: boolean;
        closeOnEscape?: boolean;
        innerClass?: string;
        boxClass?: string;
        children?: Snippet;
    }
    let {
        layer = '#modal',
        isOpen = $bindable(false),
        closeButton,
        closeOnClickOutside,
        closeOnEscape,
        innerClass,
        boxClass,
        children
    }: Props = $props();

    let background = $state<Nullable<HTMLDivElement>>(null);
    let boxCls = $derived(twMerge(['overflow-hidden', 'rounded-lg', 'p-0'], boxClass));
    let innerCls = $derived(
        twMerge(
            ['flex', 'flex-col', 'items-center', 'justify-center'],
            ['max-h-sm', 'h-fit', 'w-fit', 'overflow-y-auto', 'overflow-x-hidden'],
            ['px-8', 'py-2'],
            innerClass
        )
    );

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
</script>

{#if isOpen}
    <div
        use:portal={layer}
        class="fixed inset-0 z-50 m-2 flex select-none items-center justify-center backdrop-blur-sm"
        bind:this={background}
    >
        <div class="relative">
            <Box border class={boxCls}>
                <div class={innerCls}>
                    {@render children?.()}
                </div>
            </Box>
            {#if closeButton}
                <Button
                    color="secondary"
                    variant="ghost"
                    class="absolute right-0 top-0 m-2 -translate-y-1/2 translate-x-1/2"
                    startIcon={icons.Cross}
                    onclick={() => (isOpen = false)}
                />
            {/if}
        </div>
    </div>
{/if}
