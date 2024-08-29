<script lang="ts">
    import { DarkAndLight, Dark, Light } from '$atoms/icons/common';
    import { twMerge } from 'tailwind-merge';
    import { themeStore } from './theme.svelte';

    interface Props {
        class?: string;
    }
    let { class: className }: Props = $props();

    let theme = themeStore();

    let checked = $derived(theme.current === 'dark' ? true : false);
    let indeterminate = $derived(theme.current === 'system' ? true : false);
</script>

<label class={twMerge('btn btn-square btn-ghost swap swap-rotate', className)}>
    <input
        type="checkbox"
        class="theme-controller"
        {checked}
        {indeterminate}
        oninput={() => {
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
    />

    <Dark class="swap-on h-10 w-10 fill-current" />
    <Light class="swap-off h-10 w-10 fill-current" />
    <DarkAndLight class="swap-indeterminate h-10 w-10 fill-current" />
</label>
