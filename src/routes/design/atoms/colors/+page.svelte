<script lang="ts">
    import { colorList } from '$components/types';
    import Story from '../../_components/Story.svelte';
    import ColorSample from './_colorSample.svelte';
</script>

<Story dense>
    {#each colorList as color}
        <div class="flex flex-col items-center rounded-lg border">
            <div class="m-2">
                <ColorSample {color} />
            </div>
        </div>
    {/each}
</Story>
