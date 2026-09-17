/**
 * Deep merges multiple objects into the target object.
 * Arrays are overwritten, not concatenated.
 *
 * @param target The target object to merge into.
 * @param sources The source objects to merge from.
 * @returns The merged target object.
 */
export declare function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: Partial<T>[]): T;
export declare function levenshteinDistance(a: string, b: string): number;
/**
 * Parse a `Retry-After` header into a delay in milliseconds.
 *
 * Accepts both forms the spec allows: delta-seconds (`120`) and an HTTP-date
 * (`Wed, 21 Oct 2015 07:28:00 GMT`). Returns null when the header is absent or
 * unparseable, which tells the caller to fall back to its own backoff.
 *
 * @param header - Raw header value, or null when the response carried none.
 * @param now - Current epoch milliseconds, used to resolve the HTTP-date form.
 */
export declare function parseRetryAfter(header: string | null, now: number): number | null;
/**
 * Fetches a URL as an `ArrayBuffer` with a per-attempt deadline and bounded
 * retries. Each attempt is aborted after `timeoutMs` (covering both the
 * response headers and the body download), so a stalled connection fails fast
 * and is retried instead of hanging indefinitely.
 *
 * A failed attempt waits for the response's `Retry-After` header when the host
 * sent one, and otherwise backs off exponentially with jitter.
 *
 * Once every attempt on `url` has failed, the whole sequence runs again against
 * `fallbackUrl` if there is one. By default that is the mirror of a built-in
 * model URL, which is off unless `PPU_PADDLE_OCR_MODEL_MIRROR` is set.
 *
 * @param url - Resource to download.
 * @param options - `timeoutMs` per-attempt deadline (default 300 000 ms / 5 min),
 *   `retries` additional attempts after the first (default 2), and `fallbackUrl`
 *   to try once the primary is exhausted (null disables it).
 * @returns The downloaded bytes.
 * @throws If every attempt fails (network error, timeout, or non-2xx response).
 */
export declare function fetchArrayBufferWithRetry(url: string, options?: {
    timeoutMs?: number;
    retries?: number;
    fallbackUrl?: string | null;
}): Promise<ArrayBuffer>;
/** Parse a PaddleOCR dictionary into an ordered array. Handles LF/CRLF; preserves blank entries. */
export declare function parseDictionary(source: ArrayBuffer | Uint8Array | string): string[];
/**
 * Checks if a value is a plain object.
 *
 * @param item The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
export declare function isObject(item: unknown): item is Record<string, unknown>;
