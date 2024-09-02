<script context="module" lang="ts">
    import type { LinkedIdentity } from '$src/lib/api/identity_api';

    export class ActiveLinkedIdentity {
        provider = $state<string>(null!);
        providerUserId = $state<string>(null!);
        linkedAt = $state<Date>(null!);
        name = $state<string | undefined>();
        email = $state<string | undefined>();

        disableUnlink = $state(false);

        constructor({ provider, providerUserId, linkedAt, name, email }: LinkedIdentity) {
            this.provider = provider;
            this.providerUserId = providerUserId;
            this.linkedAt = new Date(linkedAt);
            this.name = name;
            this.email = email;
        }
    }
</script>

<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import { Discord, Github, Google, Twitter } from '$atoms/icons/idps';
    import Button from '$atoms/Button.svelte';

    interface Props {
        identity: ActiveLinkedIdentity;
        /// Unlink the identity from the account and return if the unlink was successful.
        onUnlink: (identity: ActiveLinkedIdentity) => Promise<void>;
    }
    const { identity, onUnlink }: Props = $props();

    const providerImage = $derived.by(() => {
        switch (identity.provider) {
            case 'twitter':
                return Twitter;
            case 'google':
                return Google;
            case 'github':
                return Github;
            case 'discord':
                return Discord;
            default:
                return null;
        }
    });

    const unlink = async () => {
        identity.disableUnlink = true;
        await onUnlink(identity);
    };
</script>

<Card variant="data">
    {#snippet image()}
        <svelte:component this={providerImage} />
    {/snippet}

    <KeyValueTable
        size="xs"
        items={[
            [$t('account.provider'), identity.provider],
            [$t('account.providerUserId'), identity.providerUserId],
            identity.name ? [$t('account.userName'), identity.name] : null,
            identity.email ? [$t('account.email'), identity.email] : null,
            [$t('account.linkDate'), identity.linkedAt.toString()]
        ]}
    />

    {#snippet action()}
        <Button label="Unlink" disabled={identity.disableUnlink} color="error" onclick={unlink} />
    {/snippet}
</Card>
