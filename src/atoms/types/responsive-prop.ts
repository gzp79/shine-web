export type MediaType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type MediaPrefixType = '' | 'sm:' | 'md:' | 'lg:' | 'xl:';

//Note: due to mobile first, xs is the default class, unless overridden by another media query
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
    className: (media: MediaPrefixType, prop: T) => string | string[]
): string | string[] {
    if (typeof prop === 'object' && 'xs' in prop) {
        const res = [
            className('', prop.xs),
            prop.sm ? className('sm:', prop.sm) : [],
            prop.md ? className('md:', prop.md) : [],
            prop.lg ? className('lg:', prop.lg) : [],
            prop.xl ? className('xl:', prop.xl) : []
        ].flat();
        return res;
    } else {
        return className('', prop);
    }
}
