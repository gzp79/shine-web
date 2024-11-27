<script lang="ts" generics="T extends { toString(): string }">
    import Typography from '$atoms/Typography.svelte';

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
</script>

<Typography variant="text" class="max-w-xs">
    {label}
</Typography>
<select class="w-full max-w-xs rounded border border-on-surface bg-surface text-on-surface" bind:value>
    {#each optionList as [display, val] (val)}
        <option value={val} selected={val === value}>
            {display}
        </option>
    {/each}
</select>
