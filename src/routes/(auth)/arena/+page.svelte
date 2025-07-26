<script lang="ts">
    import AppContent from '$lib/app/AppContent.svelte';
    import Game from '@features/game/Game.svelte';

    let { data } = $props();
</script>

<AppContent class="w-full h-full items-center justify-center">
    <Game url={data.gameUrls.game} />
</AppContent>
