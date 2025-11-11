<script lang="ts">
    import { Tween } from 'svelte/motion';
    import { twMerge } from 'tailwind-merge';
    import { type ActionColor, type Size } from '../types';

    type ProgressVariant = 'solid' | 'striped' | 'animated';

    interface Props {
        percent: number;
        label?: string;
        color?: ActionColor;
        size?: Size;
        showPercent?: boolean;
        variant?: ProgressVariant;
        class?: string;
    }

    let {
        percent,
        label,
        color = 'primary',
        size = 'md',
        showPercent = false,
        variant = 'solid',
        class: className
    }: Props = $props();

    // Clamp percent between 0 and 100
    const clampedPercent = $derived(Math.min(Math.max(percent, 0), 100));

    const sizeMods: Record<Size, string> = {
        xs: 'text-xs h-2',
        sm: 'text-sm h-3',
        md: 'text-base h-6',
        lg: 'text-lg h-8'
    };

    const labelSizeMods: Record<Size, string> = {
        xs: 'text-xs h-6',
        sm: 'text-sm h-7',
        md: 'text-base h-9',
        lg: 'text-lg h-11'
    };

    const hasLabel = $derived(label || showPercent);

    const smoothPercent = Tween.of(() => clampedPercent, {
        duration: 300,
        easing: (t) => t * (2 - t) // ease-out quad
    });
    const leftColor = $derived(`var(--color-on-${color})`);
    const rightColor = $derived(`var(--color-${color})`);

    const containerClass = $derived(
        twMerge(
            'relative w-full rounded-full overflow-hidden',
            'transition-all duration-200',
            hasLabel ? labelSizeMods[size] : sizeMods[size],
            className
        )
    );

    const backgroundClass = $derived(twMerge('absolute inset-0 rounded-full', `bg-${color}`, 'opacity-20'));

    const barClass = $derived(
        twMerge(
            'absolute inset-y-0 left-0 rounded-full',
            `bg-on-${color}`,
            'transition-all duration-200',
            (variant === 'striped' || variant === 'animated') && 'progress-bar-striped',
            variant === 'animated' && 'progress-bar-animated'
        )
    );

    const barStyle = $derived(`width: ${smoothPercent.current}%`);

    const labelContainerClass = $derived(
        twMerge('relative flex items-center justify-center w-full h-full', 'px-3 font-medium', 'pointer-events-none')
    );

    const labelText = $derived(
        label ? (showPercent ? `${label} ${Math.round(clampedPercent)}%` : label) : `${Math.round(clampedPercent)}%`
    );

    const textGradientStyle = $derived(
        `background: linear-gradient(to right, ${rightColor} 0%, ${rightColor} ${smoothPercent.current}%, ${leftColor} ${smoothPercent.current}%, ${leftColor} 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;`
    );
</script>

<div class={containerClass}>
    <div class={backgroundClass}></div>
    <div class={barClass} style={barStyle}></div>
    {#if hasLabel}
        <div class={labelContainerClass}>
            <span class="w-full text-center" style={textGradientStyle}>
                {labelText}
            </span>
        </div>
    {/if}
</div>

<style>
    .progress-bar-striped {
        background-size: 1rem 1rem;
        background-image: linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.3) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.3) 75%,
            transparent 75%,
            transparent
        );
    }

    :global([data-theme='dark']) .progress-bar-striped {
        background-image: linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0.15) 75%,
            transparent 75%,
            transparent
        );
    }

    .progress-bar-animated {
        animation: progress-stripes 0.6s linear infinite;
    }

    @keyframes progress-stripes {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 1rem 0;
        }
    }
</style>
