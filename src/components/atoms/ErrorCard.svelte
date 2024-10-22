<script lang="ts">
    import type { Snippet } from 'svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import type { AppError } from '$lib/utils';
    import Box from '$atoms/Box.svelte';
    import Typography from '$atoms/Typography.svelte';
    import Alert from './Alert.svelte';

    interface Props {
        caption?: string;
        error: AppError;
        children?: Snippet;
        actions?: Snippet;
    }

    let { caption, error, children, actions }: Props = $props();
</script>

<Alert variant="error" shadow caption={caption ?? $t('common.somethingWentWrong')} {actions}>
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
