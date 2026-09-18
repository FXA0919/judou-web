const runtimeBundle = await import("./paddle-runtime.bundle.mjs");
const { ort, PaddleOcrService } = runtimeBundle;

const appBase = new URL("./", import.meta.url);

ort.env.wasm.wasmPaths = new URL("vendor/onnxruntime-web/dist/", appBase).href;
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.logLevel = "error";

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

    const probe = await fetch(url, {
      headers: { Range: "bytes=0-0" },
    }).catch(() => null);
    if (!probe || probe.status !== 206) {
      await probe?.body?.cancel().catch(() => undefined);
      return fetch(url).then((response) => response.arrayBuffer());
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
    const response = new Response(merged, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": String(size),
      },
    });
    if (cache) {
      await cache.put(url, response.clone()).catch(() => undefined);
    }
    return response.arrayBuffer();
  })().catch((error) => {
    resourceCache.delete(url);
    throw error;
  });
  resourceCache.set(url, promise);
  return promise;
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
