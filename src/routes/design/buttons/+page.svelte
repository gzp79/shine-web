<script lang="ts">
    import type { Component } from 'svelte';
    import { colorList, sizeList } from '$components/types';
    import Button from '$atoms/Button.svelte';
    import Card from '$atoms/Card.svelte';
    import { Chrome } from '$atoms/icons/clients';
    import { Check, Cross, Info, Warning } from '$atoms/icons/common';
    import { Google, Twitter, Discord } from '$atoms/icons/idps';
    import { setSettings } from '../+layout.svelte';
    import Select from '$components/settings/Select.svelte';
    import CheckBox from '$components/settings/CheckBox.svelte';

    const iconList = ['twitter', 'chrome', 'google', 'discord', 'check', 'cross', 'info', 'warning'];

    let color = $state('primary');
    let icon = $state('twitter');
    let outline = $state(false);
    let disabled = $state(false);

    let href = 'foo';

    const iconComp: Record<string, Component> = {
        twitter: Twitter,
        chrome: Chrome,
        google: Google,
        discord: Discord,
        check: Check,
        cross: Cross,
        info: Info,
        warning: Warning
    };

    function onclick() {
        console.log('clicked');
    }

    setSettings(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={colorList} bind:value={color} />
    <Select label="Icon" options={iconList} bind:value={icon} />
    <CheckBox label="Outline" bind:value={outline} />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

<div class="flex flex-wrap justify-center gap-2">
    <Card caption="Button" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            {/each}
        </div>
    </Card>
    <Card caption="Button" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} label="Button-xs" {color} {outline} {disabled} {onclick} />
            {/each}
        </div>
    </Card>
    <Card caption="Button" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} label="Button-xs" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            {/each}
        </div>
    </Card>
</div>
<div class="flex flex-wrap justify-center gap-2">
    <Card caption="Link" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            {/each}
        </div>
    </Card>
    <Card caption="Link" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} label="Button-xs" {color} {outline} {disabled} {href} />
            {/each}
        </div>
    </Card>
    <Card caption="Link" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} label="Button-xs" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            {/each}
        </div>
    </Card>
</div>
<div class="flex flex-wrap justify-center gap-2">
    <Card caption="Link with click" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} icon={iconComp[icon]} {color} {outline} {disabled} {onclick} {href} />
            {/each}
        </div>
    </Card>
    <Card caption="Link with click" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} label="Button-xs" {color} {outline} {disabled} {onclick} {href} />
            {/each}
        </div>
    </Card>
    <Card caption="Link with click" variant="fieldset">
        <div class="flex flex-col items-start gap-2">
            {#each sizeList as size}
                <Button {size} label="Button-xs" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} {href} />
            {/each}
        </div>
    </Card>
</div>
