<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { v4 as uuid } from 'uuid';
    import type { ActiveSession } from '@lib/api/identity-api';
    import { async } from '@lib/utils';
    import ContextProvider from '@atoms/utilities/ContextProvider.svelte';
    import ActiveSessionCard from '@features/account/ActiveSessionCard.svelte';
    import { type ActiveSessionService, setActiveSessionStore } from '@features/account/activeSessionStore.svelte';

    // Mock data service for stories
    const mockDataService: ActiveSessionService = {
        load: async.never
    };

    const userAgents = [
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
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
        // samsung galaxy s22 5G
        'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // some custom agent
        'The native client'
        /* c-spell: enable */
    ];

    const createMockSession = (overrides?: Partial<ActiveSession>): ActiveSession => ({
        tokenHash: uuid(),
        fingerprint: uuid(),
        agent: userAgents[0],
        createdAt: new Date(),
        country: undefined,
        region: undefined,
        city: undefined,
        ...overrides
    });

    const useService = (service: Partial<ActiveSessionService>): any => {
        return { service: { ...mockDataService, ...service } };
    };

    const { Story } = defineMeta({
        component: ActiveSessionCard,
        title: 'Features/Account/ActiveSessionCard',
        args: {
            service: mockDataService
        } as any,
        argTypes: {
            service: { control: false }
        } as any,
        decorators: [
            ((story: any, context: any) => {
                const args = context.args;
                const use = () => setActiveSessionStore(args.service);
                return {
                    Component: ContextProvider,
                    props: { use }
                };
            }) as any
        ]
    });
</script>

<Story
    name="Loading"
    args={useService({
        load: async.never
    })}
/>

<Story
    name="Error"
    args={useService({
        load: () => async.error(new Error('Failed to load active sessions'))
    })}
/>

<Story
    name="Empty"
    args={useService({
        load: async () => []
    })}
/>

<Story
    name="Single Session - Firefox Windows"
    args={useService({
        load: async () => [
            createMockSession({
                agent: userAgents[0],
                country: 'United States',
                region: 'Washington',
                city: 'Seattle'
            })
        ]
    })}
/>

<Story
    name="Single Session - Edge Windows"
    args={useService({
        load: async () => [
            createMockSession({
                agent: userAgents[1],
                country: 'Germany',
                region: 'Berlin',
                city: 'Berlin'
            })
        ]
    })}
/>

<Story
    name="Single Session - Chrome macOS"
    args={useService({
        load: async () => [
            createMockSession({
                agent: userAgents[2],
                country: 'Canada',
                region: 'Ontario',
                city: 'Toronto'
            })
        ]
    })}
/>

<Story
    name="Single Session - Chrome Android"
    args={useService({
        load: async () => [
            createMockSession({
                agent: userAgents[4],
                country: 'Japan',
                region: 'Tokyo',
                city: 'Tokyo'
            })
        ]
    })}
/>

<Story
    name="Single Session - Safari iOS"
    args={useService({
        load: async () => [
            createMockSession({
                agent: userAgents[5],
                country: 'France',
                region: 'Île-de-France',
                city: 'Paris'
            })
        ]
    })}
/>

<Story
    name="Single Session - Custom Agent"
    args={useService({
        load: async () => [
            createMockSession({
                agent: userAgents[7],
                country: 'Australia',
                region: 'New South Wales',
                city: 'Sydney'
            })
        ]
    })}
/>

<Story
    name="Multiple Sessions"
    args={useService({
        load: async () =>
            userAgents.map((agent, index) =>
                createMockSession({
                    fingerprint: `fingerprint-${index}`,
                    agent,
                    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
                    country: index % 3 === 0 ? 'United States' : index % 3 === 1 ? 'Germany' : 'Japan',
                    region: index % 2 === 0 ? 'Region Name' : undefined,
                    city: index % 2 === 0 ? 'City Name' : undefined
                })
            )
    })}
/>
