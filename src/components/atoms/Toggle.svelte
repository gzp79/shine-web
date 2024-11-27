<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { type ActionColor, type Size } from './types';

    interface Props {
        offLabel?: string;
        onLabel?: string;
        color?: ActionColor;
        size?: Size;
        disabled?: boolean;
        class?: string;

        /// bindable value
        value?: boolean;
    }

    let {
        offLabel,
        onLabel,
        color = 'primary',
        size = 'md',
        disabled = false,
        class: className,
        value = $bindable()
    }: Props = $props();

    const transition = 'transition-all duration-100 easy-in-out';

    const toggleSize: Record<Size, string> = {
        xs: 'text-sm leading-none my-1',
        sm: 'text-base leading-none my-1.5',
        md: 'text-base leading-none my-2',
        lg: 'text-lg leading-none my-2'
    };
    let toggleClass = $derived(
        twMerge(
            'inline-flex cursor-pointer items-center align-middle',
            toggleSize[size],
            disabled && '!opacity-30 !cursor-not-allowed',
            className
        )
    );

    const barSize: Record<Size, string> = {
        xs: 'w-8 h-3',
        sm: 'w-9 h-3',
        md: 'w-11 h-4',
        lg: 'w-14 h-5'
    };
    let barClass = $derived(
        twMerge(
            'relative h-4 w-11 rounded-full border',
            barSize[size],
            transition,
            value ? 'bg-surface border-on-surface' : 'bg-on-surface border-surface'
        )
    );

    const knobSize: Record<Size, string> = {
        xs: 'w-4 h-4 -translate-y-[2.75px]',
        sm: 'w-5 h-5 -translate-y-[4.75px]',
        md: 'w-6 h-6 -translate-y-[4.75px]',
        lg: 'w-8 h-8 -translate-y-[6.75px]'
    };
    const knobTranslate: Record<Size, string> = {
        xs: 'translate-x-[15.25px]',
        sm: 'translate-x-[15.25px]',
        md: 'translate-x-[19.25px]',
        lg: 'translate-x-[24.25px]'
    };
    let knobClass = $derived(
        twMerge(
            'absolute rounded-full border-2 left-0 top-0',
            knobSize[size],
            transition,
            value ? `border-on-${color} bg-${color}` : `bg-on-${color} border-${color}`,
            value && knobTranslate[size]
        )
    );
</script>

<label class={toggleClass}>
    <input type="checkbox" class="sr-only" bind:checked={value} />
    {#if offLabel}
        <span class="mx-2 whitespace-nowrap align-middle">{offLabel}</span>
    {/if}
    <div class={barClass}>
        <div class={knobClass}></div>
    </div>
    {#if onLabel}
        <span class="mx-2 whitespace-nowrap align-middle">{onLabel}</span>
    {/if}
</label>
