import twForm from '@tailwindcss/forms';

const containerColors = {
    surface: 'rgb(var(--color-surface))',
    container: 'rgb(var(--color-container))',
    'sub-container': 'rgb(var(--color-sub-container))'
};
const containerOnColors = {
    'on-surface': 'rgb(var(--color-on-surface))',
    'on-container': 'rgb(var(--color-on-container))',
    'on-sub-container': 'rgb(var(--color-on-sub-container))'
};

const actionColors = {
    primary: 'rgb(var(--color-primary))',
    secondary: 'rgb(var(--color-secondary))',
    info: 'rgb(var(--color-info))',
    warning: 'rgb(var(--color-warning))',
    danger: 'rgb(var(--color-danger))',
    success: 'rgb(var(--color-success))'
};
const actionOnColors = {
    'on-primary': 'rgb(var(--color-on-primary))',
    'on-secondary': 'rgb(var(--color-on-secondary))',
    'on-info': 'rgb(var(--color-on-info))',
    'on-warning': 'rgb(var(--color-on-warning))',
    'on-danger': 'rgb(var(--color-on-danger))',
    'on-success': 'rgb(var(--color-on-success))'
};
const actionToneColors = {
    'accent-primary': 'rgb(var(--color-accent-primary))',
    'accent-secondary': 'rgb(var(--color-accent-secondary))',
    'accent-info': 'rgb(var(--color-accent-info))',
    'accent-warning': 'rgb(var(--color-accent-warning))',
    'accent-danger': 'rgb(var(--color-accent-danger))',
    'accent-success': 'rgb(var(--color-accent-success))'
};

const dataColors = {
    'data-gray1': 'rgb(var(--color-data-gray-1))',
    'data-gray2': 'rgb(var(--color-data-gray-2))',
    'data-gray3': 'rgb(var(--color-data-gray-3))',
    'data-gray4': 'rgb(var(--color-data-gray-4))',
    'data-gray5': 'rgb(var(--color-data-gray-5))',
    'data-gray6': 'rgb(var(--color-data-gray-6))',
    'data-gray7': 'rgb(var(--color-data-gray-7))'
};

function safeList(names: string[], variants: string[]): string[] {
    return names.map((name) => variants.map((variant) => `${variant}${name}`)).flat();
}

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
        ...safeList(Object.keys(containerColors), ['bg-', 'hover:bg-', 'text-', 'border-']),
        ...safeList(Object.keys(containerOnColors), ['bg-', 'text-', 'border-']),
        ...safeList(Object.keys(actionColors), ['bg-', 'hover:bg-', 'text-', 'hover:text-', 'border-']),
        ...safeList(Object.keys(actionOnColors), ['bg-', 'text-', 'hover:text-', 'border-', 'fill-', 'stroke-']),
        ...safeList(Object.keys(actionToneColors), ['bg-', 'text-', 'hover:text-', 'border-', 'fill-', 'stroke-']),
        ...safeList(Object.keys(dataColors), ['bg-', 'text-', 'fill-', 'stroke-']),
        ...['icon-xs', 'icon-sm', 'icon-md', 'icon-lg']
    ],

    theme: {
        extend: {
            colors: {
                ...containerColors,
                ...containerOnColors,
                ...actionColors,
                ...actionOnColors,
                ...actionToneColors,
                ...dataColors
            },
            backgroundColor: {
                ...containerColors,
                ...containerColors,
                ...dataColors
            },
            textColor: {
                ...containerColors,
                ...containerOnColors,
                ...actionColors,
                ...actionOnColors,
                ...actionToneColors
            },
            shadowColor: {
                ...containerColors,
                ...actionColors
            },
            stroke: {
                ...containerColors,
                ...containerOnColors,
                ...actionColors,
                ...actionOnColors,
                ...actionToneColors,
                ...dataColors
            },
            fill: {
                ...containerColors,
                ...containerOnColors,
                ...actionColors,
                ...actionOnColors,
                ...actionToneColors,
                ...dataColors
            },
            borderColor: {
                ...containerColors,
                ...containerOnColors,
                ...actionColors,
                ...actionOnColors
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
