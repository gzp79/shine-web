export type Maybe<T> = T | null;

export type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export class FetchError extends Error {
    constructor(
        message: string,
        public status: number,
        public body: string
    ) {
        super(message);
    }
}

export async function fetchError(message: string, response: Response): Promise<Error> {
    const body = await response.text();
    return new FetchError(message, response.status, body);
}

export function delay(ms: number): Promise<void> {
    return new Promise((resolver) => setTimeout(resolver, ms));
}
