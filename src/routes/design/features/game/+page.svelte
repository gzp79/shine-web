<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Game, { GAME_BASE_NAME } from '@features/game/Game.svelte';
    import { Select, settingsStore } from '../../_components';
    import Story from '../../_components/_Story.svelte';

    interface Props {
        data: {
            gameUrl: string;
        };
    }
    let { data }: Props = $props();

    const examples = [
        'camera_follow',
        'camera_free',
        'camera_look_at',
        'camera_orbit',
        'input_actions',
        'input_pointer',
        'none'
    ];

    let example1 = $state('camera_follow');
    let example2 = $state('none');
    let urls = $derived(
        [example1, example2].map((x) => (x === 'none' ? [] : [data.gameUrl.replace(GAME_BASE_NAME, `${x}`)])).flat()
    );

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
