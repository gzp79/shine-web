<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { type ActionColor, type Size } from '../types';

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
        xs: 'text-sm leading-none',
        sm: 'text-base leading-none',
        md: 'text-base leading-none',
        lg: 'text-lg leading-none'
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
        xs: 'w-6 h-3',
        sm: 'w-8 h-3.5',
        md: 'w-10 h-4',
        lg: 'w-12 h-5'
    };
    let barClass = $derived(
        twMerge(
            'relative box-border h-4 w-11 rounded-full border border-on-surface',
            `bg-${color}`,
            barSize[size],
            transition
        )
    );

    /*const knobSize: Record<Size, string> = {
        xs: 'w-4 h-4 -translate-x-[1px] -translate-y-[2.75px]',
        sm: 'w-5 h-5 -translate-x-[1px] -translate-y-[4.75px]',
        md: 'w-6 h-6 -translate-x-[1px] -translate-y-[4.75px]',
        lg: 'w-8 h-8 -translate-x-[1px] -translate-y-[6.75px]'
    };*/
    const knobSize: Record<Size, string> = {
        xs: 'w-2 h-2 translate-x-[1px] translate-y-[1px]',
        sm: 'w-2.5 h-2.5 translate-x-[2px] translate-y-[1px]',
        md: 'w-3 h-3 translate-x-[2.5px] translate-y-[1.25px]',
        lg: 'w-4 h-4 translate-x-[3px] translate-y-[1.125px]'
    };
    const knobTranslate: Record<Size, string> = {
        xs: 'translate-x-[12px]',
        sm: 'translate-x-[18px]',
        md: 'translate-x-[24px]',
        lg: 'translate-x-[27px]'
    };
    let knobClass = $derived(
        twMerge(
            `absolute rounded-full left-0 top-0 border border-on-${color}`,
            knobSize[size],
            transition,
            value ? `bg-${color}-2` : `bg-${color}-1`,
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
