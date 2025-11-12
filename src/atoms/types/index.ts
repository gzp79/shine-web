/// Common element props, those are usually passed through to the underlying HTML element.
export interface ElementProps {
    id?: string;
    role?: string;
}

export const containerColorList = ['surface', 'container', 'sub-container'];
export type ContainerColor = (typeof containerColorList)[number];

export const actionColorList = ['primary', 'secondary', 'info', 'warning', 'danger', 'success'];
export type ActionColor = (typeof actionColorList)[number];

export const sizeList = ['xs', 'sm', 'md', 'lg'];
export type Size = (typeof sizeList)[number];

export const inputVariantList = ['filled', 'outline', 'ghost'];
export type InputVariant = (typeof inputVariantList)[number];

export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => start + i);
}

export function simpleHash(str: string): string {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
}
