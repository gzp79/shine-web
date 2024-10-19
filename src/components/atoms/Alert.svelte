<script lang="ts" module>
    export type Variant = 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import * as commonIcons from '$atoms/icons/common';
    import type { Color } from '../types';
    import Card from './Card.svelte';

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
</script>

<Card role="alert" {ghost} {shadow} caption={text} color={colors[variant]} {children}>
    {#snippet icon()}
        <Icon size="md" />
    {/snippet}
</Card>
