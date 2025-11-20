<script lang="ts" module>
    import type { Middleware } from '@floating-ui/dom';
    import * as floatingDom from '@floating-ui/dom';
    import { type Snippet, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import type { Nullable } from '@lib/utils';
    import { portal } from '../utilities/Portal.svelte';

    export type Behavior = 'click' | 'hover' | 'manual';
    export type Placement =
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'left-start'
        | 'left-end'
        | 'right'
        | 'right-start'
        | 'right-end';
    export type Animation = 'fade' | 'none';

    // Global registry for managing multiple popper instances per layer
    class PopperRegistry {
        private layers = new Map<string, Set<{ hide: () => void; isOpen: () => boolean }>>();
        private escapeListenerAttached = false;

        register(layer: string, popper: { hide: () => void; isOpen: () => boolean }) {
            if (!this.layers.has(layer)) {
                this.layers.set(layer, new Set());
            }
            this.layers.get(layer)!.add(popper);
            this.attachEscapeListener();
        }

        unregister(layer: string, popper: { hide: () => void; isOpen: () => boolean }) {
            const layerPoppers = this.layers.get(layer);
            if (layerPoppers) {
                layerPoppers.delete(popper);
                if (layerPoppers.size === 0) {
                    this.layers.delete(layer);
                }
            }
            if (this.layers.size === 0) {
                this.detachEscapeListener();
            }
        }

        closeOthers(layer: string, currentPopper: { hide: () => void; isOpen: () => boolean }) {
            const layerPoppers = this.layers.get(layer);
            if (layerPoppers) {
                layerPoppers.forEach((popper) => {
                    if (popper !== currentPopper && popper.isOpen()) {
                        popper.hide();
                    }
                });
            }
        }

        private handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                // Find the last opened popper across all layers and close only that one
                type PopperInstance = { hide: () => void; isOpen: () => boolean };
                let lastOpenPopper: PopperInstance | null = null;

                for (const poppers of this.layers.values()) {
                    const openPoppers = Array.from(poppers).filter((p) => p.isOpen());
                    if (openPoppers.length > 0) {
                        lastOpenPopper = openPoppers[openPoppers.length - 1];
                    }
                }

                lastOpenPopper?.hide();
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
    }

    const popperRegistry = new PopperRegistry();
</script>

<script lang="ts">
    interface Props {
        /**
         * Selector for the trigger element(s).
         * @readonly - Not reactive: evaluated once on mount, do not bind dynamically.
         */
        trigger?: HTMLElement | string;
        /**
         * Selector for the reference element, defaults to the first trigger element.
         * @readonly - Not reactive: evaluated once on mount, do not bind dynamically.
         */
        reference?: HTMLElement | string;
        /**
         * Selector for the layer element containing the popper, defaults to document.body.
         * @readonly - Not reactive: evaluated once on mount, do not bind dynamically.
         */
        layer?: string;
        /**
         * What should trigger the popper to open.
         * - 'click': Click to open/close, closes other poppers in the same layer when opening
         * - 'hover': Open on mouseenter, close on mouseleave
         * - 'manual': Programmatic control only via the open prop
         * @readonly - Not reactive: evaluated once on mount, do not bind dynamically.
         */
        behavior?: Behavior;

        /** Whether to include content clicks in the "safe zone". */
        includeContent?: boolean;
        /** Placement of the popper relative to the reference element. */
        placement?: Placement;
        /** Align the width of the popper to the reference element, so that the popper is at least as wide as the reference element. */
        alignWidth?: boolean;
        /** Offset distance from the reference element */
        offset?: number;
        /** Animation for popper open/close */
        animate?: Animation;

        /** In/Out state indicating whether the popper is open */
        open?: boolean;

        /** Children elements */
        children: Snippet;
    }
    let {
        trigger: triggerProp,
        reference: referenceProp,
        layer: layerProp = '#popper',
        behavior: behaviorProp = 'click',
        includeContent = false,
        placement = 'top',
        alignWidth = false,
        offset = 4,
        animate = 'fade',
        open = $bindable(false),
        children
    }: Props = $props();

    const trigger = triggerProp;
    const reference = referenceProp;
    const layer = layerProp;
    const behavior = behaviorProp;
    if (import.meta.env.DEV) {
        $effect(() => {
            if (triggerProp !== trigger) {
                console.warn('Popper: trigger prop changed after mount - this has no effect');
            }
            if (referenceProp !== reference) {
                console.warn('Popper: reference prop changed after mount - this has no effect');
            }
            if (layerProp !== layer) {
                console.warn('Popper: layer prop changed after mount - this has no effect');
            }
            if (behaviorProp !== behavior) {
                console.warn('Popper: behavior prop changed after mount - this has no effect');
            }
        });
    }

    // Derived behavior flags
    const isClick = $derived(behavior === 'click');
    const isHover = $derived(behavior === 'hover');
    //const isManual = $derived(behavior === 'manual');

    // State variables
    let triggerEls: HTMLElement[] = [];
    let referenceEl: Nullable<HTMLElement> = null;
    // svelte-ignore non_reactive_update - bound at mount time
    let contentEl: HTMLElement = null!;
    let popperLocator: HTMLElement = null!;
    let showLocator = $state(false);
    let autoUpdateCleanup: null | (() => void) = null;
    let width = $state(0);

    const divStyle = $derived(alignWidth ? `min-width: ${width}px;` : '');
    const popperTransition = (node: Element, params: { animate: Animation }) => {
        if (params.animate === 'fade') {
            return fade(node, { duration: 250 });
        }

        return {
            duration: 0,
            css: () => ''
        };
    };

    // Actions
    const show = () => {
        if (isClick) {
            popperRegistry.closeOthers(layer, { hide, isOpen: () => open });
        }
        open = true;
    };

    const hide = () => {
        open = false;
    };

    const toggle = (event: MouseEvent) => {
        event.stopPropagation();
        if (open) hide();
        else show();
    };

    const handleClickOutside = (event: MouseEvent) => {
        const isTriggerChildren = triggerEls.some((el) => el.contains(event.target as Node));
        const isContentChildren = includeContent && contentEl.contains(event.target as Node);
        if (!isTriggerChildren && !isContentChildren) {
            hide();
        }
    };

    const handleMouseLeave = (event: MouseEvent) => {
        const target = event.relatedTarget as Node;
        const isTriggerChildren = triggerEls.some((el) => el.contains(target));
        const isContentChildren = includeContent && contentEl?.contains(target);
        if (!isTriggerChildren && !isContentChildren) {
            hide();
        }
    };

    const isPartiallyClipped = (el: HTMLElement): boolean => {
        if (!el) return false;
        const refRect = el.getBoundingClientRect();
        let ancestor = el.parentElement;
        while (ancestor && ancestor !== document.body && ancestor !== document.documentElement) {
            const style = getComputedStyle(ancestor);
            if (
                ['hidden', 'clip', 'scroll', 'auto'].includes(style.overflow) ||
                ['hidden', 'clip', 'scroll', 'auto'].includes(style.overflowX) ||
                ['hidden', 'clip', 'scroll', 'auto'].includes(style.overflowY)
            ) {
                const ancestorRect = ancestor.getBoundingClientRect();
                if (
                    refRect.left < ancestorRect.left ||
                    refRect.right > ancestorRect.right ||
                    refRect.top < ancestorRect.top ||
                    refRect.bottom > ancestorRect.bottom
                ) {
                    return true;
                }
            }
            ancestor = ancestor.parentElement;
        }
        return false;
    };

    const updatePosition = async () => {
        if (referenceEl) {
            width = referenceEl.getBoundingClientRect().width;

            const middleware: Middleware[] = [
                floatingDom.offset(offset),
                floatingDom.flip(),
                floatingDom.shift({ padding: 5 }),
                floatingDom.hide({ strategy: 'referenceHidden' })
            ];

            const { x, y, strategy, middlewareData } = await floatingDom.computePosition(referenceEl, contentEl, {
                placement,
                strategy: 'fixed',
                middleware
            });

            contentEl.style.position = strategy;
            contentEl.style.left = `${x}px`;
            contentEl.style.top = `${y}px`;

            // Hide if reference is hidden, escaped, or partially clipped
            const hideData = middlewareData.hide;
            if (hideData?.referenceHidden || hideData?.escaped || isPartiallyClipped(referenceEl)) {
                hide();
            }
        }
    };

    onMount(() => {
        // Register this popper instance
        popperRegistry.register(layer, { hide, isOpen: () => open });

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const events: [boolean, string, any][] = [
            [isClick, 'click', toggle],
            [isHover, 'mouseenter', show],
            [isHover, 'mouseleave', handleMouseLeave]
        ];

        // Find trigger elements
        if (trigger) {
            triggerEls = typeof trigger === 'string' ? [...document.querySelectorAll<HTMLElement>(trigger)] : [trigger];
        } else {
            triggerEls = popperLocator?.previousElementSibling
                ? [popperLocator.previousElementSibling as HTMLElement]
                : [];
        }
        if (!triggerEls.length) {
            console.warn('Popper: No triggers found. Use behavior="manual" for programmatic control.');
        }

        if (reference) {
            referenceEl = typeof reference === 'string' ? document.querySelector<HTMLElement>(reference) : reference;
        } else {
            referenceEl = triggerEls[0] ?? null;
        }
        if (!referenceEl) {
            console.warn('Popper: No reference element found.');
        }

        // Attach event listeners to the trigger elements
        triggerEls.forEach((element: HTMLElement) => {
            //if (element.tabIndex < 0) element.tabIndex = 0; // trigger must be focusable
            for (const [cond, name, handler] of events) {
                if (cond) {
                    element.addEventListener(name, handler);
                }
            }
        });

        // to avoid css issues once the locator is used, we can remove it from the dom
        showLocator = false;

        return () => {
            // Unregister this popper instance
            popperRegistry.unregister(layer, { hide, isOpen: () => open });

            // Detach event listeners from the trigger elements
            triggerEls.forEach((element: HTMLElement) => {
                if (element) {
                    for (const [, name, handler] of events) {
                        element.removeEventListener(name, handler);
                    }
                }
            });
            window.removeEventListener('click', handleClickOutside);
            autoUpdateCleanup?.();
        };
    });

    $effect(() => {
        if (open) {
            if (isClick) window.addEventListener('click', handleClickOutside);
            if (isHover && includeContent) contentEl?.addEventListener('mouseleave', handleMouseLeave);
            autoUpdateCleanup?.(); // just in case
            autoUpdateCleanup = floatingDom.autoUpdate(referenceEl!, contentEl, updatePosition, {
                ancestorScroll: true,
                ancestorResize: true,
                elementResize: true,
                layoutShift: true
            });
        } else {
            window.removeEventListener('click', handleClickOutside);
            if (isHover && includeContent) contentEl?.removeEventListener('mouseleave', handleMouseLeave);
            autoUpdateCleanup?.();
            autoUpdateCleanup = null;
        }
    });
</script>

{#if showLocator}
    <div data-test="popper-locator" class="hidden" bind:this={popperLocator}></div>
{/if}
{#if open}
    <div
        use:portal={layer}
        bind:this={contentEl}
        class="fixed left-0 top-0 z-40"
        style={divStyle}
        transition:popperTransition={{ animate }}
    >
        {@render children()}
    </div>
{/if}
