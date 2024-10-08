<script lang="ts">
    import { type Color, type Size } from '$components/types';
    import { getContext, type Component, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import CompileTailwindClasses from './utils/CompileTailwindClasses.svelte';

    interface Props {
        color?: Color;
        size?: Size;
        outline?: boolean;
        disabled?: boolean;

        startIcon?: Component;
        endIcon?: Component;

        onclick?: () => void;
        href?: string;

        id?: string;
        children?: Snippet;
    }

    let {
        startIcon: StartIcon,
        endIcon: EndIcon,
        color = 'primary',
        size = 'md',
        outline = false,
        disabled = false,
        onclick,
        href,
        children,
        ...rest
    }: Props = $props();

    const sizeMods: Record<Size, string> = {
        xs: 'text-sm px-2 py-1.5',
        sm: 'text-base px-3 py-2',
        md: 'text-base px-5 py-2.5',
        lg: 'text-lg px-7 py-3'
    };
    const sizeModsStartIcon: Record<string, string> = {
        xs: '',
        sm: '',
        md: 'ps-4',
        lg: 'ps-5'
    };
    const sizeModsEndIcon: Record<string, string> = {
        xs: '',
        sm: '',
        md: 'pe-4',
        lg: 'pe-5'
    };
    const iconStartMargin: Record<Size, string> = {
        xs: 'ms-0.5',
        sm: 'ms-1',
        md: 'ms-1.5',
        lg: 'ms-3'
    };
    const iconEndMargin: Record<Size, string> = {
        xs: 'me-0.5',
        sm: 'me-1',
        md: 'me-1.5',
        lg: 'me-3'
    };

    const btnClass = $derived(
        twMerge(
            'inline-flex items-center justify-center m-1',
            'text-center whitespace-nowrap',
            'rounded-full',
            !outline && `bg-${color} text-on-${color}`,
            outline && `border border-2 border-${color} text-${color}`,
            sizeMods[size],
            StartIcon && sizeModsStartIcon[size],
            EndIcon && sizeModsEndIcon[size],
            !disabled && 'active:scale-95 hover:brightness-125',
            disabled && '!opacity-30 !cursor-not-allowed'
            //disabled && 'grayscale !cursor-not-allowed'
        )
    );
</script>

<CompileTailwindClasses
    classList={[
        'bg-primary bg-info bg-warning bg-danger bg-success',
        'text-on-primary text-on-info text-on-warning text-on-danger text-on-success',
        'text-primary text-info text-warning text-danger text-success',
        'border-primary border-info border-warning border-danger border-success',
        'icon-xs icon-sm icon-md icon-lg'
    ]}
/>

{#snippet content()}
    {#if StartIcon}
        <StartIcon class="{iconEndMargin[size]} icon-{size}" />
    {/if}
    {#if children}
        {@render children()}
    {/if}
    {#if EndIcon}
        <EndIcon class="{iconStartMargin[size]} icon-{size}" />
    {/if}
{/snippet}

{#if href}
    <a class={btnClass} {href} {onclick} {...rest}>
        {@render content()}
    </a>
{:else}
    <button class={btnClass} {disabled} {onclick} {...rest}>
        {@render content()}
    </button>
{/if}
