<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import ComboButton from '$atoms/ComboButton.svelte';
    import { range } from '$atoms/types';
    import { logDesigner } from '$lib/loggers';
    import { Story } from '../../_components';

    let current = $state(3);
    const items = [
        {
            caption: 'One - HRef',
            href: '#one'
        },
        {
            caption: 'Two - Click',
            onclick: () => logDesigner('clicked: Two')
        },
        {
            caption: 'Three - Click',
            onclick: () => logDesigner('clicked: Three')
        },
        {
            caption: 'Four - HRef - long line',
            href: '#four'
        },
        {
            caption: 'Five - no action'
        }
    ];
</script>

<Story variant="center">
    <Box border compact class="p-1">
        <ComboButton bind:current {items} />
    </Box>

    <Box border compact class="w-full p-1">
        <ComboButton wide bind:current {items} />
    </Box>

    <Box border compact class="p-1">
        <ComboButton current={3} items={range(0, 20).map((x) => ({ caption: `Item ${x}` }))} />
    </Box>
</Story>
