import { type CurrentUser } from './api/identity_api';
import type { Maybe } from './utils';

export function createCurrentUser() {
    let user = $state(null as Maybe<CurrentUser>);

    return {
        get user(): Maybe<CurrentUser> {
            return user;
        },
        set user(value: Maybe<CurrentUser>) {
            user = value;
        }
    };
}
