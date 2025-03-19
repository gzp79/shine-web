<script>
    import ErrorCard from '$components/ErrorCard.svelte';
</script>

<div class="flex h-full items-center justify-center">
    <ErrorCard error={{ errorKind: 'other', message: 'Error' }} />
</div>
