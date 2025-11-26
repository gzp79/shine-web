<script module lang="ts">
    import { type Snippet } from 'svelte';
    import { fade } from 'svelte/transition';
    import { Hamburger } from '@atoms/icons/common';
    import ImageButton from '@atoms/inputs/ImageButton.svelte';
    import { createContext } from '@atoms/types';

    export interface Props {
        showToolbar?: boolean;
        /** Main content of the application */
        children: Snippet;
    }

    export interface AppToolbarContext {
        setToolbar: (toolbar: Snippet | undefined) => void;
    }

    const [getAppToolbarContext, setAppToolbarContext] = createContext<AppToolbarContext>('AppToolbar');
    export { getAppToolbarContext };
</script>

<script lang="ts">
    let { showToolbar = true, children }: Props = $props();

    let toolbar = $state<Snippet | undefined>(undefined);
    let isToolbarExpanded = $state(false);

    setAppToolbarContext({
        setToolbar: (newToolbar) => {
            console.log('Setting toolbar:', newToolbar);
            toolbar = newToolbar;
        }
    });

    function toggleToolbar() {
        isToolbarExpanded = !isToolbarExpanded;
    }
</script>

<div class="relative flex h-screen w-screen flex-col overflow-hidden">
    {#if showToolbar && toolbar}
        <div class="absolute right-4 top-4 z-10">
            <div class="flex items-start gap-2">
                {#if isToolbarExpanded}
                    <header transition:fade={{ duration: 250 }} class="overflow-hidden">
                        {@render toolbar()}
                    </header>
                {/if}
                <ImageButton
                    size="xs"
                    src={Hamburger}
                    alt={isToolbarExpanded ? 'Collapse toolbar' : 'Expand toolbar'}
                    onclick={toggleToolbar}
                    class={`transition-transform duration-300 ${isToolbarExpanded ? 'rotate-180' : ''}`}
                />
            </div>
        </div>
    {/if}
    {@render children()}
</div>

<div id="popper"></div>
<div id="modal"></div>
