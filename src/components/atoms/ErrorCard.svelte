<script lang="ts">
    import type { Snippet } from 'svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import type { AppError } from '$lib/utils';
    import type { ElementProps } from './types';
    import Box from './Box.svelte';
    import Typography from './Typography.svelte';
    import Alert from './Alert.svelte';

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
    </Alert>
</div>
