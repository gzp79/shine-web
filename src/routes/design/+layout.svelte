<script lang="ts">
    import QuickConfig from '$lib/app/QuickConfig.svelte';
    import { config } from '@config';
    import Box from '@atoms/Box.svelte';
    import Typography from '@atoms/Typography.svelte';
    import { Hamburger } from '@atoms/icons/common';
    import { Section, settingsStore } from './_components';
    import { STYLE } from './_components/_currentSettings.svelte';

    const { children } = $props();

    let currentSettings = settingsStore();
    let showSidebar = $state(true);
    let showSelection = $state(true);
    let showSettings = $state(true);

    interface MenuItem {
        title: string;
        items: { title: string; href: string }[];
    }
    const menu = [
        {
            title: 'Atoms',
            items: [
                { title: 'Colors', href: 'atoms/colors' },
                { title: 'Typography', href: 'atoms/typography' },
                { title: 'Icons', href: 'atoms/icons' },
                { title: 'Boxes', href: 'atoms/boxes' },
                { title: 'Stacks', href: 'atoms/stacks' },
                { title: 'Grids', href: 'atoms/grids' },
                { title: 'Popper', href: 'atoms/popper' },
                { title: 'Key-Value Table', href: 'atoms/key-value-tables' },
                { title: 'Cards', href: 'atoms/cards' },
                { title: 'Modal', href: 'atoms/modals' }
            ]
        },
        {
            title: 'Inputs',
            items: [
                { title: 'Buttons', href: 'atoms/buttons' },
                { title: 'Toggle', href: 'atoms/toggles' },
                { title: 'Text Area', href: 'atoms/text-area' },
                { title: 'Progress', href: 'atoms/progress' },
                { title: 'Input Groups', href: 'atoms/input-groups' },
                { title: 'ComboButtons', href: 'atoms/combo-buttons' }
            ]
        },
        {
            title: 'Components',
            items: [
                { title: 'Alerts', href: 'components/alerts' },
                { title: 'Loading Cards', href: 'components/loading-cards' },
                { title: 'Error Cards', href: 'components/error-cards' }
            ]
        },
        config.environment === 'mock' && {
            title: 'Utils',
            items: [{ title: 'Mock test', href: 'utils/mock-test' }]
        },
        {
            title: 'Assets',
            items: [{ title: 'Assets', href: 'features/assets/assets' }]
        },
        {
            title: 'Account',
            items: [
                { title: 'Current User Card', href: 'features/account/current-user' },
                { title: 'Linked Identities', href: 'features/account/linked-identities' },
                { title: 'Active Sessions', href: 'features/account/active-sessions' },
                { title: 'Active Tokens', href: 'features/account/active-tokens' }
            ]
        },
        {
            title: 'Game',
            items: [{ title: 'Game Canvas', href: 'features/game' }]
        }
    ].filter(Boolean) as MenuItem[];
</script>

<div class="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden">
    <header class="flex items-center bg-container px-4 py-1">
        <button aria-label="open sidebar" class="flex-none" onclick={() => (showSidebar = !showSidebar)}>
            <Hamburger size="md" class="inline-block" />
        </button>
        <Typography variant="h1" class="flex-1">Design</Typography>
        <QuickConfig />
    </header>

    <div class="relative flex h-full flex-row overflow-hidden">
        <aside
            class="flexh-full h-full w-[30dvw] min-w-max overflow-y-auto bg-sub-container p-4 {showSidebar
                ? 'absolute left-0 top-0 z-20 opacity-90 md:static'
                : 'hidden'}"
        >
            <button
                onclick={() => (showSelection = !showSelection)}
                class="hover:highlight-backdrop flex w-full flex-row items-center justify-between"
            >
                <Typography variant="h3" class="flex-start">Stories</Typography>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="flex-end h-4 w-4 fill-on-surface {showSelection && 'rotate-180'}"
                >
                    <path
                        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    ></path>
                </svg>
            </button>
            {#if showSelection}
                {#each menu as group (group.title)}
                    <Typography variant="h4" element="h2" class="mx-2">{group.title}</Typography>
                    <ul class="mx-4 w-max">
                        {#each group.items as item (item.title)}
                            <li class="hover:highlight-backdrop">
                                <a href={`/design/${item.href}`}>
                                    <Typography variant="h6" element="h3">{item.title}</Typography>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/each}
            {/if}
            <button
                onclick={() => (showSettings = !showSettings)}
                class="hover:highlight-backdrop flex w-full flex-row items-center justify-between"
            >
                <Typography variant="h3" class="flex-start">Settings</Typography>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="flex-end h-4 w-4 fill-on-surface {showSettings && 'rotate-180'}"
                >
                    <path
                        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    ></path>
                </svg>
            </button>
            {#if showSettings}
                <Box
                    level={1}
                    class="form-control mx-2 inline-grid w-full auto-cols-min grid-cols-2 items-center gap-4 border border-on-container bg-container text-{STYLE.foreground}"
                >
                    {@const settings = currentSettings.get()}
                    {#if settings}
                        {@render settings()}
                    {:else}
                        <Section>No settings</Section>
                    {/if}
                </Box>
            {/if}
        </aside>
        <main class="z-10 h-full w-full overflow-y-auto">
            {@render children()}
        </main>
    </div>

    <footer class="flex items-center justify-between bg-container p-1">
        <div class="flex-start"></div>
        <Typography variant="text" class="self-end">© 2024</Typography>
    </footer>
</div>
