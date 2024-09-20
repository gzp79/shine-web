<script lang="ts">
    import Popper from '$atoms/Popper.svelte';
    import { FlagGB, FlagHU } from '$atoms/icons/flags';
    import type { Component } from 'svelte';
    import { languageStore } from './i18n.svelte';

    let language = languageStore();
    let size = 'sm';

    const langs: Record<string, Component> = {
        hu: FlagHU,
        en: FlagGB
    };
</script>

<button class="btn select m-1 h-fit w-fit">
    <svelte:component this={langs[language.current]} {size} />
</button>
<Popper clickable class="flex flex-col items-center justify-center rounded-lg border bg-base-100">
    <button class="btn h-fit w-fit" onclick={() => (language.current = 'hu')}><FlagHU {size} /></button>
    <button class="btn h-fit w-fit" onclick={() => (language.current = 'en')}><FlagGB {size} /></button>
</Popper>
