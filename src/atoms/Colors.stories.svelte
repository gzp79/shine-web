<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import ColorSample from '@storybook-ext/ColorSample.svelte';
    import { actionColorList, containerColorList } from '@atoms/types';

    const { Story } = defineMeta({
        title: 'Atoms/Theme/Colors'
    });
</script>

<Story name="Container Colors">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {#each containerColorList as color (color)}
            <div class="flex flex-col items-center rounded-lg border">
                <div class="m-2">
                    <ColorSample {color} />
                </div>
            </div>
        {/each}
    </div>
</Story>

<Story name="Action Colors">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {#each actionColorList as color (color)}
            <div class="flex flex-col items-center rounded-lg border">
                <div class="m-2">
                    <ColorSample {color} shades />
                </div>
            </div>
        {/each}
    </div>
</Story>
