<script lang="ts">
    import { uniqueId } from '$src/components/atoms/types';

    interface Props {
        label: string;
        value: boolean;
    }
    let { label, value = $bindable() }: Props = $props();

    const id = uniqueId('input-checkbox');
</script>

<label for={id} class="max-w-xs">
    {label}
</label>
<input type="checkbox" {id} class="justify-self-center accent-surface-mute" bind:checked={value} />
