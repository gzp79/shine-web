<script lang="ts">
    import Button from '@atoms/Button.svelte';
    import Popper from '@atoms/Popper.svelte';
    import * as flags from '@atoms/icons/flags';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import { languageStore, t } from './i18n.svelte';

    const items = [
        { data: 'en', caption: $t('lang.en'), icon: flags.FlagGB },
        { data: 'hu', caption: $t('lang.hu'), icon: flags.FlagHU }
    ];

    const id = $props.id();

    let language = languageStore();
    let current = $state(items.findIndex((x) => x.data === language.current));

    $effect(() => {
        language.current = items[current].data;
    });
</script>

<Button variant="ghost" id={`lang-trigger-${id}`} endIcon={items[current].icon} />
<Popper
    behavior="click"
    alignWidth
    display="flex flex-col rounded-lg border max-h-96 overflow-y-auto"
    trigger={`#lang-trigger-${id}`}
>
    <InputGroup vertical size="sm">
        {#each items as item, index (item.data)}
            <Button wide endIcon={item.icon} onclick={() => (current = index)}>{item.caption}</Button>
        {/each}
    </InputGroup>
</Popper>
