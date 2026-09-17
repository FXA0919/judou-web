import type { RecognizeOptions } from "../interface.js";
/**
 * Simple LRU cache for processed images to avoid redundant processing
 */
export declare class ImageCache {
    private cache;
    private maxSize;
    constructor(maxSize?: number);
    /**
     * Get item from cache
     */
    get(key: string): unknown;
    /**
     * Set item in cache
     */
    set(key: string, value: unknown): void;
    /**
     * Clear cache
     */
    clear(): void;
    /**
     * Generate cache key from image data
     */
    static generateKey(imageBuffer: ArrayBuffer): string;
}
export declare const globalImageCache: ImageCache;
/** True when the call carries an override that changes the result for the same image. */
export declare function bypassesCache(options?: RecognizeOptions): boolean;
