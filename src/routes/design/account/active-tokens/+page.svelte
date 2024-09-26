<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import ActiveTokensCard from '$components/account/ActiveTokensCard.svelte';
    import { async } from '$lib/utils';
    import type { ActiveToken } from '$src/lib/api/identity-api';
    import { logDesigner } from '$src/lib/loggers';

    // emulate some backend stored list
    let tokens: ActiveToken[] = $state([
        {
            tokenFingerprint: `3 - remove - ${uuid()}`,
            kind: 'singleAccess',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: true,
            agent: 'agent'
        },
        {
            tokenFingerprint: '1 - updated properties',
            kind: 'persistent',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2032-08-01T12:00:00Z'),
            isExpired: false,
            agent: 'agent'
        },
        {
            tokenFingerprint: `2 - fail - ${uuid()}`,
            kind: 'access',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: true,
            agent: 'agent'
        },
        {
            tokenFingerprint: `3 - remove - ${uuid()}`,
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
            tokenFingerprint: `3 - remove - ${uuid()}`,
            kind: 'access',
            createdAt: new Date('2021-08-01T12:00:00Z'),
            expireAt: new Date('2022-08-01T12:00:00Z'),
            isExpired: false,
            agent: 'agent',
            country: 'Hungary',
            city: 'Budapest'
        },
        {
            tokenFingerprint: `3 - remove - ${uuid()}`,
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

    const revoke = async (tokenFingerprint: string): Promise<void> => {
        logDesigner(`Revoking token: ${tokenFingerprint}`);

        logDesigner('Emulating a longer backend call');
        await async.delay(2000);

        const token = tokens.find((i) => i.tokenFingerprint === tokenFingerprint);
        if (!token) {
            logDesigner('Element not found, no change');
            return;
        }

        if (tokenFingerprint.startsWith('1')) {
            logDesigner('Emulate a change in the tokens');

            tokens = [
                {
                    ...token,
                    tokenFingerprint: `1 - ${uuid()}`
                },
                ...tokens.filter((i) => i.tokenFingerprint !== tokenFingerprint)
            ];
        } else if (tokenFingerprint.startsWith('2')) {
            logDesigner('Emulate a failed revoke');
            tokens = [...tokens];
        } else if (tokenFingerprint.startsWith('3')) {
            logDesigner('Emulate a successful revoke');
            tokens = tokens.filter((i) => i.tokenFingerprint !== tokenFingerprint);
        }
    };
</script>

<ActiveTokensCard tokens={fetchTokens(tokens)} onRevoke={revoke} />
<ActiveTokensCard tokens={async.never()} onRevoke={revoke} />
<ActiveTokensCard tokens={async.error(new Error('Test error'))} onRevoke={revoke} />
