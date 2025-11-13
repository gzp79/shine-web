import { getContext, hasContext, setContext } from 'svelte';

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

/// Creates a Svelte context with a unique key based on the provided name.
/// Similar to svelete's built-in context functions, but getter returns undefined if the context is not set.
export function createContext<T>(name: string): [() => T | undefined, (context: T) => void] {
    const key = Symbol(name);

    return [
        () => {
            if (!hasContext(key)) {
                return undefined;
            }

            return getContext(key);
        },
        (context) => setContext(key, context)
    ];
}
