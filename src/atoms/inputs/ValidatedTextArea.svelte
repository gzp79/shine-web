<script lang="ts">
    import { z } from 'zod';
    import Stack from '../layouts/Stack.svelte';
    import type { ActionColor, ElementProps } from '../types';
    import TextArea from './TextArea.svelte';
    import Validation, { type ValidationResult, isValidResult } from './Validation.svelte';
    import type { InputSize, InputVariant } from './types';

    interface Props extends ElementProps {
        rows?: 'single' | number | [number, number];
        placeholder?: string;
        text?: string;
        preserveErrorSpace?: boolean;
        validate: z.ZodTypeAny | ((text: string) => ValidationResult);
        valid?: boolean;

        variant?: InputVariant;
        color?: ActionColor;
        size?: InputSize;
        resizable?: boolean;
        disabled?: boolean;
        class?: string;

        onEnter?: (text: string) => void;
        onBlur?: (text: string) => void;
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
        onEnter,
        onBlur
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
    $inspect(result);

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
        {onBlur}
    />
    {#if preserveErrorSpace || result !== undefined}
        <Validation {result} />
    {/if}
</Stack>
