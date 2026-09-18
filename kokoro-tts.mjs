const base = new URL("./", import.meta.url);
const originalFetch = globalThis.fetch.bind(globalThis);
const huggingFacePrefix =
  "https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/main/";
const mirrorPrefix =
  "https://hf-mirror.com/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/main/";
const chunkVersion = "ee7c39f11407b68cf38adab76ccad2b9e30ac6f9a20c88f60ce558f43ef5aa21";
const chunkParts = [
  { name: "model_quantized.onnx.gz.part0", bytes: 15383684 },
  { name: "model_quantized.onnx.gz.part1", bytes: 15383684 },
  { name: "model_quantized.onnx.gz.part2", bytes: 15383684 },
  { name: "model_quantized.onnx.gz.part3", bytes: 15383682 },
];
const chunkHosts = [
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

const localModelFiles = new Map([
  ["config.json", "vendor/kokoro/model/config.json"],
  ["tokenizer.json", "vendor/kokoro/model/tokenizer.json"],
  ["tokenizer_config.json", "vendor/kokoro/model/tokenizer_config.json"],
  ["onnx/model_q8f16.onnx", "vendor/kokoro/model/onnx/model_q8f16.onnx"],
  ["onnx/model_quantized.onnx", "vendor/kokoro/model/onnx/model_quantized.onnx"],
]);

const parallelModelSizes = new Map([
  ["vendor/kokoro/model/onnx/model_quantized.onnx", 92361116],
]);

let activeStageCallback = () => {};
let modelReady = false;

globalThis.fetch = async (input, init) => {
  const rawUrl = typeof input === "string" ? input : input?.url;
  if (rawUrl?.startsWith(huggingFacePrefix)) {
    const relative = rawUrl.slice(huggingFacePrefix.length).split(/[?#]/)[0];
    const localFile =
      localModelFiles.get(relative) ||
      (relative.startsWith("voices/") ? `vendor/kokoro/${relative}` : "");
    if (localFile) {
      const localUrl = new URL(localFile, base).href;
      if (parallelModelSizes.has(localFile)) {
        const mirrorUrl = `${mirrorPrefix}${relative}`;
        const chunkSource = {
          mode: "gzip-chunks",
          label: "国内 CDN 加速",
          parts: chunkParts,
          hosts: chunkHosts,
          gzipSize: chunkParts.reduce((sum, part) => sum + part.bytes, 0),
        };
        const localSource = { url: localUrl, mode: "ranges", label: "本地应用文件" };
        const mirrorSource = { url: mirrorUrl, mode: "direct", label: "国内镜像" };
        return fetchModelFromSources(
          preferLocalModel
            ? [localSource, chunkSource, mirrorSource]
            : [chunkSource, localSource, mirrorSource],
          localUrl,
          parallelModelSizes.get(localFile),
          init,
        );
      }
      return originalFetch(localUrl, init);
    }
  }
  return originalFetch(input, init);
};

async function fetchModelFromSources(sources, cacheKey, size, init = {}) {
  const cacheName = "judou-kokoro-models-v1";
  let cache = null;
  try {
    cache = await caches.open(cacheName);
    const cached = await cache.match(cacheKey);
    if (cached) {
      activeStageCallback("语音模型已从缓存读取");
      return cached;
    }
  } catch {
    cache = null;
  }

  let lastError = null;
  for (const source of sources) {
    try {
      activeStageCallback(`从${source.label}加载语音模型 0%`);
      const buffer =
        source.mode === "gzip-chunks"
          ? await fetchModelFromGzipChunks(source, size, init)
          : source.mode === "ranges"
            ? await fetchModelWithRanges(source.url, size, init)
            : await fetchModelDirect(source.url, size, init);
      if (!buffer || buffer.byteLength < size * 0.98) {
        throw new Error(`Incomplete voice model from ${source.url}`);
      }
      const response = new Response(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": String(buffer.byteLength),
        },
      });
      if (cache) {
        await cache.put(cacheKey, response.clone()).catch(() => undefined);
      }
      activeStageCallback("语音模型加载完成");
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to download voice model");
}

async function fetchModelFromGzipChunks(source, size, init = {}) {
  let received = 0;
  const compressed = await Promise.all(
    source.parts.map((part) =>
      fetchChunkPart(part, source, init).then((buffer) => {
        received += buffer.byteLength;
        reportModelProgress(received, source.gzipSize);
        return new Uint8Array(buffer);
      }),
    ),
  );
  const merged = new Uint8Array(source.gzipSize);
  let offset = 0;
  compressed.forEach((part) => {
    merged.set(part, offset);
    offset += part.byteLength;
  });
  activeStageCallback("正在解压语音模型");
  return decompressGzip(merged.buffer, size);
}

async function fetchChunkPart(part, source, init = {}) {
  const relative = `vendor/kokoro/model/onnx/chunks/${part.name}?v=${chunkVersion}`;
  const urls = source.hosts.map((host) => `${host}${relative}`);
  urls.push(new URL(`vendor/kokoro/model/onnx/chunks/${part.name}`, base).href);

  let lastError = null;
  for (const url of urls) {
    try {
      const response = await originalFetch(url, {
        signal: init.signal,
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error(`Voice model chunk request failed: ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength !== part.bytes) {
        throw new Error(`Voice model chunk size mismatch: ${part.name}`);
      }
      return buffer;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`Unable to fetch ${part.name}`);
}

async function decompressGzip(buffer, expectedSize) {
  if (!("DecompressionStream" in globalThis)) {
    throw new Error("This browser does not support gzip decompression");
  }
  const stream = new Blob([buffer])
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));
  const output = await new Response(stream).arrayBuffer();
  if (output.byteLength < expectedSize * 0.98) {
    throw new Error("Decompressed voice model is incomplete");
  }
  return output;
}

async function fetchModelDirect(url, size, init = {}) {
  const response = await originalFetch(url, init);
  if (!response.ok) {
    throw new Error(`Voice model request failed: ${response.status}`);
  }
  const expected = Number(response.headers.get("content-length")) || size;
  if (!response.body) {
    const buffer = await response.arrayBuffer();
    reportModelProgress(buffer.byteLength, expected);
    return buffer;
  }

  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
    received += value.byteLength;
    reportModelProgress(received, expected);
  }
  const merged = new Uint8Array(received);
  let offset = 0;
  chunks.forEach((chunk) => {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  });
  return merged.buffer;
}

async function fetchModelWithRanges(url, size, init = {}) {
  const probe = await originalFetch(url, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Range: "bytes=0-0",
    },
  }).catch(() => null);
  if (!probe || probe.status !== 206) {
    await probe?.body?.cancel().catch(() => undefined);
    return fetchModelDirect(url, size, init);
  }
  await probe.body?.cancel().catch(() => undefined);

  const chunkCount = 6;
  const chunkSize = Math.ceil(size / chunkCount);
  const ranges = Array.from({ length: chunkCount }, (_, index) => {
    const start = index * chunkSize;
    const end = Math.min(size - 1, start + chunkSize - 1);
    return { start, end };
  });
  const responses = await Promise.all(
    ranges.map(({ start, end }) =>
      originalFetch(url, {
        ...init,
        headers: {
          ...(init.headers || {}),
          Range: `bytes=${start}-${end}`,
        },
      }),
    ),
  );
  if (responses.some((response) => response.status !== 206)) {
    return fetchModelDirect(url, size, init);
  }
  const buffers = await Promise.all(responses.map((response) => response.arrayBuffer()));
  const merged = new Uint8Array(size);
  let offset = 0;
  buffers.forEach((buffer) => {
    merged.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;
  });
  reportModelProgress(offset, size);
  return merged.buffer;
}

function reportModelProgress(received, total) {
  if (!total || !Number.isFinite(total)) {
    return;
  }
  const percent = Math.min(100, Math.round((received / total) * 100));
  activeStageCallback(`加载语音模型 ${percent}%`);
}

const { KokoroTTS, env } = await import("./vendor/kokoro/kokoro.web.js");

env.wasmPaths = new URL("vendor/onnxruntime-web/dist/", base).href;

export const NEURAL_VOICES = Object.freeze({
  female: {
    id: "af_heart",
    label: "女生",
    description: "清晰温暖，适合文章与课程",
  },
  male: {
    id: "am_michael",
    label: "男声",
    description: "沉稳自然，适合长文与讲解",
  },
  girl: {
    id: "af_sky",
    label: "少女",
    description: "轻盈年轻，适合对话和语言学习",
  },
});

let ttsPromise = null;
const audioCache = new Map();
const AUDIO_DB_NAME = "judou-kokoro-audio";
const AUDIO_STORE = "audio";
let audioDbPromise = null;

export function isNeuralVoice(value) {
  return typeof value === "string" && value.startsWith("neural:");
}

export function getNeuralVoiceKey(value) {
  if (!isNeuralVoice(value)) {
    return "";
  }
  const key = value.slice("neural:".length);
  return NEURAL_VOICES[key] ? key : "";
}

export function isKokoroReady() {
  return modelReady;
}

export async function warmUpKokoro(
  onStage = () => {},
  { device = "wasm", dtype = "q8" } = {},
) {
  if (!ttsPromise) {
    activeStageCallback = typeof onStage === "function" ? onStage : () => {};
    modelReady = false;
    onStage("加载 Kokoro 自然语音");
    ttsPromise = KokoroTTS.from_pretrained(
      "onnx-community/Kokoro-82M-v1.0-ONNX",
      {
        dtype,
        device,
        progress_callback: (event) => {
          if (event?.status === "progress" && Number.isFinite(event.progress)) {
            onStage(`加载语音模型 ${Math.round(event.progress)}%`);
          }
        },
      },
    )
      .then((tts) => {
        modelReady = true;
        activeStageCallback("语音模型已就绪");
        return tts;
      })
      .catch((error) => {
        ttsPromise = null;
        modelReady = false;
        throw error;
      });
  }
  return ttsPromise;
}

export async function synthesizeNaturalSpeech(
  text,
  voiceKey,
  { onStage = () => {}, device = "wasm", dtype = "q8" } = {},
) {
  const voice = NEURAL_VOICES[voiceKey];
  if (!voice) {
    throw new Error("Unknown Kokoro voice");
  }

  const normalized = String(text || "").trim();
  if (!normalized) {
    throw new Error("No text to synthesize");
  }

  const cacheKey = `${voice.id}:${normalized}`;
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey);
  }
  const persisted = await readPersistedAudio(cacheKey);
  if (persisted) {
    audioCache.set(cacheKey, persisted);
    return persisted;
  }

  const tts = await warmUpKokoro(onStage, { device, dtype });
  const chunks = splitSpeechChunks(normalized);
  const audioParts = [];
  let sampleRate = 24000;

  audioParts.push(new Float32Array(Math.round(sampleRate * 0.035)));
  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    onStage(`生成语音 ${index + 1} / ${chunks.length}`);
    const speed = 1 + ((index % 3) - 1) * 0.015;
    const audio = await tts.generate(chunk.text, {
      voice: voice.id,
      speed,
    });
    const samples = audio.audio instanceof Float32Array
      ? audio.audio
      : new Float32Array(audio.audio);
    sampleRate = Number(audio.sampling_rate) || sampleRate;
    audioParts.push(samples);
    audioParts.push(new Float32Array(Math.round(sampleRate * chunk.pauseAfter)));
  }
  audioParts.push(new Float32Array(Math.round(sampleRate * 0.12)));

  const merged = mergeFloat32Arrays(audioParts);
  const blob = encodeWav(merged, sampleRate);
  const result = {
    blob,
    duration: merged.length / sampleRate,
    sampleRate,
    cacheKey,
    cached: false,
  };
  audioCache.set(cacheKey, result);
  void writePersistedAudio(result);
  return result;
}

function openAudioDatabase() {
  if (!("indexedDB" in globalThis)) {
    return Promise.resolve(null);
  }
  if (!audioDbPromise) {
    audioDbPromise = new Promise((resolve) => {
      const request = indexedDB.open(AUDIO_DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(AUDIO_STORE)) {
          db.createObjectStore(AUDIO_STORE, { keyPath: "key" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }
  return audioDbPromise;
}

async function readPersistedAudio(key) {
  try {
    const db = await openAudioDatabase();
    if (!db) {
      return null;
    }
    const value = await new Promise((resolve, reject) => {
      const request = db.transaction(AUDIO_STORE, "readonly").objectStore(AUDIO_STORE).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
    if (!value?.blob) {
      return null;
    }
    return {
      blob: value.blob,
      duration: value.duration,
      sampleRate: value.sampleRate,
      cacheKey: key,
      cached: true,
    };
  } catch {
    return null;
  }
}

async function writePersistedAudio(value) {
  try {
    const db = await openAudioDatabase();
    if (!db) {
      return;
    }
    await new Promise((resolve, reject) => {
      const request = db.transaction(AUDIO_STORE, "readwrite").objectStore(AUDIO_STORE).put({
        key: value.cacheKey,
        blob: value.blob,
        duration: value.duration,
        sampleRate: value.sampleRate,
        createdAt: Date.now(),
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Audio caching is optional.
  }
}

function splitSpeechChunks(text) {
  if (text.length <= 240) {
    return [{ text, pauseAfter: 0.12 }];
  }

  const output = [];
  let current = "";
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    current += character;
    const next = text[index + 1] || "";
    const pauseAfter = /[;；:：]/.test(character)
      ? 0.2
      : /[—–…]/.test(character)
        ? 0.3
        : 0;
    if (pauseAfter && (!next || /\s/.test(next))) {
      pushChunk(output, current, pauseAfter);
      current = "";
    }
  }
  if (current.trim()) {
    pushChunk(output, current, 0.12);
  }
  return output;
}

function pushChunk(output, text, pauseAfter) {
  let remaining = text.trim();
  while (remaining.length > 220) {
    let splitAt = remaining.lastIndexOf(" ", 200);
    if (splitAt < 80) {
      splitAt = 200;
    }
    output.push({
      text: remaining.slice(0, splitAt).trim(),
      pauseAfter: 0.12,
    });
    remaining = remaining.slice(splitAt).trim();
  }
  if (remaining) {
    output.push({ text: remaining, pauseAfter });
  }
}

function mergeFloat32Arrays(parts) {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const merged = new Float32Array(length);
  let offset = 0;
  parts.forEach((part) => {
    merged.set(part, offset);
    offset += part.length;
  });
  return merged;
}

function encodeWav(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let index = 0; index < samples.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }
  return new Blob([buffer], { type: "audio/wav" });
}

function writeString(view, offset, value) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}
