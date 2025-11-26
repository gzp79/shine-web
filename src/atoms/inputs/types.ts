export const inputVariantList = ['filled', 'outline', 'ghost'];
export type InputVariant = (typeof inputVariantList)[number];

export const inputSizeList = ['xs', 'sm', 'md', 'lg'];
export type InputSize = (typeof inputSizeList)[number];

export const inputContentHeightClasses: Record<InputSize, string> = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
};

export type LinkType = 'none' | 'hash' | 'internal' | 'external' | 'protocol';

/// Determines the type of link based on the URL format.
export function getLinkType(url: string | undefined): LinkType {
    if (!url) return 'none';
    if (url.startsWith('#')) return 'hash';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return 'external';
    if (url.startsWith('mailto:') || url.startsWith('tel:')) return 'protocol';
    return 'internal';
}

// Helper function for group border styling based on variant
export function getGroupBorderClasses(vertical: boolean, variant: InputVariant, borderColor: string): string[] {
    if (variant === 'ghost') {
        return [
            vertical
                ? 'border-2 border-transparent first:rounded-t-lg last:rounded-b-lg'
                : 'border-2 border-transparent first:rounded-s-lg last:rounded-e-lg'
        ];
    } else {
        return [
            `border-${borderColor}`,
            vertical
                ? 'first:border-t-2 last:border-b-2 border-x-2 border-t-2 first:rounded-t-lg last:rounded-b-lg'
                : 'first:border-s-2 last:border-e-2 border-y-2 border-s-2 first:rounded-s-lg last:rounded-e-lg'
        ];
    }
}

// Helper function for color and interaction styling based on variant
export function getGroupColorClasses(
    variant: InputVariant,
    disabled: boolean,
    bgColor: string,
    fgColor: string
): string[] {
    if (variant === 'filled') {
        return [`bg-${bgColor} text-${fgColor}`, disabled ? '!opacity-30 !cursor-not-allowed' : 'hover:highlight'];
    } else if (variant === 'outline') {
        return [`text-${fgColor}`, disabled ? '!opacity-30 !cursor-not-allowed' : 'hover:highlight-backdrop'];
    } else {
        // ghost
        return [`text-${fgColor}`, disabled ? '!opacity-30 !cursor-not-allowed' : 'hover:highlight-backdrop'];
    }
}
