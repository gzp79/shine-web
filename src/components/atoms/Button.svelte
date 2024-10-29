<script lang="ts">
    import { getContext, type Component, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { Nullable } from '$src/lib/utils';
    import { type Color, type ElementProps, type Size } from './types';
    import type { GroupInfo } from './InputGroup.svelte';

    interface Props extends ElementProps {
        color?: Color;
        size?: Size;
        wide?: boolean;
        outline?: boolean;
        disabled?: boolean;
        highlight?: boolean;
        class?: string;

        startIcon?: Component;
        endIcon?: Component;

        onclick?: Nullable<() => void>;
        href?: string;

        children?: Snippet;
    }

    let {
        startIcon: StartIcon,
        endIcon: EndIcon,
        color: baseColor = 'primary',
        size: baseSize = 'md',
        wide: baseWide,
        outline = false,
        highlight = false,
        disabled = false,
        class: className,
        onclick,
        href,
        children,
        ...rest
    }: Props = $props();

    // Hidden Dependency (InputGroup):
    // - determine the color and size
    // - fix the border and rounding
    let group: GroupInfo = getContext('InputGroup_props');
    let color = $derived(group?.color ?? baseColor);
    let size = $derived(group?.size ?? baseSize);
    let wide = $derived(group ? (baseWide === undefined ? group.wide : baseWide) : baseWide);

    const sizeMods: Record<Size, string> = {
        xs: 'text-sm leading-none px-2 py-1.5',
        sm: 'text-base leading-none px-3 py-2',
        md: 'text-base leading-none px-4 py-3',
        lg: 'text-lg leading-none px-5 py-4'
    };
    const sizeModsIconOnly: Record<Size, string> = {
        xs: 'p-1',
        sm: 'p-2',
        md: 'p-2',
        lg: 'p-2'
    };
    const startIconPadding: Record<string, string> = {
        xs: '',
        sm: '',
        md: 'ps-4',
        lg: 'ps-5'
    };
    const endIconPadding: Record<string, string> = {
        xs: '',
        sm: '',
        md: 'pe-4',
        lg: 'pe-5'
    };
    const startIconMargin: Record<Size, string> = {
        xs: 'me-0.5',
        sm: 'me-1',
        md: 'me-1.5',
        lg: 'me-3'
    };
    const endIconMargin: Record<Size, string> = {
        xs: 'ms-0.5',
        sm: 'ms-1',
        md: 'ms-1.5',
        lg: 'ms-3'
    };
    const iconSize: Record<Size, string> = {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-10 h-10'
    };

    const btnClass = $derived(
        twMerge(
            'inline-flex items-center justify-center text-center whitespace-nowrap',
            !group && 'm-1',
            group && 'self-stretch',
            group && group.vertical && 'w-full',
            group && !group.vertical && (wide ? 'w-full' : 'w-fit'),
            !group && (wide ? 'min-w-full justify-between' : 'w-fit h-fit'),
            group &&
                (group.vertical
                    ? `first:rounded-t-lg last:rounded-b-lg ${wide && 'justify-between'}`
                    : 'first:rounded-s-lg last:rounded-e-lg'),
            !group && 'rounded-full',
            !outline ? `bg-${color} text-on-${color}` : `text-${color}`,
            !group && outline && `border-2 border-${color}`,
            group &&
                outline &&
                (group.vertical
                    ? 'first:border-t-2 last:border-b-2 border-x-2'
                    : 'first:border-s-2 last:border-e-2 border-y-2'),
            group &&
                (group.vertical
                    ? `not-first:border-t border-${color}-mute`
                    : `not-first:border-s border-${color}-mute`),

            children && sizeMods[size],
            children && StartIcon && startIconPadding[size],
            children && EndIcon && endIconPadding[size],
            !children && sizeModsIconOnly[size],

            highlight && 'brightness-125',
            !disabled && !outline && 'active:scale-95 hover:brightness-125',
            !disabled && outline && `active:scale-95 hover:bg-${color}-mute hover:text-${color}-accent`,
            disabled && '!opacity-30 !cursor-not-allowed',

            //disabled && 'grayscale !cursor-not-allowed',
            className
        )
    );

    const startIconClass = $derived(twMerge(children && startIconMargin[size], iconSize[size]));
    const endIconClass = $derived(twMerge(children && endIconMargin[size], iconSize[size]));
</script>

{#snippet content()}
    {#if StartIcon}
        <StartIcon class={startIconClass} />
    {/if}
    {#if children}
        {@render children()}
    {/if}
    {#if EndIcon}
        <EndIcon class={endIconClass} />
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
