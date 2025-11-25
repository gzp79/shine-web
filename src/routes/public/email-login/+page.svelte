<script lang="ts">
    import { t } from '@lib/i18n/i18n.svelte';
    import Typography from '@atoms/Typography.svelte';
    import { Email } from '@atoms/icons/social';
    import Card from '@atoms/layouts/Card.svelte';
    import AppContent from '@components/AppContent.svelte';
</script>

<AppContent layout="centered">
    <Card width="fit" caption={$t('login.emailModalTitle')}>
        {#snippet icon()}
            <Email />
        {/snippet}
        <Typography variant="text" class="text-justify max-w-md">{$t('login.emailWaitUser')}</Typography>
    </Card>
</AppContent>
