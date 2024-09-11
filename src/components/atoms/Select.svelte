<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import { v4 as uuid } from 'uuid';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props {
        // A list of options to choose from. Each option is a tuple of the value and the label, but can be null. Null options are filtered out.
        options: ([T, Snippet | string] | null)[];
        placeholder?: string;
        // The currently bindable selected value.
        value?: T | null;
    }
    let { options, value = $bindable(), placeholder }: Props = $props();

    let buttonEl: HTMLElement = $state(null!);
    let contentEl: HTMLElement = $state(null!);

    const contentId = uuid();
    const filteredOptions = $derived(options.filter((x) => x !== null));
    const currentValueView = $derived((filteredOptions.find(([key]) => key === value) ?? [])[1] ?? placeholder);

    const selectValue = (key: T) => {
        value = key;
        contentEl.hidePopover();
    };

    const updatePosition = () => {
        if (!buttonEl || !contentEl) {
            return;
        }

        const rect = buttonEl.getBoundingClientRect();
        contentEl.style.left = `${rect.left}px`;
        contentEl.style.top = `${rect.bottom}px`;
    };

    $effect(updatePosition);
</script>

{#snippet valueView(view?: Snippet | string)}
    {#if typeof view === 'string'}
        {view}
    {:else if view !== undefined}
        {@render view()}
    {/if}
{/snippet}

<div>
    <button
        popovertarget={contentId}
        popovertargetaction="toggle"
        onresize={updatePosition}
        bind:this={buttonEl}
        class="inline-flex items-center rounded-md border border-base-300 p-2 shadow"
    >
        {@render valueView(currentValueView)}
        <svg
            class="ms-3 h-2.5 w-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
        >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
            />
        </svg>
    </button>
    <ul id={contentId} class="rounded-box bg-base-300 p-2 shadow" popover="auto" bind:this={contentEl}>
        {#each filteredOptions as [key, view] (key)}
            <li class="hover:bg-base-200">
                <button onclick={() => selectValue(key)}>
                    {@render valueView(view)}
                </button>
            </li>
        {/each}
    </ul>
</div>
