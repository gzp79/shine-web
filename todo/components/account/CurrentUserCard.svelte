<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { CurrentUser } from '$src/lib/api/identity-api';
    import Button from '$atoms/Button.svelte';
    import Card from '$atoms/Card.svelte';
    import { Warning } from '$atoms/icons/common';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import Alert from '../atoms/Alert.svelte';
    import LoadingCard from '../atoms/LoadingCard.svelte';
    import ErrorCard from '../atoms/ErrorCard.svelte';
    import ResourceFetch from '../atoms/ResourceFetch.svelte';
    import { type AppError } from '$src/lib/utils';

    interface Props {
        user: CurrentUser | Promise<CurrentUser>;
        onLogout?: string | (() => void);
        onLogoutAll?: string | (() => void);
    }
    const { user, onLogout: logout, onLogoutAll: logoutAll }: Props = $props();
    let isLoading = $state(true);
</script>

<Card caption={$t('account.userInfo')} variant="top">
    <ResourceFetch fetch={user} onState={(state) => (isLoading = state == 'loading')}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        <!-- todo: generic fails on svelte-check -->
        <!-- eslint-disable @typescript-eslint/no-explicit-any -->
        {#snippet content(user: /*CurrentUser*/ any, _isDirty: boolean)}
            {#if !user.isLinked}
                <Alert variant="warning" text={$t('account.linkWarning')} />
            {/if}

            {#snippet email()}
                {#if user.email}
                    {user.email}
                    {#if user.isEmailConfirmed}
                        <Warning color="warning" size="sm" class="inline-block" />
                    {/if}
                {:else}
                    <span class="text-warning">{$t('account.noEmail')}</span>
                {/if}
            {/snippet}

            <KeyValueTable
                size="xs"
                items={[
                    [$t('account.userName'), user.name],
                    [$t('account.userId'), user.userId],
                    [$t('account.email'), email],
                    [$t('account.role'), user.roles.join(', ')]
                ]}
            />
        {/snippet}

        {#snippet error(err: AppError)}
            <ErrorCard error={err} />
        {/snippet}
    </ResourceFetch>

    {#snippet action()}
        {#if typeof logout == 'function'}
            <Button label={$t('account.logout')} disabled={isLoading} onclick={logout} />
        {:else if typeof logout == 'string'}
            <Button label={$t('account.logout')} disabled={isLoading} href={logout} />
        {/if}

        {#if typeof logoutAll == 'function'}
            <Button label={$t('account.logoutAll')} disabled={isLoading} onclick={logoutAll} />
        {:else if typeof logoutAll == 'string'}
            <Button label={$t('account.logoutAll')} disabled={isLoading} href={logoutAll} />
        {/if}
    {/snippet}
</Card>
