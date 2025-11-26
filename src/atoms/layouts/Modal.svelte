<script lang="ts" module>
    import { type Snippet, onMount } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import Typography from '../Typography.svelte';
    import { Cross } from '../icons/common';
    import { portal } from '../utilities/Portal.svelte';
    import Box from './Box.svelte';
    import Stack from './Stack.svelte';
    import type { Width } from './types';

    // Global registry for managing multiple modal instances per layer
    class ModalRegistry {
        private layers = new Map<string, ModalInstance[]>();
        private escapeListenerAttached = false;
        private clickListenerAttached = false;
        private nextOrder = 0;

        register(layer: string, modal: ModalInstance): number {
            if (!this.layers.has(layer)) {
                this.layers.set(layer, []);
            }
            const order = this.nextOrder++;
            this.layers.get(layer)!.push(modal);
            this.attachEscapeListener();
            this.attachClickOutsideListener();
            return order;
        }

        unregister(layer: string, modal: ModalInstance) {
            const layerModals = this.layers.get(layer);
            if (layerModals) {
                const index = layerModals.findIndex((entry) => entry === modal);
                if (index !== -1) {
                    layerModals.splice(index, 1);
                }
                if (layerModals.length === 0) {
                    this.layers.delete(layer);
                }
            }
            if (this.layers.size === 0) {
                this.detachEscapeListener();
                this.detachClickOutsideListener();
            }
        }

        moveToTop(layer: string, modal: ModalInstance): number {
            const layerModals = this.layers.get(layer);
            if (layerModals) {
                const entry = layerModals.find((e) => e === modal);
                if (entry) {
                    const order = this.nextOrder++;
                    return order;
                }
            }
            return 0;
        }

        private handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                // Find the topmost (most recently opened) modal that allows ESC closing
                let topmostModal: ModalInstance | null = null;
                let highestOrder = -1;

                // find topmost modal
                for (const modals of this.layers.values()) {
                    const openModals = modals.filter((entry) => entry.isOpen());
                    for (const entry of openModals) {
                        const entryOrder = entry.order();
                        if (entryOrder > highestOrder) {
                            highestOrder = entryOrder;
                            topmostModal = entry;
                        }
                    }
                }

                if (topmostModal && topmostModal.isCloseOnEscape()) {
                    event.stopPropagation();
                    event.preventDefault();
                    topmostModal.close();
                }
            }
        };

        private handleClickOutside = (event: MouseEvent) => {
            // Find the topmost (most recently opened) modal that allows click outside closing
            let topmostModal: ModalInstance | null = null;
            let highestOrder = -1;

            for (const modals of this.layers.values()) {
                const openModals = modals.filter((entry) => entry.isOpen());
                for (const entry of openModals) {
                    const entryOrder = entry.order();
                    if (entryOrder > highestOrder) {
                        highestOrder = entryOrder;
                        topmostModal = entry;
                    }
                }
            }

            if (topmostModal && topmostModal.isCloseOnClickOutside(event)) {
                event.stopPropagation();
                event.preventDefault();
                topmostModal.close();
            }
        };

        private attachEscapeListener() {
            if (!this.escapeListenerAttached) {
                window.addEventListener('keydown', this.handleEscape);
                this.escapeListenerAttached = true;
            }
        }

        private detachEscapeListener() {
            if (this.escapeListenerAttached) {
                window.removeEventListener('keydown', this.handleEscape);
                this.escapeListenerAttached = false;
            }
        }

        private attachClickOutsideListener() {
            if (!this.clickListenerAttached) {
                window.addEventListener('click', this.handleClickOutside);
                this.clickListenerAttached = true;
            }
        }

        private detachClickOutsideListener() {
            if (this.clickListenerAttached) {
                window.removeEventListener('click', this.handleClickOutside);
                this.clickListenerAttached = false;
            }
        }
    }

    interface ModalInstance {
        close: () => void;
        isOpen: () => boolean;
        order: () => number;
        isCloseOnEscape: () => boolean;
        isCloseOnClickOutside: (event: MouseEvent) => boolean;
    }

    const modalRegistry = new ModalRegistry();
</script>

<script lang="ts">
    interface Props {
        /** Selector for the layer element containing the modal, defaults to #modal
         * @readonly - Not reactive: evaluated once on mount, do not bind dynamically.
         */
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
        width?: Width;
        /** Custom class for the modal content */
        class?: string;
        /** In/Out state indicating whether the popper is open */
        open?: boolean;
        /** Modal content */
        children?: Snippet;
    }

    let {
        layer: layerProp = '#modal',
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

    const layer = layerProp;
    if (import.meta.env.DEV) {
        $effect(() => {
            if (layerProp !== layer) {
                console.warn('Modal: layer prop changed after mount - this has no effect');
            }
        });
    }

    // svelte-ignore non_reactive_update
    let background: HTMLDivElement = null!;

    let zIndex = $state<number>(0);
    let hasHeader = $derived(closeButton || caption);
    let backdropClass = $derived(
        twMerge(
            'fixed inset-0',
            'flex items-center justify-center',
            'p-4',
            'backdrop-blur-sm bg-black/20',
            hideOnClose && !open && 'hidden'
        )
    );
    let contentClass = $derived(
        twMerge('w-full min-h-3 p-4', 'overflow-y-auto overflow-x-hidden', 'flex flex-col', className)
    );

    // Create modal instance for registry
    const modalInstance: ModalInstance = {
        close: () => (open = false),
        isOpen: () => open,
        order: () => zIndex,
        isCloseOnEscape: () => !!closeOnEscape,
        isCloseOnClickOutside: (event: MouseEvent) => !!closeOnClickOutside && event.target === background
    };

    // Handle open changes to bring modal to front
    $effect(() => {
        if (open) {
            zIndex = modalRegistry.moveToTop(layer, modalInstance);
        }
    });

    onMount(() => {
        // Register this modal instance
        zIndex = modalRegistry.register(layer, modalInstance);

        return () => {
            // Unregister this modal instance
            modalRegistry.unregister(layer, modalInstance);
        };
    });
</script>

{#if open || hideOnClose}
    <div use:portal={layer} class={backdropClass} style="z-index: {zIndex + 50}" bind:this={background}>
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
                                class="shrink-0 h-8 w-8 rounded-lg text-on-container hover:bg-on-container/10 transition-colors flex items-center justify-center"
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
