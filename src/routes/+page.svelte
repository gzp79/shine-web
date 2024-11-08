<script>
    import Button from '$atoms/Button.svelte';
    import App from '$src/lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
</script>

<App>
    <AppContent class="flex items-center justify-center">
        <Button href="/game" color="primary" size="lg">Play</Button>
        <Button href="/design" variant="outline" color="surface" size="xs" class="absolute bottom-4 right-4"
            >Design</Button
        >
    </AppContent>
</App>
