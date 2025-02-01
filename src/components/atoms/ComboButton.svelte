<script lang="ts">
    import type { Component } from 'svelte';
    import Button from './Button.svelte';
    import InputGroup from './InputGroup.svelte';
    import Popper from './Popper.svelte';
    import * as icons from './icons/common';
    import { type ActionColor, type Size } from './types';

    interface Item {
        caption: string;
        icon?: Component;
        href?: string;
        onclick?: () => void;
    }
    interface Props {
        items: Item[];
        color?: ActionColor;
        current?: number;
        disabled?: boolean;
        size?: Size;
        wide?: boolean;
    }
    let { items, current = $bindable(0), color = 'primary', disabled, size, wide }: Props = $props();

    let reference = $state<HTMLElement>();
    let trigger = $state<HTMLElement>();
    let currentItem = $derived(items[current]);
</script>

<InputGroup {color} {wide} {size} bind:div={reference}>
    <Button wide endIcon={currentItem.icon} onclick={() => currentItem.onclick?.()} href={currentItem.href} {disabled}>
        {currentItem.caption}
    </Button>
    <Button wide={false} bind:button={trigger} endIcon={icons.DropDown} />
</InputGroup>
<Popper
    behavior="click"
    alignWidth
    display="flex flex-col rounded-lg border max-h-96 overflow-y-auto"
    {trigger}
    {reference}
>
    <InputGroup {color} vertical {size}>
        {#each items as item, index}
            <Button wide endIcon={item.icon} onclick={() => (current = index)}>{item.caption}</Button>
        {/each}
    </InputGroup>
</Popper>
