<script>
    import { page } from '$app/state';
    import ErrorCard from '@components/ErrorCard.svelte';
</script>

<ErrorCard error={{ errorKind: 'other', message: page.error?.message ?? '' }} />
