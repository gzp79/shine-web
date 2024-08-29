<script lang="ts">
    import { sizeMaps, type Color, type Size } from '$components/types';
    import type { Component } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    interface Props {
        label?: string;
        color?: Color;
        size?: Size;
        outline?: boolean;
        disabled?: boolean;

        icon?: Component;

        onclick?: () => void;
        href?: string;
    }

    let {
        label,
        icon,
        color = 'primary',
        size = 'md',
        outline = false,
        disabled = false,
        onclick,
        href
    }: Props = $props();

    const colorBtnMap: Record<Color, string> = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        neutral: 'btn-neutral',
        base100: 'btn-base-100',
        base200: 'btn-base-200',
        base300: 'btn-base-300',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error'
    };

    const sizeBtnMap: Record<Size, string> = {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg'
    };

    const sizeIconMargin: Record<Size, string> = {
        xs: '',
        sm: 'mr-0.5',
        md: 'mr-1',
        lg: 'mr-2'
    };

    const btnClass = $derived(
        twMerge(`btn w-fit
            ${colorBtnMap[color]}
            ${sizeBtnMap[size]} 
            ${outline ? 'btn-outline' : ''} 
            ${disabled ? 'btn-disabled' : ''}`)
    );
    const iconClass = $derived(
        twMerge(`
        ${sizeMaps.icon[size]} 
        ${label ? sizeIconMargin[size] : ''}`)
    );
</script>

{#snippet content()}
    {#if icon}
        <svelte:component this={icon} {disabled} class={iconClass} />
    {/if}
    {#if label}
        <span class="inline-block {sizeMaps.text[size]}">{label}</span>
    {/if}
{/snippet}

{#if href}
    <a class={btnClass} {href} {onclick}>
        {@render content()}
    </a>
{:else}
    <button class={btnClass} {disabled} {onclick}>
        {@render content()}
    </button>
{/if}
