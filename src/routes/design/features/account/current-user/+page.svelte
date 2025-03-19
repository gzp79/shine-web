<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import type { CurrentUser } from '$lib/api/identity-api';
    import { async } from '$lib/utils';
    import Box from '$atoms/Box.svelte';
    import Button from '$atoms/Button.svelte';
    import ContextProvider from '$atoms/ContextProvider.svelte';
    import Stack from '$atoms/Stack.svelte';
    import CurrentUserCard from '$features/account/CurrentUserCard.svelte';
    import { type CurrentUserService, setCurrentUserStore } from '$features/account/currentUser.svelte';
    import { Story } from '../../../_components';

    const mockDataService: CurrentUserService = {
        load: async.never,
        startEmailConfirmation: async.resolved<void>,
        startEmailChange: () => async.resolved<void>(void 0),
        getLogoutUrl: (all: boolean, redirectUrl: string) =>
            `#logout_${encodeURIComponent(all)}_${encodeURIComponent(redirectUrl)}`
    };

    let remountEmailConfirmation = $state(0);
    $inspect('remountEmailConfirmation', remountEmailConfirmation);

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
                isLinked: true,
                name: 'Changing user id',
                userId: randomUserId,
                isEmailConfirmed: false,
                roles: [],
                sessionLength: 1234
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
                    isLinked: false,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    isEmailConfirmed: false,
                    roles: [],
                    sessionLength: 1234
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
                    isLinked: true,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    email: 'johndoe@example.com',
                    isEmailConfirmed: false,
                    roles: [],
                    sessionLength: 1234
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
                    isLinked: true,
                    name: 'John Doe',
                    userId: 'd3b07384-d9a0-4c9b-8b1e-2f8e4b8e4b8e',
                    email: undefined,
                    isEmailConfirmed: false,
                    roles: ['admin', 'user', 'god'],
                    sessionLength: 1234
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
                    isLinked: true,
                    name: 'John Doe',
                    userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
                    email: 'johndoe@example.com',
                    isEmailConfirmed: true,
                    roles: [],
                    sessionLength: 1234
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
            {#each [remountEmailConfirmation] as _ (remountEmailConfirmation)}
                <ContextProvider
                    use={() =>
                        setCurrentUserStore({
                            ...mockDataService,
                            load: async () => ({
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
                        })}
                >
                    <CurrentUserCard />
                </ContextProvider>
            {/each}
        </Stack>
    </Box>
</Story>
