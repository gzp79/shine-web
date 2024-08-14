<script lang="ts">
    import { browser } from '$app/environment';
    import { themeStore } from '$lib/theme/theme.svelte';
    import { t, languageStore, langList } from '$lib/i18n/i18n.svelte';

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
            <span class="label">{$t('tools.enableClientLogs')}</span>
            <input
                type="checkbox"
                class="checkbox-primary checkbox justify-self-center"
                disabled={!browser}
                bind:checked={logEnabled}
            />
            <span class="label mr-4">{$t('tools.theme')}</span>
            <select class="select select-bordered select-primary max-w-xs" bind:value={theme.current}>
                <option value="light">{$t('tools.themes.light')}</option>
                <option value="dark">{$t('tools.themes.dark')}</option>
                <option value="system">{$t('tools.themes.system')}</option>
            </select>
            <span class="label mr-4">{$t('tools.language')}</span>
            <select class="select select-bordered select-primary max-w-xs" bind:value={language.current}>
                {#each langList as value}
                    <option {value} selected={language.current === value}>{$t(`lang.${value}`)}</option>
                {/each}
            </select>
        </div>
    </fieldset>
    <a href="/">{$t('tools.backToRoot')}</a>
</div>
