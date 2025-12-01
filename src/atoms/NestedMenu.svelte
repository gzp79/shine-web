<script lang="ts">
  import type { MenuItem as MenuItemType } from './types/menu';
  import MenuItem from './MenuItem.svelte';
  import { onMount, onDestroy } from 'svelte';

  let { items, isOpen, onClose, level = 0 } = $props<{
    items: MenuItemType[];
    isOpen: boolean;
    onClose: () => void;
    level?: number;
  }>();

  let menuElement = $state<HTMLElement | null>(null);

  const bgColors = [
    'bg-white',
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
  ];

  const bgColor = bgColors[level % bgColors.length];

  function handleClickOutside(event: MouseEvent) {
    if (menuElement && !menuElement.contains(event.target as Node)) {
      onClose();
    }
  }

  onMount(() => {
    // Only the root menu should listen for outside clicks
    if (level === 0) {
      document.addEventListener('click', handleClickOutside, true);
    }
  });

  onDestroy(() => {
    if (level === 0) {
      document.removeEventListener('click', handleClickOutside, true);
    }
  });
</script>

{#if isOpen}
  <div
    bind:this={menuElement}
    class="absolute w-56 rounded-md shadow-lg {bgColor} ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
    class:top-full={level === 0}
    class:right-0={level === 0}
    class:mt-2={level === 0}
    class:right-full={level > 0}
    class:top-0={level > 0}
    class:mr-1={level > 0}
  >
    <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      {#each items as item}
        <MenuItem {item} {onClose} {level} />
      {/each}
    </div>
  </div>
{/if}
