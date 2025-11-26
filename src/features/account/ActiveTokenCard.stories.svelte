<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { action } from 'storybook/actions';
    import type { Component } from 'svelte';
    import { v4 as uuid } from 'uuid';
    import type { ActiveToken } from '@lib/api/identity-api';
    import { async } from '@lib/utils';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import ContextProvider from '@atoms/utilities/ContextProvider.svelte';
    import ActiveTokenCard from '@features/account/ActiveTokenCard.svelte';
    import {
        type ActiveTokenService,
        getActiveTokenStore,
        setActiveTokenStore
    } from '@features/account/activeTokenStore.svelte';

    // Helper to create tokens
    const createToken = (overrides?: Partial<ActiveToken>): ActiveToken => ({
        tokenHash: uuid(),
        kind: 'singleAccess',
        createdAt: new Date('2021-08-01T12:00:00Z'),
        expireAt: new Date('2022-08-01T12:00:00Z'),
        isExpired: true,
        agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        ...overrides
    });

    // Mock data service for stories
    const mockDataService: ActiveTokenService = {
        load: async.never,
        revoke: async (tokenHash: string) => {
            await async.delay(500);
            action('revoke')(tokenHash);
        }
    };

    interface StoryArgs {
        service: ActiveTokenService;
    }

    const useService = (service: Partial<ActiveTokenService>): StoryArgs => {
        return { service: { ...mockDataService, ...service } };
    };

    const { Story } = defineMeta<unknown, Component<StoryArgs>>({
        title: 'Features/Account/ActiveTokenCard',
        args: {
            service: mockDataService
        },
        argTypes: {
            service: { table: { disable: true } }
        },
        decorators: [
            /* eslint-disable @typescript-eslint/no-explicit-any */
            ((_story: any, context: any) => {
                const args = context.args;
                const use = () => setActiveTokenStore(args.service);
                return {
                    Component: ContextProvider,
                    props: { use }
                };
            }) as any
            /* eslint-enable @typescript-eslint/no-explicit-any */
        ]
    });
</script>

<script lang="ts">
    // Dynamic token management for interactive story
    let mockedTokens = $state<ActiveToken[]>([
        createToken({
            kind: 'persistent',
            isExpired: false,
            expireAt: new Date('2026-08-01T12:00:00Z'),
            agent: 'Chrome/119.0.0.0',
            country: 'Hungary',
            city: 'Budapest'
        }),
        createToken({
            kind: 'access',
            isExpired: false,
            expireAt: new Date('2025-12-01T12:00:00Z'),
            agent: 'Firefox/120.0',
            country: 'United States',
            region: 'California',
            city: 'San Francisco'
        })
    ]);

    const loadMockedTokens = async (): Promise<ActiveToken[]> => {
        await async.delay(500);
        // Create a snapshot of the current tokens
        const snapshot = mockedTokens.map((t) => ({ ...t }));
        return snapshot;
    };

    const revokeMockedToken = async (tokenHash: string) => {
        await async.delay(500);
        mockedTokens = mockedTokens.filter((t) => t.tokenHash !== tokenHash);
        action('revoke')(tokenHash);
    };

    function addMockedTokenToFront() {
        mockedTokens = [
            createToken({
                kind: 'singleAccess',
                isExpired: false,
                expireAt: new Date('2025-12-31T23:59:59Z'),
                agent: 'Edge/119.0.0.0',
                country: 'Germany',
                city: 'Berlin'
            }),
            ...mockedTokens
        ];
    }

    function addMockedTokenToEnd() {
        mockedTokens = [
            ...mockedTokens,
            createToken({
                kind: 'emailAccess',
                isExpired: false,
                expireAt: new Date('2025-11-20T12:00:00Z'),
                agent: 'Safari/17.0',
                country: 'Japan',
                city: 'Tokyo'
            })
        ];
    }

    function addMockedTokenToMiddle() {
        const middle = Math.floor(mockedTokens.length / 2);
        mockedTokens = [
            ...mockedTokens.slice(0, middle),
            createToken({
                kind: 'persistent',
                isExpired: false,
                expireAt: new Date('2026-01-01T00:00:00Z'),
                agent: 'Opera/105.0.0.0',
                country: 'France',
                region: 'Île-de-France',
                city: 'Paris'
            }),
            ...mockedTokens.slice(middle)
        ];
    }
</script>

<Story name="Loading" args={useService({})}>
    <ActiveTokenCard />
</Story>

<Story name="Error State" args={useService({ load: () => async.error(new Error('Failed to load active tokens')) })}>
    <ActiveTokenCard />
</Story>

<Story name="Empty Token List" args={useService({ load: async () => [] })}>
    <ActiveTokenCard />
</Story>

<Story
    name="Multiple Tokens"
    args={useService({
        load: async () => [
            createToken({
                kind: 'singleAccess',
                isExpired: true
            }),
            createToken({
                kind: 'persistent',
                isExpired: false,
                expireAt: new Date('2032-08-01T12:00:00Z'),
                agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                country: 'Hungary',
                city: 'Budapest'
            }),
            createToken({
                kind: 'access',
                isExpired: false,
                expireAt: new Date('2026-03-15T10:30:00Z'),
                agent: 'Chrome/119.0.0.0',
                country: 'United States',
                region: 'New York',
                city: 'New York'
            }),
            createToken({
                kind: 'emailAccess',
                isExpired: true,
                agent: 'Safari/17.0'
            })
        ]
    })}
>
    <ActiveTokenCard />
</Story>

<Story name="Dynamic Token Management">
    {#snippet template()}
        <ContextProvider
            use={() =>
                setActiveTokenStore({
                    load: loadMockedTokens,
                    revoke: revokeMockedToken
                })}
        >
            {@const store = getActiveTokenStore()}
            <Stack>
                <Stack direction="row" gap={8}>
                    <Button
                        size="xs"
                        onclick={() => {
                            addMockedTokenToFront();
                            store.refresh({ force: true });
                        }}>Add to Front</Button
                    >
                    <Button
                        size="xs"
                        onclick={() => {
                            addMockedTokenToMiddle();
                            store.refresh({ force: true });
                        }}>Add to Middle</Button
                    >
                    <Button
                        size="xs"
                        onclick={() => {
                            addMockedTokenToEnd();
                            store.refresh({ force: true });
                        }}>Add to End</Button
                    >
                </Stack>
                <Typography variant="footnote">Current token count: {mockedTokens.length}</Typography>
                <ActiveTokenCard />
            </Stack>
        </ContextProvider>
    {/snippet}
</Story>
