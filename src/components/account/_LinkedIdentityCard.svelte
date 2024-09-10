<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { LinkedIdentity } from '$src/lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import { Discord, Github, Google, Twitter } from '$atoms/icons/idps';
    import Button from '$atoms/Button.svelte';

    interface Props {
        identity: LinkedIdentity;
        dataVersion: number;
        onUnlink: (provider: string, providerUserId: string) => Promise<void>;
    }
    const { identity, dataVersion, onUnlink }: Props = $props();

    const providerImage = $derived.by(() => {
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

    // Using disableVersion and dataVersion, we can prevent multiple unlink requests by disabling the button until the list refresh has been completed.
    let disableVersion = $state(0);
    const unlink = async () => {
        // memorize the current dataVersion to prevent multiple unlink requests
        disableVersion = dataVersion;
        await onUnlink(identity.provider, identity.providerUserId);
    };
</script>

<Card variant="data">
    {#snippet image()}
        <svelte:component this={providerImage} />
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
        <Button label="Unlink" disabled={disableVersion >= dataVersion} color="error" onclick={unlink} />
    {/snippet}
</Card>
