<script lang="ts">
    import { Tween } from 'svelte/motion';
    import { twMerge } from 'tailwind-merge';
    import { type ActionColor, type Size } from './types';

    interface Props {
        percent: number;
        label?: string;
        color?: ActionColor;
        size?: Size;
        class?: string;
    }

    let { percent, label, color = 'primary', size = 'md', class: className }: Props = $props();

    const sizeMods: Record<Size, string> = {
        xs: 'text-xs min-h-3',
        sm: 'text-sm min-h-4',
        md: 'text-base min-h-8',
        lg: 'text-lg min-h-10'
    };

    const smoothPercent = Tween.of(() => percent, {
        duration: 300,
        easing: (t) => t
    });

    const leftColor = $derived(`var(--color-on-${color})`);
    const rightColor = $derived(`var(--color-${color})`);

    const divClass = $derived(
        twMerge(
            'w-full inline-flex items-center justify-center text-center whitespace-nowrap rounded-full overflow-clip',
            'border-2',
            `border-on-${color}`,
            sizeMods[size],
            className
        )
    );
    const gradientStyle = $derived(
        `background: linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${smoothPercent.current}%, ${rightColor} ${smoothPercent.current}%, ${rightColor} 100%);`
    );

    const textClass = $derived(twMerge('w-full'));
    const textGradientStyle = $derived(
        `background: linear-gradient(to right, ${rightColor} 0%, ${rightColor} ${smoothPercent.current}%, ${leftColor} ${smoothPercent.current}%, ${leftColor} 100%);
        background-clip: text;
        color: transparent;`
    );
</script>

<div class={divClass} style={gradientStyle}>
    {#if label}
        <span class={textClass} style={textGradientStyle}>{label} </span>
    {/if}
</div>
