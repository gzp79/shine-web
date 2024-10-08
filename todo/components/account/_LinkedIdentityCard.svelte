<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { LinkedIdentity } from '$src/lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import { Discord, Github, Google, Twitter } from '$src/components/atoms/icons/social';
    import Button from '$atoms/Button.svelte';

    interface Props {
        identity: LinkedIdentity;
        dataVersion: number;
        onUnlink: (provider: string, providerUserId: string) => Promise<void>;
    }
    const { identity, dataVersion, onUnlink }: Props = $props();

    const ProviderImage = $derived.by(() => {
        switch (identity.provider) {
            case 'twitter':
                return Twitter;
            case 'google':
                return Google;
            case 'github':
                return Github;
            case 'discord':
                return Discord;
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

<Card variant="data">
    {#snippet image()}
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

    {#snippet action()}
        <Button label={$t('account.unlink')} disabled={disableVersion >= dataVersion} color="error" onclick={unlink} />
    {/snippet}
</Card>
