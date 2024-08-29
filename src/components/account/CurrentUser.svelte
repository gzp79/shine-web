<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { CurrentUser } from '$src/lib/api/identity_api';
    import Button from '../atoms/Button.svelte';
    import Card from '../atoms/Card.svelte';
    import KeyValueTable from '../atoms/KeyValueTable.svelte';

    interface Props {
        user: CurrentUser;
        logout?: string | (() => void);
        logoutAll?: string | (() => void);
    }
    const { user, logout, logoutAll }: Props = $props();
</script>

<Card caption={$t('account.userInfo')} variant="top">
    <KeyValueTable
        size="xs"
        items={[
            [$t('account.userName'), user.name],
            [$t('account.userId'), user.userId],
            //[$t('account.email'), Email(None, false)],
            [$t('account.role'), user.roles.join(', ')]
        ]}
    />

    {#snippet action()}
        {#if typeof logout == 'function'}
            <Button label={$t('account.logout')} onclick={logout} />
        {:else if typeof logout == 'string'}
            <Button label={$t('account.logout')} href={logout} />
        {/if}

        {#if typeof logoutAll == 'function'}
            <Button label={$t('account.logoutAll')} onclick={logoutAll} />
        {:else if typeof logoutAll == 'string'}
            <Button label={$t('account.logoutAll')} href={logoutAll} />
        {/if}
    {/snippet}
</Card>
