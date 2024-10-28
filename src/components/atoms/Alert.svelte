<script lang="ts" module>
    export type Variant = 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ElementProps } from './types';
    import * as icons from './icons/common';
    import Card, { type Variant as CardVariant } from './Card.svelte';

    interface Props extends ElementProps {
        variant?: Variant;
        caption: string;
        shadow?: boolean;
        children?: Snippet;
        actions?: Snippet;
    }

    const { variant = 'info', caption, shadow, children, actions, role, ...rest }: Props = $props();

    const Icon = $derived.by(() => {
        switch (variant) {
            case 'info':
                return icons.Info;
            case 'success':
                return icons.Check;
            case 'warning':
                return icons.Warning;
            case 'error':
                return icons.Fatal;
        }
    });

    const variants: Record<Variant, CardVariant> = {
        info: { color: 'info', outline: true },
        success: { color: 'success', outline: false },
        warning: { color: 'warning', outline: true },
        error: { color: 'danger', outline: false }
    };
</script>

<Card role={role ?? 'alert'} {shadow} {caption} variant={variants[variant]} width="fit" {children} {actions} {...rest}>
    {#snippet icon()}
        <Icon size="md" />
    {/snippet}
</Card>
