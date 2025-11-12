<script lang="ts">
    import type { CurrentUser } from '$lib/api/identity-api';
    import { async } from '$lib/utils';
    import { v4 as uuid } from 'uuid';
    import Box from '@atoms/Box.svelte';
    import Button from '@atoms/Button.svelte';
    import Stack from '@atoms/Stack.svelte';
    import ContextProvider from '@atoms/utilities/ContextProvider.svelte';
    import CurrentUserCard from '@features/account/CurrentUserCard.svelte';
    import { type CurrentUserService, setCurrentUserStore } from '@features/account/currentUser.svelte';
    import { Story } from '../../../_components';

    const mockDataService: CurrentUserService = {
        load: async.never,
        startEmailConfirmation: async.resolved<void>,
        startEmailChange: () => async.resolved<void>(void 0),
        getLogoutUrl: (all: boolean, redirectUrl: string) =>
            `#logout_${encodeURIComponent(all)}_${encodeURIComponent(redirectUrl)}`
    };

    let remountEmailConfirmation = $state(0);

    let randomUserId = $state(uuid());
    $effect(() => {
        const interval = setInterval(() => {
            randomUserId = uuid();
        }, 3000);
        return () => clearInterval(interval);
    });

    let delayedUserInfo = $derived.by(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        randomUserId;
        return async (): Promise<CurrentUser> => {
            await async.delay(1000);
            return {
                isAuthenticated: true,
                userId: randomUserId,
                name: 'Changing user id',
                isEmailConfirmed: false,
                isLinked: true,
                roles: [],
                sessionLength: 1234,
                remainingSessionTime: 4321,
                details: {
                    kind: 'user',
                    createdAt: new Date()
                }
            };
        };
    });
</script>

<Story variant="center">
    <ContextProvider use={() => setCurrentUserStore(mockDataService)}>
        <CurrentUserCard />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setCurrentUserStore({
                ...mockDataService,
                load: () => async.error(new Error('Test error'))
            })}
    >
        <CurrentUserCard />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setCurrentUserStore({
                ...mockDataService,
                load: async () => ({
                    isAuthenticated: true,
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    name: 'John Doe',
                    isLinked: false,
                    isEmailConfirmed: false,
                    roles: [],
                    sessionLength: 1234,
                    remainingSessionTime: 4321,
                    details: {
                        kind: 'user',
                        createdAt: new Date()
                    }
                })
            })}
    >
        <CurrentUserCard />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setCurrentUserStore({
                ...mockDataService,
                load: async () => ({
                    isAuthenticated: true,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    isLinked: true,
                    isEmailConfirmed: false,
                    roles: [],
                    sessionLength: 1234,
                    remainingSessionTime: 4321,
                    details: {
                        kind: 'user',
                        createdAt: new Date(),
                        email: 'johndoe@example.com'
                    }
                })
            })}
    >
        <CurrentUserCard />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setCurrentUserStore({
                ...mockDataService,
                load: async () => ({
                    isAuthenticated: true,
                    name: 'John Doe',
                    userId: 'd3b07384-d9a0-4c9b-8b1e-2f8e4b8e4b8e',
                    isLinked: true,
                    isEmailConfirmed: false,
                    roles: ['admin', 'user', 'god'],
                    sessionLength: 1234,
                    remainingSessionTime: 4321,
                    details: {
                        kind: 'user',
                        createdAt: new Date(),
                        email: undefined
                    }
                })
            })}
    >
        <CurrentUserCard />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setCurrentUserStore({
                ...mockDataService,
                load: async () => ({
                    isAuthenticated: true,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    isLinked: true,
                    isEmailConfirmed: true,
                    roles: [],
                    sessionLength: 1234,
                    remainingSessionTime: 4321,
                    details: {
                        kind: 'user',
                        createdAt: new Date(),
                        email: 'johndoe@example.com'
                    }
                })
            })}
    >
        <CurrentUserCard />
    </ContextProvider>

    <Box border legend="Changing user id every n seconds">
        <ContextProvider
            use={() =>
                setCurrentUserStore({
                    ...mockDataService,
                    load: delayedUserInfo
                })}
        >
            <CurrentUserCard />
        </ContextProvider>
    </Box>

    <Box border legend="Email confirmation and change dialogs">
        <Stack align="center">
            <Button onclick={() => remountEmailConfirmation++}>Remount</Button>
            {#each [remountEmailConfirmation]}
                <ContextProvider
                    use={() =>
                        setCurrentUserStore({
                            ...mockDataService,
                            load: async () => ({
                                isAuthenticated: true,
                                userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                                name: 'John Doe',
                                isLinked: true,
                                isEmailConfirmed: false,
                                roles: [],
                                sessionLength: 1234,
                                remainingSessionTime: 4321,
                                details: {
                                    kind: 'user',
                                    createdAt: new Date(),
                                    email: 'johndoe@example.com'
                                }
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
                        })}
                >
                    <CurrentUserCard />
                </ContextProvider>
            {/each}
        </Stack>
    </Box>
</Story>
