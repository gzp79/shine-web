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
