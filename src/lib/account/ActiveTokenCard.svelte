<script lang="ts">
    import Button from '$atoms/Button.svelte';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import type { ActiveToken } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { formatLocation } from '$lib/i18n/utils';

    interface Props {
        token: ActiveToken;
        dataVersion: number;
        onRevoke: (tokenHash: string) => Promise<void>;
    }
    const { token, dataVersion, onRevoke }: Props = $props();

    let revokeVersion = $state(0);
    const revoke = async () => {
        // memorize the current dataVersion to prevent multiple revoke requests
        revokeVersion = dataVersion;
        await onRevoke(token.tokenHash);
    };

    const location = $derived(formatLocation(token));
</script>

<Card width="full">
    <KeyValueTable
        size="xs"
        items={[
            {
                key: $t('account.tokenHash'),
                value: token.tokenHash,
                class: 'break-all'
            },
            {
                key: $t('account.tokenKind'),
                value: token.kind
            },
            {
                key: $t('account.activeStatus'),
                value: token.isExpired ? $t('account.expired') : $t('account.active'),
                class: token.isExpired ? 'bg-warning text-on-warning px-1' : ''
            },
            {
                key: $t('account.creationDate'),
                value: $t(
                    'common.dateTime',
                    { value: token.createdAt },
                    { date: { dateStyle: 'long', timeStyle: 'medium' } }
                )
            },
            {
                key: $t('account.expirationDate'),
                value: $t(
                    'common.dateTime',
                    { value: token.expireAt },
                    { date: { dateStyle: 'long', timeStyle: 'medium' } }
                )
            },
            {
                key: $t('account.location'),
                value: location
            }
        ]}
    />

    {#snippet actions()}
        <Button disabled={revokeVersion >= dataVersion} color="danger" onclick={revoke}>{$t('account.revoke')}</Button>
    {/snippet}
</Card>
