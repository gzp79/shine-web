<script lang="ts" module>
    import { t } from '$lib/i18n/i18n.svelte';
    import { FetchError } from '$lib/utils';
    import Button from '$atoms/Button.svelte';
    import Card from '$atoms/Card.svelte';
    import ComboButton from '$atoms/ComboButton.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import Modal from '$atoms/Modal.svelte';
    import TextArea from '$atoms/TextArea.svelte';
    import Typography from '$atoms/Typography.svelte';
    import { Spinner } from '$atoms/icons/animated';
    import Warning from '$atoms/icons/common/_warning.svelte';
    import Alert from '$components/Alert.svelte';
    import ErrorCard from '$components/ErrorCard.svelte';
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
        currentUserStore.refresh();
    });

    const service = $derived(currentUserStore.service);
    const user = $derived(currentUserStore.isContent ? currentUserStore.content : null);

    const logoutUrl = $derived(service.getLogoutUrl(false, '/'));
    const logoutAllUrl = $derived(service.getLogoutUrl(true, '/'));

    type EmailStatus = 'none' | 'waitingResponse' | 'gettingNewEmail' | 'gettingAcknowledge' | 'complete' | FetchError;
    let emailStatus = $state<EmailStatus>('none');
    let newEmail = $state('');

    const startEmailConfirmation = async () => {
        if (emailStatus === 'complete') {
            // just to avoid multiple clicks and make the user feel better
            emailStatus = 'gettingAcknowledge';
            currentUserStore.refresh();
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
        if (emailStatus === 'complete') {
            // just to avoid multiple clicks and make the user feel better
            emailStatus = 'gettingAcknowledge';
            currentUserStore.refresh();
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

    /*$effect(() => {
        if (disableActions) {
            // close popup if the user is not allowed to do anything
            emailFlow.reset();
        }
    });*/
</script>

<Card caption={$t('account.userInfo')}>
    {#if currentUserStore.isEmpty}
        <LoadingCard />
    {:else if currentUserStore.isError}
        <ErrorCard error={currentUserStore.error} />
    {:else if user}
        {#if !user.isLinked}
            <Alert variant="warning" caption={$t('account.linkWarning')} />
        {/if}

        {#snippet email()}
            <div class="flex flex-col sm:flex-row space-y-1">
                <div class="flex items-center space-x-2">
                    {#if user.email}
                        {#if !user.isEmailConfirmed}
                            <Warning size="sm" color="warning" />
                        {/if}
                        <span class="me-2">{user.email}</span>
                    {:else}
                        <i class="bg-warning text-on-warning">{$t('account.noEmail')}</i>
                    {/if}
                </div>
                <!-- {#if emailStatus !== 'complete'} -->
                <div class="flex justify-start ms-8 sm:ms-0">
                    {#if user.email && !user.isEmailConfirmed}
                        <ComboButton
                            size="xs"
                            disabled={currentUserStore.isDirty}
                            items={[
                                {
                                    caption: $t('account.confirm'),
                                    onclick: () => startEmailConfirmation()
                                },
                                { caption: $t('account.updateEmail'), onclick: () => startEmailChange() }
                            ]}
                        />
                    {:else}
                        <Button size="xs" disabled={currentUserStore.isDirty} onclick={() => startEmailChange()}>
                            {$t('account.updateEmail')}
                        </Button>
                    {/if}
                </div>
                <!-- {/if} -->
            </div>
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

<Modal caption={$t('account.confirmTitle')} isOpen={emailStatus !== 'none' && emailStatus !== 'complete'}>
    {#if emailStatus instanceof FetchError}
        <ErrorCard error={emailStatus} />
        <div class="flex justify-end space-x-2">
            <Button onclick={() => clearEmailError()}>{$t('account.ok')}</Button>
        </div>
    {:else if emailStatus == 'waitingResponse'}
        <Typography variant="text" class="w-full text-justify">{$t('account.confirmPendingText')}</Typography>
        <div class="flex justify-end space-x-2">
            <Button disabled startIcon={Spinner}>
                {$t('account.ok')}
            </Button>
        </div>
    {:else if emailStatus == 'gettingNewEmail'}
        <Typography variant="text" class="w-full text-justify">{$t('account.confirmPendingText')}</Typography>
        <TextArea rows="single" placeholder={$t('account.newEmail')} class="w-full" bind:text={newEmail}></TextArea>
        <div class="flex justify-end space-x-2">
            <Button onclick={() => cancelEmailChange()}>{$t('common.cancel')}</Button>
            <Button color="secondary" onclick={() => submitEmailChange(newEmail)}>{$t('account.updateEmail')}</Button>
        </div>
    {:else if emailStatus == 'gettingAcknowledge'}
        <Typography variant="text" class="w-full text-justify">{$t('account.confirmCompleteText')}</Typography>
        <div class="flex justify-end space-x-2">
            <Button onclick={() => finishEmailOperation()}>{$t('account.ok')}</Button>
        </div>
    {/if}
</Modal>
