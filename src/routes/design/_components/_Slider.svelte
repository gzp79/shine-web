<script lang="ts">
    import Typography from '@atoms/Typography.svelte';

    interface Props {
        label: string;
        value: number;
        min: number;
        max: number;
    }
    let { label, value = $bindable(), min = 0, max = 100 }: Props = $props();
</script>

<Typography variant="text" class="max-w-xs">
    {label}
</Typography>
<input type="range" class="justify-self-center" bind:value {min} {max} />
