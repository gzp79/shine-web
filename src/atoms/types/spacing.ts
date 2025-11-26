import { type ResponsiveProp, toResponsiveClass } from './responsive-prop';

// prettier-ignore
export type SpacingValue = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 
    | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;

export type Spacing =
    | SpacingValue
    | ResponsiveProp<SpacingValue>
    | { x: SpacingValue | ResponsiveProp<SpacingValue>; y: SpacingValue | ResponsiveProp<SpacingValue> }
    | { col: SpacingValue | ResponsiveProp<SpacingValue>; row: SpacingValue | ResponsiveProp<SpacingValue> };

export function toSpacingClasses(prop: Spacing | undefined, prefix: { all: string; x: string; y: string }) {
    if (prop === undefined) {
        return undefined;
    }
    if (typeof prop === 'object' && 'x' in prop) {
        return [
            toResponsiveClass(prop.x, (m, s) => `${m}${prefix.x}-${s}`),
            toResponsiveClass(prop.y, (m, s) => `${m}${prefix.y}-${s}`)
        ];
    }
    if (typeof prop === 'object' && 'col' in prop) {
        return [
            toResponsiveClass(prop.col, (m, s) => `${m}${prefix.x}-${s}`),
            toResponsiveClass(prop.row, (m, s) => `${m}${prefix.y}-${s}`)
        ];
    }
    return [toResponsiveClass(prop, (m, s) => `${m}${prefix.all}-${s}`)];
}
