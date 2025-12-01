<script context="module" lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NestedMenu from './NestedMenu.svelte';
  import type { MenuItem } from './types/menu';
  import Settings from './icons/common/_settings.svelte';
  import Dark from './icons/common/_dark.svelte';
  import Light from './icons/common/_light.svelte';
  const { Story } = defineMeta({
    component: NestedMenu,
    title: 'Atoms/NestedMenu',
    tags: ['autodocs'],
    args: {
      isOpen: true,
      onClose: () => console.log('onClose'),
    },
    argTypes: {
      items: { control: 'object' },
      isOpen: { control: 'boolean' },
    },
  });
</script>

<script lang="ts">
  const simpleItems: MenuItem[] = [
    {
      label: 'Profile',
      action: () => {
        console.log('profile-click');
        return false;
      },
    },
    {
      label: 'Settings',
      action: () => {
        console.log('settings-click');
        return false;
      },
    },
  ];
  const withIcons: MenuItem[] = [
    {
      label: 'Settings',
      icon: Settings,
      action: () => {
        console.log('settings-click');
        return false;
      },
    },
    {
      label: 'Theme',
      children: [
        {
          label: 'Dark',
          icon: Dark,
          action: () => {
            console.log('dark-theme-click');
            return false;
          },
        },
        {
          label: 'Light',
          icon: Light,
          action: () => {
            console.log('light-theme-click');
            return false;
          },
        },
      ],
    },
  ];
  const nestedItems: MenuItem[] = [
    {
      label: 'File',
      children: [
        {
          label: 'New',
          action: () => {
            console.log('new-file-click');
            return false;
          },
        },
        {
          label: 'Open',
          children: [
            {
              label: 'Recent',
              action: () => {
                console.log('open-recent-click');
                return false;
              },
            },
            {
              label: 'From Disk',
              action: () => {
                console.log('open-from-disk-click');
                return false;
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Edit',
      children: [
        {
          label: 'Copy',
          action: () => {
            console.log('copy-click');
            return false;
          },
        },
        {
          label: 'Paste',
          action: () => {
            console.log('paste-click');
            return false;
          },
        },
      ],
    },
  ];
  const actionHandling: MenuItem[] = [
    {
      label: 'Click me to open submenu',
      action: () => {
        console.log('submenu-parent-click');
        // Return true to allow submenu to open
        return true;
      },
      children: [
        {
          label: 'Submenu item',
          action: () => {
            console.log('submenu-item-click');
            return false;
          },
        },
      ],
    },
    {
      label: 'Click me (no submenu)',
      action: () => {
        console.log('no-submenu-click');
        return false;
      },
    },
  ];
</script>

<Story name="Default" args={{ items: simpleItems }} />
<Story name="With Icons" args={{ items: withIcons }} />
<Story name="Nested Menu" args={{ items: nestedItems }} />
<Story name="Action Handling" args={{ items: actionHandling }} />
