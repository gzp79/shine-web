<script lang="ts">
    import { getContext } from 'svelte';
    import { twMerge } from 'tailwind-merge';
    import type { GroupInfo } from './InputGroup.svelte';
    import type { ActionColor, ElementProps, InputVariant, Size } from './types';

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
    }

    let {
        rows: baseRows,
        text = $bindable(),
        placeholder = '',
        variant: baseVariant = 'filled',
        color: baseColor = 'primary',
        size: baseSize = 'md',
        resizable,
        disabled,
        class: className,
        onEnter
    }: Props = $props();

    const sizeMods: Record<Size, string> = {
        xs: 'text-sm leading-none px-2 py-1.5',
        sm: 'text-base leading-none px-3 py-2',
        md: 'text-base leading-none px-4 py-3',
        lg: 'text-lg leading-none px-5 py-4'
    };

    // Hidden Dependency (InputGroup):
    // - determine the color and size
    // - fix the border and rounding
    let group: GroupInfo = getContext('InputGroup_props');
    let color = $derived(group?.color ?? baseColor);
    let size = $derived(group?.size ?? baseSize);
    let variant = $derived(group?.variant ?? baseVariant);
    //let wide = $derived(group ? (baseWide === undefined ? group.wide : baseWide) : baseWide);

    const txtClass = $derived(
        twMerge(
            ['block', 'w-full', 'h-fit-content'],
            !resizable && 'resize-none',

            variant === 'filled' && [
                `bg-${color} text-on-${color} border-on-${color}`,
                !group && ['m-1', 'rounded-lg', 'border-2'],
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg'
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && 'hover:highlight'
            ],
            variant === 'outline' && [
                `text-on-${color} border-on-${color}`,
                !group && ['m-1', 'rounded-lg', 'border-2'],
                group &&
                    (group.vertical
                        ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg'
                        : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'),
                !disabled && `hover:highlight-backdrop`
            ],
            variant === 'ghost' && [
                `text-on-${color}`,
                !group && ['m-1', 'rounded-lg', 'border-2', 'border-transparent'],
                !disabled && `hover:highlight-backdrop`
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
</script>

{#if rows === 'single'}
    <input type="text" {placeholder} {disabled} bind:value={text} class={txtClass} onkeydown={handleKey} />
{:else}
    <textarea {rows} {placeholder} {disabled} bind:value={text} class={txtClass} onkeydown={handleKey}></textarea>
{/if}
