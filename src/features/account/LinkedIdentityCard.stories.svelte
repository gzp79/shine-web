<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import type { LinkedIdentity } from '@lib/api/identity-api';
    import { async } from '@lib/utils';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import ContextProvider from '@atoms/utilities/ContextProvider.svelte';
    import LinkedIdentityCard from '@features/account/LinkedIdentityCard.svelte';
    import {
        type LinkedIdentityService,
        getLinkedIdentityStore,
        setLinkedIdentityStore
    } from '@features/account/linkedIdentityStore.svelte';

    // Helper to create linked identities
    const createIdentity = (overrides?: Partial<LinkedIdentity>): LinkedIdentity => ({
        provider: 'google',
        providerUserId: `user-${Math.random().toString(36).substring(7)}`,
        linkedAt: new Date('2024-01-15T10:30:00Z'),
        name: 'John Doe',
        email: 'john.doe@example.com',
        ...overrides
    });

    // Mock data service for stories
    const mockDataService: LinkedIdentityService = {
        load: async.never,
        unlink: async (provider: string, providerUserId: string) => {
            await async.delay(500);
            action('unlink')(provider, providerUserId);
        },
        getLinkUrl: (provider: string, redirect: string) => {
            return `/auth/link/${provider}?redirect=${encodeURIComponent(redirect)}`;
        }
    };

    const useService = (service: Partial<LinkedIdentityService>): any => {
        return { service: { ...mockDataService, ...service } };
    };

    const availableProviders = ['google', 'twitter', 'github', 'discord', 'gitlab'];

    const { Story } = defineMeta({
        component: LinkedIdentityCard,
        title: 'Features/Account/LinkedIdentityCard',
        args: {
            service: mockDataService,
            providers: availableProviders
        },
        argTypes: {
            service: { table: { disable: true } },
            providers: { table: { disable: true } }
        },
        decorators: [
            ((story: any, context: any) => {
                const args = context.args;
                const use = () => setLinkedIdentityStore(args.service);
                return {
                    Component: ContextProvider,
                    props: { use }
                };
            }) as any
        ]
    });
</script>

<script lang="ts">
    // Dynamic identity management for interactive story
    let mockedIdentities = $state<LinkedIdentity[]>([
        createIdentity({
            provider: 'google',
            providerUserId: 'google-12345',
            name: 'Jane Smith',
            email: 'jane.smith@gmail.com',
            linkedAt: new Date('2024-03-10T14:20:00Z')
        }),
        createIdentity({
            provider: 'github',
            providerUserId: 'github-67890',
            name: 'john-dev',
            email: 'john@example.com',
            linkedAt: new Date('2024-05-22T09:15:00Z')
        })
    ]);

    const loadMockedIdentities = async (): Promise<LinkedIdentity[]> => {
        await async.delay(500);
        // Create a snapshot of the current identities
        const snapshot = mockedIdentities.map((i) => ({ ...i }));
        return snapshot;
    };

    const unlinkMockedIdentity = async (provider: string, providerUserId: string) => {
        await async.delay(500);
        mockedIdentities = mockedIdentities.filter(
            (i) => i.provider !== provider || i.providerUserId !== providerUserId
        );
        action('unlink')(provider, providerUserId);
    };

    function addMockedIdentityToFront() {
        const providers = ['twitter', 'discord', 'gitlab'];
        const randomProvider = providers[Math.floor(Math.random() * providers.length)];
        mockedIdentities = [
            createIdentity({
                provider: randomProvider,
                providerUserId: `${randomProvider}-${Date.now()}`,
                name: `User ${randomProvider}`,
                email: `user@${randomProvider}.com`,
                linkedAt: new Date()
            }),
            ...mockedIdentities
        ];
    }

    function addMockedIdentityToEnd() {
        const providers = ['google', 'github'];
        const randomProvider = providers[Math.floor(Math.random() * providers.length)];
        mockedIdentities = [
            ...mockedIdentities,
            createIdentity({
                provider: randomProvider,
                providerUserId: `${randomProvider}-${Date.now()}`,
                name: 'New User',
                email: undefined,
                linkedAt: new Date()
            })
        ];
    }

    function addMockedIdentityToMiddle() {
        const middle = Math.floor(mockedIdentities.length / 2);
        mockedIdentities = [
            ...mockedIdentities.slice(0, middle),
            createIdentity({
                provider: 'discord',
                providerUserId: `discord-${Date.now()}`,
                name: 'Discord User',
                email: 'discord@example.com',
                linkedAt: new Date()
            }),
            ...mockedIdentities.slice(middle)
        ];
    }
</script>

<Story name="Loading" args={useService({})} />

<Story
    name="Error State"
    args={useService({ load: () => async.error(new Error('Failed to load linked identities')) })}
/>

<Story name="Empty Identity List" args={useService({ load: async () => [] })} />

<Story
    name="Multiple Identities"
    args={useService({
        load: async () => [
            createIdentity({
                provider: 'twitter',
                providerUserId: 'twitter-xyz789',
                name: '@twitter_user',
                email: undefined,
                linkedAt: new Date('2024-04-20T11:00:00Z')
            }),
            createIdentity({
                provider: 'github',
                providerUserId: 'github-anonymous',
                name: undefined,
                email: 'anonymous@example.com',
                linkedAt: new Date('2024-07-01T09:00:00Z')
            }),
            createIdentity({
                provider: 'twitter',
                providerUserId: 'twitter-ghi789',
                name: '@bob_tweets',
                email: undefined,
                linkedAt: new Date('2024-03-12T10:20:00Z')
            }),
            createIdentity({
                provider: 'discord',
                providerUserId: 'discord-jkl012',
                name: 'BobGaming#1234',
                email: undefined,
                linkedAt: new Date('2024-06-18T14:30:00Z')
            })
        ]
    })}
/>

<Story name="Dynamic Identity Management">
    {#snippet template(args)}
        <ContextProvider
            use={() =>
                setLinkedIdentityStore({
                    ...mockDataService,
                    load: loadMockedIdentities,
                    unlink: unlinkMockedIdentity
                })}
        >
            {@const store = getLinkedIdentityStore()}
            <Stack>
                <Stack direction="row" gap={8}>
                    <Button
                        size="xs"
                        onclick={() => {
                            addMockedIdentityToFront();
                            store.refresh({ force: true });
                        }}>Add to Front</Button
                    >
                    <Button
                        size="xs"
                        onclick={() => {
                            addMockedIdentityToMiddle();
                            store.refresh({ force: true });
                        }}>Add to Middle</Button
                    >
                    <Button
                        size="xs"
                        onclick={() => {
                            addMockedIdentityToEnd();
                            store.refresh({ force: true });
                        }}>Add to End</Button
                    >
                </Stack>
                <Typography variant="footnote">Current identity count: {mockedIdentities.length}</Typography>
                <LinkedIdentityCard providers={availableProviders} />
            </Stack>
        </ContextProvider>
    {/snippet}
</Story>
