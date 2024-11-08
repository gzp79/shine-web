<script lang="ts">
    import * as flags from '$atoms/icons/flags';
    import Button from '$src/components/atoms/Button.svelte';
    import InputGroup from '$src/components/atoms/InputGroup.svelte';
    import Popper from '$src/components/atoms/Popper.svelte';
    import { t, languageStore } from './i18n.svelte';

    const items = [
        { data: 'hu', caption: $t('lang.hu'), icon: flags.FlagHU },
        { data: 'en', caption: $t('lang.en'), icon: flags.FlagGB }
    ];

    let language = languageStore();
    let current = $state(items.findIndex((x) => x.data === language.current));

    $effect(() => {
        language.current = items[current].data;
    });
</script>

<Button variant="ghost" id={`lang-trigger`} endIcon={items[current].icon} />
<Popper
    behavior="click"
    alignWidth
    display="flex flex-col rounded-lg border max-h-96 overflow-y-auto"
    trigger={`#lang-trigger`}
>
    <InputGroup vertical size="sm">
        {#each items as item, index}
            <Button wide endIcon={item.icon} onclick={() => (current = index)}>{item.caption}</Button>
        {/each}
    </InputGroup>
</Popper>
