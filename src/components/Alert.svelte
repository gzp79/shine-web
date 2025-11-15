<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import * as icons from '@atoms/icons/common';
    import Card, { type Width } from '@atoms/layouts/Card.svelte';
    import type { ActionColor } from '@atoms/types';

    export type Variant = 'info' | 'success' | 'warning' | 'error';
    export { type Width };
</script>

<script lang="ts">
    interface Props {
        /** Visual style variant of the alert */
        variant?: Variant;
        /** The main heading/title of the alert */
        caption: string;
        /** Width of the alert */
        width?: Width;
        /** Enable drop shadow for the alert */
        shadow?: boolean;
        /** Optional content area for additional details */
        children?: Snippet;
        /** Optional action buttons in the footer */
        actions?: Snippet;
        /** Whether to show the icon (defaults to true) */
        showIcon?: boolean;
    }

    let { variant = 'info', caption, width, shadow = true, children, actions, showIcon = true }: Props = $props();

    let Icon = $derived.by(() => {
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

    const colors: Record<Variant, ActionColor> = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'danger'
    };
</script>

{#snippet icon()}
    <Icon size="md" />
{/snippet}

<Card {shadow} {caption} color={colors[variant]} {width} {children} {actions} icon={showIcon ? icon : null} />
