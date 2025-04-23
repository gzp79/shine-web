import Android from './_android.svelte';
import Chrome from './_chrome.svelte';
import Edge from './_edge.svelte';
import Firefox from './_firefox.svelte';
import IPhone from './_iphone.svelte';
import Mac from './_mac.svelte';
import Mobile from './_mobile.svelte';
import Opera from './_opera.svelte';
import Safari from './_safari.svelte';

export { Chrome, Edge, Opera, Safari, Firefox, Mobile, Android, IPhone, Mac };

export const allIcons = {
    Chrome: Chrome,
    Edge: Edge,
    Opera: Opera,
    Safari: Safari,
    Firefox: Firefox,
    Mobile: Mobile,
    Android: Android,
    IPhone: IPhone,
    Mac: Mac
};
