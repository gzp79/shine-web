<script context="module" lang="ts">
    export type Variant = 'top' | 'data' | 'fieldset';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        caption?: string;
        variant?: Variant;
        action?: Snippet;
        children: Snippet;
    }
    let { caption, variant = 'top', children, action }: Props = $props();

    function getVariantClasses(): { card: string; content: string; action: string } {
        switch (variant) {
            case 'fieldset':
                return {
                    card: 'card card-bordered relative mx-1 my-8 border-primary bg-base-200 text-base-content shadow-lg shadow-base p-4',
                    content: 'max-h-[50lvh] overflow-auto',
                    action: 'card-action flex flex-row justify-end gap-1 mt-4'
                };

            case 'top':
                return {
                    card: 'card card-bordered relative mx-1 my-8 border-primary bg-base-200 text-base-content shadow-lg shadow-base',
                    content: 'max-h-[50lvh] overflow-auto',
                    action: 'card-action flex flex-row justify-end gap-1'
                };

            case 'data':
                return {
                    card: 'card card-compact relative m-1 bg-base-300 text-base-content shadow-md shadow-base md:card-side',
                    content: '',
                    action: 'card-action flex flex-row justify-end gap-1'
                };
        }
    }
    const { card: cardClass, content: contentClass, action: actionClass } = $derived(getVariantClasses());
</script>

{#snippet content()}
    <div class={contentClass}>
        {@render children()}
    </div>
    {#if action}
        <div class={actionClass}>{@render action()}</div>
    {/if}
{/snippet}

{#if variant === 'fieldset'}
    <fieldset class={cardClass}>
        {#if caption}
            <legend class="label m-2">{caption}</legend>
        {/if}
        {@render content()}
    </fieldset>
{:else}
    <div class={cardClass}>
        <div class="card-body">
            {#if caption}
                <h2 class="card-title">{caption}</h2>
            {/if}
            {@render content()}
        </div>
    </div>
{/if}
