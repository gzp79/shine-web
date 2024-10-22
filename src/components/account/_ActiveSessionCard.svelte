<script lang="ts">
    import { t } from '$lib/i18n/i18n.svelte';
    import type { ActiveSession } from '$src/lib/api/identity-api';
    import Card from '$atoms/Card.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import UAParser from 'ua-parser-js';
    import * as clientIcons from '../atoms/icons/clients';
    import { formatLocation } from '$src/lib/i18n/utils';

    interface Props {
        session: ActiveSession;
    }
    const { session }: Props = $props();

    const agent = $derived.by(() => new UAParser(session.agent).getResult());
    const AgentImage = $derived.by(() => {
        const browser = agent.browser.name?.toLowerCase();
        const os = agent.os.name?.toLowerCase();
        const device = agent.device.type?.toLowerCase();

        if (device === 'mobile') {
            if (os === 'android') {
                return clientIcons.Android;
            }
            if (os === 'ios') {
                return clientIcons.IPhone;
            }
            return clientIcons.Mobile;
        }

        if (os === 'mac os') {
            return clientIcons.Mac;
        }

        if (browser?.includes('edge')) {
            return clientIcons.Edge;
        } else if (browser?.includes('safari')) {
            return clientIcons.Safari;
        } else if (browser?.includes('firefox')) {
            return clientIcons.Firefox;
        } else if (browser?.includes('opera')) {
            return clientIcons.Opera;
        } else if (browser?.includes('chrome')) {
            return clientIcons.Chrome;
        }

        return null;
    });

    const location = $derived(formatLocation(session));
</script>

<Card width="full">
    {#snippet icon()}
        <AgentImage />
    {/snippet}

    <KeyValueTable
        size="xs"
        items={[
            [$t('account.sessionFingerprint'), session.fingerprint],
            [$t('account.userAgent'), session.agent],
            [
                $t('account.loginDate'),
                $t(
                    'common.dateTime',
                    { value: session.createdAt },
                    { date: { dateStyle: 'long', timeStyle: 'medium' } }
                )
            ],
            [$t('account.location'), location]
        ]}
    />
</Card>
