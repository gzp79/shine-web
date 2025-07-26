<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Game from '@features/game/Game.svelte';
    import { Select, settingsStore } from '../../_components';
    import Story from '../../_components/_Story.svelte';

    interface Props {
        data: {
            gameUrls: Record<string, string>;
        };
    }
    let { data }: Props = $props();

    const examples = Array.from(Object.keys(data.gameUrls)).filter((name) => name !== 'game');

    let example1 = $state(examples[0]);
    let example2 = $state('none');
    let urls = $derived([example1, example2].filter((x) => x !== 'none').map((x) => data.gameUrls[x]));

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Example1" options={examples} bind:value={example1} />
    <Select label="Example2" options={examples} bind:value={example2} />
{/snippet}

<Story variant="center">
    <Stack direction="row">
        {#each urls as url (url)}
            <Box border>
                <Game {url}></Game>
            </Box>
        {/each}
    </Stack>
</Story>
