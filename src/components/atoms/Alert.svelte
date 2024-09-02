<script context="module" lang="ts">
    export type Variant = 'info' | 'success' | 'warning' | 'error';

    const alertMap: Record<Variant, string> = {
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-error'
    };
</script>

<script lang="ts">
    import { Info, Check } from '$atoms/icons/common';
    import type { Snippet } from 'svelte';
    import Cross from './icons/common/_cross.svelte';
    import Warning from './icons/common/_warning.svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        variant?: Variant;
        text: string;
        class?: string;
        children?: Snippet;
    }

    const { variant = 'info', text, class: className, children }: Props = $props();

    const icon = $derived.by(() => {
        switch (variant) {
            case 'info':
                return Info;
            case 'success':
                return Check;
            case 'warning':
                return Warning;
            case 'error':
                return Cross;
        }
    });

    const alertClass = $derived(twMerge('alert', alertMap[variant], className));
</script>

<div role="alert" class={alertClass}>
    <svelte:component this={icon} size="md" class="inline-block shrink-0" />
    <div>
        {#if children}
            <h3 class="font-bold">{text}</h3>
            {@render children()}
        {:else}
            <h3>{text}</h3>
        {/if}
    </div>
</div>
