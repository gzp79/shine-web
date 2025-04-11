<script lang="ts">
    import Button from '@atoms/Button.svelte';
    import InputGroup from '@atoms/InputGroup.svelte';
    import Popper from '@atoms/Popper.svelte';
    import * as flags from '@atoms/icons/flags';
    import { languageStore, t } from './i18n.svelte';

    const items = [
        { data: 'en', caption: $t('lang.en'), icon: flags.FlagGB },
        { data: 'hu', caption: $t('lang.hu'), icon: flags.FlagHU }
    ];

    //todo: let id = $props.id()

    let language = languageStore();
    let current = $state(items.findIndex((x) => x.data === language.current));

    $effect(() => {
        language.current = items[current].data;
    });
</script>

<Button variant="ghost" id="lang-trigger" endIcon={items[current].icon} />
<Popper
    behavior="click"
    alignWidth
    display="flex flex-col rounded-lg border max-h-96 overflow-y-auto"
    trigger="#lang-trigger"
>
    <InputGroup vertical size="sm">
        {#each items as item, index (item.data)}
            <Button wide endIcon={item.icon} onclick={() => (current = index)}>{item.caption}</Button>
        {/each}
    </InputGroup>
</Popper>
