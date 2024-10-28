<script lang="ts">
    import { logDesigner } from '$src/lib/loggers';
    import { range } from '$atoms/types';
    import ComboButton from '$atoms/ComboButton.svelte';
    import Box from '$atoms/Box.svelte';
    import { Story } from '../../_components';
</script>

<Story variant="center">
    <Box border compact class="p-1">
        <ComboButton
            current={3}
            buttons={[
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
                }
            ]}
        />
    </Box>

    <Box border compact class="w-full p-1">
        <ComboButton
            wide
            current={1}
            buttons={[
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
                }
            ]}
        />
    </Box>

    <Box border compact class="p-1">
        <ComboButton current={3} buttons={range(0, 20).map((x) => ({ caption: `Item ${x}` }))} />
    </Box>
</Story>
