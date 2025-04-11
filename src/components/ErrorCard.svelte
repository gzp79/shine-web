<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { AppError } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import Box from '@atoms/Box.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Typography from '@atoms/Typography.svelte';
    import type { ElementProps } from '@atoms/types';
    import Alert from '@components/Alert.svelte';

    interface Props extends Omit<ElementProps, 'role'> {
        caption?: string;
        error: AppError;
        children?: Snippet;
        actions?: Snippet;
    }

    let { caption, error, children, actions, ...rest }: Props = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
    <Alert variant="error" caption={caption ?? $t('common.somethingWentWrong')} {actions} {...rest}>
        <Stack spacing={2}>
            <Typography variant="text">
                {error.message}
            </Typography>
            {#if error.detail}
                <Box border class="min-h-max">
                    <Typography variant="code">
                        <pre class="whitespace-pre-wrap break-words">{JSON.stringify(error.detail, null, 2)}</pre>
                    </Typography>
                </Box>
            {/if}
            {#if children}
                {@render children()}
            {/if}
        </Stack>
    </Alert>
</div>
