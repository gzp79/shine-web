<script lang="ts">
    import { colorMaps, sizeMaps } from '$components/types';
    import { twMerge } from 'tailwind-merge';
    import type { IconProps } from '../types';

    let { size = 'md', disabled = false, class: className, color }: IconProps = $props();
    let spanClass = $derived(
        twMerge(`
        loading loading-ring 
        ${color && colorMaps.text[color]}
        ${sizeMaps.loading[size]} 
        ${className} 
        ${disabled ? 'grayscale' : ''}
    `)
    );
</script>

<span class={spanClass}></span>
