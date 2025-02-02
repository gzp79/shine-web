<script lang="ts">
    import CurrentUserCard from '$lib/account/CurrentUserCard.svelte';
    import type { CurrentUser } from '$lib/api/identity-api';
    import { logDesigner } from '$lib/loggers';
    import { async } from '$lib/utils';
    import { onMount } from 'svelte';
    import { v4 as uuid } from 'uuid';
    import Story from '../../_components/_Story.svelte';

    let fetchReactiveUser = async (userId: string): Promise<CurrentUser> => {
        await async.delay(1000);
        return {
            isAuthenticated: true,
            isLinked: true,
            name: 'John Doe - changing id',
            userId,
            isEmailConfirmed: false,
            roles: ['admin', 'user', 'god', 'The id should change in every second'],
            sessionLength: 1234
        };
    };

    let randomUserId = $state(uuid());
    onMount(() => {
        const interval = setInterval(() => {
            randomUserId = uuid();
        }, 3000);
        return () => clearInterval(interval);
    });
</script>

<Story variant="center">
    <CurrentUserCard
        user={() =>
            Promise.resolve({
                isAuthenticated: true,
                isLinked: true,
                name: 'John Doe',
                userId: 'd3b07384-d9a0-4c9b-8b1e-2f8e4b8e4b8e',
                isEmailConfirmed: false,
                roles: ['admin', 'user', 'god'],
                sessionLength: 1234
            })}
        onLogout={() => logDesigner('logout')}
    />

    <CurrentUserCard
        user={() =>
            Promise.resolve({
                isAuthenticated: true,
                isLinked: true,
                name: 'John Doe',
                userId: 'e4b8e4b8-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                isEmailConfirmed: false,
                roles: ['admin', 'user'],
                sessionLength: 1234
            })}
        onLogout={() => logDesigner('logout')}
    />

    <CurrentUserCard
        user={() =>
            Promise.resolve({
                isAuthenticated: true,
                isLinked: true,
                name: 'John Doe',
                userId: 'f8e4b8e4-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                isEmailConfirmed: false,
                roles: ['admin', 'user'],
                sessionLength: 1234
            })}
        onLogout={() => logDesigner('logout')}
    />

    <CurrentUserCard
        user={() =>
            Promise.resolve({
                isAuthenticated: true,
                isLinked: false,
                name: 'John Doe',
                userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                email: 'johndoe@example.com',
                isEmailConfirmed: false,
                roles: [],
                sessionLength: 1234
            })}
        onLogout={() => logDesigner('logout')}
    />

    <CurrentUserCard
        user={() =>
            Promise.resolve({
                isAuthenticated: true,
                isLinked: true,
                name: 'John Doe',
                userId: '8b1e2f8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                email: 'johndoe@example.com',
                isEmailConfirmed: true,
                roles: [],
                sessionLength: 1234
            })}
        onLogout={() => logDesigner('logout')}
    />

    <CurrentUserCard user={async.never} onLogout={() => logDesigner('logout')} />
    <CurrentUserCard user={() => async.error(new Error('Test error'))} onLogout={() => logDesigner('logout')} />
    <CurrentUserCard user={() => fetchReactiveUser(randomUserId)} onLogout={() => logDesigner('logout')} />
</Story>
