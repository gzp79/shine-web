<script>
    import { page } from '$app/stores';
    import ErrorCard from '$atoms/ErrorCard.svelte';
</script>

<ErrorCard error={{ errorKind: 'other', message: $page.error?.message ?? '' }} />
