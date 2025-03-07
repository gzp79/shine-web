<script lang="ts">
    import CurrentUserCard, { type ApiContext } from '$lib/account/CurrentUserCard.svelte';
    import type { CurrentUser } from '$lib/api/identity-api';
    import { async } from '$lib/utils';
    import { onMount } from 'svelte';
    import { v4 as uuid } from 'uuid';
    import Separator from '../../_components/_Separator.svelte';
    import Story from '../../_components/_Story.svelte';

    const mockContext: ApiContext = {
        fetchUser: async.never,
        refreshUser: async.never,
        startEmailConfirmation: async.resolved<void>,
        startEmailChange: async.never,
        getLogoutUrl: (all: boolean, redirectUrl: string) => `#logout_${all}_${redirectUrl}`
    };

    let delayedUserInfo = async (userId: string): Promise<CurrentUser> => {
        await async.delay(1000);
        return {
            isAuthenticated: true,
            isLinked: true,
            name: 'Changing user id',
            userId,
            isEmailConfirmed: false,
            roles: ['The id should change in every second'],
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
    <CurrentUserCard context={mockContext} />
    <CurrentUserCard
        context={{
            ...mockContext,
            fetchUser: () => async.error(new Error('Test error'))
        }}
    />

    <CurrentUserCard
        context={{
            ...mockContext,
            fetchUser: () =>
                Promise.resolve({
                    isAuthenticated: true,
                    isLinked: false,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    isEmailConfirmed: false,
                    roles: [],
                    sessionLength: 1234
                })
        }}
    />

    <CurrentUserCard
        context={{
            ...mockContext,
            fetchUser: () =>
                Promise.resolve({
                    isAuthenticated: true,
                    isLinked: true,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    email: 'johndoe@example.com',
                    isEmailConfirmed: false,
                    roles: [],
                    sessionLength: 1234
                })
        }}
    />

    <CurrentUserCard
        context={{
            ...mockContext,
            fetchUser: () =>
                Promise.resolve({
                    isAuthenticated: true,
                    isLinked: true,
                    name: 'John Doe',
                    userId: 'd3b07384-d9a0-4c9b-8b1e-2f8e4b8e4b8e',
                    email: undefined,
                    isEmailConfirmed: false,
                    roles: ['admin', 'user', 'god'],
                    sessionLength: 1234
                })
        }}
    />

    <CurrentUserCard
        context={{
            ...mockContext,
            fetchUser: () =>
                Promise.resolve({
                    isAuthenticated: true,
                    isLinked: true,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    email: 'johndoe@example.com',
                    isEmailConfirmed: true,
                    roles: [],
                    sessionLength: 1234
                })
        }}
    />

    <Separator />

    <CurrentUserCard
        context={{
            ...mockContext,
            fetchUser: () => delayedUserInfo(randomUserId)
        }}
    />

    <CurrentUserCard
        context={{
            ...mockContext,
            fetchUser: () =>
                Promise.resolve({
                    isAuthenticated: true,
                    isLinked: true,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    email: 'johndoe@example.com',
                    isEmailConfirmed: false,
                    roles: [],
                    sessionLength: 1234
                }),
            startEmailConfirmation: async () => {
                console.log('Starting email confirmation...');
                await async.delay(1000);
                console.log('Email confirmed.');
                return;
            },
            startEmailChange: async (newEmail: string) => {
                console.log('New email:', newEmail);
                await async.delay(1000);
                console.log('Email changed.');
                return;
            }
        }}
    />
</Story>
