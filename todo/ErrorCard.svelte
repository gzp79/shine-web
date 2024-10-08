<script lang="ts">
    import type { Snippet } from 'svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import type { AppError } from '$lib/utils';

    interface Props {
        caption?: string;
        error: AppError;
        children?: Snippet;
    }

    let { caption, error, children }: Props = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
    <div class="bg-base-200 flex flex-col items-center rounded-lg p-5">
        <div class="bg-base-300 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <svg
                class="text-error h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>

        <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-error text-lg font-medium leading-6" id="modal-headline">
                {caption ?? $t('common.somethingWentWrong')}
            </h3>
            <div class="mt-2">
                <p class="text-sm">
                    {error.message}
                </p>
            </div>
            {#if error.detail}
                <div class="mt-2">
                    <div class="bg-base-300 max-h-64 overflow-auto border text-left text-xs">
                        <pre><code>{JSON.stringify(error.detail, null, 2)}</code></pre>
                    </div>
                </div>
            {/if}
        </div>
        <div class="m-3">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
</div>
