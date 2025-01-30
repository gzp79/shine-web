<script lang="ts">
    import { type Component, type Snippet, getContext } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';
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

        startIcon?: Component;
        endIcon?: Component;

        onclick?: () => void;
        href?: string;
        preload?: 'disable' | 'code' | 'hover' | 'eager';

        children?: Snippet;
        button?: HTMLElement;
    }

    let {
        startIcon: StartIcon,
        endIcon: EndIcon,
        color: baseColor = 'primary',
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
    // - determine the color and size
    // - fix the border and rounding
    let group: GroupInfo = getContext('InputGroup_props');
    let color = $derived(group?.color ?? baseColor);
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
                `bg-${color} text-on-${color} border-on-${color}`,
                !group && 'border-2',
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg '
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && !group && 'active:scale-95',
                !disabled && 'hover:highlight'
            ],
            variant === 'outline' && [
                `text-accent-${color} border-accent-${color}`,
                !group && 'border-2',
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg '
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && !group && 'active:scale-95',
                !disabled && `hover:highlight-backdrop`
            ],
            variant === 'ghost' && [
                `text-accent-${color}`,
                !group && 'border-2 border-transparent',
                group &&
                    (group.vertical
                        ? 'border-2 border-transparent first:rounded-t-lg last:rounded-b-lg '
                        : 'border-2 border-transparent first:rounded-s-lg last:rounded-e-lg'),
                !disabled && !group && 'active:scale-95',
                !disabled && `hover:highlight-backdrop`
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
    let linkOptions: HTMLAttributes<HTMLElement> = $derived.by(() => {
        if (preload === 'disable')
            return {
                'data-sveltekit-preload-data': 'off',
                'data-sveltekit-preload-code': 'off'
            };
        else if (preload === 'code')
            return {
                'data-sveltekit-preload-data': 'off',
                'data-sveltekit-preload-code': 'hover'
            };
        else if (preload === 'hover')
            return {
                'data-sveltekit-preload-data': 'hover',
                'data-sveltekit-preload-code': 'hover'
            };
        else if (preload === 'eager')
            return {
                'data-sveltekit-preload-data': 'hover',
                'data-sveltekit-preload-code': 'eager'
            };
        else return {};
    });
    let elProps = $derived({
        href,
        onclick,
        ...(href ? linkOptions : {}),
        ...rest
    });
</script>

<svelte:element this={el} class={btnClass} bind:this={button} {...elProps}>
    {#if StartIcon}
        <StartIcon class={startIconClass} />
    {/if}
    {@render children?.()}
    {#if EndIcon}
        <EndIcon class={endIconClass} />
    {/if}
</svelte:element>
