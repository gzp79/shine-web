<script lang="ts">
  import type { MenuItem } from './types/menu';
  import NestedMenu from './NestedMenu.svelte';

  let { item, onClose, level } = $props<{
    item: MenuItem;
    onClose: () => void;
    level: number;
  }>();

  let isSubmenuOpen = $state(false);

  function handleClick() {
    let shouldToggleSubmenu = false;
    let shouldCloseMenu = true;

    if (item.action) {
      const result = item.action();
      if (result && item.children) {
        shouldToggleSubmenu = true;
        shouldCloseMenu = false;
      }
    } else if (item.children) {
      shouldToggleSubmenu = true;
      shouldCloseMenu = false;
    }

    if (shouldToggleSubmenu) {
      isSubmenuOpen = !isSubmenuOpen;
    }

    if (shouldCloseMenu) {
      onClose();
    }
  }
</script>

<div class="relative">
  <button
    type="button"
    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    role="menuitem"
    onclick={handleClick}
  >
    <div class="flex items-center">
      {#if item.icon}
        {@const Icon = item.icon}
        <Icon class="mr-3 h-5 w-5 text-gray-400" />
      {/if}
      <span>{item.label}</span>
      {#if item.children}
        <svg class="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
        </svg>
      {/if}
    </div>
  </button>

  {#if item.children && isSubmenuOpen}
    <NestedMenu items={item.children} isOpen={isSubmenuOpen} {onClose} level={level + 1} />
  {/if}
</div>
