<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import { async } from '$src/lib/utils';
    import ActiveSessionsCard from '$components/account/ActiveSessionsCard.svelte';
    import Story from '../../_components/_Story.svelte';
</script>

<Story variant="center">
    <ActiveSessionsCard
        sessions={[
            /* c-spell: disable */
            //firefox, windows
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
            //edge, windows
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
            //chrome, osx
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            //chrome, windows
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            //chrome, android
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            //safari, ios ipad
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1 Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
            // samsung galaxy s22 5G
            'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
            // some custom agent
            'The native client'
            /* c-spell: enable */
        ].map((agent) => ({
            fingerprint: uuid(),
            agent,
            createdAt: new Date('2021-08-01T12:00:00Z')
        }))}
    />

    <ActiveSessionsCard sessions={async.never()} />
    <ActiveSessionsCard sessions={async.error(new Error('Test error'))} />
</Story>
