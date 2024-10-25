<script lang="ts" module>
    export type Variant = 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ElementProps } from './types';
    import * as commonIcons from './icons/common';
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
                return commonIcons.Info;
            case 'success':
                return commonIcons.Check;
            case 'warning':
                return commonIcons.Warning;
            case 'error':
                return commonIcons.Cross;
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
