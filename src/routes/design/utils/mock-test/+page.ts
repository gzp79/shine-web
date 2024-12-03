import type { PageLoad } from './$types';
import { fetchData } from './+page.svelte';

export const load: PageLoad = async ({ fetch }) => {
    return {
        streamedData: fetchData(fetch),
        serverData: await fetchData(fetch)
    };
};
