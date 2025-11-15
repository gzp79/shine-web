<script lang="ts">
    import { type Component, type Snippet, getContext } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';
    import { getBoxContext } from '../layouts/Box.svelte';
    import { type ActionColor, type ElementProps } from '../types';
    import { getInputGroupContext } from './InputGroup.svelte';
    import {
        type InputSize,
        type InputVariant,
        getGroupBorderClasses,
        getGroupColorClasses,
        getLinkType
    } from './types';

    interface Props extends ElementProps {
        color?: ActionColor;
        size?: InputSize;
        wide?: boolean;
        variant?: InputVariant;
        disabled?: boolean;
        highlight?: boolean;
        class?: string;

        startIcon?: Component | string;
        endIcon?: Component | string;

        onclick?: () => void;
        href?: string;
        preload?: 'disable' | 'code' | 'hover' | 'eager';

        children?: Snippet;
    }

    let {
        startIcon,
        endIcon,
        color: baseColor,
        size: baseSize = 'md',
        wide: baseWide,
        variant: baseVariant = 'filled',
        highlight = false,
        disabled = false,
        class: className,
        onclick,
        href,
        preload,
        children,
        ...rest
    }: Props = $props();

    let groupInfo = getInputGroupContext();
    let boxInfo = getBoxContext();

    let color = $derived(groupInfo?.color ?? baseColor);
    let colorWithFallback = $derived(color ?? 'primary');
    let size = $derived(groupInfo?.size ?? baseSize);
    let variant = $derived(groupInfo?.variant ?? baseVariant);
    let wide = $derived(groupInfo ? (baseWide === undefined ? groupInfo.wide : baseWide) : baseWide);

    const sizeMods: Record<InputSize, string> = {
        xs: 'text-sm leading-none px-2 py-1.5',
        sm: 'text-base leading-none px-3 py-2',
        md: 'text-base leading-none px-4 py-3',
        lg: 'text-lg leading-none px-5 py-4'
    };
    const sizeModsIconOnly: Record<InputSize, string> = {
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
    const startIconMargin: Record<InputSize, string> = {
        xs: 'me-0.5',
        sm: 'me-1',
        md: 'me-1.5',
        lg: 'me-3'
    };
    const endIconMargin: Record<InputSize, string> = {
        xs: 'ms-0.5',
        sm: 'ms-1',
        md: 'ms-1.5',
        lg: 'ms-3'
    };
    const iconSize: Record<InputSize, string> = {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-10 h-10'
    };

    const btnClass = $derived(
        twMerge(
            'inline-flex items-center justify-center text-center whitespace-nowrap',

            groupInfo && [
                ...getGroupBorderClasses(
                    groupInfo.vertical,
                    variant,
                    variant === 'outline' && boxInfo && !color ? boxInfo.border : `on-${colorWithFallback}`
                ),
                ...getGroupColorClasses(
                    variant,
                    disabled,
                    colorWithFallback,
                    boxInfo && !color ? boxInfo.fgColor : `on-${colorWithFallback}`
                ),
                'self-stretch',
                groupInfo.vertical && ['w-full', wide && 'justify-evenly'],
                !groupInfo.vertical && [wide ? 'w-full' : 'w-fit']
            ],

            !groupInfo && [
                variant === 'filled' && [
                    `bg-${colorWithFallback}`,
                    `text-on-${colorWithFallback}`,
                    `border-on-${colorWithFallback}`,
                    !disabled && 'hover:highlight'
                ],
                variant === 'outline' && [
                    boxInfo && !color ? `text-${boxInfo.fgColor}` : `text-on-${colorWithFallback}`,
                    boxInfo && !color ? `border-${boxInfo.border}` : `border-on-${colorWithFallback}`,
                    !disabled && 'hover:highlight-backdrop'
                ],
                variant === 'ghost' && [
                    boxInfo && !color ? `text-${boxInfo.fgColor}` : `text-on-${colorWithFallback}`,
                    'border-transparent',
                    !disabled && 'hover:highlight-backdrop'
                ],

                'border-2',
                !disabled && 'active:scale-95',
                disabled && '!opacity-30 !cursor-not-allowed',
                wide ? 'min-w-full justify-center' : 'w-fit h-fit',
                'rounded-full'
            ],

            children && [sizeMods[size], startIcon && startIconPadding[size], endIcon && endIconPadding[size]],
            !children && sizeModsIconOnly[size],

            highlight && 'highlight',

            className
        )
    );

    const startIconClass = $derived(twMerge(children && startIconMargin[size], iconSize[size]));
    const endIconClass = $derived(twMerge(children && endIconMargin[size], iconSize[size]));

    let el = $derived(href ? 'a' : 'button');
    let buttonOptions: HTMLAttributes<HTMLElement> = $derived({
        disabled
    });
    let linkOptions: HTMLAttributes<HTMLElement> = $derived.by(() => {
        let preloadData = {};
        if (preload === 'disable')
            preloadData = {
                'data-sveltekit-preload-data': 'off',
                'data-sveltekit-preload-code': 'off'
            };
        else if (preload === 'code')
            preloadData = {
                'data-sveltekit-preload-data': 'off',
                'data-sveltekit-preload-code': 'hover'
            };
        else if (preload === 'hover')
            preloadData = {
                'data-sveltekit-preload-data': 'hover',
                'data-sveltekit-preload-code': 'hover'
            };
        else if (preload === 'eager')
            preloadData = {
                'data-sveltekit-preload-data': 'hover',
                'data-sveltekit-preload-code': 'eager'
            };
        return preloadData;
    });

    let linkType = $derived(getLinkType(href));
    let elProps = $derived({
        ...(disabled || !href ? {} : { href }),
        ...(onclick ? { onclick } : {}),
        ...(href ? linkOptions : buttonOptions),
        // Add data-sveltekit-reload for hash links and external links to prevent SvelteKit processing
        ...(linkType === 'hash' || linkType === 'external' || linkType === 'protocol'
            ? { 'data-sveltekit-reload': true as const }
            : {}),
        ...rest
    });
</script>

<svelte:element this={el} class={btnClass} {...elProps}>
    {#if typeof startIcon === 'string'}
        <img src={startIcon} class={startIconClass} alt="" />
    {:else if startIcon}
        {@const StartIcon = startIcon}
        <StartIcon {size} class={startIconClass} />
    {/if}
    {@render children?.()}
    {#if typeof endIcon === 'string'}
        <img src={endIcon} class={endIconClass} alt="" />
    {:else if endIcon}
        {@const EndIcon = endIcon}
        <EndIcon {size} class={endIconClass} />
    {/if}
</svelte:element>
