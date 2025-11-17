<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import type { ActiveToken } from '@lib/api/identity-api';
    import { async } from '@lib/utils';
    import Box from '@atoms/Box.svelte';
    import ContextProvider from '@atoms/utilities/ContextProvider.svelte';
    import ActiveTokenCard from '@features/account/ActiveTokenCard.svelte';
    import { setActiveTokenStore } from '@features/account/activeTokenStore.svelte';
    import { Story } from '../../../_components';

    const tokenTemplate: ActiveToken = {
        tokenHash: `${uuid()}`,
        kind: 'singleAccess',
        createdAt: new Date('2021-08-01T12:00:00Z'),
        expireAt: new Date('2022-08-01T12:00:00Z'),
        isExpired: true,
        agent: 'agent'
    };
    const sampleTokenList: ActiveToken[] = [
        {
            ...tokenTemplate,
            tokenHash: `${uuid()}`
        }
    ];

    let tokenList: ActiveToken[] = [
        {
            ...tokenTemplate,
            tokenHash: `${uuid()}`
        },
        {
            ...tokenTemplate,
            tokenHash: `${uuid()}`
        }
    ];
    const fetchTokenList = async () => {
        await async.delay(1000);
        return tokenList;
    };
    const revokeTokenList = async (tokenHash: string) => {
        await async.delay(1000);
        tokenList = tokenList.map((token) =>
            token.tokenHash === tokenHash ? { ...token, tokenHash: `${uuid()}` } : token
        );
    };
</script>

<Story variant="center">
    <ContextProvider
        use={() =>
            setActiveTokenStore({
                load: async.never,
                revoke: async.never
            })}
    >
        <ActiveTokenCard />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setActiveTokenStore({
                load: () => async.error(new Error('Test error')),
                revoke: async.never
            })}
    >
        <ActiveTokenCard />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setActiveTokenStore({
                load: async () => [
                    {
                        tokenHash: '1',
                        kind: 'singleAccess',
                        createdAt: new Date('2021-08-01T12:00:00Z'),
                        expireAt: new Date('2022-08-01T12:00:00Z'),
                        isExpired: true,
                        agent: 'agent'
                    },
                    {
                        tokenHash: '2',
                        kind: 'singleAccess',
                        createdAt: new Date('2021-08-01T12:00:00Z'),
                        expireAt: new Date('2032-08-01T12:00:00Z'),
                        isExpired: false,
                        agent: 'agent',
                        country: 'Hungary',
                        city: 'Budapest'
                    }
                ],
                revoke: () => async.resolved<void>(void 0)
            })}
    >
        <ActiveTokenCard />
    </ContextProvider>

    <Box border legend="Revoke from list">
        <ContextProvider
            use={() =>
                setActiveTokenStore({
                    load: fetchTokenList,
                    revoke: revokeTokenList
                })}
        >
            <ActiveTokenCard />
        </ContextProvider>
    </Box>

    <Box border legend="Revoke failure">
        <ContextProvider
            use={() =>
                setActiveTokenStore({
                    load: async () => sampleTokenList,
                    revoke: async () => {
                        await async.delay(1000);
                        await async.error(new Error('Test error'));
                    }
                })}
        >
            <ActiveTokenCard />
        </ContextProvider>
    </Box>
</Story>
