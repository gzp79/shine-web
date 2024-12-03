<script>
    import App from '$lib/app/App.svelte';
    import AppContent from '$lib/app/AppContent.svelte';
    import Button from '$atoms/Button.svelte';
</script>

<App>
    <AppContent class="flex items-center justify-center">
        <Button href="/game" preload="code" color="primary" size="lg">Play</Button>
        <Button
            href="/design"
            preload="disable"
            variant="outline"
            color="surface"
            size="xs"
            class="absolute bottom-4 right-4"
        >
            Design
        </Button>
    </AppContent>
</App>
