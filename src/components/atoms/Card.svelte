<script context="module" lang="ts">
    export const listVariants = ['top', 'data', 'fieldset'];
    export type Variant = 'top' | 'data' | 'fieldset';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        caption?: string;
        variant?: Variant;
        class?: string;
        action?: Snippet;
        image?: Snippet;
        children: Snippet;
    }
    let { caption, variant = 'top', class: className, image, children, action }: Props = $props();

    function getVariantClasses(): { card: string; content: string; action: string } {
        switch (variant) {
            case 'fieldset':
                return {
                    card: twMerge(
                        'card card-bordered  m-3 border-primary bg-base-200 text-base-content shadow-lg shadow-base p-4',
                        className
                    ),
                    content: 'max-h-[50lvh] overflow-auto',
                    action: 'card-action flex flex-row justify-end gap-1 mt-4'
                };

            case 'top':
                return {
                    card: twMerge(
                        'card card-bordered  mx-3 my-6 border-primary bg-base-200 text-base-content shadow-lg shadow-base',
                        className
                    ),
                    content: 'max-h-[50lvh] overflow-auto',
                    action: 'card-action flex flex-row justify-end gap-1'
                };

            case 'data':
                return {
                    card: twMerge(
                        'card card-compact  mx-1 my-2 bg-base-300 text-base-content shadow-md shadow-base sm:card-side',
                        className
                    ),
                    content: '',
                    action: 'card-action flex flex-row justify-end gap-1'
                };
        }
    }
    const { card: cardClass, content: contentClass, action: actionClass } = $derived(getVariantClasses());
</script>

{#snippet imageContent()}
    {#if image}
        {#if variant === 'top'}
            <figure>{@render image()}</figure>
        {:else if variant === 'data'}
            <div class="mx-0 mt-4 max-h-16 max-w-16 self-center overflow-clip md:my-0 md:ml-4">
                {@render image()}
            </div>
        {/if}
    {/if}
{/snippet}

{#if variant === 'fieldset'}
    <fieldset class={cardClass}>
        {@render imageContent()}
        <div class="card-body">
            <div class={contentClass}>
                {@render children()}
            </div>
            {#if action}
                <div class={actionClass}>{@render action()}</div>
            {/if}
        </div>
    </fieldset>
{:else}
    <div class={cardClass}>
        {@render imageContent()}
        <div class="card-body">
            {#if caption}
                <h2 class="card-title">{caption}</h2>
            {/if}
            <div class={contentClass}>
                {@render children()}
            </div>
            {#if action}
                <div class={actionClass}>{@render action()}</div>
            {/if}
        </div>
    </div>
{/if}
