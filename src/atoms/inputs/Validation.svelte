<script lang="ts" module>
    import { t } from '$lib/i18n/i18n.svelte';
    import { z } from 'zod';
    import Typography from '../Typography.svelte';

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

        try {
            const msg = (result as z.ZodError).message[0];
            const { token, ...args } = JSON.parse(msg);
            return $t(token, args);
        } catch {
            return $t('validation.invalidInput');
        }
    });
</script>

<Typography variant="footnote" class="{color} ps-4 text-wrap">
    {errorText}
</Typography>
