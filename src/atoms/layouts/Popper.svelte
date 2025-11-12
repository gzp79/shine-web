<script lang="ts" module>
    import type { Nullable } from '$lib/utils';
    import type { Middleware } from '@floating-ui/dom';
    import * as floatingDom from '@floating-ui/dom';
    import { type Snippet, onMount } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import { portal } from '../utilities/Portal.svelte';

    export type Behavior = 'click' | 'toggle' | 'hover' | 'manual';
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
</script>

<script lang="ts">
    interface Props {
        //#region Mount-time only properties
        /** Selector for the trigger element(s) */
        trigger?: HTMLElement | string;
        /** Selector for the reference element, defaults to the first trigger element */
        reference?: HTMLElement | string;
        /** Selector for the layer element containing the popper, defaults to document.body */
        layer?: string;
        /** What should trigger the popper to open */
        behavior?: Behavior;
        /** Whether to include content clicks in the "safe zone" */
        includeContent?: boolean;
        /** Placement of the popper relative to the reference element */
        placement?: Placement;
        //#endregion

        //#region Reactive properties
        /** Align the width of the popper to the reference element */
        alignWidth?: boolean;
        /** Offset distance from the reference element */
        offset?: number;
        //#endregion

        //#region Bindable properties
        /** In/Out state indicating whether the popper is open */
        open?: boolean;
        //#endregion

        /** Children elements */
        children: Snippet;
    }
    let {
        trigger,
        reference,
        layer = '#popper',
        behavior = 'click',
        includeContent = false,
        placement = 'top',
        alignWidth = false,
        offset = 4,
        open: isOpen = $bindable(false),
        children
    }: Props = $props();

    // Derived behavior flags
    const isClick = behavior === 'click';
    const isToggle = behavior === 'toggle';
    const isHover = behavior === 'hover';
    //const isManual = $derived(behavior === 'manual');

    // State variables
    let triggerEls: HTMLElement[] = [];
    let referenceEl: Nullable<HTMLElement> = null;
    let contentEl: HTMLElement = null!;
    let popperLocator: HTMLElement = null!;
    let autoUpdateCleanup: null | (() => void) = null;
    let width = $state(0);

    const divClass = $derived(twMerge('fixed left-0 top-0 z-40', !isOpen ? 'hidden' : 'block'));
    const divStyle = $derived(alignWidth ? `min-width: ${width}px;` : '');

    // Actions
    const show = () => {
        isOpen = true;
    };

    const hide = () => {
        isOpen = false;
    };

    const toggle = (event: MouseEvent) => {
        event.stopPropagation();
        if (isOpen) hide();
        else show();
    };

    const cancelOnEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            hide();
        }
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

    const updatePosition = async () => {
        if (referenceEl) {
            width = referenceEl.getBoundingClientRect().width;

            const middleware: Middleware[] = [
                floatingDom.offset(offset),
                floatingDom.flip(),
                floatingDom.shift({ padding: 5 }),
                floatingDom.hide()
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
            console.log('Popper hide data:', hideData?.referenceHiddenOffsets);

            if (hideData?.referenceHidden || hideData?.escaped) {
                hide();
            }
        }
    };

    onMount(() => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const events: [boolean, string, any][] = [
            [isToggle, 'click', toggle],
            [isClick, 'click', toggle],
            [isClick, 'keydown', cancelOnEscape],
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

        return () => {
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
        if (isOpen) {
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

<div class="hidden" bind:this={popperLocator}></div>
<div use:portal={layer} bind:this={contentEl} class={divClass} style={divStyle}>
    {@render children()}
</div>
