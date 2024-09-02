<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import CurrentUserCard from '$src/components/account/CurrentUserCard.svelte';
    import { delay, never } from '$src/lib/utils';

    const sampleUser = (userId: string) => {
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

    let reactiveUserId = $state(uuid());
    let fetchReactiveUser = async function fetchUserData() {
        let guid = reactiveUserId;
        await delay(1000);
        return sampleUser(guid);
    };

    $effect(() => {
        const interval = setInterval(() => {
            reactiveUserId = uuid();
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

<CurrentUserCard user={never} onLogout={() => console.log('logout')} onLogoutAll={() => console.log('logout all')} />

<CurrentUserCard
    user={async () => {
        throw new Error('Test error');
    }}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
/>

<CurrentUserCard
    user={fetchReactiveUser}
    onLogout={() => console.log('logout')}
    onLogoutAll={() => console.log('logout all')}
/>
