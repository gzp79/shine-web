<script lang="ts">
    import { browser } from '$app/environment';
    import { langList, t, languageStore } from '$lib/i18n/i18n.svelte';
    import { themeStore } from '$lib/theme/theme.svelte';

    let logEnabled = $state(browser ? !!localStorage?.debug : false);
    let language = languageStore();
    let theme = themeStore();

    $effect(() => {
        if (logEnabled) {
            localStorage.debug = 'app:*';
        } else {
            delete localStorage.debug;
        }
    });
</script>

<div class="bg-b flex h-screen flex-col">
    <fieldset class="settings self-center">
        <legend class="settings-label">{$t('tools.title')}</legend>
        <div class="settings-key-value">
            <span class="label">Enable client logs</span>
            <input
                type="checkbox"
                class="checkbox-primary checkbox justify-self-center"
                disabled={!browser}
                bind:checked={logEnabled}
            />
            <span class="label mr-4">Theme</span>
            <select class="select select-bordered select-primary max-w-xs" bind:value={theme.current}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">Default</option>
            </select>
            <span class="label mr-4">Language</span>
            <select class="select select-bordered select-primary max-w-xs" bind:value={language.current}>
                {#each langList as value}
                    <option {value} selected={language.current === value}>{$t(`lang.${value}`)}</option>
                {/each}
            </select>
        </div>
    </fieldset>
    <a href="/">Back to the root</a>
</div>
