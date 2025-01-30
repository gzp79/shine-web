<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import Typography, { type Variant } from './Typography.svelte';
    import { Dots } from './icons/animated';
    import type { Size } from './types';

    interface Props {
        label?: string;
        size?: Size;
    }

    const textVariant: Record<Size, Variant> = {
        xs: 'h6',
        sm: 'h5',
        md: 'h4',
        lg: 'h3',
        xl: 'h2'
    };

    const { size = 'md', label = $t('common.loading') }: Props = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
    <Dots {size} />
    <Typography variant={textVariant[size]} element="p">{label}</Typography>
</div>
