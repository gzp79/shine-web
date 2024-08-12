<script lang="ts">
    import Select from '$components/settings/Select.svelte';
    import Button from '$components/Button.svelte';
    import Card from '$components/Card.svelte';
    import { colorList } from '$components/types';
    import CheckBox from '$components/settings/CheckBox.svelte';
    import { Google, Twitter, Discord } from '$components/icons/idps';
    import { Chrome } from '$components/icons/clients';
    import type { Component } from 'svelte';
    import { Check, Cross, Info, Warning } from '$components/icons/common';
    import { setSettings } from '../+layout.svelte';

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
    <!-- <IconShapeInput label="Icon" value=icon/> -->
    <CheckBox label="Outline" bind:value={outline} />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

<div class="w-min-content self-center">
    <Card caption="Button" variant="fieldset">
        <div class="grid-cols-3-auto grid w-fit gap-4">
            <Button size="xs" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            <Button size="xs" label="Button-xs" {color} {outline} {disabled} {onclick} />
            <Button size="xs" label="Button-xs" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            <Button size="sm" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            <Button size="sm" label="Button-sm" {color} {outline} {disabled} {onclick} />
            <Button size="sm" label="Button-sm" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            <Button size="md" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            <Button size="md" label="Button-md" {color} {outline} {disabled} {onclick} />
            <Button size="md" label="Button-md" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            <Button size="lg" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
            <Button size="lg" label="Button-lg" {color} {outline} {disabled} {onclick} />
            <Button size="lg" label="Button-lg" icon={iconComp[icon]} {color} {outline} {disabled} {onclick} />
        </div>
    </Card>
</div>
<div class="w-min-content self-center">
    <Card caption="Link" variant="fieldset">
        <div class="grid-cols-3-auto grid w-fit gap-4">
            <Button size="xs" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="xs" label="Button-xs" {color} {outline} {disabled} {href} />
            <Button size="xs" label="Button-xs" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="sm" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="sm" label="Button-sm" {color} {outline} {disabled} {href} />
            <Button size="sm" label="Button-sm" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="md" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="md" label="Button-md" {color} {outline} {disabled} {href} />
            <Button size="md" label="Button-md" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="lg" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="lg" label="Button-lg" {color} {outline} {disabled} {href} />
            <Button size="lg" label="Button-lg" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
        </div>
    </Card>
</div>
<div class="w-min-content self-center">
    <Card caption="Link with click" variant="fieldset">
        <div class="grid-cols-3-auto grid w-fit gap-4">
            <Button size="xs" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="xs" label="Button-xs" {color} {outline} {disabled} {href} />
            <Button size="xs" label="Button-xs" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="sm" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="sm" label="Button-sm" {color} {outline} {disabled} {href} />
            <Button size="sm" label="Button-sm" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="md" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="md" label="Button-md" {color} {outline} {disabled} {href} />
            <Button size="md" label="Button-md" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="lg" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
            <Button size="lg" label="Button-lg" {color} {outline} {disabled} {href} />
            <Button size="lg" label="Button-lg" icon={iconComp[icon]} {color} {outline} {disabled} {href} />
        </div>
    </Card>
</div>
