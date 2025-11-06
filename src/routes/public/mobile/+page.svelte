<script lang="ts">
    import AppContent from '$lib/app/AppContent.svelte';
    import { t } from '$lib/i18n/i18n.svelte';
    import Button from '@atoms/Button.svelte';
    import Typography from '@atoms/Typography.svelte';
</script>

<AppContent class="flex flex-col items-center justify-center">
    <Typography variant="h1" class="text-center">{$t('mobile.installApp')}</Typography>
    <div class="flex flex-row gap-4 mt-8">
        <Button disabled>{$t('mobile.googlePlay')}</Button>
        <Button disabled>{$t('mobile.appStore')}</Button>
    </div>
</AppContent>
