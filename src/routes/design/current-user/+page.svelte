<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import CurrentUserCard from '$components/account/CurrentUserCard.svelte';
    import { async } from '$lib/utils';
    import type { CurrentUser } from '$src/lib/api/identity_api';

    let fetchReactiveUser = async (userId: string): Promise<CurrentUser> => {
        await async.delay(1000);
        return {
            isAuthenticated: true,
            isLinked: true,
            name: 'John Doe - changing id',
            userId,
            isEmailConfirmed: false,
            roles: ['admin', 'user', 'god', 'The id should change in every second'],
            sessionLength: 1234
        };
    };

    let randomUserId = $state(uuid());
    $effect(() => {
        const interval = setInterval(() => {
            randomUserId = uuid();
        }, 3000);
        return () => clearInterval(interval);
    });
</script>

<div class="divider">Look and feel</div>

<CurrentUserCard
    user={{
        isAuthenticated: true,
        isLinked: true,
        name: 'John Doe',
        userId: 'd3b07384-d9a0-4c9b-8b1e-2f8e4b8e4b8e',
        isEmailConfirmed: false,
        roles: ['admin', 'user', 'god'],
        sessionLength: 1234
    }}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
></CurrentUserCard>

<CurrentUserCard
    user={{
        isAuthenticated: true,
        isLinked: true,
        name: 'John Doe',
        userId: 'e4b8e4b8-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
        isEmailConfirmed: false,
        roles: ['admin', 'user'],
        sessionLength: 1234
    }}
    onLogout={() => console.log('logout')}
></CurrentUserCard>

<CurrentUserCard
    user={{
        isAuthenticated: true,
        isLinked: true,
        name: 'John Doe',
        userId: 'f8e4b8e4-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
        isEmailConfirmed: false,
        roles: ['admin', 'user'],
        sessionLength: 1234
    }}
    onLogoutAll={() => console.log('logout all')}
></CurrentUserCard>

<CurrentUserCard
    user={{
        isAuthenticated: true,
        isLinked: false,
        name: 'John Doe',
        userId: '2f8e4b8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
        email: 'johndoe@example.com',
        isEmailConfirmed: false,
        roles: [],
        sessionLength: 1234
    }}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
></CurrentUserCard>

<CurrentUserCard
    user={{
        isAuthenticated: true,
        isLinked: true,
        name: 'John Doe',
        userId: '8b1e2f8e-4b8e-4b8e-8b1e-2f8e4b8e4b8e',
        email: 'johndoe@example.com',
        isEmailConfirmed: true,
        roles: [],
        sessionLength: 1234
    }}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
></CurrentUserCard>

<div class="divider">Reactive Update</div>

<CurrentUserCard
    user={async.never()}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
/>

<CurrentUserCard
    user={async.error(new Error('Test error'))}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
/>

<CurrentUserCard
    user={fetchReactiveUser(randomUserId)}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
/>
