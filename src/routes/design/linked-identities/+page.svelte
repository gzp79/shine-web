<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import LinkedIdentitiesCard from '$src/components/account/LinkedIdentitiesCard.svelte';
    import { delay } from '$src/lib/utils';
    import { ActiveLinkedIdentity } from '$src/components/account/LinkedIdentityCard.svelte';

    let identities: ActiveLinkedIdentity[] = $state([
        new ActiveLinkedIdentity({
            provider: 'google',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            email: 'john@example.com'
        }),
        new ActiveLinkedIdentity({
            provider: 'google',
            providerUserId: '2 - unlink fail',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            email: 'john@example.com'
        }),
        new ActiveLinkedIdentity({
            provider: 'google',
            providerUserId: '3 - simple remove',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            name: 'John Doe - remove'
        }),
        new ActiveLinkedIdentity({
            provider: 'github',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        }),
        new ActiveLinkedIdentity({
            provider: 'gitlab',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        }),
        new ActiveLinkedIdentity({
            provider: 'gitlab',
            providerUserId: '3 - simple remove',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            name: 'remove'
        }),
        new ActiveLinkedIdentity({
            provider: 'twitter',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        }),
        new ActiveLinkedIdentity({
            provider: 'twitter',
            providerUserId: '3 - simple remove',
            linkedAt: new Date('2021-08-01T12:00:00Z'),
            name: 'remove'
        }),
        new ActiveLinkedIdentity({
            provider: 'something',
            providerUserId: '1 - updated properties',
            linkedAt: new Date('2021-08-01T12:00:00Z')
        })
    ]);

    const unlink = async (id: ActiveLinkedIdentity): Promise<void> => {
        console.log(`Unlinking: ${id.provider}/${id.providerUserId}`);

        console.log('Emulating a longer backend call');
        await delay(2000);

        if (id.providerUserId.startsWith('1')) {
            console.log('Emulate a change in the identities');
            id.name = uuid();
            id.disableUnlink = false;
        } else if (id.providerUserId.startsWith('2')) {
            console.log('Emulate that unlink failed and no changes were made');
            id.disableUnlink = false;
        } else if (id.providerUserId.startsWith('3')) {
            console.log('Emulate that the selected identity has been removed');
            identities = identities.filter((i) => i.provider !== id.provider || i.providerUserId !== id.providerUserId);
        }
    };
</script>

<LinkedIdentitiesCard {identities} onUnlink={unlink} />
