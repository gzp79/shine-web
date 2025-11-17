<script lang="ts">
    import type { CurrentUser } from '@lib/api/identity-api';
    import { t } from '@lib/i18n/i18n.svelte';
    import { FetchError } from '@lib/utils';
    import Typography from '@atoms/Typography.svelte';
    import PropertyList from '@atoms/data/PropertyList.svelte';
    import { Spinner } from '@atoms/icons/animated';
    import { Warning } from '@atoms/icons/common';
    import Button from '@atoms/inputs/Button.svelte';
    import ComboButton from '@atoms/inputs/ComboButton.svelte';
    import ValidatedTextArea from '@atoms/inputs/ValidatedTextArea.svelte';
    import Card from '@atoms/layouts/Card.svelte';
    import Modal from '@atoms/layouts/Modal.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import { EmailSchema } from '@atoms/types/validator';
    import Alert from '@components/Alert.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import LoadingCard from '@components/LoadingCard.svelte';
    import { getCurrentUserStore } from './currentUserStore.svelte';

    // Initialize store and trigger refresh on mount
    const currentUserStore = getCurrentUserStore();

    const service = $derived(currentUserStore.service);
    const user = $derived(currentUserStore.isAuthenticated ? currentUserStore.content : null);
    const isUserReady = $derived(!currentUserStore.isDirty && user != null);

    const logoutUrl = $derived(service.getLogoutUrl(false, '/'));
    const logoutAllUrl = $derived(service.getLogoutUrl(true, '/'));

    type EmailStatus = 'none' | 'waitingResponse' | 'gettingNewEmail' | 'gettingAcknowledge' | 'complete' | FetchError;
    type EmailOp = 'confirm' | 'update';

    let emailStatus = $state<EmailStatus>('none');
    let emailOp = $state<EmailOp>('confirm');
    let newEmail = $state('');
    let isEmailValid = $state(false);

    const isModalOpen = $derived(emailStatus !== 'none' && emailStatus !== 'complete');

    async function startEmailConfirmation() {
        if (emailStatus === 'complete') {
            // Allow multiple clicks when already complete - just show new email dialog with the previous email operation
            emailStatus = 'gettingAcknowledge';
            return;
        }

        emailOp = 'confirm';
        emailStatus = 'waitingResponse';
        try {
            await service.startEmailConfirmation();
            emailStatus = 'gettingAcknowledge';
        } catch (error) {
            emailStatus =
                error instanceof FetchError
                    ? error
                    : new FetchError('Unknown error', { status: 500, body: 'Unknown error' });
        }
    }

    function startEmailChange() {
        if (emailStatus === 'complete') {
            // Allow multiple clicks when already complete - just show new email dialog with the previous email operation
            emailStatus = 'gettingAcknowledge';
            return;
        }

        emailOp = 'update';
        emailStatus = 'gettingNewEmail';
        newEmail = '';
        isEmailValid = false;
    }

    async function submitEmailChange() {
        if (emailStatus !== 'gettingNewEmail' || !isEmailValid) return;

        emailStatus = 'waitingResponse';
        try {
            await service.startEmailChange(newEmail);
            emailStatus = 'gettingAcknowledge';
        } catch (error) {
            emailStatus =
                error instanceof FetchError
                    ? error
                    : new FetchError('Unknown error', { status: 500, body: 'Unknown error' });
        }
    }

    function cancelEmailChange() {
        emailStatus = 'none';
        newEmail = '';
        isEmailValid = false;
    }

    function clearEmailError() {
        emailStatus = 'none';
    }

    function finishEmailOperation() {
        emailStatus = 'complete';
    }

    $effect(() => {
        // on mount, refresh user info
        currentUserStore.refresh();
    });
    $effect(() => {
        // when user changes, reset email status
        let _ = currentUserStore.content;
        emailStatus = 'none';
    });
</script>

{#snippet emailSection(user: CurrentUser)}
    <div class="flex flex-col sm:flex-row space-y-1">
        <div class="flex items-center space-x-2">
            {#if user.details.email}
                {#if !user.isEmailConfirmed}
                    <Warning size="sm" color="warning" />
                {/if}
                <span class="me-2">{user.details.email}</span>
            {:else}
                <span class="bg-warning text-on-warning px-1 me-2">{$t('account.noEmail')}</span>
            {/if}
        </div>

        <div class="flex justify-start ms-8 sm:ms-0">
            {#if user.details.email && !user.isEmailConfirmed}
                <ComboButton
                    size="xs"
                    disabled={!isUserReady}
                    items={[
                        { caption: $t('common.confirm'), onclick: startEmailConfirmation },
                        { caption: $t('common.update'), onclick: startEmailChange }
                    ]}
                />
            {:else}
                <Button size="xs" disabled={!isUserReady} onclick={startEmailChange}>
                    {$t('common.update')}
                </Button>
            {/if}
        </div>
    </div>
{/snippet}

<Card width="big" caption={$t('account.userInfo')}>
    {#if currentUserStore.isEmpty}
        <LoadingCard />
    {:else if currentUserStore.isError}
        <ErrorCard error={currentUserStore.error} />
    {:else if user}
        {#snippet emailValue()}
            {@render emailSection(user)}
        {/snippet}
        <Stack>
            {#if !user.isLinked}
                <Alert variant="warning" caption={$t('account.linkWarning')} />
            {/if}

            <PropertyList
                size="xs"
                wide
                items={[
                    { key: $t('account.userName'), value: user.name, valueClass: 'break-all' },
                    { key: $t('account.userId'), value: user.userId, valueClass: 'break-all' },
                    { key: $t('account.email'), value: emailValue },
                    { key: $t('account.role'), value: user.roles.join(', ') },
                    {
                        key: $t('account.registrationDate'),
                        value: $t('common.dateTime', { value: user.details.createdAt }, { date: { dateStyle: 'long' } })
                    }
                ]}
            />
        </Stack>
    {/if}

    {#snippet actions()}
        <ComboButton
            disabled={!isUserReady}
            items={[
                { caption: $t('account.logout'), href: logoutUrl },
                { caption: $t('account.logoutAll'), href: logoutAllUrl }
            ]}
        />
    {/snippet}
</Card>

<Modal caption={$t(`account.emailModal.${emailOp}.title`)} open={isModalOpen}>
    {#if emailStatus instanceof FetchError}
        <ErrorCard error={emailStatus} />
        <div class="flex justify-end space-x-2">
            <Button onclick={clearEmailError}>{$t('common.ok')}</Button>
        </div>
    {:else if emailStatus === 'waitingResponse'}
        <Typography variant="text" class="w-full text-justify">
            {$t(`account.emailModal.${emailOp}.waiting`)}
        </Typography>
        <div class="flex justify-end space-x-2">
            <Button disabled startIcon={Spinner}>
                {$t('common.ok')}
            </Button>
        </div>
    {:else if emailStatus === 'gettingNewEmail'}
        <Card>
            <ValidatedTextArea
                rows="single"
                placeholder={$t('account.emailModal.update.newEmail')}
                class="w-full"
                validate={EmailSchema}
                bind:text={newEmail}
                bind:valid={isEmailValid}
            />
            <Stack direction="row" spacing={1} class="justify-end">
                <Button onclick={cancelEmailChange}>{$t('common.cancel')}</Button>
                <Button color="secondary" disabled={!isEmailValid} onclick={submitEmailChange}>
                    {$t('common.update')}
                </Button>
            </Stack>
        </Card>
    {:else if emailStatus === 'gettingAcknowledge'}
        <Typography variant="text" class="w-full text-justify">
            {$t(`account.emailModal.${emailOp}.completed`)}
        </Typography>
        <div class="flex justify-end space-x-2">
            <Button onclick={finishEmailOperation}>{$t('common.ok')}</Button>
        </div>
    {/if}
</Modal>
