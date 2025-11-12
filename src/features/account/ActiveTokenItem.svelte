<script lang="ts">
    import type { ActiveToken } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { formatLocation } from '$lib/i18n/utils';
    import Button from '@atoms/Button.svelte';
    import KeyValueTable from '@atoms/data/PropertyList.svelte';
    import Card from '@atoms/layouts/Card.svelte';
    import { getActiveTokenStore } from './activeTokenStore.svelte';

    interface Props {
        token: ActiveToken;
    }
    const { token }: Props = $props();

    const location = $derived(formatLocation(token));
    const tokenStore = getActiveTokenStore();

    const revoke = () => {
        tokenStore.revoke(token.tokenHash);
    };
</script>

<Card width="full">
    <KeyValueTable
        size="xs"
        items={[
            {
                key: $t('account.tokenHash'),
                value: token.tokenHash,
                valueClass: 'break-all'
            },
            {
                key: $t('account.tokenKind'),
                value: token.kind
            },
            {
                key: $t('account.activeStatus'),
                value: token.isExpired ? $t('account.expired') : $t('account.active'),
                valueClass: token.isExpired ? 'bg-warning text-on-warning px-1' : ''
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
        <Button disabled={tokenStore.isDirty} color="danger" onclick={revoke}>
            {$t('common.revoke')}
        </Button>
    {/snippet}
</Card>
