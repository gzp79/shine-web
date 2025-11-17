<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { getBoxContext } from '../layouts/Box.svelte';
    import type { ActionColor, ElementProps } from '../types';
    import { getInputGroupContext } from './InputGroup.svelte';
    import { type InputSize, type InputVariant, getGroupBorderClasses, getGroupColorClasses } from './types';

    interface Props extends ElementProps {
        rows?: 'single' | number | [number, number];
        placeholder?: string;
        text?: string;

        variant?: InputVariant;
        color?: ActionColor;
        size?: InputSize;
        resizable?: boolean;
        disabled?: boolean;
        class?: string;

        onEnter?: (test: string) => void;
        onBlur?: (test: string) => void;
    }

    let {
        rows: baseRows,
        text = $bindable(),
        placeholder = '',
        variant: baseVariant = 'filled',
        color: baseColor,
        size: baseSize = 'md',
        resizable,
        disabled,
        class: className,
        onEnter,
        onBlur
    }: Props = $props();

    const sizeMods: Record<InputSize, string> = {
        xs: 'text-sm leading-none px-2 py-1.5',
        sm: 'text-base leading-none px-3 py-2',
        md: 'text-base leading-none px-4 py-3',
        lg: 'text-lg leading-none px-5 py-4'
    };

    let groupInfo = getInputGroupContext();
    let boxInfo = getBoxContext();

    let color = $derived(groupInfo?.color ?? baseColor);
    let colorWithFallback = $derived(color ?? 'primary');
    let size = $derived(groupInfo?.size ?? baseSize);
    let variant = $derived(groupInfo?.variant ?? baseVariant);

    const txtClass = $derived(
        twMerge(
            ['block', 'w-full', 'h-fit-content'],
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-inset',
            `focus-visible:ring-${colorWithFallback}-2`,
            groupInfo && [
                ...getGroupBorderClasses(
                    groupInfo.vertical,
                    variant,
                    variant === 'outline' && boxInfo && !color ? boxInfo.border : `on-${colorWithFallback}`
                ),
                ...getGroupColorClasses(
                    variant,
                    disabled ?? false,
                    colorWithFallback,
                    boxInfo && !color ? boxInfo.fgColor : `on-${colorWithFallback}`
                ),
                variant === 'filled' && `placeholder:text-${colorWithFallback}-2`,
                variant === 'outline' && [
                    boxInfo && !color
                        ? `placeholder:text-${boxInfo.fgColor2}`
                        : `placeholder:text-${colorWithFallback}-2`
                ],
                variant === 'ghost' && [
                    boxInfo && !color
                        ? `placeholder:text-${boxInfo.fgColor2}`
                        : `placeholder:text-${colorWithFallback}-2`
                ],
                resizable ? (groupInfo.vertical ? 'resize-y' : 'resize-x') : 'resize-none'
            ],

            !groupInfo && [
                variant === 'filled' && [
                    `bg-${colorWithFallback}`,
                    `text-on-${colorWithFallback}`,
                    `placeholder:text-${colorWithFallback}-2`,
                    `border-on-${colorWithFallback}`,
                    disabled ? '!opacity-30 !cursor-not-allowed' : 'hover:highlight'
                ],
                variant === 'outline' && [
                    boxInfo && !color ? `text-${boxInfo.fgColor}` : `text-on-${colorWithFallback}`,
                    boxInfo && !color
                        ? `placeholder:text-${boxInfo.fgColor2}`
                        : `placeholder:text-${colorWithFallback}-2`,
                    boxInfo && !color ? `border-${boxInfo.border}` : `border-on-${colorWithFallback}`,
                    disabled ? '!opacity-30 !cursor-not-allowed' : 'hover:highlight-backdrop'
                ],
                variant === 'ghost' && [
                    boxInfo && !color ? `text-${boxInfo.fgColor}` : `text-on-${colorWithFallback}`,
                    boxInfo && !color
                        ? `placeholder:text-${boxInfo.fgColor2}`
                        : `placeholder:text-${colorWithFallback}-2`,
                    'border-transparent',
                    disabled ? '!opacity-30 !cursor-not-allowed' : 'hover:highlight-backdrop'
                ],

                'rounded-lg',
                'border-2',
                resizable ? 'resize' : 'resize-none'
            ],

            sizeMods[size],
            className
        )
    );

    let rows = $derived.by(() => {
        if (baseRows === 'single' || baseRows === undefined || typeof baseRows === 'number') {
            return baseRows;
        } else {
            const lineCount = text?.split(/\r\n|\r|\n/)?.length ?? 1;
            return lineCount < baseRows[0] ? baseRows[0] : lineCount > baseRows[1] ? baseRows[1] : lineCount;
        }
    });

    const handleKey = (e: KeyboardEvent) => {
        if (onEnter && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onEnter?.(text ?? '');
        }
    };
    const handleBlur = () => {
        if (onBlur) {
            onBlur(text ?? '');
        }
    };
</script>

{#if rows === 'single'}
    <input
        type="text"
        {placeholder}
        {disabled}
        bind:value={text}
        class={txtClass}
        onkeydown={handleKey}
        onblur={handleBlur}
    />
{:else}
    <textarea
        {rows}
        {placeholder}
        {disabled}
        bind:value={text}
        class={txtClass}
        onkeydown={handleKey}
        onblur={handleBlur}
    ></textarea>
{/if}
