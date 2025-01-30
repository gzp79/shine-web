<script lang="ts">
    import ActiveTokensCard from '$lib/account/ActiveTokensCard.svelte';
    import type { ActiveToken } from '$lib/api/identity-api';
    import { logDesigner } from '$lib/loggers';
    import { async } from '$lib/utils';
    import { v4 as uuid } from 'uuid';
    import Story from '../../_components/_Story.svelte';

    // emulate some backend stored list
    let tokens: ActiveToken[] = $state([
        {
            tokenHash: `3 - remove - ${uuid()}`,
            kind: 'singleAccess',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: true,
            agent: 'agent'
        },
        {
            tokenHash: '1 - updated properties',
            kind: 'persistent',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2032-08-01T12:00:00Z'),
            isExpired: false,
            agent: 'agent'
        },
        {
            tokenHash: `2 - fail - ${uuid()}`,
            kind: 'access',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: true,
            agent: 'agent'
        },
        {
            tokenHash: `3 - remove - ${uuid()}`,
            kind: 'access',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: false,
            agent: 'agent',
            country: 'Hungary',
            region: 'Pest',
            city: 'Vác'
        },
        {
            tokenHash: `3 - remove - ${uuid()}`,
            kind: 'access',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: false,
            agent: 'agent',
            country: 'Hungary',
            city: 'Budapest'
        },
        {
            tokenHash: `3 - remove - ${uuid()}`,
            kind: 'access',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: false,
            agent: 'agent',
            country: 'Hungary'
        }
    ]);

    const fetchTokens = async (tokens: ActiveToken[]): Promise<ActiveToken[]> => {
        await async.delay(1000);
        return tokens;
    };

    const revoke = async (tokenHash: string): Promise<void> => {
        logDesigner(`Revoking token: ${tokenHash}`);

        logDesigner('Emulating a longer backend call');
        await async.delay(2000);

        const token = tokens.find((i) => i.tokenHash === tokenHash);
        if (!token) {
            logDesigner('Element not found, no change');
            return;
        }

        if (tokenHash.startsWith('1')) {
            logDesigner('Emulate a change in the tokens');

            tokens = [
                {
                    ...token,
                    tokenHash: `1 - ${uuid()}`
                },
                ...tokens.filter((i) => i.tokenHash !== tokenHash)
            ];
        } else if (tokenHash.startsWith('2')) {
            logDesigner('Emulate a failed revoke');
            tokens = [...tokens];
        } else if (tokenHash.startsWith('3')) {
            logDesigner('Emulate a successful revoke');
            tokens = tokens.filter((i) => i.tokenHash !== tokenHash);
        }
    };
</script>

<Story variant="center">
    <ActiveTokensCard tokens={() => fetchTokens(tokens)} onRevoke={revoke} />
    <ActiveTokensCard tokens={async.never} onRevoke={revoke} />
    <ActiveTokensCard tokens={() => async.error(new Error('Test error'))} onRevoke={revoke} />
</Story>
