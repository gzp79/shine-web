<script lang="ts">
    import { type Component, type Snippet, getContext } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';
    import type { BoxInfo } from './Box.svelte';
    import type { GroupInfo } from './InputGroup.svelte';
    import { type ActionColor, type ElementProps, type InputVariant, type Size } from './types';

    interface Props extends ElementProps {
        color?: ActionColor;
        size?: Size;
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
        button?: HTMLElement;
    }

    let {
        startIcon: StartIcon,
        endIcon: EndIcon,
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
        button = $bindable(),
        ...rest
    }: Props = $props();

    // Hidden Dependency (InputGroup):
    let group: GroupInfo = getContext('InputGroup_props');
    // Hidden Dependency (Box):
    let box: BoxInfo = getContext('Box_props');

    let color = $derived(group?.color ?? baseColor);
    let colorWithFallback = $derived(color ?? 'primary');
    let size = $derived(group?.size ?? baseSize);
    let variant = $derived(group?.variant ?? baseVariant);
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

            variant === 'filled' && [
                `bg-${colorWithFallback} text-on-${colorWithFallback} border-on-${colorWithFallback}`,
                !group && 'border-2',
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg '
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && !group && 'active:scale-95',
                !disabled && 'hover:highlight'
            ],
            variant === 'outline' && [
                box && !color
                    ? `text-${box.fgColor} border-${box.border}`
                    : `text-on-${colorWithFallback} border-on-${colorWithFallback}`,
                !group && 'border-2',
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg '
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && !group && 'active:scale-95',
                !disabled && 'hover:highlight-backdrop'
            ],
            variant === 'ghost' && [
                box && !color ? `text-${box.fgColor}` : `text-on-${colorWithFallback}`,
                !group && 'border-2 border-transparent',
                group &&
                    (group.vertical
                        ? 'border-2 border-transparent first:rounded-t-lg last:rounded-b-lg '
                        : 'border-2 border-transparent first:rounded-s-lg last:rounded-e-lg'),
                !disabled && !group && 'active:scale-95',
                !disabled && 'hover:highlight-backdrop'
            ],

            !group && ['m-1', wide ? 'min-w-full justify-center' : 'w-fit h-fit', 'rounded-full'],
            group && [
                'self-stretch',
                group.vertical && ['w-full', wide && 'justify-between'],
                !group.vertical && (wide ? 'w-full' : 'w-fit')
            ],

            children && [sizeMods[size], StartIcon && startIconPadding[size], EndIcon && endIconPadding[size]],
            !children && sizeModsIconOnly[size],

            highlight && 'highlight',
            disabled && '!opacity-30 !cursor-not-allowed',

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

    // Detect different types of links to handle them appropriately
    let linkType = $derived(() => {
        if (!href) return 'none';
        if (href.startsWith('#')) return 'hash';
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) return 'external';
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return 'protocol';
        return 'internal';
    });

    let elProps = $derived({
        ...(disabled ? {} : { href }),
        onclick,
        ...(href ? linkOptions : buttonOptions),
        // Add data-sveltekit-reload for hash links and external links to prevent SvelteKit processing
        ...(linkType() === 'hash' || linkType() === 'external' || linkType() === 'protocol'
            ? { 'data-sveltekit-reload': true as const }
            : {}),
        ...rest
    });
</script>

<svelte:element this={el} class={btnClass} bind:this={button} {...elProps}>
    {#if typeof StartIcon === 'string'}
        <img src={StartIcon} class={startIconClass} alt="" />
    {:else if StartIcon}
        <StartIcon class={startIconClass} />
    {/if}
    {@render children?.()}
    {#if typeof EndIcon === 'string'}
        <img src={EndIcon} class={endIconClass} alt="" />
    {:else if EndIcon}
        <EndIcon class={endIconClass} />
    {/if}
</svelte:element>
