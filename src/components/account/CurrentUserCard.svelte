<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { CurrentUser } from '$src/lib/api/identity-api';
    import { type AppError } from '$src/lib/utils';
    import Button from '$atoms/Button.svelte';
    import { Warning } from '$atoms/icons/common';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ResourceFetch from '$atoms/ResourceFetch.svelte';
    import IconCard from '$atoms/IconCard.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import Alert from '$atoms/Alert.svelte';

    interface Props {
        user: CurrentUser | Promise<CurrentUser>;
        onLogout?: string | (() => void);
        onLogoutAll?: string | (() => void);
    }
    const { user, onLogout: logout, onLogoutAll: logoutAll }: Props = $props();
    let isLoading = $state(true);
</script>

<IconCard caption={$t('account.userInfo')}>
    <ResourceFetch fetch={user} onState={(state) => (isLoading = state == 'loading')}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        <!-- todo: generic fails on svelte-check -->
        <!-- eslint-disable @typescript-eslint/no-explicit-any -->
        {#snippet content(user: /*CurrentUser*/ any, _isDirty: boolean)}
            {#if !user.isLinked}
                <Alert ghost variant="warning" text={$t('account.linkWarning')} />
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

    {#snippet actions()}
        {#if typeof logout == 'function'}
            <Button disabled={isLoading} onclick={logout}>
                {$t('account.logout')}
            </Button>
        {:else if typeof logout == 'string'}
            <Button disabled={isLoading} href={logout}>
                {$t('account.logout')}
            </Button>
        {/if}

        {#if typeof logoutAll == 'function'}
            <Button disabled={isLoading} onclick={logoutAll}>
                {$t('account.logoutAll')}
            </Button>
        {:else if typeof logoutAll == 'string'}
            <Button disabled={isLoading} href={logoutAll}>
                {$t('account.logoutAll')}
            </Button>
        {/if}
    {/snippet}
</IconCard>
