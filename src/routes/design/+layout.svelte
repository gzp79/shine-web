<script lang="ts" context="module">
    import { getContext, onDestroy, setContext, type Snippet } from 'svelte';

    interface SettingsContext {
        setSettings: (settings: Snippet | null) => void;
    }

    export function setSettings(settings: Snippet) {
        const context = getContext<SettingsContext>('DesignSetting');
        context.setSettings(settings);

        onDestroy(() => {
            console.log('removing settings');
            context.setSettings(null);
        });
    }
</script>

<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import SettingsForm from '$components/settings/SettingsForm.svelte';

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
                { title: 'Colors', href: 'colors' },
                { title: 'Buttons', href: 'buttons' },
                { title: 'Icons', href: 'icons' },
                { title: 'Cards', href: 'cards' },
                { title: 'Key Value table', href: 'key-value-table' },
                { title: 'Styled SVG', href: 'svg' },
                { title: 'Close button', href: 'close_button' },
                { title: 'Buttons', href: 'buttons' },
                { title: 'Toggle', href: 'toggle' },
                { title: 'Tooltip', href: 'tooltip' },
                { title: 'Circle menu', href: 'circle_menu' }
            ]
        },
        {
            title: 'Templates',
            items: [
                { title: 'Icons', href: 'icons' },
                { title: 'Loadings', href: 'loadings' },
                { title: 'Styled SVG', href: 'svg' },
                { title: 'Close button', href: 'close_button' },

                { title: 'Toggle', href: 'toggle' },
                { title: 'Tooltip', href: 'tooltip' },
                { title: 'Circle menu', href: 'circle_menu' }
            ]
        }
    ];
</script>

{#snippet noSettings()}
    <p>No settings available</p>
{/snippet}

<div class="navbar bg-base-300">
    <label for="design-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost flex-none lg:hidden">
        icon
        <!-- <Icon shape=IconShape::Hamburger class="inline-block"/> -->
    </label>
    <div class="flex-1 overflow-hidden text-ellipsis text-pretty px-2">
        Design <span class="inline-block text-[0.5rem]">version</span>
    </div>
    {$t('common.helloWorld')}
    <!-- <SwitchTheme class="flex-none"/> -->
</div>

<div class="drawer flex-1 auto-rows-fr overflow-hidden lg:drawer-open">
    <input id="design-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex h-full flex-col items-center overflow-auto">
        {@render children()}
    </div>

    <div class="drawer-side absolute h-full">
        <label for="design-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="grid h-full w-[50lvw] grid-rows-2 bg-base-200 lg:w-[35lvw]">
            <div class="overflow-y-auto">
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
            <div class="self-end">
                {#if currentSettings}
                    <div class="collapse-rev-arrow collapse">
                        <input type="checkbox" name="settings-menu" bind:checked={showSettings} />
                        <div class="collapse-title text-xl">Settings</div>
                        <div class="collapse-content">
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
