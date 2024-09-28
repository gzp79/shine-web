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

    hover_bg: {
        primary: 'hover:bg-primary',
        secondary: 'hover:bg-secondary',
        accent: 'hover:bg-accent',
        neutral: 'hover:bg-neutral',
        base100: 'hover:bg-base100',
        base200: 'hover:bg-base200',
        base300: 'hover:bg-base300',
        info: 'hover:bg-info',
        success: 'hover:bg-success',
        warning: 'hover:bg-warning',
        error: 'hover:bg-error'
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

    button: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        neutral: 'btn-neutral',
        base100: 'btn-base-100',
        base200: 'btn-base-200',
        base300: 'btn-base-300',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error'
    },

    select: {
        primary: 'select-primary',
        secondary: 'select-secondary',
        accent: 'select-accent',
        neutral: 'select-neutral',
        base100: 'select-base100',
        base200: 'select-base200',
        base300: 'select-base300',
        info: 'select-info',
        success: 'select-success',
        warning: 'select-warning',
        error: 'select-error'
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
    },

    border: {
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        neutral: 'border-neutral',
        base100: 'border-base100',
        base200: 'border-base200',
        base300: 'border-base300',
        info: 'border-info',
        success: 'border-success',
        warning: 'border-warning',
        error: 'border-error'
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

    button: {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg'
    },

    select: {
        xs: 'select-xs',
        sm: 'select-sm',
        md: 'select-md',
        lg: 'select-lg'
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

export interface ResponsiveProp<T extends NonNullable<unknown>> {
    xs: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}

export function toResponsiveProp<T extends NonNullable<unknown>>(value: T): ResponsiveProp<T> {
    return { xs: value };
}

export function toResponsiveClass<T extends NonNullable<unknown>>(
    prop: T | ResponsiveProp<T>,
    className: (prop: T) => string
): string {
    if (typeof prop === 'object' && 'xs' in prop) {
        return [
            className(prop.xs),
            prop.sm && `sm:${className(prop.sm)}`,
            prop.md && `md:${className(prop.md)}`,
            prop.lg && `lg:${className(prop.lg)}`,
            prop.xl && `xl:${className(prop.xl)}`
        ]
            .filter((x) => x)
            .join(' ');
    } else {
        return className(prop);
    }
}

export function uniqueId(scope: string): string {
    return `${scope}-${Math.random().toString(36).slice(2, 9)}`;
}

export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => start + i);
}
