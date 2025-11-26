<script lang="ts">
    import { type Snippet, onMount } from 'svelte';
    import { getAppToolbarContext } from './App.svelte';

    interface Props {
        /** Toolbar content to render in the App's toolbar area */
        children: Snippet;
    }

    let { children }: Props = $props();

    const context = getAppToolbarContext();
    if (!context) {
        throw new Error('AppToolbar must be used within an App component');
    }

    onMount(() => {
        context.setToolbar(children);
        return () => {
            context.setToolbar(undefined);
        };
    });
</script>

<!--
    AppToolbar component mounts its content into the App's toolbar area.
    
    Usage in a page:
    <AppToolbar>
        <Button>Settings</Button>
        <Button>Logout</Button>
    </AppToolbar>
    
    The toolbar will appear in the top-right corner of the App component,
    even though App is defined in a parent layout.
-->
