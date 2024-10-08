<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { Nullable } from '$src/lib/utils';
    import type { Middleware } from '@floating-ui/dom';
    import * as floatingDom from '@floating-ui/dom';

    interface Props {
        //#region Mount-time only properties
        // Selector for the trigger element
        trigger?: string;
        // Selector for the reference element, defaults to the first trigger element
        reference?: string;
        // Whether the popper should be triggered by click
        clickable?: boolean;
        // Whether the popper should be triggered by hover
        hoverable?: boolean;
        //#endregion

        //#region Reactive properties
        // align the width of the popper to the reference element
        alignWidth?: boolean;
        // class to use for the container div when open
        display?: string;
        //#endregion

        //#region Bindable properties
        // In/Out state indicating whether the popper is open
        open?: boolean;
        //#endregion

        // children elements
        children: Snippet;
    }
    let {
        trigger,
        reference,
        clickable = false,
        hoverable = false,
        alignWidth = false,
        display = 'block',
        open: isOpen = $bindable(),
        children
    }: Props = $props();

    let triggerEls: HTMLElement[] = [];
    let referenceEl: Nullable<HTMLElement> = null;
    let contentEl: HTMLElement = null!;

    let autoUpdateCleanup: null | (() => void) = null;

    let width = $state(0);

    let divClass = $derived(twMerge('fixed left-0 top-0 z-10', !isOpen ? 'hidden' : display));
    let divStyle = $derived(alignWidth ? `width: ${width}px;` : '');

    const show = () => {
        isOpen = true;
    };
    const hide = () => {
        isOpen = false;
    };
    const toggle = () => {
        if (isOpen) hide();
        else show();
    };
    const cancelOnEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            hide();
        }
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (!triggerEls.some((el) => el.contains(event.target as Node))) {
            hide();
        }
    };

    const updatePosition = async () => {
        if (referenceEl) {
            width = referenceEl.getBoundingClientRect().width;
            const middleware: Middleware[] = [floatingDom.flip(), floatingDom.shift(), floatingDom.hide()];
            const { x, y, strategy, middlewareData } = await floatingDom.computePosition(referenceEl, contentEl, {
                placement: 'bottom',
                strategy: 'fixed',
                middleware
            });
            contentEl.style.position = strategy;
            contentEl.style.left = `${x}px`;
            contentEl.style.top = `${y}px`;
            if (middlewareData.hide?.referenceHidden) {
                hide();
            }
        }
    };

    onMount(() => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const events: [boolean, string, any][] = [
            [clickable, 'click', toggle],
            [clickable, 'keydown', cancelOnEscape],
            [hoverable, 'mouseenter', show],
            [hoverable, 'mouseleave', hide]
        ];
        /* eslint-enable @typescript-eslint/no-explicit-any */

        if (trigger) triggerEls = [...document.querySelectorAll<HTMLElement>(trigger)];
        else triggerEls = contentEl?.previousElementSibling ? [contentEl.previousElementSibling as HTMLElement] : [];
        if (!triggerEls.length) {
            console.error('No triggers found.');
        }

        if (reference) referenceEl = document.querySelector<HTMLElement>(reference);
        else referenceEl = triggerEls[0];
        if (!referenceEl) {
            console.error('No reference element found.');
        }

        // attach event listeners to the trigger elements
        triggerEls.forEach((element: HTMLElement) => {
            //if (element.tabIndex < 0) element.tabIndex = 0; // trigger must be focusable
            for (const [cond, name, handler] of events) {
                if (cond) {
                    element.addEventListener(name, handler);
                }
            }
        });

        return () => {
            // detach event listeners from the trigger elements
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
            if (clickable) window.addEventListener('click', handleClickOutside);
            autoUpdateCleanup?.(); // just in case
            autoUpdateCleanup = floatingDom.autoUpdate(referenceEl!, contentEl, updatePosition);
        } else {
            window.removeEventListener('click', handleClickOutside);
            autoUpdateCleanup?.();
            autoUpdateCleanup = null;
        }
    });
</script>

<div bind:this={contentEl} class={divClass} style={divStyle}>
    {@render children()}
</div>
