import type { Color, Size } from '$components/types';

export interface GlyphProps {
    size?: Size;
    disabled?: boolean;
    class?: string;
}

export interface IconProps {
    color?: Color;
    size?: Size;
    disabled?: boolean;
    class?: string;
}
