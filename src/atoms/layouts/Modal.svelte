<script lang="ts" module>
    import type { Nullable } from '$lib/utils';
    import { type Snippet, onMount } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Typography from '../Typography.svelte';
    import { Cross } from '../icons/common';
    import type { ElementProps } from '../types';
    import { portal } from '../utilities/Portal.svelte';
    import Box from './Box.svelte';
    import Stack from './Stack.svelte';

    export type ModalWidth = 'small' | 'big' | 'full' | 'fit';
</script>

<script lang="ts">
    interface Props extends ElementProps {
        /** Selector for the layer element containing the modal, defaults to #modal */
        layer?: string;
        /** Caption text displayed in the modal header */
        caption?: string;
        /** Show a close button (X) in the header */
        closeButton?: boolean;
        /** Allow closing the modal by clicking outside */
        closeOnClickOutside?: boolean;
        /** Allow closing the modal by pressing Escape */
        closeOnEscape?: boolean;
        /** When enabled, the modal will not unmount on close, just hide */
        hideOnClose?: boolean;
        /** Width preset for the modal */
        width?: ModalWidth;
        /** Custom class for the modal content */
        class?: string;

        //#region Bindable properties
        /** In/Out state indicating whether the popper is open */
        open?: boolean;
        //#endregion

        /** Modal content */
        children?: Snippet;
    }

    let {
        layer = '#modal',
        caption,
        closeButton,
        closeOnClickOutside,
        closeOnEscape,
        hideOnClose,
        width = 'big',
        class: className,
        open = $bindable(false),
        children
    }: Props = $props();

    let background = $state<Nullable<HTMLDivElement>>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (event.target === background) open = false;
    };

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') open = false;
    };

    $effect(() => {
        if (open && closeOnClickOutside) {
            background?.addEventListener('click', handleClickOutside);
        } else {
            background?.removeEventListener('click', handleClickOutside);
        }

        if (open && closeOnEscape) {
            window.document.addEventListener('keydown', handleEscape);
        } else {
            window.document.removeEventListener('keydown', handleEscape);
        }
    });

    onMount(() => {
        return () => {
            background?.removeEventListener('click', handleClickOutside);
            window.document.removeEventListener('keydown', handleEscape);
        };
    });

    let hasHeader = $derived(closeButton || caption);

    let backdropClass = $derived(
        twMerge(
            'fixed inset-0 z-50',
            'flex items-center justify-center',
            'p-4',
            'backdrop-blur-sm bg-black/20',
            hideOnClose && !open && 'hidden'
        )
    );

    let contentClass = $derived(
        twMerge('w-full min-h-3 p-4', 'overflow-y-auto overflow-x-hidden', 'flex flex-col', className)
    );
</script>

{#if open || hideOnClose}
    <div use:portal={layer} class={backdropClass} bind:this={background}>
        <Box border {width} level={1} margin={0} padding={0}>
            <Stack class="h-full">
                {#if hasHeader}
                    <Stack direction="row" justify="between" class="p-2 bg-container">
                        <Typography variant="h5">
                            {#if caption}
                                {caption}
                            {/if}
                        </Typography>
                        {#if closeButton}
                            <button
                                type="button"
                                class="flex-shrink-0 h-8 w-8 rounded-lg text-on-container hover:bg-on-container/10 transition-colors flex items-center justify-center"
                                onclick={() => (open = false)}
                                aria-label="Close modal"
                            >
                                <Cross size="sm" />
                            </button>
                        {/if}
                    </Stack>
                {/if}

                <div class="min-h-0 overflow-auto max-h-[70vh]">
                    <div class={contentClass}>
                        {@render children?.()}
                    </div>
                </div>
            </Stack>
        </Box>
    </div>
{/if}
