/**
 * Represents a validation message that can be either a translation token or a raw string.
 */
export type ValidationMessage =
    | { type: 'token'; token: string; args?: Record<string, unknown> }
    | { type: 'raw'; message: string };

/**
 * Creates a validation message using a translation token.
 * This is the preferred way to create validation messages for Zod schemas.
 *
 * @param token - The translation key to use (e.g., 'validation.required')
 * @param args - Optional arguments for the translation (e.g., { min: 3, max: 10 })
 * @returns A stringified validation message that will be translated when displayed in the Validation component
 *
 */
export function i18nValidationMessage(token: string, args?: Record<string, unknown>): string {
    return JSON.stringify({ type: 'token', token, args } satisfies ValidationMessage);
}

/**
 * Creates a validation message using a raw string (not translated).
 * Use this when you need a specific message that shouldn't be translated.
 *
 * @param message - The raw message to display
 * @returns A stringified validation message that will be displayed as-is in the Validation component
 *
 */
export function rawValidationMessage(message: string): string {
    return JSON.stringify({ type: 'raw', message } satisfies ValidationMessage);
}

/**
 * Parses a validation message from a Zod error message string.
 *
 * @param message - The message string from a Zod error
 * @returns The parsed validation message or undefined if parsing fails
 */
export function parseValidationMessage(message: string): ValidationMessage | undefined {
    try {
        const parsed = JSON.parse(message);
        if (
            typeof parsed === 'object' &&
            parsed !== null &&
            'type' in parsed &&
            (parsed.type === 'token' || parsed.type === 'raw')
        ) {
            return parsed as ValidationMessage;
        }
    } catch {
        // Not a JSON message, ignore
    }
    return undefined;
}
