<script lang="ts">
    import { config } from '@config';
    import Box from '@atoms/Box.svelte';
    import Game, { GAME_BASE_NAME } from '@features/game/Game.svelte';
    import Story from '../../_components/_Story.svelte';

    interface Props {
        data: {
            gameUrl: string;
        };
    }
    let { data }: Props = $props();

    let customVersion = $state('');
    let url = $derived(customVersion ? `${config.assetUrl}/${customVersion}/${GAME_BASE_NAME}_bg.wasm` : data.gameUrl);
</script>

<Story variant="center">
    <Box border class="w-mdv h-mdv">
        <Game {url}></Game>
    </Box>
    <Box border class="w-mdv h-mdv">
        <Game {url}></Game>
    </Box>
</Story>
