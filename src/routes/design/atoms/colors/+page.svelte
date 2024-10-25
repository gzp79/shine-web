<script lang="ts">
    import { colorList } from '$atoms/types';
    import { Story } from '../../_components';
    import ColorSample from './_colorSample.svelte';
</script>

<Story variant="dense">
    {#each colorList as color}
        <div class="flex flex-col items-center rounded-lg border">
            <div class="m-2">
                <ColorSample {color} />
            </div>
        </div>
    {/each}
</Story>
