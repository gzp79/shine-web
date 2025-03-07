<script lang="ts" module>
    import Alert from '$atoms/Alert.svelte';
    import Card from '$atoms/Card.svelte';
    import ComboButton from '$atoms/ComboButton.svelte';
    import ErrorCard from '$atoms/ErrorCard.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import LoadingCard from '$atoms/LoadingCard.svelte';
    import ResourceFetch, { type Status } from '$atoms/ResourceFetch.svelte';
    import Button from '$components/atoms/Button.svelte';
    import Modal from '$components/atoms/Modal.svelte';
    import TextArea from '$components/atoms/TextArea.svelte';
    import Typography from '$components/atoms/Typography.svelte';
    import { Spinner } from '$components/atoms/icons/animated';
    import Warning from '$components/atoms/icons/common/_warning.svelte';
    import type { CurrentUser } from '$lib/api/identity-api';
    import { t } from '$lib/i18n/i18n.svelte';
    import { type AppError, FetchError } from '$lib/utils';

    export interface ApiContext {
        fetchUser: () => Promise<CurrentUser>;
        refreshUser: () => Promise<void>;

        startEmailConfirmation: () => Promise<void>;
        startEmailChange: (newEmail: string) => Promise<void>;
        getLogoutUrl: (all: boolean, redirectUrl: string) => string;
    }
</script>

<script lang="ts">
    interface Props {
        context: ApiContext;
    }
    let { context }: Props = $props();

    type EmailState = 'none' | 'waitingResponse' | 'gettingNewEmail' | 'gettingAcknowledge' | 'error';
    class EmailOperationFlow {
        isCompleted = $state(false);
        state = $state<EmailState>('none');
        error?: FetchError;

        constructor() {
            this.state = 'none';
        }

        async startConfirmation() {
            if (this.isCompleted) {
                // just to avoid multiple clicks and make the user feel better
                this.state = 'gettingAcknowledge';
                context.refreshUser();
            } else {
                this.state = 'waitingResponse';
                try {
                    await context.startEmailConfirmation();
                } catch (error) {
                    this.error = error as FetchError;
                    this.state = 'error';
                    return;
                }
                this.state = 'gettingAcknowledge';
            }
        }

        async startChange() {
            if (this.isCompleted) {
                // just to avoid multiple clicks and make the user feel better
                this.state = 'gettingAcknowledge';
                context.refreshUser();
            } else {
                this.state = 'gettingNewEmail';
            }
        }

        cancelChange() {
            console.assert(this.state === 'gettingNewEmail');
            this.state = 'none';
        }

        async setNewEmail(newEmail: string) {
            console.assert(this.state === 'gettingNewEmail');
            this.state = 'waitingResponse';
            try {
                await context.startEmailChange(newEmail);
            } catch (error) {
                this.error = error as FetchError;
                this.state = 'error';
                return;
            }
            this.state = 'gettingAcknowledge';
        }

        retry() {
            console.assert(this.state === 'error');
            this.state = 'none';
        }

        finish() {
            this.isCompleted = true;
            this.state = 'none';
        }

        reset() {
            //todo: if we are in the waitingResponse state, we should cancel the operation.
            //  Without this cancellation, once the operation completes, the aborted flow will resume
            this.state = 'none';
        }
    }

    let fetchLoading = $state<Status>('loading');
    let disableActions = $derived(fetchLoading !== 'completed');
    let newEmail = $state('');

    const logoutUrl = context.getLogoutUrl(false, '/');
    const logoutAllUrl = context.getLogoutUrl(true, '/');
    let emailFlow = new EmailOperationFlow();

    $effect(() => {
        if (disableActions) {
            // close popup if the user is not allowed to do anything
            emailFlow.reset();
        }
    });
</script>

<Card caption={$t('account.userInfo')}>
    <ResourceFetch fetch={context.fetchUser} bind:status={fetchLoading}>
        {#snippet loading()}
            <LoadingCard />
        {/snippet}

        {#snippet content(user: CurrentUser, _isDirty: boolean)}
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
                    {#if !emailFlow.isCompleted}
                        <div class="flex justify-start ms-8 sm:ms-0">
                            {#if user.email && !user.isEmailConfirmed}
                                <ComboButton
                                    size="xs"
                                    disabled={disableActions}
                                    items={[
                                        {
                                            caption: $t('account.confirm'),
                                            onclick: () => emailFlow.startConfirmation()
                                        },
                                        { caption: $t('account.updateEmail'), onclick: () => emailFlow.startChange() }
                                    ]}
                                />
                            {:else}
                                <Button size="xs" disabled={disableActions} onclick={() => emailFlow.startChange()}>
                                    {$t('account.updateEmail')}
                                </Button>
                            {/if}
                        </div>
                    {/if}
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
                { caption: $t('account.logout'), href: logoutUrl },
                { caption: $t('account.logoutAll'), href: logoutAllUrl }
            ]}
        />
    {/snippet}
</Card>

<Modal caption={$t('account.confirmTitle')} isOpen={emailFlow.state !== 'none'}>
    {#if emailFlow.state == 'error'}
        <ErrorCard error={emailFlow.error!} />
        <div class="flex justify-end space-x-2">
            <Button onclick={() => emailFlow.retry()}>{$t('account.ok')}</Button>
        </div>
    {:else if emailFlow.state == 'waitingResponse'}
        <Typography variant="text" class="w-full text-justify">{$t('account.confirmPendingText')}</Typography>
        <div class="flex justify-end space-x-2">
            <Button disabled startIcon={Spinner}>
                {$t('account.ok')}
            </Button>
        </div>
    {:else if emailFlow.state == 'gettingNewEmail'}
        <Typography variant="text" class="w-full text-justify">{$t('account.confirmPendingText')}</Typography>
        <TextArea rows="single" placeholder={$t('account.newEmail')} class="w-full" bind:text={newEmail}></TextArea>
        <div class="flex justify-end space-x-2">
            <Button onclick={() => emailFlow.cancelChange()}>{$t('common.cancel')}</Button>
            <Button color="secondary" onclick={() => emailFlow.setNewEmail(newEmail)}
                >{$t('account.updateEmail')}</Button
            >
        </div>
    {:else if emailFlow.state == 'gettingAcknowledge'}
        <Typography variant="text" class="w-full text-justify">{$t('account.confirmCompleteText')}</Typography>
        <div class="flex justify-end space-x-2">
            <Button onclick={() => emailFlow.finish()}>{$t('account.ok')}</Button>
        </div>
    {/if}
</Modal>
