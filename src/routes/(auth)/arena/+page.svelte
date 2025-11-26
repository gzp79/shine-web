<script lang="ts">
    import AppContent from '@components/AppContent.svelte';
    import Game from '@features/game/Game.svelte';
    import { getGameUrls } from '@features/game/game.remote';

    const gameUrls = getGameUrls();
</script>

<AppContent class="w-full h-full items-center justify-center">
    {#if gameUrls.current}
        <Game url={gameUrls.current.game} />
    {/if}
</AppContent>
