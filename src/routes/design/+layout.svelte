<script lang="ts">
    import { beforeNavigate } from '$app/navigation';
    import Hamburger from '$atoms/icons/common/_hamburger.svelte';
    import ThemeSwitch from '$lib/theme/ThemeSwitch.svelte';
    import Typography from '$src/components/atoms/Typography.svelte';
    import LangSwitch from '$src/lib/i18n/LangSwitch.svelte';
    import { settingsStore } from './_components/currentSettings.svelte';
    //import Section from './_components/Section.svelte';
    //import SettingsForm from './_components/SettingsForm.svelte';

    const { children } = $props();

    let currentSettings = settingsStore();
    //let showSettings = $state(true);
    /*
    const menu = [
        {
            title: 'Atoms',
            items: [
                { title: 'Colors', href: 'atoms/colors' },
                { title: 'Typography', href: 'atoms/typography' },
                { title: 'Icons', href: 'atoms/icons' },
                { title: 'Grids', href: 'atoms/grids' },
                { title: 'Boxes', href: 'atoms/boxes' },
                { title: 'IconCards', href: 'atoms/icon-cards' },
                { title: 'Buttons', href: 'atoms/buttons' }
                //{ title: '*Toggle', href: 'atoms/toggles' },
                { title: 'Popper', href: 'atoms/popper' },
                //{ title: '*Alerts', href: 'atoms/alerts' },
                //{ title: '*Key-Value Table', href: 'atoms/key-value-tables' }
            ]
        },
        {
            title: 'Templates',
            //items: [{ title: 'Circle menu', href: 'circle_menu' }]
            items: [
                // { title: 'Current User Card', href: 'account/current-user' },
                //{ title: 'Linked Identities', href: 'account/linked-identities' },
                //{ title: 'Active Sessions', href: 'account/active-sessions' },
                //{ title: 'Active Tokens', href: 'account/active-tokens' }
            ]
        }
    ];*/

    beforeNavigate(() => {
        currentSettings.set(null);
    });
</script>

<header class="flex items-center bg-surface p-4">
    <label aria-label="open sidebar" class="flex-none">
        <Hamburger size="md" class="inline-block" />
    </label>
    <Typography variant="h2" class="flex-1 overflow-hidden text-ellipsis text-pretty p-2">Design</Typography>
    <LangSwitch />
    <ThemeSwitch class="flex-none" />
</header>

<main class="h-full w-full overflow-auto">
    {@render children()}
</main>

<!-- <div class="flex flex-row">
    <div class="flex h-full w-fit min-w-72 grid-rows-2 flex-col bg-base-200 lg:w-[20lvw] bg-[red]">
        <div class="h-full flex-grow overflow-y-auto">
            {#each menu as group}
                <div>
                    <div class="collapse-title text-xl">{group.title}</div>
                    <div class="collapse-content">
                        <ul class="menu min-h-full w-full p-4">
                            {#each group.items as item}
                                <li><a href={`/design/${item.href}`}>{item.title}</a></li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}
        </div>
        <div class="">
            <div class="collapse-rev-arrow collapse rounded-none">
                <input type="checkbox" name="settings-menu" bind:checked={showSettings} />
                <div class="collapse-title text-xl">Settings</div>
                <div class="collapse-content m-2 max-h-[50lvh] overflow-y-auto rounded-xl bg-base-300 p-2">
                    <SettingsForm>
                        {@const settings = currentSettings.get()}
                        {#if settings}
                            {@render settings()}
                        {:else}
                            <Section>No settings</Section>
                        {/if}
                    </SettingsForm>
                </div>
            </div>
        </div>
    </div>
    <div class="h-full overflow-auto flex-grow  bg-[green]">
    {@render children()}
    </div>
</div> -->

<!-- <div class="drawer flex-1 auto-rows-fr overflow-hidden lg:drawer-open">
    <input id="design-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex h-full flex-col items-center overflow-auto">
        
    </div>

    <div class="drawer-side absolute h-full">
        <label for="design-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="flex h-full w-fit min-w-72 grid-rows-2 flex-col bg-base-200 lg:w-[20lvw]">
            <div class="h-full flex-grow overflow-y-auto">
                {#each menu as group}
                    <div class="collapse collapse-plus">
                        <input type="checkbox" name="design-menu" />
                        <div class="collapse-title text-xl">{group.title}</div>
                        <div class="collapse-content">
                            <ul class="menu min-h-full w-full p-4">
                                {#each group.items as item}
                                    <li><a href={`/design/${item.href}`}>{item.title}</a></li>
                                {/each}
                            </ul>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="">
                <div class="collapse-rev-arrow collapse rounded-none">
                    <input type="checkbox" name="settings-menu" bind:checked={showSettings} />
                    <div class="collapse-title text-xl">Settings</div>
                    <div class="collapse-content m-2 max-h-[50lvh] overflow-y-auto rounded-xl bg-base-300 p-2">
                        <SettingsForm>
                            {@const settings = currentSettings.get()}
                            {#if settings}
                                {@render settings()}
                            {:else}
                                <Section>No settings</Section>
                            {/if}
                        </SettingsForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="footer flex w-full items-center justify-between bg-base-300 p-1">
    <span class="inline-block text-xs">123</span>
    <span class="inline-block text-xs">version</span>
</div> -->
