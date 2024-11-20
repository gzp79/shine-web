<script lang="ts">
    import Typography from '$atoms/Typography.svelte';

    interface Props {
        label: string;
        value: boolean;
    }
    let { label, value = $bindable() }: Props = $props();
</script>

<Typography variant="text" class="max-w-xs">
    {label}
</Typography>
<input type="checkbox" class="justify-self-center accent-surface-mute" bind:checked={value} />
