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

export const colorBgMap: Record<Color, string> = {
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
};

export const colorTextMap: Record<Color, string> = {
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
};

export const colorTextContentMap: Record<Color, string> = {
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
};

export const sizeList = ['xs', 'sm', 'md', 'lg'];
export type Size = (typeof sizeList)[number];

export const tableSizeMap: Record<Size, string> = {
    xs: 'table-xs',
    sm: 'table-sm',
    md: 'table-md',
    lg: 'table-lg'
};
