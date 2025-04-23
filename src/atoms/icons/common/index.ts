import Check from './_check.svelte';
import Cross from './_cross.svelte';
import Dark from './_dark.svelte';
import DarkAndLight from './_dark_light.svelte';
import DropDown from './_dropdown.svelte';
import Fatal from './_fatal.svelte';
import Hamburger from './_hamburger.svelte';
import Info from './_info.svelte';
import Light from './_light.svelte';
import Link from './_link.svelte';
import Settings from './_settings.svelte';
import Warning from './_warning.svelte';

export { Check, Cross, Hamburger, Settings, Info, Warning, Light, Dark, DarkAndLight, Fatal, DropDown, Link };

export const allIcons = {
    Check: Check,
    Cross: Cross,
    Hamburger: Hamburger,
    Settings: Settings,
    Info: Info,
    Warning: Warning,
    Light: Light,
    Dark: Dark,
    DarkAndLight: DarkAndLight,
    Fatal: Fatal,
    DropDown: DropDown,
    Link: Link
};
