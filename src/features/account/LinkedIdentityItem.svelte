<script lang="ts">
    import type { LinkedIdentity } from '@lib/api/identity-api';
    import { t } from '@lib/i18n/i18n.svelte';
    import PropertyList from '@atoms/data/PropertyList.svelte';
    import * as social from '@atoms/icons/social';
    import Button from '@atoms/inputs/Button.svelte';
    import Card from '@atoms/layouts/Card.svelte';
    import { getLinkedIdentityStore } from './linkedIdentityStore.svelte';

    interface Props {
        identity: LinkedIdentity;
    }
    const { identity }: Props = $props();

    const identityStore = getLinkedIdentityStore();
    const providerImage = $derived.by(() => {
        switch (identity.provider) {
            case 'twitter':
                return social.Twitter;
            case 'google':
                return social.Google;
            case 'github':
                return social.Github;
            case 'discord':
                return social.Discord;
            default:
                return null;
        }
    });

    const unlink = () => {
        identityStore.unlink(identity.provider, identity.providerUserId);
    };
</script>

<Card width="full">
    {#snippet icon()}
        {@const ProviderImage = providerImage}
        <ProviderImage />
    {/snippet}

    <PropertyList
        size="xs"
        items={[
            {
                key: $t('account.provider'),
                value: identity.provider
            },
            {
                key: $t('account.providerUserId'),
                value: identity.providerUserId,
                valueClass: 'break-all'
            },
            identity.name
                ? {
                      key: $t('account.userName'),
                      value: identity.name
                  }
                : null,
            identity.email
                ? {
                      key: $t('account.email'),
                      value: identity.email,
                      valueClass: 'break-all'
                  }
                : null,
            {
                key: $t('account.linkDate'),
                value: $t(
                    'common.dateTime',
                    { value: identity.linkedAt },
                    { date: { dateStyle: 'long', timeStyle: 'medium' } }
                )
            }
        ]}
    />

    {#snippet actions()}
        <Button disabled={identityStore.isDirty} color="danger" onclick={unlink}>
            {$t('account.unlink')}
        </Button>
    {/snippet}
</Card>
