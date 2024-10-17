<script lang="ts">
    import type { Snippet } from 'svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import type { AppError } from '$lib/utils';
    import Box from '$atoms/Box.svelte';
    import Typography from '$atoms/Typography.svelte';
    import { Fatal } from '$atoms/icons/common';

    interface Props {
        caption?: string;
        error: AppError;
        children?: Snippet;
    }

    let { caption, error, children }: Props = $props();
</script>

<Box border compact class="relative flex w-max border-danger">
    <div class="flex flex-col items-center rounded-lg">
        <Box compact class="flex w-full items-center justify-center rounded-none py-2">
            <Fatal size="md" class="text-danger" />
            <Typography variant="h3" class="text-danger">
                {caption ?? $t('common.somethingWentWrong')}
            </Typography>
            <Fatal size="md" class="text-danger" />
        </Box>

        <div class="flex max-h-64 flex-col items-center overflow-y-auto p-2">
            <Typography variant="text">
                {error.message}
            </Typography>
            {#if error.detail}
                <Box border class="min-h-max">
                    <Typography variant="code">
                        <pre>{JSON.stringify(error.detail, null, 2)}</pre>
                    </Typography>
                </Box>
            {/if}
            {#if children}
                <div class="m-3">
                    {@render children()}
                </div>
            {/if}
        </div>
    </div>
</Box>
