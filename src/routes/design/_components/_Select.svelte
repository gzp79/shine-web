<script lang="ts" generics="T extends { toString(): string }">
    import { uniqueId } from '$src/components/atoms/types';

    // generics="T" is not respected by the eslint
    /* eslint no-undef: "off" */

    interface Props<T> {
        label: string;
        value: T;
        options: T[] | [string, T][];
    }
    let { label, options, value = $bindable() }: Props<T> = $props();

    const isTuple = (option: unknown): option is [string, T] => {
        return Array.isArray(option) && option.length === 2 && typeof option[0] === 'string';
    };

    const optionList: [string, T][] = $derived(
        isTuple(options[1]) ? (options as [string, T][]) : (options as T[]).map((option) => [option.toString(), option])
    );

    const id = uniqueId('input-option');
</script>

<label for={id} class="max-w-xs">
    {label}
</label>
<select {id} class="w-full max-w-xs rounded bg-surface-mute text-on-surface" bind:value>
    {#each optionList as [display, val] (val)}
        <option value={val} selected={val === value}>
            {display}
        </option>
    {/each}
</select>
