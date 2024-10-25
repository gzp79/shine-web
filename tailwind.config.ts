import twForm from '@tailwindcss/forms';

const colorNames = ['surface', 'primary', 'info', 'warning', 'danger', 'success'];
const extendedColorNames = [
    ...colorNames,
    ...colorNames.map((color) => `${color}-mute`),
    ...colorNames.map((color) => `${color}-accent`),
    ...colorNames.map((color) => `on-${color}`)
];

const colorVariants = {
    surface: 'rgb(var(--color-surface))',
    'surface-mute': 'rgb(var(--color-surface-mute))',
    'surface-accent': 'rgb(var(--color-surface-accent))',
    primary: 'rgb(var(--color-primary))',
    'primary-mute': 'rgb(var(--color-primary-mute))',
    'primary-accent': 'rgb(var(--color-primary-accent))',
    info: 'rgb(var(--color-info))',
    'info-mute': 'rgb(var(--color-info-mute))',
    'info-accent': 'rgb(var(--color-info-accent))',
    warning: 'rgb(var(--color-warning))',
    'warning-mute': 'rgb(var(--color-warning-mute))',
    'warning-accent': 'rgb(var(--color-warning-accent))',
    danger: 'rgb(var(--color-danger))',
    'danger-mute': 'rgb(var(--color-danger-mute))',
    'danger-accent': 'rgb(var(--color-danger-accent))',
    success: 'rgb(var(--color-success))',
    'success-mute': 'rgb(var(--color-success-mute))',
    'success-accent': 'rgb(var(--color-success-accent))'
};

const colorOnVariants = {
    'on-surface': 'rgb(var(--color-on-surface))',
    'on-primary': 'rgb(var(--color-on-primary))',
    'on-info': 'rgb(var(--color-on-info))',
    'on-warning': 'rgb(var(--color-on-warning))',
    'on-danger': 'rgb(var(--color-on-danger))',
    'on-success': 'rgb(var(--color-on-success))'
};

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{svelte,js,ts}'],
    plugins: [
        twForm({
            strategy: 'class'
        }),
        function ({ addVariant }) {
            addVariant('not-first', '&:not(:first-child)');
            addVariant('not-last', '&:not(:last-child)');
        }
    ],
    safelist: [
        ...extendedColorNames.map((color) => `bg-${color}`),
        ...extendedColorNames.map((color) => `text-on-${color}`),
        ...extendedColorNames.map((color) => `text-${color}`),
        ...extendedColorNames.map((color) => `border-${color}`),
        ...extendedColorNames.map((color) => `shadow-${color}`),
        ...extendedColorNames.map((color) => `fill-${color}`),
        ...extendedColorNames.map((color) => `stroke-${color}`),
        ...extendedColorNames.map((color) => `hover:bg-${color}`),
        ...extendedColorNames.map((color) => `hover:text-on-${color}`),
        ...extendedColorNames.map((color) => `hover:text-${color}`),
        ...extendedColorNames.map((color) => `hover:border-${color}`),
        ...['icon-xs', 'icon-sm', 'icon-md', 'icon-lg']
    ],

    theme: {
        extend: {
            colors: {
                ...colorVariants,
                ...colorOnVariants
            },
            backgroundColor: {
                ...colorVariants
            },
            textColor: {
                ...colorVariants,
                ...colorOnVariants
            },
            shadowColor: {
                ...colorVariants,
                ...colorOnVariants
            },
            stroke: {
                ...colorVariants,
                ...colorOnVariants,
                highlight: 'hsl(var(--hc))'
            },
            fill: {
                ...colorVariants,
                ...colorOnVariants,
                highlight: 'hsl(var(--hc))'
            },
            width: {
                'min-content': 'min-content'
            },
            transitionProperty: {
                visibility:
                    'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, visibility'
            },
            boxShadowColor: {
                base: 'var(--bsh)'
            }
        }
    }
};
