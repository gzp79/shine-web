<script lang="ts">
    import Button from '@atoms/inputs/Button.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import Game from '@features/game/Game.svelte';

    //import { getGameUrls } from '@features/game/game.remote';

    //const gameUrls = getGameUrls();

    let example1 = $state('none');
    let example2 = $state('none');

    /*const options: [string, string][] = $derived([
        ...Object.entries(gameUrls.current ?? {}).filter(([key]) => key !== 'game'),
        ['none', 'none']
    ]);*/
</script>

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
