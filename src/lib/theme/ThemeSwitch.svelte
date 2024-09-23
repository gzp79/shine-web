<script lang="ts">
    import { DarkAndLight, Dark, Light } from '$atoms/icons/common';
    import { twMerge } from 'tailwind-merge';
    import { themeStore } from './theme.svelte';

    interface Props {
        class?: string;
    }
    let { class: className }: Props = $props();

    let theme = themeStore();
    let btnClass = $derived(twMerge(['h-10 w-10 fill-current', className]));
</script>

<button
    class={btnClass}
    onclick={() => {
        switch (theme.current) {
            case 'dark':
                theme.current = 'light';
                break;
            case 'light':
                theme.current = 'system';
                break;
            default:
                theme.current = 'dark';
                break;
        }
    }}
>
    {#if theme.current === 'dark'}
        <Dark />
    {:else if theme.current === 'light'}
        <Light />
    {:else}
        <DarkAndLight />
    {/if}
</button>
