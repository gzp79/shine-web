<script lang="ts">
    import { z } from 'zod';
    import Stack from '$atoms/Stack.svelte';
    import TextArea from '$atoms/TextArea.svelte';
    import Validation, { type ValidationResult, isValidResult } from '$atoms/Validation.svelte';
    import type { ActionColor, ElementProps, InputVariant, Size } from '$atoms/types';

    interface Props extends ElementProps {
        rows?: 'single' | number | [number, number];
        placeholder?: string;
        text?: string;
        preserveErrorSpace?: boolean;
        validate: z.ZodTypeAny | ((text: string) => ValidationResult);
        valid?: boolean;

        variant?: InputVariant;
        color?: ActionColor;
        size?: Size;
        resizable?: boolean;
        disabled?: boolean;
        class?: string;

        onEnter?: (test: string) => void;
    }

    let {
        rows,
        placeholder,
        preserveErrorSpace = false,
        validate,
        valid = $bindable(false),
        variant,
        color,
        size,
        resizable,
        disabled,
        text = $bindable(''),
        class: className,
        onEnter
    }: Props = $props();

    let validateInput =
        typeof validate === 'function'
            ? validate
            : (text: string) => {
                  try {
                      validate.parse(text);
                      return undefined;
                  } catch (e) {
                      return e as z.ZodError;
                  }
              };

    let result = $derived(validateInput(text));

    $effect(() => {
        valid = isValidResult(result);
    });
</script>

<Stack spacing={1}>
    <TextArea
        bind:text
        {rows}
        {placeholder}
        {variant}
        {color}
        {size}
        {resizable}
        {disabled}
        class={className}
        {onEnter}
    />
    {#if preserveErrorSpace || result !== undefined}
        <Validation {result} />
    {/if}
</Stack>
