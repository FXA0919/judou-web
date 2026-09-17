import type { InferenceSession } from "onnxruntime-common";
import type { SessionOptions } from "../interface.js";
/** Minimal shape of an ORT namespace capable of creating sessions. */
export type OrtLike = {
    InferenceSession: typeof InferenceSession;
};
/**
 * Create an ORT session, retrying with a CPU/WASM-only provider list if the
 * original attempt fails.
 *
 * Works around cases like `executionProviders: ["cuda", "cpu"]` on a host
 * without the CUDA runtime - ORT throws during session construction instead
 * of silently falling back to CPU. We catch that, log once, and retry with
 * whichever safe provider (`cpu` or `wasm`) was in the original list (or
 * default to `cpu` / `wasm` based on the ORT binding shape).
 *
 * Throws the original error if the provider list was already safe-only.
 *
 * `sessionOpts.onSessionFallback` is stripped before the options reach ORT and
 * is called with the original error once the fallback session is ready, so a
 * host that runs its own accelerator ladder can see the silent degradation.
 */
export declare function createSessionWithFallback(ort: OrtLike, modelData: Uint8Array, sessionOpts: SessionOptions | undefined, logger: (msg: string) => void, onFallback?: (newOpts: SessionOptions) => void): Promise<InferenceSession>;
