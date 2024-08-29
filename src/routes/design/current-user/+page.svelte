<script lang="ts">
    import CurrentUser from '$components/account/CurrentUser.svelte';
</script>

<CurrentUser
    user={{
        isAuthenticated: true,
        name: 'John Doe',
        userId: 'john.doe',
        isEmailConfirmed: false,
        roles: ['admin', 'user'],
        sessionLength: 1234
    }}
    logout={() => console.log('logout')}
    logoutAll={() => console.log('logout all')}
></CurrentUser>

<CurrentUser
    user={{
        isAuthenticated: true,
        name: 'John Doe',
        userId: 'john.doe',
        isEmailConfirmed: false,
        roles: ['admin', 'user'],
        sessionLength: 1234
    }}
    logout={() => console.log('logout')}
></CurrentUser>

<CurrentUser
    user={{
        isAuthenticated: true,
        name: 'John Doe',
        userId: 'john.doe',
        isEmailConfirmed: false,
        roles: ['admin', 'user'],
        sessionLength: 1234
    }}
    logoutAll={() => console.log('logout all')}
></CurrentUser>
