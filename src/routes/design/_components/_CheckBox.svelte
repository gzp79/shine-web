<script lang="ts">
    import TailwindClasses from '$atoms/TailwindClasses.svelte';
    import Typography from '$atoms/Typography.svelte';
    import { STYLE } from './_currentSettings.svelte';

    interface Props {
        label: string;
        value: boolean;
    }
    let { label, value = $bindable() }: Props = $props();
</script>

<Typography variant="text" class="max-w-xs">
    {label}
</Typography>
<input type="checkbox" class="justify-self-center accent-{STYLE.background}" bind:checked={value} />

<TailwindClasses
    classList={[
        'accent-surface',
        'accent-container',
        'accent-sub-container',
        'accent-on-surface',
        'accent-on-container',
        'accent-on-sub-container'
    ]}
/>
