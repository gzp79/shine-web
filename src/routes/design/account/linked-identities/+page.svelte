<script lang="ts">
    import LinkedIdentitiesCard from '$lib/account/LinkedIdentitiesCard.svelte';
    import type { LinkedIdentity } from '$lib/api/identity-api';
    import { logDesigner } from '$lib/loggers';
    import { async } from '$lib/utils';
    import { v4 as uuid } from 'uuid';
    import Story from '../../_components/_Story.svelte';

    // emulate some backend stored list
    let identities: LinkedIdentity[] = $state([
        {
            provider: 'google',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            email: 'john@example.com'
        },
        {
            provider: 'google',
            providerUserId: '2 - unlink fail',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            email: 'john@example.com'
        },
        {
            provider: 'google',
            providerUserId: '3 - simple remove',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            name: 'John Doe - remove'
        },
        {
            provider: 'github',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        },
        {
            provider: 'gitlab',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        },
        {
            provider: 'gitlab',
            providerUserId: '3 - simple remove',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            name: 'remove'
        },
        {
            provider: 'twitter',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        },
        {
            provider: 'twitter',
            providerUserId: '3 - simple remove',
            linkedAt: new Date('2021-08-01T12:13:14Z'),
            name: 'remove'
        },
        {
            provider: 'something',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        }
    ]);

    const fetchIdentities = async (identities: LinkedIdentity[]): Promise<LinkedIdentity[]> => {
        await async.delay(1000);
        return identities;
    };

    const unlink = async (provider: string, providerUserId: string): Promise<void> => {
        logDesigner(`Unlinking identity: ${provider}/${providerUserId}`);

        logDesigner('Emulating a longer backend call');
        await async.delay(2000);

        if (identities.every((i) => i.provider !== provider || i.providerUserId !== providerUserId)) {
            logDesigner('Element not found, no change');
            return;
        }

        if (providerUserId.startsWith('1')) {
            logDesigner('Emulate a change in the identities and add new linked identity');
            identities = [
                {
                    provider,
                    providerUserId: `1 - ${uuid()}`,
                    linkedAt: new Date('2021-08-01T12:00:00Z'),
                    email: 'john@example.com'
                },
                ...identities.filter((i) => i.provider !== provider || i.providerUserId !== providerUserId)
            ];
        } else if (providerUserId.startsWith('2')) {
            logDesigner('Emulate an unlink fail when no changes are made');
            identities = [...identities];
        } else if (providerUserId.startsWith('3')) {
            logDesigner('Emulate a successful unlink when the selected identity is removed');
            identities = identities.filter((i) => i.provider !== provider || i.providerUserId !== providerUserId);
        }
    };
</script>

<Story variant="center">
    <LinkedIdentitiesCard
        identities={() => fetchIdentities(identities)}
        onUnlink={unlink}
        onLink={() => logDesigner('linking')}
    />
    <LinkedIdentitiesCard identities={async.never} onUnlink={unlink} onLink={() => logDesigner('linking')} />
    <LinkedIdentitiesCard
        identities={() => async.error(new Error('Test error'))}
        onUnlink={unlink}
        onLink={() => logDesigner('linking')}
    />
</Story>
