<script lang="ts">
    import Button from '$atoms/Button.svelte';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import * as social from '$atoms/icons/social';
    import type { LinkedIdentity } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';

    interface Props {
        identity: LinkedIdentity;
        dataVersion: number;
        onUnlink?: (provider: string, providerUserId: string) => Promise<void>;
    }
    const { identity, dataVersion, onUnlink }: Props = $props();

    const ProviderImage = $derived.by(() => {
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

    let disableVersion = $state(0);
    const unlink = async () => {
        // memorize the current dataVersion to prevent multiple unlink requests
        disableVersion = dataVersion;
        await onUnlink?.(identity.provider, identity.providerUserId);
    };
</script>

<Card width="full">
    {#snippet icon()}
        <ProviderImage />
    {/snippet}

    <KeyValueTable
        size="xs"
        items={[
            {
                key: $t('account.provider'),
                value: identity.provider
            },
            {
                key: $t('account.providerUserId'),
                value: identity.providerUserId,
                class: 'break-all'
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
                      class: 'break-all'
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
        <Button disabled={disableVersion >= dataVersion} color="danger" onclick={unlink}>
            {$t('account.unlink')}
        </Button>
    {/snippet}
</Card>
