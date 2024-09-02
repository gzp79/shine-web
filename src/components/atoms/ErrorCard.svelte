<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import Alert from '$atoms/Alert.svelte';

    interface Props {
        error: Error & { correlationId?: string };
    }
    const { error }: Props = $props();
</script>

<div class="min-size-full max-size-full flex flex-col items-center justify-center">
    <Alert variant="error" text={$t('common.error')}>
        {#if error.message}
            {error.message}
        {/if}
        {#if error.correlationId}
            <span class="label whitespace-nowrap">Correlation id: {'error.correlationId'} </span>
        {/if}
    </Alert>
</div>
