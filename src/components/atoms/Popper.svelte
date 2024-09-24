<script lang="ts" context="module">
    export type Location = 'above' | 'below' | 'auto';
</script>

<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { Maybe } from '$src/lib/utils';

    interface Props {
        // trigger events, mount-time only
        trigger?: string;
        reference?: string;
        clickable?: boolean;
        hoverable?: boolean;
        focusable?: boolean;

        // other properties
        location?: Location;
        alignWidth?: boolean;
        class?: string;

        // bind property
        open?: boolean;

        children: Snippet;
    }
    let {
        trigger,
        reference,
        clickable = false,
        hoverable = false,
        focusable = false,
        location = 'auto',
        alignWidth = false,
        class: className,
        open: isOpen = $bindable(),
        children
    }: Props = $props();

    let triggerEls: HTMLElement[] = [];
    let referenceEl: Maybe<HTMLElement> = null;
    let contentEl: HTMLElement = null!;

    let posX = $state(0);
    let posY = $state(0);
    let isAbove = $state(false);
    let width = $state(0);

    let divClass = $derived(twMerge(['fixed left-0 top-0 z-10', className]));
    let divStyle = $derived(
        [
            `transform: translate(${posX}px, ${posY}px) ${isAbove ? 'translateY(-100%)' : ''}`,
            !isOpen ? 'display: none; opacity: 0' : '',
            alignWidth ? `width: ${width}px` : ''
        ].join(';')
    );

    const show = () => {
        isOpen = true;
    };
    const hide = () => {
        isOpen = false;
        // when hiding due to element position change, blur the trigger element
        if (focusable) {
            triggerEls.forEach((el) => el.blur());
        }
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

    onMount(() => {
        if (focusable && clickable) {
            console.error('focusable and clickable cannot be true at the same time');
        }

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const events: [boolean, string, any][] = [
            [focusable, 'focusin', show],
            [focusable, 'focusout', hide],
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
            if (element.tabIndex < 0) element.tabIndex = 0; // trigger must be focusable
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
        };
    });

    const updatePosition = () => {
        if (referenceEl && contentEl) {
            const rect = referenceEl.getBoundingClientRect();
            width = rect.width;

            let loc = location;
            if (loc === 'auto') loc = rect.top > (window.innerHeight * 2) / 3 ? 'above' : 'below';

            if (loc === 'above') {
                posY = rect.top;
                isAbove = true;
            } else {
                posY = rect.bottom;
                isAbove = false;
            }
            posX = rect.left;
        }
    };

    $effect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!triggerEls.some((el) => el.contains(event.target as Node))) {
                hide();
            }
        };

        // since popup reposition is not stable and smooth enough, it is safer to hide it
        const handleLayoutChanged = hide;

        const forEachReferenceParent = (action: (parent: HTMLElement) => void) => {
            for (
                let parent: Maybe<HTMLElement> | undefined = referenceEl?.parentElement;
                (parent = parent?.parentElement ?? null);

            ) {
                action(parent);
            }
        };

        if (isOpen) {
            updatePosition();
            if (clickable) window.addEventListener('click', handleClickOutside);
            forEachReferenceParent((x) => x.addEventListener('scroll', handleLayoutChanged));
            window.addEventListener('resize', handleLayoutChanged);
        } else {
            window.removeEventListener('click', handleClickOutside);
            forEachReferenceParent((x) => x.removeEventListener('scroll', handleLayoutChanged));
            window.removeEventListener('resize', handleLayoutChanged);
        }
    });
</script>

<div bind:this={contentEl} class={divClass} style={divStyle}>
    {@render children()}
</div>
