<script lang="ts">
    import { getContext } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { BoxInfo } from '../layouts/Box.svelte';
    import type { ActionColor, ElementProps, InputVariant, Size } from '../types';
    import type { GroupInfo } from './InputGroup.svelte';

    interface Props extends ElementProps {
        rows?: 'single' | number | [number, number];
        placeholder?: string;
        text?: string;

        variant?: InputVariant;
        color?: ActionColor;
        size?: Size;
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

    const sizeMods: Record<Size, string> = {
        xs: 'text-sm leading-none px-2 py-1.5',
        sm: 'text-base leading-none px-3 py-2',
        md: 'text-base leading-none px-4 py-3',
        lg: 'text-lg leading-none px-5 py-4'
    };

    // Hidden Dependency (InputGroup):
    let group: GroupInfo = getContext('InputGroup_props');
    // Hidden Dependency (Box):
    let box: BoxInfo = getContext('Box_props');

    let color = $derived(group?.color ?? baseColor);
    let colorWithFallback = $derived(color ?? 'primary');
    let size = $derived(group?.size ?? baseSize);
    let variant = $derived(group?.variant ?? baseVariant);

    const txtClass = $derived(
        twMerge(
            ['block', 'w-full', 'h-fit-content'],
            !resizable && 'resize-none',

            variant === 'filled' && [
                `bg-${colorWithFallback} text-on-${colorWithFallback} placeholder:text-${colorWithFallback}-2 border-on-${colorWithFallback}`,
                !group && ['rounded-lg', 'border-2'],
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg'
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && 'hover:highlight'
            ],
            variant === 'outline' && [
                box && !color
                    ? `text-${box.fgColor} placeholder:text-${box.fgColor2} border-${box.border}`
                    : `text-on-${colorWithFallback} placeholder:text-${colorWithFallback}-2 border-on-${colorWithFallback}`,
                !group && ['rounded-lg', 'border-2'],
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg'
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && 'hover:highlight-backdrop'
            ],
            variant === 'ghost' && [
                box && !color
                    ? `text-${box.fgColor} placeholder:text-${box.fgColor2}`
                    : `text-on-${colorWithFallback} placeholder:text-${colorWithFallback}-2`,
                !group && ['rounded-lg', 'border-2', 'border-transparent'],
                !disabled && 'hover:highlight-backdrop'
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
