<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Game from '@features/game/Game.svelte';
    import Story from '../../_components/_Story.svelte';

    const url = 'https://game.scytta.com/bb7f01d30bd74b1033cf93b31d197a4c5e8ec4145/shine-client_bg.wasm';
</script>

<Story variant="center">
    <Box border class="w-mdv h-mdv">
        <Game {url}></Game>
    </Box>
    <Box border class="w-mdv h-mdv">
        <Game {url}></Game>
    </Box>
</Story>
