export const colorList = [
    'primary',
    'secondary',
    'accent',
    'neutral',
    'base100',
    'base200',
    'base300',
    'info',
    'success',
    'warning',
    'error'
];
export type Color = (typeof colorList)[number];
export const defaultColor: Color = 'primary';

export const colorMaps: Record<string, Record<Color, string>> = {
    bg: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent',
        neutral: 'bg-neutral',
        base100: 'bg-base100',
        base200: 'bg-base200',
        base300: 'bg-base300',
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error'
    },

    text: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        neutral: 'text-neutral',
        base100: 'text-base100',
        base200: 'text-base200',
        base300: 'text-base300',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error'
    },

    textContent: {
        primary: 'text-primary-content',
        secondary: 'text-secondary-content',
        accent: 'text-accent-content',
        neutral: 'text-neutral-content',
        base100: 'text-base100-content',
        base200: 'text-base200-content',
        base300: 'text-base300-content',
        info: 'text-info-content',
        success: 'text-success-content',
        warning: 'text-warning-content',
        error: 'text-error-content'
    },

    fill: {
        primary: 'fill-primary',
        secondary: 'fill-secondary',
        accent: 'fill-accent',
        neutral: 'fill-neutral',
        base100: 'fill-base100',
        base200: 'fill-base200',
        base300: 'fill-base300',
        info: 'fill-info',
        success: 'fill-success',
        warning: 'fill-warning',
        error: 'fill-error'
    },

    stroke: {
        primary: 'stroke-primary',
        secondary: 'stroke-secondary',
        accent: 'stroke-accent',
        neutral: 'stroke-neutral',
        base100: 'stroke-base100',
        base200: 'stroke-base200',
        base300: 'stroke-base300',
        info: 'stroke-info',
        success: 'stroke-success',
        warning: 'stroke-warning',
        error: 'stroke-error'
    }
};

export const sizeList = ['xs', 'sm', 'md', 'lg'];
export type Size = (typeof sizeList)[number];
export const defaultSize: Size = 'md';

export const sizeMaps: Record<string, Record<Size, string>> = {
    table: {
        xs: 'table-xs',
        sm: 'table-sm',
        md: 'table-md',
        lg: 'table-lg'
    },

    text: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg'
    },

    icon: {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        md: 'w-9 h-9',
        lg: 'w-12 h-12'
    },

    glyph: {
        xs: 'w-8 h-8',
        sm: 'w-10 h-10',
        md: 'w-14 h-14',
        lg: 'w-20 h-20'
    },

    loading: {
        xs: 'loading-xs',
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg'
    }
};

export function uniqueId(scope: string): string {
    return `${scope}-${Math.random().toString(36).slice(2, 9)}`;
}
