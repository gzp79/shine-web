<script lang="ts" module>
    import { setContext, type Snippet } from 'svelte';

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

<div class="h-full w-full select-none overflow-clip">
    <div class="flex h-full w-full flex-col overflow-y-auto overflow-x-clip">
        {@render children()}
    </div>
</div>
