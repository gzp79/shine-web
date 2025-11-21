<script lang="ts">
    import { t } from '@lib/i18n/i18n.svelte';
    import Typography from '@atoms/Typography.svelte';
    import ImageButton from '@atoms/inputs/ImageButton.svelte';
    import Grid from '@atoms/layouts/Grid.svelte';
    import GridItem from '@atoms/layouts/GridItem.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import AppContent from '@components/AppContent.svelte';
</script>

<AppContent class="flex items-center justify-center h-full">
    <Stack direction="column" spacing={8} class="justify-center items-center">
        <Typography variant="h1" class="text-center">{$t('mobile.installApp')}</Typography>
        <Grid columns={2} spacing={12}>
            <GridItem class="max-w-sm">
                <Stack direction="column">
                    <Typography variant="text" class="text-justify">{$t('mobile.androidDescription')}</Typography>
                    <ImageButton src="/assets/get_google_play.svg" alt={$t('mobile.googlePlay')} />
                </Stack>
            </GridItem>
            <GridItem class="max-w-sm">
                <Stack direction="column">
                    <Typography variant="text" class="text-justify">{$t('mobile.iosDescription')}</Typography>
                    <ImageButton src="/assets/get_app_store.svg" alt={$t('mobile.appStore')} disabled />
                </Stack>
            </GridItem>
        </Grid>
    </Stack>
</AppContent>
