<script>
    import { page } from '$app/stores';
    import ErrorPage from '$src/components/ErrorPage.svelte';
</script>

<ErrorPage error={{ errorKind: 'other', message: $page.error?.message ?? '' }} />
