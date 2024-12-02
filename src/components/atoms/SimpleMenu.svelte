<script lang="ts" module>
    import { setContext, type Snippet } from 'svelte';
    import Box from './Box.svelte';

    export interface SimpleMenuContext {
        get value(): SimpleMenuInfo;
    }
    export interface SimpleMenuInfo {
        dummy?: string;
    }
</script>

<script lang="ts">
    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    // --------------------------------------------------------------------------------
    // passing reactive info to children
    let context = $state({
        _info: {},
        get value(): SimpleMenuInfo {
            return this._info;
        },
        set value(info: SimpleMenuInfo) {
            this._info = info;
        }
    });

    $effect(() => {
        context.value = {};
    });
    setContext('SimpleMenu_props', context);
</script>

<Box border class="max-h-sm w-fit overflow-y-auto py-2">
    <div class="flex h-full w-fit flex-col items-center justify-center">
        {@render children()}
    </div>
</Box>
