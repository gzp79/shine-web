<script lang="ts">
    import type { Snippet } from 'svelte';
    import { t } from '@lib/i18n/i18n.svelte';
    import type { AppError } from '@lib/utils';
    import Typography from '@atoms/Typography.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import Alert, { type Width } from '@components/Alert.svelte';

    interface Props {
        /** Custom caption/title for the error (defaults to localized "Something went wrong") */
        caption?: string;
        /** The error object containing message and optional details */
        error: AppError;
        /** Width of the error card */
        width?: Width;
        /** Enable drop shadow for the error card */
        shadow?: boolean;
        /** Whether to show detailed error information (defaults to true in development) */
        showDetails?: boolean;
        /** Whether to show the error kind/type badge */
        showErrorKind?: boolean;
        /** Optional content to render below the error details */
        children?: Snippet;
        /** Optional action buttons (e.g., retry, dismiss) */
        actions?: Snippet;
    }

    let {
        caption,
        error,
        width = 'fit',
        shadow = true,
        showDetails = true,
        showErrorKind = false,
        children,
        actions
    }: Props = $props();

    const errorTypeLabels: Record<string, string> = {
        fetch: 'Network Error',
        schema: 'Data Validation Error',
        internal: 'Internal Error',
        other: 'Error'
    };

    let errorLabel = $derived(errorTypeLabels[error.errorKind] || 'Error');
</script>

<div class="flex h-full w-full flex-col items-center justify-center p-4" role="alert" aria-live="assertive">
    <Alert variant="error" caption={caption ?? $t('common.somethingWentWrong')} {width} {shadow} {actions}>
        <Stack spacing={3}>
            {#if showErrorKind}
                <div class="inline-flex items-center gap-2">
                    <span
                        class="rounded-full bg-danger-darker px-3 py-1 text-xs font-semibold text-danger-contrast"
                        role="status"
                    >
                        {errorLabel}
                    </span>
                </div>
            {/if}

            <Typography variant="text" class="text-text-primary">
                {error.message}
            </Typography>

            {#if showDetails && error.detail}
                <details class="group cursor-pointer">
                    <summary
                        class="list-none select-none text-sm font-medium text-text-secondary hover:text-text-primary"
                    >
                        <span class="inline-flex items-center gap-1">
                            <svg
                                class="h-4 w-4 transition-transform group-open:rotate-90"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            {$t('error.details') || 'Details'}
                        </span>
                    </summary>

                    <Box border class="mt-2 min-h-max">
                        <Typography variant="code">
                            <pre
                                class="max-h-64 overflow-auto whitespace-pre-wrap wrap-break-word p-2 text-xs">{JSON.stringify(
                                    error.detail,
                                    null,
                                    2
                                )}</pre>
                        </Typography>
                    </Box>
                </details>
            {/if}

            {#if children}
                {@render children()}
            {/if}
        </Stack>
    </Alert>
</div>
