<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { LinkedIdentity } from '$src/lib/api/identity-api';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import * as social from '$atoms/icons/social';
    import Button from '$atoms/Button.svelte';
    import Card from '$atoms/Card.svelte';

    interface Props {
        identity: LinkedIdentity;
        dataVersion: number;
        onUnlink: (provider: string, providerUserId: string) => Promise<void>;
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
        await onUnlink(identity.provider, identity.providerUserId);
    };
</script>

<Card cardClass="w-full">
    {#snippet icon()}
        <ProviderImage />
    {/snippet}

    <KeyValueTable
        size="xs"
        items={[
            [$t('account.provider'), identity.provider],
            [$t('account.providerUserId'), identity.providerUserId],
            identity.name ? [$t('account.userName'), identity.name] : null,
            identity.email ? [$t('account.email'), identity.email] : null,
            [
                $t('account.linkDate'),
                $t(
                    'common.dateTime',
                    { value: identity.linkedAt },
                    { date: { dateStyle: 'long', timeStyle: 'medium' } }
                )
            ]
        ]}
    />

    {#snippet actions()}
        <Button disabled={disableVersion >= dataVersion} color="danger" onclick={unlink}>
            {$t('account.unlink')}
        </Button>
    {/snippet}
</Card>
