<script lang="ts">
    import type { LinkedIdentity } from '$lib/api/identity-api';
    import { async } from '$lib/utils';
    import { v4 as uuid } from 'uuid';
    import Box from '@atoms/Box.svelte';
    import ContextProvider from '@atoms/ContextProvider.svelte';
    import LinkedIdentityCard from '@features/account/LinkedIdentityCard.svelte';
    import { setLinkedIdentityStore } from '@features/account/linkedIdentityStore.svelte';
    import { Story } from '../../../_components';

    const template = {
        provider: 'google',
        providerUserId: '123456',
        linkedAt: new Date('2021-08-01T12:00:00Z'),
        email: 'john@example.com'
    };
    const providers = ['google', 'discord', 'gitlab'];

    let identityList: LinkedIdentity[] = [
        {
            ...template,
            provider: 'google',
            providerUserId: `${uuid()}`
        },
        {
            ...template,
            provider: 'discord',
            providerUserId: `${uuid()}`
        }
    ];
    const fetchIdentityList = async () => {
        await async.delay(1000);
        return identityList;
    };
    const unlinkIdentityList = async (provider: string, providerUserId: string) => {
        await async.delay(1000);
        identityList = identityList.map((identity) =>
            identity.provider === provider && identity.providerUserId === providerUserId
                ? { ...identity, providerUserId: `${uuid()}` }
                : identity
        );
    };

    const getLinkUrl = (provider: string, redirect: string): string => {
        return `#link_${provider}_${encodeURIComponent(redirect)}`;
    };
</script>

<Story variant="center">
    <ContextProvider
        use={() =>
            setLinkedIdentityStore({
                load: () => async.never(),
                unlink: () => async.resolved(void 0),
                getLinkUrl: getLinkUrl
            })}
    >
        <LinkedIdentityCard {providers} />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setLinkedIdentityStore({
                load: () => async.error(new Error('Test error')),
                unlink: () => async.resolved(void 0),
                getLinkUrl: getLinkUrl
            })}
    >
        <LinkedIdentityCard {providers} />
    </ContextProvider>

    <ContextProvider
        use={() =>
            setLinkedIdentityStore({
                load: async () => [
                    {
                        provider: 'google',
                        providerUserId: '123456',
                        linkedAt: new Date('2021-08-01T12:00:00Z'),
                        email: 'john@example.com'
                    },
                    {
                        provider: 'gitlab',
                        providerUserId: '123456',
                        linkedAt: new Date('2021-08-01T12:00:00Z'),
                        email: 'john@example.com'
                    },
                    {
                        provider: 'discord',
                        providerUserId: '123456',
                        linkedAt: new Date('2021-08-01T12:00:00Z'),
                        email: 'john@example.com'
                    }
                ],
                unlink: () => async.resolved(void 0),
                getLinkUrl: getLinkUrl
            })}
    >
        <LinkedIdentityCard {providers} />
    </ContextProvider>

    <Box border legend="Unlinking from list">
        <ContextProvider
            use={() =>
                setLinkedIdentityStore({
                    load: fetchIdentityList,
                    unlink: unlinkIdentityList,
                    getLinkUrl: getLinkUrl
                })}
        >
            <LinkedIdentityCard {providers} />
        </ContextProvider>
    </Box>

    <Box border legend="Unlinking failure">
        <ContextProvider
            use={() =>
                setLinkedIdentityStore({
                    load: async () => [
                        {
                            provider: 'google',
                            providerUserId: '123456',
                            linkedAt: new Date('2021-08-01T12:00:00Z'),
                            email: 'john@example.com'
                        }
                    ],
                    unlink: async () => {
                        await async.delay(1000);
                        await async.error(new Error('Test error'));
                    },
                    getLinkUrl: getLinkUrl
                })}
        >
            <LinkedIdentityCard {providers} />
        </ContextProvider>
    </Box>
</Story>
