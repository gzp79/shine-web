<script>
    import { createCounter } from '$lib/counter.svelte';
    import { themeStore } from '$lib/theme/themeStore.svelte';
    import { t } from '$lib/i18n/i18n.svelte';

    themeStore();
    const counter = createCounter();
</script>

<div class="container mx-auto flex h-full items-center justify-center">
    <div class="space-y-5">
        <h1 class="h1">Welcome to Scytta !</h1>
    </div>
    <div class="dummy">dummy</div>
    <div class="bg-green-500">gr500</div>
    <div class="bg-primary-500">pr500</div>
    <div class="bg-primary">pr</div>

    <button on:click={counter.increment}>
        clicks: {counter.count}
    </button>
    <p>{$t('common.helloWorld')}</p>
</div>
