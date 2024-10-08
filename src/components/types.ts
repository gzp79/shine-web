export const colorList = ['surface', 'primary', 'info', 'warning', 'danger', 'success'];
export type Color = (typeof colorList)[number];

export const sizeList = ['xs', 'sm', 'md', 'lg'];
export type Size = (typeof sizeList)[number];

export function uniqueId(scope: string): string {
    return `${scope}-${Math.random().toString(36).slice(2, 9)}`;
}

export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => start + i);
}
