<script lang="ts">
    import { beforeNavigate } from '$app/navigation';
    import ThemeSwitch from '$lib/theme/ThemeSwitch.svelte';
    import LangSwitch from '$src/lib/i18n/LangSwitch.svelte';
    import Box from '$atoms/Box.svelte';
    import Typography from '$atoms/Typography.svelte';
    import Hamburger from '$atoms/icons/common/_hamburger.svelte';
    import { settingsStore } from './_components/currentSettings.svelte';
    import Section from './_components/Section.svelte';

    const { children } = $props();

    let currentSettings = settingsStore();
    let showSidebar = $state(false);
    let showSettings = $state(true);

    const menu = [
        {
            title: 'Atoms',
            items: [
                { title: 'Colors', href: 'atoms/colors' },
                { title: 'Typography', href: 'atoms/typography' },
                { title: 'Icons', href: 'atoms/icons' },
                { title: 'Buttons', href: 'atoms/buttons' },
                //{ title: '*Toggle', href: 'atoms/toggles' },
                { title: 'Input Groups', href: 'atoms/input-groups' },
                { title: 'Grids', href: 'atoms/grids' },
                { title: 'Boxes', href: 'atoms/boxes' },
                { title: 'Alerts', href: 'atoms/alerts' },
                { title: 'Popper', href: 'atoms/popper' },
                { title: 'Cards', href: 'atoms/cards' },
                { title: 'Helper Cards', href: 'atoms/helper-cards' },
                { title: 'Key-Value Table', href: 'atoms/key-value-tables' }
            ]
        },
        {
            title: 'Account',
            items: [
                { title: 'Current User Card', href: 'account/current-user' },
                { title: 'Linked Identities', href: 'account/linked-identities' },
                { title: 'Active Sessions', href: 'account/active-sessions' },
                { title: 'Active Tokens', href: 'account/active-tokens' }
            ]
        }
    ];

    beforeNavigate(() => {
        currentSettings.set(null);
    });
</script>

<div class="grid h-full grid-rows-[auto_1fr_auto]">
    <header class="flex items-center bg-surface-mute px-4 py-1">
        <button aria-label="open sidebar" class="flex-none" onclick={() => (showSidebar = !showSidebar)}>
            <Hamburger size="md" class="inline-block" />
        </button>
        <Typography variant="h1" class="flex-1">Design</Typography>
        <LangSwitch />
        <ThemeSwitch class="flex-none" />
    </header>

    <div class="relative flex flex-row overflow-hidden">
        <aside
            class="flexh-full h-full w-[30dvw] min-w-max overflow-y-auto bg-surface p-4 {showSidebar
                ? 'absolute left-0 top-0 z-20 opacity-90 md:static'
                : 'hidden'}"
        >
            {#each menu as group}
                <Typography variant="h3" element="h2">{group.title}</Typography>
                <ul class="mx-4 w-max">
                    {#each group.items as item}
                        <li class="hover:bg-surface-accent">
                            <a href={`/design/${item.href}`}>
                                <Typography variant="h6" element="h3">{item.title}</Typography>
                            </a>
                        </li>
                    {/each}
                </ul>
            {/each}
            <button
                onclick={() => (showSettings = !showSettings)}
                class="flex w-full flex-row items-center justify-between hover:bg-surface-accent"
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
                <Box class="form-control mx-2 inline-grid w-full auto-cols-min grid-cols-2 items-center gap-4">
                    {@const settings = currentSettings.get()}
                    {#if settings}
                        {@render settings()}
                    {:else}
                        <Section>No settings</Section>
                    {/if}
                </Box>
            {/if}
        </aside>
        <main class="z-10 max-h-full w-full overflow-auto">
            {@render children()}
        </main>
    </div>

    <footer class="flex items-center justify-between bg-surface-mute p-1">
        <div class="flex-start"></div>
        <Typography variant="text" class="self-end">© 2024</Typography>
    </footer>
</div>
