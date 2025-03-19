<script lang="ts" module>
    export type Variant = 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import Card, { type Variant as CardVariant } from '$atoms/Card.svelte';
    import * as icons from '$atoms/icons/common';
    import type { ElementProps } from '$atoms/types';

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
        info: { color: 'info' },
        success: { color: 'success' },
        warning: { color: 'warning' },
        error: { color: 'danger' }
    };
</script>

<Card role={role ?? 'alert'} {shadow} {caption} variant={variants[variant]} width="fit" {children} {actions} {...rest}>
    {#snippet icon()}
        <Icon size="md" />
    {/snippet}
</Card>
