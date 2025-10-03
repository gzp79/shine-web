<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Game from '@features/game/Game.svelte';
    import { getGameUrls } from '@features/game/game.remote';
    import { Select, settingsStore } from '../../_components';
    import Story from '../../_components/_Story.svelte';

    const gameUrls = getGameUrls();

    let example1 = $state('none');
    let example2 = $state('none');

    const options: [string, string][] = $derived([...Object.entries(gameUrls.current ?? {}), ['none', 'none']]);
    const selection = $derived([example1, example2].filter((v) => v !== 'none'));

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Example1" {options} bind:value={example1} />
    <Select label="Example2" {options} bind:value={example2} />
{/snippet}

<Story variant="center">
    <Stack direction="row">
        {#each selection as url (url)}
            <Box border>
                <Game {url}></Game>
            </Box>
        {/each}
    </Stack>
</Story>
