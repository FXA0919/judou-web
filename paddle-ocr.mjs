import * as ort from "onnxruntime-web";

const appBase = new URL("./", import.meta.url);

ort.env.wasm.wasmPaths = new URL("vendor/onnxruntime-web/dist/", appBase).href;
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.logLevel = "error";

const { PaddleOcrService } = await import("./vendor/ppu-paddle-ocr/web/index.js");

const modelBase = new URL("vendor/paddle-models/", appBase).href;
const englishModelBase = new URL("vendor/paddle-models/en/", appBase).href;

const PROFILES = {
  english: {
    model: {
      detection: new URL("PP-OCRv6_tiny_det.ort", modelBase).href,
      recognition: new URL("en_PP-OCRv5_mobile_rec_int8.ort", englishModelBase).href,
      charactersDictionary: new URL("ppocrv5_en_dict.txt", englishModelBase).href,
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
    const candidate = new PaddleOcrService({
      model: profileConfig.model,
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
