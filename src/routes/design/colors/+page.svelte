<script lang="ts">
    import { colorList } from '$components/types';
    import ColorSample from './ColorSample.svelte';
</script>

<div class="flex flex-wrap justify-center gap-2">
    {#each colorList as color}
        <div class="flex flex-col items-center rounded-lg border">
            <div class="m-2">
                <ColorSample {color} />
            </div>
        </div>
    {/each}
</div>
