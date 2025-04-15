import { onMount } from 'svelte';

export function afterBFCacheRestore(callback: () => void) {
    onMount(() => {
        const onPageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                callback();
            }
        };

        window.addEventListener('pageshow', onPageShow);

        return () => {
            window.removeEventListener('pageshow', onPageShow);
        };
    });
}
