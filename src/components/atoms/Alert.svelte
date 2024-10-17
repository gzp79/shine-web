<script lang="ts" module>
    export type Variant = 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import * as commonIcons from '$atoms/icons/common';
    import Typography from '$atoms/Typography.svelte';
    import Box from '$atoms/Box.svelte';
    import type { Color } from '../types';

    interface Props {
        variant?: Variant;
        text: string;
        ghost?: boolean;
        shadow?: boolean;
        children?: Snippet;
    }

    const { variant = 'info', text, ghost, shadow, children }: Props = $props();

    const Icon = $derived.by(() => {
        switch (variant) {
            case 'info':
                return commonIcons.Info;
            case 'success':
                return commonIcons.Check;
            case 'warning':
                return commonIcons.Warning;
            case 'error':
                return commonIcons.Cross;
        }
    });

    const colors: Record<Variant, Color> = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'danger'
    };

    const alertClass = $derived(twMerge('flex flex-row'));
</script>

<Box border {shadow} color={colors[variant]} {ghost} class={alertClass} role="alert">
    <Icon size="md" class="me-1 inline-block shrink-0" />
    <div>
        <Typography variant="h3" element="p" weight="bold">{text}</Typography>
        {#if children}
            {@render children()}
        {/if}
    </div>
</Box>
