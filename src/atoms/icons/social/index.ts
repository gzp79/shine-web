import ActiveUser from './_active_user.svelte';
import Discord from './_discord.svelte';
import Email from './_email.svelte';
import Github from './_github.svelte';
import Gitlab from './_gitlab.svelte';
import Google from './_google.svelte';
import Twitter from './_twitter.svelte';

export { Discord, Github, Google, Twitter, Gitlab, ActiveUser, Email };

export const allIcons = {
    Discord: Discord,
    Github: Github,
    Google: Google,
    Twitter: Twitter,
    Gitlab: Gitlab,
    ActiveUser: ActiveUser,
    Email: Email
};
