<script>
</script>

<div class="navbar bg-base-300">
    <label for="design-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost flex-none lg:hidden">
        icon
        <!-- <Icon shape=IconShape::Hamburger class="inline-block"/> -->
    </label>
    <div class="flex-1 overflow-hidden text-ellipsis text-pretty px-2">
        Design <span class="inline-block text-[0.5rem]">version</span>
    </div>
    <!-- <SwitchTheme class="flex-none"/> -->
</div>

<div class="drawer flex-1 auto-rows-fr overflow-hidden lg:drawer-open">
    <input id="design-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col items-center overflow-auto">content</div>

    <div class="drawer-side absolute" style:height="100%">
        <label for="design-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="h-full max-w-80 overflow-y-auto bg-base-200">
            <div class="collapse collapse-plus">
                <input type="checkbox" name="design-menu" />
                <div class="collapse-title text-xl">Atoms</div>
                <div class="collapse-content">
                    <ul class="menu min-h-full w-full p-4">
                        <li><a href="colors">Colors</a></li>
                        <li><a href="icons">Icons</a></li>
                        <li><a href="loadings">Loadings</a></li>
                        <li><a href="svg">Styled SVG</a></li>
                        <li><a href="close_button">Close button</a></li>
                        <li><a href="buttons">Buttons</a></li>
                        <li><a href="toggle">Toggle</a></li>
                        <li><a href="tooltip">Tooltip</a></li>
                        <li><a href="circle_menu">Circle menu</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="bg-base h-8 w-full"></div>
