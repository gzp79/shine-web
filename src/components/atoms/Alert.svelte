<script lang="ts" module>
    export type Variant = 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Info, Check, Cross, Warning } from '$atoms/icons/common';
    import Typography from '$atoms/Typography.svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        variant?: Variant;
        text: string;
        ghost?: boolean;
        children?: Snippet;
    }

    const { variant = 'info', text, ghost, children }: Props = $props();

    const Icon = $derived.by(() => {
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

    const variantClasses: Record<Variant, string> = {
        info: 'bg-info text-on-info border-on-info',
        success: 'bg-success text-on-success border-on-success',
        warning: 'bg-warning text-on-warning border-on-warning',
        error: 'bg-danger text-on-danger border-on-danger'
    };

    const ghostVariantClasses: Record<Variant, string> = {
        info: 'border-info text-info',
        success: 'border-success text-success',
        warning: 'border-warning text-warning',
        error: 'border-danger text-danger'
    };

    const alertClass = $derived(
        twMerge('flex flex-row rounded-lg border p-2', ghost ? ghostVariantClasses[variant] : variantClasses[variant])
    );
</script>

<div role="alert" class={alertClass}>
    <Icon size="md" class="me-1 inline-block shrink-0" />
    <div>
        <Typography variant="h3" element="p" weight="bold">{text}</Typography>
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>
