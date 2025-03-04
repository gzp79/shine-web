<script lang="ts">
    import Alert from '$atoms/Alert.svelte';
    import Card from '$atoms/Card.svelte';
    import ComboButton from '$atoms/ComboButton.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ResourceFetch, { type Status } from '$atoms/ResourceFetch.svelte';
    import * as icons from '$atoms/icons/common';
    import Button from '$components/atoms/Button.svelte';
    import type { CurrentUser } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { type AppError } from '$lib/utils';

    interface Props {
        user: () => Promise<CurrentUser>;
        onConfirmEmail?: string | (() => void);
        onLogout?: string | (() => void);
        onLogoutAll?: string | (() => void);
    }
    const { user, onConfirmEmail: confirmEmail, onLogout: logout, onLogoutAll: logoutAll }: Props = $props();

    let fetchLoading = $state<Status>('loading');
    let disableActions = $derived(fetchLoading !== 'completed');

    let confirmEmailAction = $derived(
        typeof confirmEmail === 'string' ? { href: confirmEmail } : { onclick: confirmEmail }
    );
    let logoutAction = $derived(typeof logout === 'string' ? { href: logout } : { onclick: logout });
    let logoutAllAction = $derived(typeof logoutAll === 'string' ? { href: logoutAll } : { onclick: logoutAll });
</script>

<Card caption={$t('account.userInfo')}>
    <ResourceFetch fetch={user} bind:status={fetchLoading}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        {#snippet content(user: CurrentUser, _isDirty: boolean)}
            {#if !user.isLinked}
                <Alert variant="warning" caption={$t('account.linkWarning')} />
            {/if}

            {#snippet email()}
                {#if user.email}
                    <div class="flex items-center space-x-2">
                        {user.email}
                        {#if !user.isEmailConfirmed}
                            {#if confirmEmail}
                                <Button startIcon={icons.Warning} color="warning" size="sm" {...confirmEmailAction}>
                                    {$t('account.confirm')}
                                </Button>
                            {:else}
                                <icons.Warning color="warning" size="sm" class="inline-block mx-2" />
                            {/if}
                        {/if}
                    </div>
                {:else}
                    <i class="bg-warning text-on-warning">{$t('account.noEmail')}</i>
                {/if}
            {/snippet}

            <KeyValueTable
                size="xs"
                items={[
                    { key: $t('account.userName'), value: user.name, class: 'break-all' },
                    { key: $t('account.userId'), value: user.userId, class: 'break-all' },
                    { key: $t('account.email'), value: email },
                    { key: $t('account.role'), value: user.roles.join(', ') }
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
            disabled={disableActions}
            items={[
                { caption: $t('account.logout'), ...logoutAction },
                { caption: $t('account.logoutAll'), ...logoutAllAction }
            ]}
        />
    {/snippet}
</Card>
