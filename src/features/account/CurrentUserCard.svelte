<script lang="ts" module>
    import { type CurrentUser } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { FetchError } from '$lib/utils';
    import Button from '@atoms/Button.svelte';
    import LoadingCard from '@atoms/LoadingCard.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Typography from '@atoms/Typography.svelte';
    import KeyValueTable from '@atoms/data/PropertyList.svelte';
    import { Spinner } from '@atoms/icons/animated';
    import Warning from '@atoms/icons/common/_warning.svelte';
    import ComboButton from '@atoms/inputs/ComboButton.svelte';
    import Card from '@atoms/layouts/Card.svelte';
    import Modal from '@atoms/layouts/Modal.svelte';
    import { EmailSchema } from '@atoms/types/validator';
    import Alert from '@components/Alert.svelte';
    import ErrorCard from '@components/ErrorCard.svelte';
    import ValidatedTextArea from '@components/ValidatedTextArea.svelte';
    import { getCurrentUserStore } from './currentUser.svelte';

    export interface EmailService {
        startEmailConfirmation: () => Promise<void>;
        startEmailChange: (newEmail: string) => Promise<void>;
        getLogoutUrl: (all: boolean, redirectUrl: string) => string;
    }
</script>

<script lang="ts">
    const currentUserStore = getCurrentUserStore();
    $effect(() => {
        console.log('refreshing currentUserStore...');
        currentUserStore.refresh();
    });

    const service = $derived(currentUserStore.service);
    const user = $derived(currentUserStore.isContent ? currentUserStore.content : null);

    const logoutUrl = $derived(service.getLogoutUrl(false, '/'));
    const logoutAllUrl = $derived(service.getLogoutUrl(true, '/'));

    type EmailStatus = 'none' | 'waitingResponse' | 'gettingNewEmail' | 'gettingAcknowledge' | 'complete' | FetchError;
    let emailStatus = $state<EmailStatus>('none');
    type EmailOp = 'confirm' | 'update';
    let emailOp = $state<EmailOp>('confirm');
    let newEmail = $state('');
    let isEmailValid = $state(false);

    const startEmailConfirmation = async () => {
        emailOp = 'confirm';
        if (emailStatus === 'complete') {
            // just to avoid multiple clicks and make the user feel better
            emailStatus = 'gettingAcknowledge';
            //currentUserStore.refresh();
        } else {
            emailStatus = 'waitingResponse';
            try {
                await service.startEmailConfirmation();
                emailStatus = 'gettingAcknowledge';
            } catch (error) {
                console.assert(error instanceof FetchError);
                emailStatus = error as FetchError;
            }
        }
    };
    const startEmailChange = async () => {
        emailOp = 'update';
        if (emailStatus === 'complete') {
            // just to avoid multiple clicks and make the user feel better
            emailStatus = 'gettingAcknowledge';
            //currentUserStore.refresh();
        } else {
            emailStatus = 'gettingNewEmail';
        }
    };
    const submitEmailChange = async (newEmail: string) => {
        console.assert(emailStatus === 'gettingNewEmail');
        emailStatus = 'waitingResponse';
        try {
            await service.startEmailChange(newEmail);
            emailStatus = 'gettingAcknowledge';
        } catch (error) {
            console.assert(error instanceof FetchError);
            emailStatus = error as FetchError;
        }
    };
    const cancelEmailChange = async () => {
        console.assert(emailStatus === 'gettingNewEmail');
        emailStatus = 'none';
    };
    const clearEmailError = () => {
        console.assert(emailStatus instanceof FetchError);
        emailStatus = 'none';
    };
    const finishEmailOperation = async () => {
        emailStatus = 'complete';
    };
</script>

{#snippet email(user: CurrentUser)}
    <div class="flex flex-col sm:flex-row space-y-1">
        <div class="flex items-center space-x-2">
            {#if user.details.email}
                {#if !user.isEmailConfirmed}
                    <Warning size="sm" color="warning" />
                {/if}
                <span class="me-2">{user.details.email}</span>
            {:else}
                <i class="bg-warning text-on-warning">{$t('account.noEmail')}</i>
            {/if}
        </div>
        <!-- {#if emailStatus !== 'complete'} -->
        <div class="flex justify-start ms-8 sm:ms-0">
            {#if user.details.email && !user.isEmailConfirmed}
                <ComboButton
                    size="xs"
                    disabled={currentUserStore.isDirty}
                    items={[
                        {
                            caption: $t('common.confirm'),
                            onclick: () => startEmailConfirmation()
                        },
                        { caption: $t('common.update'), onclick: () => startEmailChange() }
                    ]}
                />
            {:else}
                <Button size="xs" disabled={currentUserStore.isDirty} onclick={() => startEmailChange()}>
                    {$t('common.update')}
                </Button>
            {/if}
        </div>
        <!-- {/if} -->
    </div>
{/snippet}

<Card caption={$t('account.userInfo')}>
    {#if currentUserStore.isEmpty}
        <LoadingCard />
    {:else if currentUserStore.isError}
        <ErrorCard error={currentUserStore.error} />
    {:else if user}
        {#snippet emailValue()}
            {@render email(user)}
        {/snippet}
        <Stack>
            {#if !user.isLinked}
                <Alert variant="warning" caption={$t('account.linkWarning')} />
            {/if}

            <KeyValueTable
                size="xs"
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
            disabled={currentUserStore.isDirty}
            items={[
                { caption: $t('account.logout'), href: logoutUrl },
                { caption: $t('account.logoutAll'), href: logoutAllUrl }
            ]}
        />
    {/snippet}
</Card>

<Modal
    caption={$t(`account.emailModal.${emailOp}.title`)}
    isOpen={emailStatus !== 'none' && emailStatus !== 'complete'}
>
    {#if emailStatus instanceof FetchError}
        <ErrorCard error={emailStatus} />
        <div class="flex justify-end space-x-2">
            <Button onclick={() => clearEmailError()}>{$t('common.ok')}</Button>
        </div>
    {:else if emailStatus == 'waitingResponse'}
        <Typography variant="text" class="w-full text-justify">{$t(`account.emailModal.${emailOp}.waiting`)}</Typography
        >
        <div class="flex justify-end space-x-2">
            <Button disabled startIcon={Spinner}>
                {$t('common.ok')}
            </Button>
        </div>
    {:else if emailStatus == 'gettingNewEmail'}
        <Stack>
            <ValidatedTextArea
                rows="single"
                placeholder={$t('account.emailModal.update.newEmail')}
                class="w-full"
                validate={EmailSchema}
                bind:text={newEmail}
                bind:valid={isEmailValid}
            />
            <Stack direction="row" spacing={1} class="justify-end">
                <Button onclick={() => cancelEmailChange()}>{$t('common.cancel')}</Button>
                <Button color="secondary" disabled={!isEmailValid} onclick={() => submitEmailChange(newEmail)}>
                    {$t('common.update')}
                </Button>
            </Stack>
        </Stack>
    {:else if emailStatus == 'gettingAcknowledge'}
        <Typography variant="text" class="w-full text-justify"
            >{$t(`account.emailModal.${emailOp}.completed`)}</Typography
        >
        <div class="flex justify-end space-x-2">
            <Button onclick={() => finishEmailOperation()}>{$t('common.ok')}</Button>
        </div>
    {/if}
</Modal>
