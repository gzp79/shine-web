<script lang="ts">
    import { sizeMaps, type Color, type Size } from '$components/types';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        offLabel?: string;
        onLabel?: string;
        color?: Color;
        size?: Size;
        disabled?: boolean;
        class?: string;

        value: boolean;
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

    const colorToggleMap: Record<Color, string> = {
        primary: 'toggle-primary',
        secondary: 'toggle-secondary',
        accent: 'toggle-accent',
        neutral: 'toggle-neutral',
        base100: 'toggle-base-100',
        base200: 'toggle-base-200',
        base300: 'toggle-base-300',
        info: 'toggle-info',
        success: 'toggle-success',
        warning: 'toggle-warning',
        error: 'toggle-error'
    };
    const sizeToggleMap: Record<Color, string> = {
        xs: 'toggle-xs',
        sm: 'toggle-sm',
        md: 'toggle-md',
        lg: 'toggle-lg'
    };
</script>

<label class={twMerge('label inline-flex cursor-pointer', sizeMaps.text[size], className)}>
    {#if offLabel}
        <span class="mx-2 whitespace-nowrap align-middle">{offLabel}</span>
    {/if}
    <input
        type="checkbox"
        class="toggle {colorToggleMap[color]} {sizeToggleMap[size]}"
        bind:checked={value}
        {disabled}
    />
    {#if onLabel}
        <span class="mx-2 whitespace-nowrap align-middle">{onLabel}</span>
    {/if}
</label>
