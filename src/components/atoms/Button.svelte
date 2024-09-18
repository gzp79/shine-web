<script lang="ts">
    import { colorMaps, sizeMaps, type Color, type Size } from '$components/types';
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

    const sizeIconMargin: Record<Size, string> = {
        xs: '',
        sm: 'mr-0.5',
        md: 'mr-1',
        lg: 'mr-2'
    };

    const btnClass = $derived(
        twMerge([
            'btn w-fit shadow-base shadow-md hover:shadow-sm hover:shadow-base m-1',
            colorMaps.button[color],
            sizeMaps.button[size],
            outline && 'btn-outline',
            disabled && 'btn-disabled'
        ])
    );
    const iconClass = $derived(twMerge([sizeMaps.icon[size], label && sizeIconMargin[size]]));
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
