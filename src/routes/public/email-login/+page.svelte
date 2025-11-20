<script lang="ts">
    import { t } from '@lib/i18n/i18n.svelte';
    import Typography from '@atoms/Typography.svelte';
    import { Email } from '@atoms/icons/social';
    import AppContent from '@components/AppContent.svelte';
</script>

<AppContent class="flex flex-col items-center justify-center p-4">
    <div class="max-w-mdv">
        <Email class="w-32 h-32 mx-auto mb-4" />
        <Typography variant="h1" class="py-8 text-center break-keep">{$t('login.emailModalTitle')}</Typography>
        <Typography variant="text" class="text-justify">{$t('login.emailWaitUser')}</Typography>
    </div>
</AppContent>
