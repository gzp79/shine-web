<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { ActiveToken } from '$src/lib/api/identity-api';
    import { formatLocation } from '$src/lib/i18n/utils';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import Button from '../atoms/Button.svelte';

    interface Props {
        token: ActiveToken;
        dataVersion: number;
        onRevoke: (tokenFingerprint: string) => Promise<void>;
    }
    const { token, dataVersion, onRevoke }: Props = $props();

    let revokeVersion = $state(0);
    const revoke = async () => {
        // memorize the current dataVersion to prevent multiple revoke requests
        revokeVersion = dataVersion;
        await onRevoke(token.tokenFingerprint);
    };

    const location = $derived(formatLocation(token));
</script>

<Card variant="data">
    <KeyValueTable
        size="xs"
        items={[
            [$t('account.tokenFingerprint'), token.tokenFingerprint],
            [$t('account.tokenKind'), token.kind],
            [$t('account.activeStatus'), token.isExpired ? $t('account.active') : $t('account.expired')],
            [
                $t('account.creationDate'),
                $t('common.dateTime', { value: token.createdAt }, { date: { dateStyle: 'long', timeStyle: 'medium' } })
            ],
            [
                $t('account.expirationDate'),
                $t('common.dateTime', { value: token.expireAt }, { date: { dateStyle: 'long', timeStyle: 'medium' } })
            ],
            [$t('account.location'), location]
        ]}
    />

    {#snippet action()}
        <Button label={$t('account.revoke')} disabled={revokeVersion >= dataVersion} color="error" onclick={revoke} />
    {/snippet}
</Card>
