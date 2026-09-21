const runtimeBundle = await import("./paddle-runtime.bundle.mjs");
const { ort, PaddleOcrService } = runtimeBundle;

const appBase = new URL("./", import.meta.url);
const wasmUrl = new URL(
  "vendor/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm",
  appBase,
).href;
const wasmChunkVersion =
  "92452754caa2ae873bf835fd5fd1d057740f1d74bd0e50d0a5785860e59ab367";
const wasmChunkParts = [
  { name: "ort-wasm-simd-threaded.wasm.gz.part0", bytes: 1116165 },
  { name: "ort-wasm-simd-threaded.wasm.gz.part1", bytes: 1116165 },
  { name: "ort-wasm-simd-threaded.wasm.gz.part2", bytes: 1116165 },
];
const resourceHosts = [
  "https://gcore.jsdelivr.net/gh/FXA0919/judou-web@main/",
  "https://cdn.jsdelivr.net/gh/FXA0919/judou-web@main/",
  "https://fastly.jsdelivr.net/gh/FXA0919/judou-web@main/",
];
const preferLocalModel = Boolean(
  globalThis.Capacitor?.isNativePlatform?.() ||
    globalThis.Capacitor?.getPlatform?.() === "android" ||
    globalThis.androidBridge ||
    (typeof location !== "undefined" && location.search.includes("desktop=1")),
);
const originalFetch = globalThis.fetch.bind(globalThis);
let activeStageCallback = () => {};

ort.env.wasm.wasmPaths = new URL("vendor/onnxruntime-web/dist/", appBase).href;
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.logLevel = "error";
const wasmBinary = await loadWasmBinary().catch(() => null);
if (wasmBinary) {
  ort.env.wasm.wasmBinary = wasmBinary;
}

async function loadWasmBinary() {
  if (preferLocalModel || !("DecompressionStream" in globalThis)) {
    return null;
  }
  const cacheName = "judou-paddle-wasm-v1";
  let cache = null;
  try {
    cache = await caches.open(cacheName);
    const cached = await cache.match(wasmUrl);
    if (cached) {
      return cached.arrayBuffer();
    }
  } catch {
    cache = null;
  }

  const gzipSize = wasmChunkParts.reduce((sum, part) => sum + part.bytes, 0);
  const parts = await Promise.all(
    wasmChunkParts.map((part) => fetchWasmChunk(part)),
  );
  const merged = new Uint8Array(gzipSize);
  let offset = 0;
  parts.forEach((part) => {
    merged.set(part, offset);
    offset += part.byteLength;
  });
  activeStageCallback("正在解压 OCR 运行时");
  const decompressed = await new Response(
    new Blob([merged.buffer])
      .stream()
      .pipeThrough(new DecompressionStream("gzip")),
  ).arrayBuffer();
  if (decompressed.byteLength < 12000000) {
    throw new Error("OCR runtime is incomplete");
  }
  if (cache) {
    await cache
      .put(
        wasmUrl,
        new Response(decompressed, {
          headers: { "Content-Type": "application/wasm" },
        }),
      )
      .catch(() => undefined);
  }
  return decompressed;
}

async function fetchWasmChunk(part) {
  const relative = `vendor/onnxruntime-web/chunks/${part.name}?v=${wasmChunkVersion}`;
  const urls = resourceHosts.map((host) => `${host}${relative}`);
  urls.push(new URL(`vendor/onnxruntime-web/chunks/${part.name}`, appBase).href);
  let lastError = null;
  for (const url of urls) {
    try {
      const response = await originalFetch(url, { cache: "force-cache" });
      if (!response.ok) {
        throw new Error(`OCR runtime chunk request failed: ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength !== part.bytes) {
        throw new Error(`OCR runtime chunk size mismatch: ${part.name}`);
      }
      return new Uint8Array(buffer);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`Unable to fetch ${part.name}`);
}

const modelBase = new URL("vendor/paddle-models/", appBase).href;
const englishModelBase = new URL("vendor/paddle-models/en/", appBase).href;

const PROFILES = {
  english: {
    model: {
      detection: new URL("PP-OCRv6_tiny_det.ort", modelBase).href,
      recognition: new URL("en_PP-OCRv5_mobile_rec_int8.ort", englishModelBase).href,
      charactersDictionary: new URL("ppocrv5_en_dict.txt", englishModelBase).href,
    },
    modelSizes: {
      detection: 1882568,
      recognition: 7133720,
      charactersDictionary: 1417,
    },
    detection: {
      maxSideLength: 1920,
      minimumAreaThreshold: 8,
      paddingVertical: 0.26,
      paddingHorizontal: 0.36,
    },
    recognition: {
      strategy: "per-line",
      minimumConfidence: 0.42,
      spaceRecovery: true,
      recBatchSize: 2,
      mainThreadYieldMs: 8,
      maxCropSourceSideLength: 3200,
    },
  },
  multilingual: {
    model: {
      detection: new URL("PP-OCRv6_tiny_det.ort", modelBase).href,
      recognition: new URL("PP-OCRv6_tiny_rec.ort", modelBase).href,
      charactersDictionary: new URL("ppocrv6_tiny_dict.txt", modelBase).href,
    },
    modelSizes: {
      detection: 1882568,
      recognition: 4530048,
      charactersDictionary: 27157,
    },
    detection: {
      maxSideLength: "auto",
      minimumAreaThreshold: 12,
      paddingVertical: 0.3,
      paddingHorizontal: 0.4,
    },
    recognition: {
      strategy: "per-line",
      minimumConfidence: 0.48,
      spaceRecovery: true,
      recBatchSize: 4,
      mainThreadYieldMs: 8,
      maxCropSourceSideLength: 3000,
    },
  },
};

const services = new Map();
const servicePromises = new Map();
let initializationError = null;

export function isPaddleOcrReady(profile = "multilingual") {
  return Boolean(services.get(profile)?.isInitialized?.());
}

export function getPaddleOcrInitializationError() {
  return initializationError;
}

export async function initializePaddleOcr(
  profile = "multilingual",
  onStage = () => {},
) {
  const profileName = PROFILES[profile] ? profile : "multilingual";
  const profileConfig = PROFILES[profileName];
  if (isPaddleOcrReady(profileName)) {
    return services.get(profileName);
  }
  if (servicePromises.has(profileName)) {
    return servicePromises.get(profileName);
  }

  initializationError = null;
  activeStageCallback = typeof onStage === "function" ? onStage : () => {};
  const promise = (async () => {
    onStage(
      profileName === "english"
        ? "加载英文高精度 OCR 模型"
        : "加载多语言 OCR 模型",
    );
    const [detection, recognition, charactersDictionary] = await Promise.all([
      loadResource(profileConfig.model.detection, profileConfig.modelSizes.detection),
      loadResource(profileConfig.model.recognition, profileConfig.modelSizes.recognition),
      loadResource(
        profileConfig.model.charactersDictionary,
        profileConfig.modelSizes.charactersDictionary,
      ),
    ]);
    const candidate = new PaddleOcrService({
      model: {
        detection,
        recognition,
        charactersDictionary,
      },
      processing: {
        engine: "canvas-native",
      },
      detection: profileConfig.detection,
      recognition: profileConfig.recognition,
      debugging: {
        verbose: false,
        debug: false,
      },
    });

    try {
      await candidate.initialize();
      if (!candidate.isInitialized()) {
        throw new Error("PaddleOCR sessions were not initialized");
      }
      services.set(profileName, candidate);
      onStage("PaddleOCR 已就绪");
      return candidate;
    } catch (error) {
      initializationError = error;
      await candidate.destroy?.().catch(() => undefined);
      servicePromises.delete(profileName);
      throw error;
    }
  })();

  servicePromises.set(profileName, promise);
  return promise;
}

const resourceCache = new Map();

async function loadResource(url, size) {
  if (resourceCache.has(url)) {
    return resourceCache.get(url);
  }
  const promise = (async () => {
    let cache = null;
    try {
      cache = await caches.open("judou-paddle-models-v1");
      const cached = await cache.match(url);
      if (cached) {
        return cached.arrayBuffer();
      }
    } catch {
      cache = null;
    }

    const localSource = { url, mode: "ranges" };
    const remoteSources = remoteResourceUrls(url).map((remoteUrl) => ({
      url: remoteUrl,
      mode: "direct",
    }));
    const sources = preferLocalModel
      ? [localSource, ...remoteSources]
      : [...remoteSources, localSource];
    let lastError = null;

    for (const source of sources) {
      try {
        activeStageCallback("加载 OCR 模型");
        const buffer =
          source.mode === "ranges"
            ? await fetchResourceWithRanges(source.url, size)
            : await fetchResourceDirect(source.url, size);
        if (!buffer || buffer.byteLength < size * 0.98) {
          throw new Error(`Incomplete OCR resource from ${source.url}`);
        }
        if (cache) {
          await cache
            .put(
              url,
              new Response(buffer, {
                headers: {
                  "Content-Type": "application/octet-stream",
                  "Content-Length": String(buffer.byteLength),
                },
              }),
            )
            .catch(() => undefined);
        }
        return buffer;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error(`Unable to load OCR resource: ${url}`);
  })().catch((error) => {
    resourceCache.delete(url);
    throw error;
  });
  resourceCache.set(url, promise);
  return promise;
}

async function fetchResourceDirect(url, size) {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`OCR resource request failed: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  if (buffer.byteLength < size * 0.98) {
    throw new Error("OCR resource is incomplete");
  }
  return buffer;
}

async function fetchResourceWithRanges(url, size) {
  const probe = await fetch(url, {
    headers: { Range: "bytes=0-0" },
  }).catch(() => null);
  if (!probe || probe.status !== 206) {
    await probe?.body?.cancel().catch(() => undefined);
    return fetchResourceDirect(url, size);
  }
  await probe.body?.cancel().catch(() => undefined);

  const chunkCount = size > 4_000_000 ? 4 : 2;
  const chunkSize = Math.ceil(size / chunkCount);
  const buffers = await Promise.all(
    Array.from({ length: chunkCount }, (_, index) => {
      const start = index * chunkSize;
      const end = Math.min(size - 1, start + chunkSize - 1);
      return fetch(url, {
        headers: { Range: `bytes=${start}-${end}` },
      }).then((response) => {
        if (response.status !== 206) {
          throw new Error(`Range request failed: ${response.status}`);
        }
        return response.arrayBuffer();
      });
    }),
  );
  const merged = new Uint8Array(size);
  let offset = 0;
  buffers.forEach((buffer) => {
    merged.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;
  });
  return merged.buffer;
}

function remoteResourceUrls(localUrl) {
  const pathname = new URL(localUrl).pathname;
  const marker = "/judou-web/";
  const relative = pathname.includes(marker)
    ? pathname.slice(pathname.indexOf(marker) + marker.length)
    : pathname.replace(/^\/+/, "");
  return resourceHosts.map((host) => `${host}${relative}`);
}

export async function recognizeWithPaddleOcr(
  canvas,
  profile = "multilingual",
  onStage = () => {},
) {
  const readyService = await initializePaddleOcr(profile, onStage);
  const profileName = PROFILES[profile] ? profile : "multilingual";
  onStage("检测文字区域");
  const result = await readyService.recognize(canvas, {
    ...PROFILES[profileName].recognition,
  });
  onStage("整理识别结果");
  return result;
}
