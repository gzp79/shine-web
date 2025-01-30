<script lang="ts">
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import SimpleMenu from '$atoms/SimpleMenu.svelte';
    import SimpleMenuItem from '$atoms/SimpleMenuItem.svelte';
    import { Story } from '../../_components';
</script>

<Story variant="dense">
    <Box border class="h-64">
        <SimpleMenu>
            <SimpleMenuItem><Button>Button 1</Button></SimpleMenuItem>
            <SimpleMenuItem><Button>Button 2</Button></SimpleMenuItem>
            <SimpleMenuItem><Button>Button 3</Button></SimpleMenuItem>
            <SimpleMenuItem><Button>Button 4</Button></SimpleMenuItem>
            <SimpleMenuItem><Button>Button 5</Button></SimpleMenuItem>
            <SimpleMenuItem><Button>Button 6</Button></SimpleMenuItem>
        </SimpleMenu>
    </Box>
</Story>
