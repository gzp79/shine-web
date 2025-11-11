<script lang="ts">
    import { getContext } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';
    import type { ActionColor, ElementProps, Size } from '../types';
    import type { GroupInfo } from './InputGroup.svelte';

    interface Props extends ElementProps {
        src: string;
        alt: string;
        color?: ActionColor;
        disabled?: boolean;
        class?: string;

        onclick?: () => void;
        href?: string;
        preload?: 'disable' | 'code' | 'hover' | 'eager';

        button?: HTMLElement;
    }

    let {
        src,
        alt,
        color: baseColor,
        disabled = false,
        class: className,
        onclick,
        href,
        preload,
        button = $bindable(),
        ...rest
    }: Props = $props();

    // Hidden Dependency (InputGroup):
    let group: GroupInfo = getContext('InputGroup_props');

    let color = $derived(group?.color ?? baseColor);
    let colorWithFallback = $derived(color ?? 'primary');

    const sizeMods: Record<Size, string> = {
        xs: 'px-2 py-1.5',
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-5 py-4'
    };

    const btnClass = $derived(
        twMerge(
            'inline-flex items-center justify-center',

            // Border styling when in a group
            group && [
                `border-on-${colorWithFallback}`,
                group.vertical
                    ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg'
                    : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'
            ],

            // Sizing and layout
            group && ['self-stretch', group.vertical ? 'w-full' : 'h-full'],
            group && sizeMods[group.size],

            !disabled && !group && 'active:scale-95',
            !disabled && 'hover:opacity-80 transition-opacity',
            disabled && '!opacity-30 !cursor-not-allowed',

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

    const imgClass = $derived(group ? (group.vertical ? 'w-full h-auto' : 'h-full w-auto') : 'h-full w-auto');
</script>

<svelte:element this={el} class={btnClass} bind:this={button} {...elProps}>
    <img {src} {alt} class={imgClass} />
</svelte:element>
