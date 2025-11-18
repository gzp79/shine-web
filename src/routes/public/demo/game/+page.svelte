<script lang="ts">
    import Button from '@atoms/inputs/Button.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import Game from '@features/game/Game.svelte';
    import { getGameUrls } from '@features/game/game.remote';
    import { Select, settingsStore } from '../../_components';
    import Story from '../../_components/_Story.svelte';

    const gameUrls = getGameUrls();

    let example1 = $state('none');
    let example2 = $state('none');

    const options: [string, string][] = $derived([
        ...Object.entries(gameUrls.current ?? {}).filter(([key]) => key !== 'game'),
        ['none', 'none']
    ]);

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Example1" {options} bind:value={example1} />
    <Select label="Example2" {options} bind:value={example2} />
{/snippet}

<Story variant="full">
    <Stack direction="column">
        {#each [example1, example2] as url, index (index)}
            <Box border>
                {#if url !== 'none'}
                    {#key `${url}-${index}`}
                        <Game {url}></Game>
                    {/key}
                    <Button href={url + '.html'}>Open fullscreen</Button>
                {/if}
            </Box>
        {/each}
    </Stack>
</Story>
