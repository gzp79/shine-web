<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import Typography, { type Variant } from '@atoms/Typography.svelte';
    import { Ball, Dots, Infinite, Ring, Spinner } from '@atoms/icons/animated';
    import type { Size } from '@atoms/types';

    interface Props {
        /** Loading message to display (defaults to localized "Loading") */
        label?: string;
        /** Size of the loading animation and text */
        size?: Size;
        /** Type of loading animation */
        animation?: 'dots' | 'spinner' | 'ring' | 'ball' | 'infinite';
        /** Whether to show the loading label text */
        showLabel?: boolean;
        /** Custom class for additional styling */
        class?: string;
    }

    const textVariant: Record<Size, Variant> = {
        xs: 'h6',
        sm: 'h5',
        md: 'h4',
        lg: 'h3'
    };

    const animationComponents = {
        dots: Dots,
        spinner: Spinner,
        ring: Ring,
        ball: Ball,
        infinite: Infinite
    };

    let {
        size = 'md',
        label = $t('common.loading'),
        animation = 'dots',
        showLabel = true,
        class: className = ''
    }: Props = $props();

    let AnimationComponent = $derived(animationComponents[animation]);
</script>

<div
    class="flex h-full w-full flex-col items-center justify-center gap-4 {className}"
    role="status"
    aria-live="polite"
    aria-label={label}
>
    <AnimationComponent {size} />
    {#if showLabel}
        <Typography variant={textVariant[size]} element="p" class="animate-pulse text-text-secondary">
            {label}
        </Typography>
    {/if}
</div>
