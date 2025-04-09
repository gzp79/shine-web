<script lang="ts">
    // This component renders nothing, but it is useful for enforcing Tailwind CSS classes to be generated.

    interface Props {
        classList?: string[];
    }

    const { classList }: Props = $props();

    // this a workaround for tailwind 4 not supporting the safelist option
    /* prettier-ignore */
    const defaultSafeList = [
        ['bg-surface', 'bg-on-surface'],
        ['bg-on-surface', 'bg-on-on-surface'],
        ['hover:bg-surface', 'hover:bg-on-surface'],

        ['bg-primary', 'bg-secondary', 'bg-info', 'bg-warning', 'bg-danger', 'bg-success'],
        ['bg-primary-1', 'bg-secondary-1', 'bg-info-1', 'bg-warning-1', 'bg-danger-1', 'bg-success-1'],
        ['bg-primary-2', 'bg-secondary-2', 'bg-info-2', 'bg-warning-2', 'bg-danger-2', 'bg-success-2'],
        ['bg-on-primary', 'bg-on-secondary', 'bg-on-info', 'bg-on-warning', 'bg-on-danger', 'bg-on-success'],
        ['hover:bg-primary', 'hover:bg-secondary', 'hover:bg-info', 'hover:bg-warning', 'hover:bg-danger', 'hover:bg-success' ],

        ['text-surface', 'text-on-surface'],
        ['text-on-surface', 'text-on-on-surface'],
        ['text-primary', 'text-secondary', 'text-info', 'text-warning', 'text-danger', 'text-success'],
        ['text-primary-1', 'text-secondary-1', 'text-info-1', 'text-warning-1', 'text-danger-1', 'text-success-1'],
        ['text-primary-2', 'text-secondary-2', 'text-info-2', 'text-warning-2', 'text-danger-2', 'text-success-2'],
        ['text-on-primary','text-on-secondary', 'text-on-info', 'text-on-warning', 'text-on-danger', 'text-on-success'],

        ['placeholder:text-surface', 'placeholder:text-on-surface'],
        ['placeholder:text-on-surface', 'placeholder:text-on-on-surface'],
        ['placeholder:text-primary', 'placeholder:text-secondary', 'placeholder:text-info', 'placeholder:text-warning', 'placeholder:text-danger', 'placeholder:text-success'],
        ['placeholder:text-primary-1', 'placeholder:text-secondary-1', 'placeholder:text-info-1', 'placeholder:text-warning-1', 'placeholder:text-danger-1', 'placeholder:text-success-1'],
        ['placeholder:text-primary-2', 'placeholder:text-secondary-2', 'placeholder:text-info-2', 'placeholder:text-warning-2', 'placeholder:text-danger-2', 'placeholder:text-success-2'],
        ['placeholder:text-on-primary','placeholder:text-on-secondary', 'placeholder:text-on-info', 'placeholder:text-on-warning', 'placeholder:text-on-danger', 'placeholder:text-on-success'],

        ['border-surface', 'border-on-surface'],
        ['border-on-surface', 'border-on-on-surface'],
        ['border-primary', 'border-secondary', 'border-info', 'border-warning', 'border-danger', 'border-success'],
        ['border-primary-1', 'border-secondary-1', 'border-info-1', 'border-warning-1', 'border-danger-1', 'border-success-1'],
        ['border-primary-2', 'border-secondary-2', 'border-info-2', 'border-warning-2', 'border-danger-2', 'border-success-2'],
        ['border-on-primary','border-on-secondary', 'border-on-info', 'border-on-warning', 'border-on-danger', 'border-on-success'],    
        
        ['fill-surface', 'fill-on-surface'],
        ['fill-on-surface', 'fill-on-on-surface'],
        ['fill-primary', 'fill-secondary', 'fill-info', 'fill-warning', 'fill-danger', 'fill-success'],
        ['fill-primary-1', 'fill-secondary-1', 'fill-info-1', 'fill-warning-1', 'fill-danger-1', 'fill-success-1'],
        ['fill-primary-2', 'fill-secondary-2', 'fill-info-2', 'fill-warning-2', 'fill-danger-2', 'fill-success-2'],
        ['fill-on-primary','fill-on-secondary', 'fill-on-info', 'fill-on-warning', 'fill-on-danger', 'fill-on-success'],

        ['stroke-surface', 'stroke-on-surface'],
        ['stroke-on-surface', 'stroke-on-on-surface'],
        ['stroke-primary', 'stroke-secondary', 'stroke-info', 'stroke-warning', 'stroke-danger', 'stroke-success'],
        ['stroke-primary-1', 'stroke-secondary-1', 'stroke-info-1', 'stroke-warning-1', 'stroke-danger-1', 'stroke-success-1'],
        ['stroke-primary-2', 'stroke-secondary-2', 'stroke-info-2', 'stroke-warning-2', 'stroke-danger-2', 'stroke-success-2'],
        ['stroke-on-primary','stroke-on-secondary', 'stroke-on-info', 'stroke-on-warning', 'stroke-on-danger', 'stroke-on-success'],

        [ 'bg-data-gray-1', 'bg-data-gray-2', 'bg-data-gray-3', 'bg-data-gray-4', 'bg-data-gray-5', 'bg-data-gray-6', 'bg-data-gray-7' ], 
        [ 'text-data-gray-1', 'text-data-gray-2', 'text-data-gray-3', 'text-data-gray-4', 'text-data-gray-5', 'text-data-gray-6', 'text-data-gray-7' ],
        [ 'fill-data-gray-1', 'fill-data-gray-2', 'fill-data-gray-3', 'fill-data-gray-4', 'fill-data-gray-5', 'fill-data-gray-6', 'fill-data-gray-7' ],
        [ 'stroke-data-gray-1', 'stroke-data-gray-2', 'stroke-data-gray-3', 'stroke-data-gray-4', 'stroke-data-gray-5', 'stroke-data-gray-6', 'stroke-data-gray-7' ],

        ['highlight', 'hover:highlight'],

        ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'],
        ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch'],

        ['text-xs', 'text-sm', 'text-md', 'text-lg'],
        ['icon-xs', 'icon-sm', 'icon-md', 'icon-lg'],

        ['gap-0', 'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6', 'gap-7', 'gap-8', 'gap-9', 'gap-10', 'gap-11', 'gap-12'],
        ['xs:gap-0', 'xs:gap-1', 'xs:gap-2', 'xs:gap-3', 'xs:gap-4', 'xs:gap-5', 'xs:gap-6', 'xs:gap-7', 'xs:gap-8', 'xs:gap-9', 'xs:gap-10', 'xs:gap-11', 'xs:gap-12'],
        ['md:gap-0', 'md:gap-1', 'md:gap-2', 'md:gap-3', 'md:gap-4', 'md:gap-5', 'md:gap-6', 'md:gap-7', 'md:gap-8', 'md:gap-9', 'md:gap-10', 'md:gap-11', 'md:gap-12'],
        ['lg:gap-0', 'lg:gap-1', 'lg:gap-2', 'lg:gap-3', 'lg:gap-4', 'lg:gap-5', 'lg:gap-6', 'lg:gap-7', 'lg:gap-8', 'lg:gap-9', 'lg:gap-10', 'lg:gap-11', 'lg:gap-12'],
    ];
    void defaultSafeList;

    // mark classList as used
    void classList;
</script>
