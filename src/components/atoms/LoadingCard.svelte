<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import { Dots } from '$atoms/icons/animated';

    interface Props {
        label?: string;
    }

    const { label = $t('common.loading') }: Props = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
    <Dots />
    <span class="label-xl label">{label}</span>
</div>
