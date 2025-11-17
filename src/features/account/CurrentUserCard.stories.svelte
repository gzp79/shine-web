<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import { v4 as uuid } from 'uuid';
    import { type CurrentUser, unauthenticatedUser } from '@lib/api/identity-api';
    import { async } from '@lib/utils';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import ContextProvider from '@atoms/utilities/ContextProvider.svelte';
    import CurrentUserCard from '@features/account/CurrentUserCard.svelte';
    import {
        type CurrentUserService,
        getCurrentUserStore,
        setCurrentUserStore
    } from '@features/account/currentUserStore.svelte';

    // Mock data service for stories
    const mockDataService: CurrentUserService = {
        load: async.never,
        startEmailConfirmation: async () => {
            await async.delay(1000);
            action('startEmailConfirmation')();
        },
        startEmailChange: async () => {
            await async.delay(1000);
            action('startEmailChange')();
        },
        getLogoutUrl: (all: boolean, redirectUrl: string) =>
            `#logout_${encodeURIComponent(all)}_${encodeURIComponent(redirectUrl)}`
    };

    const useService = (service: Partial<CurrentUserService>): any => {
        return { service: { ...mockDataService, ...service } };
    };

    const { Story } = defineMeta({
        component: CurrentUserCard,
        title: 'Features/Account/CurrentUserCard',
        args: {
            service: mockDataService
        } as any,
        argTypes: {
            service: { control: false }
        },
        decorators: [
            ((story: any, context: any) => {
                const args = context.args;
                const use = () => setCurrentUserStore(args.service);
                return {
                    Component: ContextProvider,
                    props: { use }
                };
            }) as any
        ]
    });

    const baseUser: CurrentUser = {
        isAuthenticated: true,
        userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
        name: 'John Doe',
        isLinked: true,
        isEmailConfirmed: true,
        roles: ['role1', 'role2'],
        sessionLength: 1234,
        remainingSessionTime: 4321,
        details: {
            kind: 'user',
            createdAt: new Date('2024-01-15T10:30:00Z'),
            email: 'johndoe@example.com'
        }
    };
</script>

<script lang="ts">
    let remountKey = $state(0);
    const remount = () => {
        remountKey = remountKey + 1;
    };

    type MockUser =
        | {
              type: 'uuid';
              id: string;
          }
        | {
              type: 'error';
              id: string;
              message: string;
          }
        | {
              type: 'none';
              id: string;
          };
    let currentMockedUser: MockUser = $state({ type: 'uuid', id: uuid() });

    // svelte-ignore state_referenced_locally
    const loadMockedUser = async (): Promise<CurrentUser> => {
        let mockUser = $state.raw(currentMockedUser);

        await async.delay(1000);
        if (mockUser.type === 'error') {
            return async.error(new Error(mockUser.message));
        } else if (mockUser.type === 'none') {
            return unauthenticatedUser;
        } else if (mockUser.type === 'uuid') {
            return {
                isAuthenticated: true,
                userId: mockUser.id,
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
        }
        return async.error(new Error('Invalid user ID'));
    };
</script>

<Story name="Loading" args={useService({})} />

<Story
    name="Error State"
    args={useService({ load: () => async.error(new Error('Failed to load user information')) })}
/>

<Story name="User All Info" args={useService({ load: async () => baseUser })} />

<Story
    name="User Without Email Link"
    args={useService({
        load: async () => ({
            ...baseUser,
            details: {
                ...baseUser.details,
                email: undefined
            }
        })
    })}
/>

<Story
    name="User Without Email Confirmation"
    args={useService({
        load: async () => ({
            ...baseUser,
            isEmailConfirmed: false
        })
    })}
/>

<Story name="Reaction to refresh user">
    {#snippet template(args)}
        <ContextProvider
            use={() =>
                setCurrentUserStore({
                    ...mockDataService,
                    load: loadMockedUser
                })}
        >
            {@const store = getCurrentUserStore()}
            <Stack>
                <Button size="xs" onclick={remount}>Remount Component</Button>
                <Button
                    size="xs"
                    onclick={() => {
                        currentMockedUser = { type: 'uuid', id: uuid() };
                        store.refresh({ force: true });
                    }}
                >
                    Change User
                </Button>
                <Button
                    size="xs"
                    onclick={() => {
                        currentMockedUser = {
                            type: 'error',
                            id: uuid(),
                            message: 'Failed to load user information'
                        };
                        store.refresh({ force: true });
                    }}
                >
                    Failed
                </Button>
                <Button
                    size="xs"
                    onclick={() => {
                        currentMockedUser = {
                            type: 'none',
                            id: uuid()
                        };
                        store.refresh({ force: true });
                    }}
                >
                    Unauthenticated
                </Button>
                {#key currentMockedUser.id}
                    <Typography variant="footnote">Target: {JSON.stringify(currentMockedUser)}</Typography>
                {/key}
                {#key remountKey}
                    <CurrentUserCard />
                {/key}
            </Stack>
        </ContextProvider>
    {/snippet}
</Story>
