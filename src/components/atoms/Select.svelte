<script lang="ts" context="module">
    export type Location = 'above' | 'below' | 'auto';
</script>

<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import { v4 as uuid } from 'uuid';
    import { twMerge } from 'tailwind-merge';
    import { colorMaps, sizeMaps, type Color, type Size } from '$components/types';
    import { maybeNull, type Maybe } from '$src/lib/utils';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props {
        // A list of options to choose from. Each option is a tuple of the value and the label, but can be null. Null options are filtered out.
        options: ([T, Snippet | string] | null)[];
        placeholder?: string;
        size?: Size;
        color?: Color;
        location?: Location;
        // The currently bindable selected value.
        value?: T | null;
    }
    let {
        options,
        value = $bindable(),
        placeholder,
        size = 'md',
        color = 'primary',
        location = 'auto'
    }: Props = $props();

    let contentId = uuid();
    let buttonEl = $state(maybeNull<HTMLElement>());
    let buttonWidth = $state(0);
    let contentEl = $state(maybeNull<HTMLElement>());
    let isOpen = $state(false);
    let posX = $state(0);
    let posY = $state(0);
    let isAbove = $state(false);

    const filteredOptions = $derived(options.filter((x) => x !== null));
    const currentValueView = $derived((filteredOptions.find(([key]) => key === value) ?? [])[1] ?? placeholder);

    const btnClass = $derived(
        twMerge(['btn btn-outline w-fit h-fit bg-base-100 m-1', colorMaps.button[color], sizeMaps.button[size]])
    );
    const contentClass = $derived(
        twMerge([
            'rounded-lg border bg-base-100 shadow p-2 fixed z-50 left-0 top-0 inline-block',
            colorMaps.border[color],
            !isOpen && 'hidden'
        ])
    );

    const updatePosition = () => {
        console.log('update');
        if (contentEl && buttonEl) {
            const rect = buttonEl.getBoundingClientRect();
            if (location !== 'above' && rect.top > (window.innerHeight * 2) / 3) {
                posY = rect.top;
                isAbove = true;
            } else {
                posY = rect.bottom;
                isAbove = false;
            }
            posX = rect.left;
        }
    };

    const toggle = () => {
        isOpen = !isOpen;
    };
    const hide = () => {
        console.log('hide');
        isOpen = false;
    };

    const selectValue = (key: T) => {
        console.log('selectValue');
        value = key;
        isOpen = false;
    };
    const selectNextValue = () => {
        console.log('selectNextValue');
        const index = filteredOptions.findIndex(([key]) => key === value);
        if (index !== -1) {
            const nextIndex = (index + 1) % filteredOptions.length;
            value = filteredOptions[nextIndex][0];
        }
    };
    const selectPrevValue = () => {
        console.log('selectPrevValue');
        const index = filteredOptions.findIndex(([key]) => key === value);
        if (index !== -1) {
            const prevIndex = (index - 1 + filteredOptions.length) % filteredOptions.length;
            value = filteredOptions[prevIndex][0];
        }
    };

    $effect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (buttonEl && !buttonEl.contains(event.target as Node)) {
                console.log('handleClickOutside');
                isOpen = false;
            }
        };

        if (isOpen) {
            console.log('open');
            updatePosition();
            window.addEventListener('click', handleClickOutside);
            for (
                let parent: Maybe<HTMLElement> | undefined = buttonEl?.parentElement;
                (parent = parent?.parentElement ?? null);

            ) {
                parent.addEventListener('scroll', hide);
            }
        } else {
            console.log('close');
            window.removeEventListener('click', handleClickOutside);
            for (let parent: Maybe<HTMLElement> = buttonEl; (parent = parent!.parentElement); ) {
                parent.removeEventListener('scroll', hide);
            }
        }
    });
</script>

{#snippet valueView(view?: Snippet | string)}
    {#if typeof view === 'string'}
        {view}
    {:else if view !== undefined}
        {@render view()}
    {/if}
{/snippet}

<button
    bind:this={buttonEl}
    class={btnClass}
    bind:clientWidth={buttonWidth}
    onclick={toggle}
    onfocusout={() => {
        setTimeout(hide, 100);
    }}
    onkeydown={(e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            hide();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectNextValue();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectPrevValue();
        }
    }}
>
    {@render valueView(currentValueView)}
    <svg
        class={sizeMaps.icon[size]}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="-10 -6 20 18"
    >
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
    </svg>
</button>

<ul
    id={contentId}
    bind:this={contentEl}
    class={contentClass}
    style="width: {buttonWidth}px; transform: translate({posX}px, {posY}px) {isAbove ? 'translateY(-100%)' : ''};"
>
    {#if placeholder}
        <li class="tab-disabled">
            {placeholder}
        </li>
    {/if}
    {#each filteredOptions as [key, view] (key)}
        <li
            role="option"
            aria-selected={key === value}
            class="{colorMaps.hover_bg[color]} {key === value ? colorMaps.bg[color] : ''}"
        >
            <button onclick={() => selectValue(key)}>
                {@render valueView(view)}
            </button>
        </li>
    {/each}
</ul>
