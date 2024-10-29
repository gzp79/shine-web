<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { CurrentUser } from '$lib/api/identity-api';
    import { type AppError } from '$lib/utils';
    import { Warning } from '$atoms/icons/common';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import Card from '$atoms/Card.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import Alert from '$atoms/Alert.svelte';
    import ComboButton from '$atoms/ComboButton.svelte';

    interface Props {
        user: CurrentUser | Promise<CurrentUser>;
        onLogout?: string | (() => void);
        onLogoutAll?: string | (() => void);
    }
    const { user, onLogout: logout, onLogoutAll: logoutAll }: Props = $props();
    let isLoading = $state(true);

    let logoutAction = $derived(typeof logout === 'string' ? { href: logout } : { onclick: logout });
    let logoutAllAction = $derived(typeof logoutAll === 'string' ? { href: logoutAll } : { onclick: logoutAll });
</script>

<Card caption={$t('account.userInfo')}>
    <ResourceFetch fetch={user} onState={(state) => (isLoading = state !== 'completed')}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        <!-- todo: generic fails on svelte-check -->
        <!-- eslint-disable @typescript-eslint/no-explicit-any -->
        {#snippet content(user: /*CurrentUser*/ any, _isDirty: boolean)}
            {#if !user.isLinked}
                <Alert variant="warning" caption={$t('account.linkWarning')} />
            {/if}

            {#snippet email()}
                {#if user.email}
                    {#if user.isEmailConfirmed}
                        <Warning color="warning" size="sm" class="inline-block" />
                    {/if}
                    {user.email}
                    {#if user.isEmailConfirmed}
                        <Warning color="warning" size="sm" class="inline-block" />
                    {/if}
                {:else}
                    <i class="text-warning">{$t('account.noEmail')}</i>
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
            <div class="self-center">
                <ErrorCard error={err} />
            </div>
        {/snippet}
    </ResourceFetch>

    {#snippet actions()}
        <ComboButton
            disabled={isLoading}
            items={[
                { caption: $t('account.logout'), ...logoutAction },
                { caption: $t('account.logoutAll'), ...logoutAllAction }
            ]}
        />
    {/snippet}
</Card>
