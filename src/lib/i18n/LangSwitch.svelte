<script lang="ts">
    import * as flags from '@atoms/icons/flags';
    import Button from '@atoms/inputs/Button.svelte';
    import ImageButton from '@atoms/inputs/ImageButton.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import Popper from '@atoms/layouts/Popper.svelte';
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

<ImageButton size="xs" variant="ghost" id={`lang-trigger-${id}`} src={items[current].icon} />
<Popper behavior="click" placement="left-end" includeContent trigger={`#lang-trigger-${id}`}>
    <InputGroup vertical size="sm">
        {#each items as item, index (item.data)}
            <Button wide endIcon={item.icon} onclick={() => (current = index)}>{item.caption}</Button>
        {/each}
    </InputGroup>
</Popper>
