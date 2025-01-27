<script lang="ts" module>
    import { onMount, setContext, untrack, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { Nullable } from '$lib/utils';
    import { dependsOn, range, simpleHash } from './types';
    import * as svg from '$atoms/svg';

    // move at least this much to start dragging
    const DRAG_TOLERANCE = 3.0;
    const DRAG_SPEED = 1.0;
    const MAX_DRAG_TIME_MS = 5000.0;
    const WHEEL_SPEED = 75.0;

    const SMOOTH_FACTOR = 0.2;
    const SMOOTH_TIME_MS = 50;

    const STROKE_WIDTH_LEFT = 2;
    const STROKE_KNOB_WIDTH = 16.0;
    const STROKE_KNOB_HEIGHT = 1.0;
    // minimum offset of the items from the start
    const ITEM_MARGIN = 0.0;

    export interface ExtraMenuContext {
        get value(): ExtraMenuInfo;
    }
    export interface ExtraMenuInfo {
        scrollWidth: number;
        scrollHeight: number;
        scrollPosition: number;
        path: SVGPathElement;
        pathLength: number;
    }
    export type ExtraMenuItemVisual = {
        offsetX: number;
        offsetY: number;
        opacity: number;
    };

    export const getVisualInfo = (info: ExtraMenuInfo, top: number, bottom: number): Nullable<ExtraMenuItemVisual> => {
        let h = info.scrollHeight;

        const yt = top - info.scrollPosition;
        const yb = bottom - info.scrollPosition;
        if (!info.path || yt < 0 || yb > h) {
            return null;
        }

        const y = Math.round((yt + yb) / 2);

        const l = info.pathLength;
        const t = (l * y) / info.scrollHeight;
        const pos = info.path.getPointAtLength(t);
        const ox = pos.x + ITEM_MARGIN;
        const oy = 0;

        let opacity = 1.0 - Math.abs(y - h / 2) / (h / 2);
        opacity = Math.clamp(opacity, 0, 1);
        opacity = Math.pow(opacity, 1.4);

        return { opacity, offsetX: ox, offsetY: oy };
    };
</script>

<script lang="ts">
    interface Props {
        min_duplicates?: number;
        path?: string;
        pathScale?: [number, number];

        background?: Snippet;
        children: Snippet;
    }
    let {
        min_duplicates = 0,
        path = 'M 0.5 0 A 3.7 1 0 0 0 0.5 1',
        pathScale = [1, 1],
        background,
        children
    }: Props = $props();

    // todo: fix ssr and uniqueId issue
    let id = simpleHash(path);

    let container: HTMLDivElement = null!;
    let scrollArea: HTMLDivElement = null!;
    let scrollAreaWidth = $state(0);
    let scrollAreaHeight = $state(0);
    let scrollPosition = $state(0);
    let pathElement: SVGPathElement = null!;
    let content: HTMLDivElement = null!;
    let contentHeight = $state(0);

    let isDragging = $state(false);
    // The target position to scroll to
    let targetScrollPosition = $state(0);

    // --------------------------------------------------------------------------------
    // Smooth scrolling
    const updateScroll = (scale: number, force: boolean): boolean => {
        if (scrollPosition === targetScrollPosition && !force) {
            return false;
        }

        const delta = targetScrollPosition - scrollPosition;
        let target = targetScrollPosition;
        let current = scrollPosition;
        if (delta < -1.0) current = Math.max(targetScrollPosition, current + delta * scale);
        else if (delta > 1.0) {
            current = Math.min(targetScrollPosition, current + delta * scale);
        } else {
            current = targetScrollPosition;
        }

        if (contentHeight > 0.0) {
            let cnt = Math.abs(Math.round(current / contentHeight));
            let step;
            if (current < 0.0) {
                step = cnt * contentHeight + contentHeight;
            } else if (current > contentHeight) {
                step = -cnt * contentHeight;
            } else {
                step = 0.0;
            }

            current += step;
            target += step;
        }

        targetScrollPosition = target;

        scrollArea.scrollTo({ top: current, behavior: 'instant' });
        scrollPosition = current;

        return Math.abs(target - current) > 0.1;
    };

    const autoScroll = (scale: number) => {
        targetScrollPosition += scale;
        scrollArea.scrollTo({ top: targetScrollPosition, behavior: 'instant' });
        scrollPosition = targetScrollPosition;
    };

    let rafId: number | null = null;
    let rafPrevTime = 0;
    const smoothScroll = () => {
        const now = performance.now();
        const deltaTime = rafId ? now - rafPrevTime : 0;
        const scl = deltaTime / SMOOTH_TIME_MS;
        rafPrevTime = now;

        let animating = updateScroll(SMOOTH_FACTOR * scl, false);
        if (!animating) {
            autoScroll(scl);
            animating = true;
        }

        if (animating) {
            rafId = requestAnimationFrame(smoothScroll);
        } else {
            rafId = null;
        }
    };

    const scrollTo = (pos: number) => {
        targetScrollPosition = pos;
        // start smooth scrolling only if there is no other animation in progress
        if (rafId == null) {
            smoothScroll();
        }
    };

    // --------------------------------------------------------------------------------
    // Scroll indicator: knob and path
    let svgViewport = $derived(`0 0 ${scrollAreaWidth} ${scrollAreaHeight}`);
    let svgPath = $derived(svg.scalePath(path, scrollAreaWidth * pathScale[0], scrollAreaHeight * pathScale[1]));
    let strokeDash = $derived.by(() => {
        //find visible area of the content within the scroll area
        let start = 0;
        let end = 0;
        if (contentHeight > 0) {
            const s = contentHeight + STROKE_KNOB_HEIGHT;
            start = Math.clamp((scrollPosition % contentHeight) / s, 0, 1);
            let pathLength = pathElement?.getTotalLength() ?? 0;
            start *= pathLength;
            //let end = (start + STROKE_KNOB_HEIGHT / s).clamp(start, 1.);
            //let end = end * path_length;
            end = start + STROKE_KNOB_HEIGHT;
        }

        start = Math.round_q(start, 1);
        end = Math.round_q(end, 1);

        if (start >= end) {
            return { 'stroke-dasharray': '0 1000000', 'stroke-dashoffset': '500000' };
        } else {
            let offset = -start;
            return { 'stroke-dasharray': `${end - start} 1000000`, 'stroke-dashoffset': offset };
        }
    });

    // --------------------------------------------------------------------------------
    // Make sure the content is replicated enough times to fill the scroll area
    let duplicates = $derived.by(() => {
        const sh = scrollAreaHeight;
        const ch = contentHeight;
        let calculated = ch > 0 && sh > 0 ? Math.ceil(sh / ch) : 0;
        return Math.max(min_duplicates, calculated);
    });
    $effect(() => {
        dependsOn(duplicates);
        updateScroll(0, true);
    });

    // --------------------------------------------------------------------------------
    // Click and drag
    type InputId = ['mouse', number] | ['touch', number];
    type DragInfo = {
        inputId: InputId;
        startPos: number;
        startTime: number;
        prevPos: number;
    };
    let dragInfo: Nullable<DragInfo>;

    const eventToInputId = (evt: PointerEvent): Nullable<InputId> => {
        // during move event button is not set
        const isMove = evt.type === 'pointermove';
        if (evt.pointerType === 'mouse' && (isMove || evt.button === 0)) {
            return ['mouse', 0];
        } else if (evt.pointerType === 'pen' && (isMove || evt.button === 0)) {
            return ['mouse', 0];
        } else if (evt.pointerType === 'touch') {
            return ['touch', evt.pointerId];
        } else {
            return null;
        }
    };

    const onPointerDown = (evt: PointerEvent) => {
        //console.log('onPointerDown', evt);
        let currentId = eventToInputId(evt);
        if (!currentId) {
            if (evt.pointerType === 'mouse' || evt.pointerType === 'pen') {
                evt.preventDefault();
            }
            return;
        }
        //console.log('currentId (down)', currentId);
        evt.preventDefault();

        // Check if there is already a drag in progress
        if (dragInfo) {
            if (evt.timeStamp - dragInfo.startTime > MAX_DRAG_TIME_MS) {
                //console.log!('onDragStart: restart drag, as prev event is taking too long');
            } else {
                if (currentId[0] === 'mouse' && dragInfo.inputId[0] === 'mouse') {
                    //console.log!('drag_start: restart mouse');
                } else {
                    //console.log('ignore input type or pointer change');
                    return;
                }
            }
            isDragging = false;
        }

        let pos = evt.clientY;
        dragInfo = {
            startPos: pos,
            prevPos: pos,
            inputId: currentId,
            startTime: evt.timeStamp
        };
    };

    const onPointerMove = (evt: PointerEvent) => {
        if (!dragInfo) {
            return;
        }
        //console.log('onPointerMove', evt);

        let currentId = eventToInputId(evt);
        //console.log('currentId (move)', currentId);
        if (!currentId || currentId[0] !== dragInfo.inputId[0] || currentId[1] !== dragInfo.inputId[1]) {
            // this is a different input
            return;
        }

        let absDelta = (evt.clientY - dragInfo.startPos) * DRAG_SPEED;
        let relDelta = (evt.clientY - dragInfo.prevPos) * DRAG_SPEED;
        dragInfo.prevPos = evt.clientY;

        if (!isDragging) {
            // start dragging only if the drag distance is more than 10px
            if (Math.abs(absDelta) > DRAG_TOLERANCE) {
                // capture mouse only if we know that a drag is happening, capturing in the pointerdown event breaks in chrome
                scrollArea.setPointerCapture(evt.pointerId);
                isDragging = true;
                scrollTo(targetScrollPosition - absDelta);
            }
        } else {
            scrollTo(targetScrollPosition - relDelta);
        }
    };

    const onPointerUp = (evt: PointerEvent) => {
        if (!dragInfo) {
            return;
        }
        //console.log('onPointerUp', evt);

        let currentId = eventToInputId(evt);
        //console.log('currentId (up)', currentId);
        if (!currentId || currentId[0] !== dragInfo.inputId[0] || currentId[1] !== dragInfo.inputId[1]) {
            // this is a different input
            return;
        }

        evt.preventDefault();
        isDragging = false;
        dragInfo = null;
    };

    // --------------------------------------------------------------------------------
    // Wheel scroll
    const onWheel = (evt: WheelEvent) => {
        evt.preventDefault();
        let delta = Math.sign(evt.deltaY) * WHEEL_SPEED;
        scrollTo(targetScrollPosition - delta);
    };

    // --------------------------------------------------------------------------------
    // passing reactive info to children
    let context = $state({
        _info: {
            scrollWidth: 0,
            scrollHeight: 0,
            scrollPosition: 0,
            path: pathElement,
            pathLength: 0
        },
        get value(): ExtraMenuInfo {
            return this._info;
        },
        set value(info: ExtraMenuInfo) {
            this._info = info;
        }
    });

    $effect(() => {
        context.value = {
            scrollWidth: scrollAreaWidth,
            scrollHeight: scrollAreaHeight,
            scrollPosition: scrollPosition,
            path: pathElement,
            pathLength: pathElement.getTotalLength() ?? 0
        };
    });
    setContext('ExtraMenu_props', context);

    // --------------------------------------------------------------------------------
    onMount(() => {
        scrollArea.addEventListener('pointerdown', onPointerDown);
        scrollArea.addEventListener('pointermove', onPointerMove);
        scrollArea.addEventListener('pointerup', onPointerUp);
        scrollArea.addEventListener('wheel', onWheel);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            scrollArea.removeEventListener('pointerdown', onPointerDown);
            scrollArea.removeEventListener('pointermove', onPointerMove);
            scrollArea.removeEventListener('pointerup', onPointerUp);
            scrollArea.removeEventListener('wheel', onWheel);
        };
    });
    // workaround for the wrong initial element position
    $effect(() => untrack(() => scrollTo(0.1)));

    let containerClass = $derived(twMerge('relative', 'w-full h-full overflow-clip select-none'));
    let contentClass = $derived(
        twMerge('absolute top-0 left-0 min-size-full p-0 flex flex-col', isDragging && 'pointer-events-none')
    );
</script>

<div class={containerClass} bind:this={container}>
    {#if background}
        <div class="pointer-events-none absolute left-0 top-0 h-full w-full">{background}</div>
    {/if}

    <div
        class="absolute left-0 top-0 h-full w-full touch-none overflow-y-hidden overflow-x-clip"
        bind:this={scrollArea}
        bind:clientWidth={scrollAreaWidth}
        bind:clientHeight={scrollAreaHeight}
        onscroll={(event) => (scrollPosition = (event.target as HTMLElement)!.scrollTop)}
    >
        <svg
            class="pointer-events-none sticky left-0 top-0 h-full w-full text-on-surface"
            style:shape-rendering="geometricPrecision"
            viewBox={svgViewport}
        >
            <defs>
                <symbol {id}>
                    <path bind:this={pathElement} d={svgPath} />
                </symbol>
            </defs>
            <use
                href={`#${id}`}
                stroke-width={STROKE_WIDTH_LEFT}
                class="stroke-passive"
                fill="none"
                stroke-linecap="round"
            />
            <!-- <use
                href={`#${id}`}
                stroke-width={STROKE_WIDTH_RIGHT}
                class="stroke-passive"
                fill="none"
                stroke-linecap="round"
                style="transform-origin: center; transform: scaleX(-1);"
            /> -->
            <use
                href={`#${id}`}
                class="stroke-passive-accent"
                stroke-width={STROKE_KNOB_WIDTH}
                fill="none"
                stroke-linecap="round"
                {...strokeDash}
            />
        </svg>
        <div class={contentClass}>
            <div class="flex flex-col" bind:this={content} bind:clientHeight={contentHeight}>
                {@render children()}
            </div>
            {#each range(0, duplicates) as _}
                {@render children()}
            {/each}
        </div>
    </div>
</div>
