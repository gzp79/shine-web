<script lang="ts" generics="T">
    import { uniqueId } from '$components/types';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props<T> {
        label: string;
        value: T;
        options: T[];
    }
    let { label, options, value = $bindable() }: Props<T> = $props();

    const id = uniqueId('input-option');
</script>

<label for={id} class="max-w-xs">
    {label}
</label>
<select {id} class="select select-bordered w-full max-w-xs" bind:value>
    {#each options as option}
        <option value={option} selected={option === value}>
            {option}
        </option>
    {/each}
</select>
