<script lang="ts">
    import { z } from 'zod';
    import Stack from '../layouts/Stack.svelte';
    import type { ActionColor } from '../types';
    import TextArea from './TextArea.svelte';
    import Validation, { type ValidationResult, isValidResult } from './Validation.svelte';
    import type { InputSize, InputVariant } from './types';

    interface Props {
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

        onenter?: (text: string) => void;
        onblur?: (text: string) => void;
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
        onenter,
        onblur
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
        {onenter}
        {onblur}
    />
    {#if preserveErrorSpace || result !== undefined}
        <Validation {result} />
    {/if}
</Stack>
