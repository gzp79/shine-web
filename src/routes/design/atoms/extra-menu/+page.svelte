<script lang="ts">
    import ExtraMenu from '$atoms/ExtraMenu.svelte';
    import ExtraMenuItem from '$atoms/ExtraMenuItem.svelte';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import { range } from '$atoms/types';
    import { Story } from '../../_components';
</script>

<Story variant="dense">
    <Box border class="h-96 w-64">
        <ExtraMenu>
            <ExtraMenuItem><Button>Button 1</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 2</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 3</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 4</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 5</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 6</Button></ExtraMenuItem>
        </ExtraMenu>
    </Box>
    <Box border class="h-[800px] w-64">
        <ExtraMenu
            path="M 0.033 0 L 0.0446 0.008 C 0.0563 0.016 0.0795 0.032 0.0679 0.048 C 0.0563 0.064 0.0097 0.08 0.0059 0.096 C 0.0022 0.112 0.0405 0.128 0.0407 0.144 C 0.0405 0.16 0.0023 0.176 0.0175 0.192 C 0.033 0.208 0.1028 0.224 0.126 0.24 C 0.1493 0.256 0.126 0.272 0.1028 0.288 C 0.0795 0.304 0.0563 0.32 0.0524 0.336 C 0.0488 0.352 0.0638 0.368 0.064 0.384 C 0.0638 0.4 0.0488 0.416 0.0602 0.432 C 0.072 0.448 0.1103 0.464 0.1067 0.48 C 0.1028 0.496 0.0563 0.512 0.0485 0.528 C 0.0405 0.544 0.072 0.56 0.0834 0.576 C 0.0953 0.592 0.087 0.608 0.0718 0.624 C 0.0563 0.64 0.033 0.656 0.0214 0.672 C 0.0098 0.688 0.0098 0.704 0.0253 0.72 C 0.0405 0.736 0.072 0.752 0.0911 0.768 C 0.1103 0.784 0.1185 0.8 0.1105 0.816 C 0.1028 0.832 0.0795 0.848 0.0795 0.864 C 0.0795 0.88 0.1028 0.896 0.1028 0.912 C 0.1028 0.928 0.0795 0.944 0.0872 0.96 C 0.0953 0.976 0.102 0.978 0.083 1"
            pathScale={[2, 1]}
        >
            <ExtraMenuItem><Button>Button 1</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 2</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 3</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 4</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 5</Button></ExtraMenuItem>
            <ExtraMenuItem><Button>Button 6</Button></ExtraMenuItem>
        </ExtraMenu>
    </Box>

    <svg
        id="wave"
        style="transform:rotate(0deg); transition: 0.3s"
        viewBox="0 0 1440 310"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        ><defs
            ><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"
                ><stop stop-color="rgba(243, 106, 62, 1)" offset="0%"></stop><stop
                    stop-color="rgba(255, 179, 11, 1)"
                    offset="100%"
                ></stop></linearGradient
            ></defs
        ><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d=""></path></svg
    >

    {#each range(0, 20) as _}
        <Box border class="h-96 w-64">
            <ExtraMenu>
                <ExtraMenuItem><Button>Button 1</Button></ExtraMenuItem>
                <ExtraMenuItem><Button>Button 2</Button></ExtraMenuItem>
                <ExtraMenuItem><Button>Button 3</Button></ExtraMenuItem>
            </ExtraMenu>
        </Box>
    {/each}
</Story>
