<script lang="ts" context="module">
    import { getContext, setContext, type Snippet } from 'svelte';

    interface SettingsContext {
        setSettings: (settings: Snippet | null) => void;
    }

    export function setSettings(settings: Snippet) {
        $effect(() => {
            const context = getContext<SettingsContext>('DesignSetting');
            context.setSettings(settings);

            return () => {
                context.setSettings(null);
            };
        });
    }
</script>

<script lang="ts">
    import Hamburger from '$atoms/icons/common/_hamburger.svelte';
    import SettingsForm from '$components/settings/SettingsForm.svelte';
    import Section from '$components/settings/Section.svelte';
    import ThemeSwitch from '$lib/theme/ThemeSwitch.svelte';

    const { children } = $props();

    let currentSettings = $state(noSettings);
    let showSettings = $state(true);

    setContext<SettingsContext>('DesignSetting', {
        setSettings: (settings: Snippet | null) => (currentSettings = settings ?? noSettings)
    });

    const menu = [
        {
            title: 'Atoms',
            items: [
                { title: 'Colors', href: 'atoms/colors' },
                { title: 'Icons', href: 'atoms/icons' },
                { title: 'Buttons', href: 'atoms/buttons' },
                { title: 'Toggle', href: 'atoms/toggles' },
                { title: 'Cards', href: 'atoms/cards' },
                { title: 'Alerts', href: 'atoms/alerts' },
                { title: 'Key-Value Table', href: 'atoms/key-value-tables' }
            ]
        },
        {
            title: 'Templates',
            //items: [{ title: 'Circle menu', href: 'circle_menu' }]
            items: [
                { title: 'Current User Card', href: 'current-user' },
                { title: 'Linked Identities', href: 'linked-identities' },
                { title: 'Active Sessions', href: 'active-sessions' },
                { title: 'Active Tokens', href: 'active-tokens' }
            ]
        }
    ];
</script>

{#snippet noSettings()}
    <Section>No settings</Section>
{/snippet}

<div class="navbar bg-base-300">
    <label for="design-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost flex-none lg:hidden">
        <Hamburger class="inline-block" />
    </label>
    <div class="flex-1 overflow-hidden text-ellipsis text-pretty px-2">Design</div>
    <ThemeSwitch class="flex-none" />
</div>

<div class="drawer flex-1 auto-rows-fr overflow-hidden lg:drawer-open">
    <input id="design-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex h-full flex-col items-center overflow-auto">
        {@render children()}
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
                {#if currentSettings}
                    <div class="collapse-rev-arrow collapse rounded-none">
                        <input type="checkbox" name="settings-menu" bind:checked={showSettings} />
                        <div class="collapse-title text-xl">Settings</div>
                        <div class="collapse-content m-2 max-h-[50lvh] overflow-y-auto rounded-xl bg-base-300 p-2">
                            <SettingsForm>
                                {@render currentSettings()}
                            </SettingsForm>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="footer flex w-full items-center justify-between bg-base-300 p-1">
    <span class="inline-block text-xs">123</span>
    <span class="inline-block text-xs">version</span>
</div>
