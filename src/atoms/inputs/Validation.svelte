<script lang="ts" module>
    import { z } from 'zod';
    import { t } from '@lib/i18n/i18n.svelte';
    import Typography from '../Typography.svelte';
    import { parseValidationMessage } from '../types/validation-messages';

    export type ValidationResult =
        | { error: string }
        | { success: string }
        | { warning: string }
        | { info: string }
        | z.ZodError
        | string
        | undefined;

    export const isValidResult = (result: ValidationResult): boolean => {
        if (result === undefined) {
            return true;
        }

        if (typeof result !== 'string') {
            if ('success' in result || 'warning' in result || 'info' in result) {
                return true;
            }
        }

        return false;
    };
</script>

<script lang="ts">
    interface Props {
        result: ValidationResult;
    }

    let { result }: Props = $props();

    let color = $derived.by(() => {
        if (result === undefined || typeof result === 'string') {
            return 'text-on-danger';
        } else if ('error' in result) {
            return 'text-on-danger';
        } else if ('success' in result) {
            return 'text-on-success';
        } else if ('warning' in result) {
            return 'text-on-warning';
        } else if ('info' in result) {
            return 'text-on-info';
        }
        return 'text-on-danger';
    });

    let errorText = $derived.by(() => {
        if (result === undefined) {
            return '\u00A0';
        } else if (typeof result === 'string') {
            return result;
        } else if ('error' in result) {
            return result.error;
        } else if ('success' in result) {
            return result.success;
        } else if ('warning' in result) {
            return result.warning;
        } else if ('info' in result) {
            return result.info;
        }

        // Handle ZodError with validation message helpers
        const zodError = result as z.ZodError;
        const firstMessage = zodError.issues[0]?.message;

        if (!firstMessage) {
            return $t('validation.invalidInput');
        }

        // Try to parse as a ValidationMessage
        const validationMsg = parseValidationMessage(firstMessage);
        if (validationMsg) {
            if (validationMsg.type === 'token') {
                return $t(validationMsg.token, validationMsg.args);
            } else {
                return validationMsg.message;
            }
        }

        // Fallback: use the raw message if it's not JSON
        // This maintains backward compatibility with plain string messages
        return firstMessage || $t('validation.invalidInput');
    });
</script>

<Typography variant="footnote" class="{color} ps-4 text-wrap">
    {errorText}
</Typography>
