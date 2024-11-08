<script lang="ts">
    import type { Component } from 'svelte';
    import { uniqueId, type Size } from './types';
    import Button from './Button.svelte';
    import InputGroup from './InputGroup.svelte';
    import Popper from './Popper.svelte';
    import * as icons from './icons/common';

    interface Item {
        caption: string;
        icon?: Component;
        href?: string;
        onclick?: () => void;
    }
    interface Props {
        items: Item[];
        current?: number;
        disabled?: boolean;
        size?: Size;
        wide?: boolean;
    }
    let { items, current = $bindable(0), disabled, size, wide }: Props = $props();

    let id = uniqueId('comboButton');
    let currentItem = $derived(items[current]);
</script>

<InputGroup {wide} {size} {id}>
    <Button wide endIcon={currentItem.icon} onclick={() => currentItem.onclick?.()} href={currentItem.href} {disabled}>
        {currentItem.caption}
    </Button>
    <Button wide={false} id={`${id}-trigger`} endIcon={icons.DropDown} />
</InputGroup>
<Popper
    behavior="click"
    alignWidth
    display="flex flex-col rounded-lg border max-h-96 overflow-y-auto"
    trigger={`#${id}-trigger`}
    reference={`#${id}`}
>
    <InputGroup vertical {size}>
        {#each items as item, index}
            <Button wide endIcon={item.icon} onclick={() => (current = index)}>{item.caption}</Button>
        {/each}
    </InputGroup>
</Popper>
