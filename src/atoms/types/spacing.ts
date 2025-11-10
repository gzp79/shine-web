import { toResponsiveClass, type ResponsiveProp } from './responsive-prop';

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type SpacingXY =
    | Spacing
    | ResponsiveProp<Spacing>
    | { x: Spacing | ResponsiveProp<Spacing>; y: Spacing | ResponsiveProp<Spacing> };

export function toSpacingClasses(
    prop: SpacingXY | undefined,
    prefix: { all: string; x: string; y: string }
) {
    if (prop === undefined) {
        return undefined;
    }
    if (typeof prop === 'object' && 'x' in prop) {
        return [
            toResponsiveClass(prop.x, (m, s) => `${m}${prefix.x}-${s}`),
            toResponsiveClass(prop.y, (m, s) => `${m}${prefix.y}-${s}`)
        ];
    }
    return [toResponsiveClass(prop, (m, s) => `${m}${prefix.all}-${s}`)];
}
