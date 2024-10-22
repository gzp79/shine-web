<script lang="ts" module>
    export type Variant = 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import * as commonIcons from '$atoms/icons/common';
    import Card, { type Variant as CardVariant } from './Card.svelte';

    interface Props {
        variant?: Variant;
        caption: string;
        shadow?: boolean;
        children?: Snippet;
        actions?: Snippet;
    }

    const { variant = 'info', caption, shadow, children, actions }: Props = $props();

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

    const outline = true;
    const variants: Record<Variant, CardVariant> = {
        info: { color: 'info', outline },
        success: { color: 'success', outline },
        warning: { color: 'warning', outline },
        error: { color: 'danger', outline }
    };
</script>

<Card role="alert" {shadow} {caption} variant={variants[variant]} width="fit" {children} {actions}>
    {#snippet icon()}
        <Icon size="md" />
    {/snippet}
</Card>
