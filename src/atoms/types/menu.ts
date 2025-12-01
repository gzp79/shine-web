export interface MenuItem {
  label: string;
  icon?: any; // e.g., a Svelte component or SVG string
  children?: MenuItem[];
  action?: () => boolean;
}
