<script lang="ts">
    import { browser } from '$app/environment';
    import { langList, t, languageStore } from '$lib/i18n/i18n.svelte';
    import { themeStore } from '$lib/theme/themeStore.svelte';

    let logEnabled = $state(browser ? !!localStorage?.debug : false);
    let currentLanguage = languageStore();
    let theme = themeStore();

    $effect(() => {
        if (logEnabled) {
            console.log('Enable logs');
            localStorage.debug = 'app:*';
        } else {
            console.log('Disable logs');
            delete localStorage.debug;
        }
    });
</script>

<div class="bg-b flex h-screen justify-center">
    <fieldset class="settings">
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
            <select class="select select-bordered select-primary max-w-xs" bind:value={theme.value}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">Default</option>
            </select>
            <span class="label mr-4">Language</span>
            <select
                class="select select-bordered select-primary max-w-xs"
                bind:value={currentLanguage.current}
            >
                {#each langList as value}
                    <option {value} selected={currentLanguage.current === value}>{$t(`lang.${value}`)}</option
                    >
                {/each}
            </select>
        </div>
    </fieldset>
</div>
