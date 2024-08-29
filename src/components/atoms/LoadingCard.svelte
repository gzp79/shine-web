<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import { Spinner } from '$atoms/icons/animated';
</script>

<div class="min-size-full max-size-full flex flex-col items-center justify-center">
    <Spinner />
    <span class="label-xl label">{$t('common.loading')}</span>
</div>
