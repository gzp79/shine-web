<script lang="ts">
    import { actionColorList, containerColorList } from '$atoms/types';
    import { Story } from '../../_components';
    import ColorSample from './_colorSample.svelte';
</script>

<Story variant="dense">
    {#each containerColorList as color}
        <div class="flex flex-col items-center rounded-lg border">
            <div class="m-2">
                <ColorSample {color} />
            </div>
        </div>
    {/each}
</Story>
<Story variant="dense">
    {#each actionColorList as color}
        <div class="flex flex-col items-center rounded-lg border">
            <div class="m-2">
                <ColorSample {color} />
            </div>
        </div>
    {/each}
</Story>
