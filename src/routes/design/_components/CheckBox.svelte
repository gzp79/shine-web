<script lang="ts">
    import { uniqueId } from '$components/types';

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
<input type="checkbox" {id} class="justify-self-center accent-surface" bind:checked={value} />
