import * as ort from "onnxruntime-web";

const appBase = new URL("./", import.meta.url);

ort.env.wasm.wasmPaths = new URL("vendor/onnxruntime-web/dist/", appBase).href;
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.logLevel = "error";

const { PaddleOcrService } = await import("./vendor/ppu-paddle-ocr/web/index.js");

const modelBase = new URL("vendor/paddle-models/", appBase).href;
const model = {
  detection: new URL("PP-OCRv6_tiny_det.ort", modelBase).href,
  recognition: new URL("PP-OCRv6_tiny_rec.ort", modelBase).href,
  charactersDictionary: new URL("ppocrv6_tiny_dict.txt", modelBase).href,
};

let service = null;
let servicePromise = null;
let initializationError = null;

export function isPaddleOcrReady() {
  return Boolean(service?.isInitialized?.());
}

export function getPaddleOcrInitializationError() {
  return initializationError;
}

export async function initializePaddleOcr(onStage = () => {}) {
  if (isPaddleOcrReady()) {
    return service;
  }
  if (servicePromise) {
    return servicePromise;
  }

  initializationError = null;
  servicePromise = (async () => {
    onStage("加载 PaddleOCR 模型");
    const candidate = new PaddleOcrService({
      model,
      processing: {
        engine: "canvas-native",
      },
      detection: {
        maxSideLength: "auto",
        minimumAreaThreshold: 14,
        paddingVertical: 0.32,
        paddingHorizontal: 0.42,
      },
      recognition: {
        strategy: "per-line",
        minimumConfidence: 0.52,
        spaceRecovery: true,
        recBatchSize: 4,
        mainThreadYieldMs: 8,
        maxCropSourceSideLength: 2400,
      },
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
      service = candidate;
      onStage("PaddleOCR 已就绪");
      return service;
    } catch (error) {
      initializationError = error;
      await candidate.destroy?.().catch(() => undefined);
      servicePromise = null;
      throw error;
    }
  })();

  return servicePromise;
}

export async function recognizeWithPaddleOcr(canvas, onStage = () => {}) {
  const readyService = await initializePaddleOcr(onStage);
  onStage("检测文字区域");
  const result = await readyService.recognize(canvas, {
    strategy: "per-line",
    minimumConfidence: 0.52,
    spaceRecovery: true,
    recBatchSize: 4,
    mainThreadYieldMs: 8,
    maxCropSourceSideLength: 2400,
  });
  onStage("整理识别结果");
  return result;
}
