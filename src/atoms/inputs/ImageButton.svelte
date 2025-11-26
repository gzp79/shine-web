<script lang="ts">
    import { type Component } from 'svelte';
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
        getLinkType,
        inputContentHeightClasses
    } from './types';

    interface Props extends ElementProps {
        src: Component | string;
        alt?: string;
        color?: ActionColor;
        size?: InputSize;
        wide?: boolean;
        variant?: InputVariant;
        disabled?: boolean;
        highlight?: boolean;
        class?: string;

        onclick?: () => void;
        href?: string;
        preload?: 'disable' | 'code' | 'hover' | 'eager';
    }

    let {
        src,
        alt = '',
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
        ...rest
    }: Props = $props();

    let groupInfo = getInputGroupContext();
    let boxInfo = getBoxContext();

    let color = $derived(groupInfo?.color ?? baseColor);
    let colorWithFallback = $derived(color ?? 'primary');
    let size = $derived(groupInfo?.size ?? baseSize);
    let variant = $derived(groupInfo?.variant ?? baseVariant);
    let wide = $derived(groupInfo ? (baseWide === undefined ? groupInfo.wide : baseWide) : baseWide);

    let paddingClasses: Record<InputSize, string> = {
        xs: 'p-0.5',
        sm: 'p-0.5',
        md: 'p-1',
        lg: 'p-2'
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
                groupInfo.vertical && 'w-full',
                !groupInfo.vertical && (wide ? 'w-full' : 'w-fit h-fit')
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
                'rounded-lg'
            ],

            inputContentHeightClasses[size],
            variant !== 'ghost' && paddingClasses[size],
            highlight && 'highlight',
            className
        )
    );

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
    {#if typeof src === 'string'}
        <img {src} {alt} class="h-full w-auto object-contain" />
    {:else}
        {@const Icon = src}
        <Icon {alt} class="h-full w-auto object-contain" />
    {/if}
</svelte:element>
