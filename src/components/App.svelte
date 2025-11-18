<script module lang="ts">
    import { type Snippet } from 'svelte';
    import { createContext } from '@atoms/types';

    interface AppToolbarContext {
        setToolbar: (toolbar: Snippet | undefined) => void;
    }

    const [getAppToolbarContext, setAppToolbarContext] = createContext<AppToolbarContext>('AppToolbar');
    export { getAppToolbarContext };
</script>

<script lang="ts">
    import { Hamburger } from '@atoms/icons/common';
    import ImageButton from '@atoms/inputs/ImageButton.svelte';

    interface Props {
        showToolbar?: boolean;
        /** Main content of the application */
        children: Snippet;
    }

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
                <header
                    class={`overflow-hidden transition-all duration-300 ease-in-out ${isToolbarExpanded ? 'max-w-96' : 'max-w-0'}`}
                >
                    {@render toolbar()}
                </header>
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
