import { loadCurrentUser } from '$src/lib/account/currentUser.svelte.js';

export const load = async ({ fetch }) => {
    const currentUser = loadCurrentUser(fetch);

    return {
        streams: {
            currentUser
        }
    };
};
