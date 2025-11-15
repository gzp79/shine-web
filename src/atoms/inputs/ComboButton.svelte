<script lang="ts">
    import type { Component } from 'svelte';
    import { DropDown } from '../icons/common';
    import Popper from '../layouts/Popper.svelte';
    import { type ActionColor, type Size } from '../types';
    import Button from './Button.svelte';
    import InputGroup from './InputGroup.svelte';

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

    const id = $props.id();
    let currentItem = $derived(items[current]);
</script>

<InputGroup {color} {wide} {size} id={`ref-${id}`}>
    <Button endIcon={currentItem.icon} onclick={() => currentItem.onclick?.()} href={currentItem.href} {disabled}>
        {currentItem.caption}
    </Button>
    <Button endIcon={DropDown} id={`trigger-${id}`} wide={false} {disabled} />
</InputGroup>

<Popper behavior="click" alignWidth trigger={`#trigger-${id}`} reference={`#ref-${id}`}>
    <InputGroup {color} vertical wide {size}>
        {#each items as item, index (item.caption)}
            <Button endIcon={item.icon} onclick={() => (current = index)}>{item.caption}</Button>
        {/each}
    </InputGroup>
</Popper>
