import {
  LocalLinter,
  SuggestionKind,
  createBinaryModuleFromUrl,
} from "./vendor/harper/index.js";

const base = new URL("./", import.meta.url);
const wasmUrl = new URL("./vendor/harper/harper_wasm_bg.wasm", import.meta.url).href;
const chunkVersion = "45831d47694ee8f2da6a691c099ba8d6be637e5367434e4e8333498cf6ec10fc";
const chunkParts = [
  { name: "harper_wasm_bg.wasm.gz.part0", bytes: 2716561 },
  { name: "harper_wasm_bg.wasm.gz.part1", bytes: 2716561 },
  { name: "harper_wasm_bg.wasm.gz.part2", bytes: 2716561 },
];
const chunkHosts = [
  "https://gcore.jsdelivr.net/gh/FXA0919/judou-web@main/",
  "https://cdn.jsdelivr.net/gh/FXA0919/judou-web@main/",
  "https://fastly.jsdelivr.net/gh/FXA0919/judou-web@main/",
];
const autoFixKinds = new Set([
  "Agreement",
  "BoundaryError",
  "Capitalization",
  "Grammar",
  "Miscellaneous",
  "Punctuation",
  "Spelling",
  "Typo",
  "WordOrder",
]);
const preferLocalModel = Boolean(
  globalThis.Capacitor?.isNativePlatform?.() ||
    globalThis.Capacitor?.getPlatform?.() === "android" ||
    globalThis.androidBridge ||
    (typeof location !== "undefined" && location.search.includes("desktop=1")),
);
const originalFetch = globalThis.fetch.bind(globalThis);

let linterPromise = null;
let activeStageCallback = () => {};

export function isHarperGrammarAvailable() {
  return true;
}

export async function warmUpHarperGrammar(onStage = () => {}) {
  if (!linterPromise) {
    activeStageCallback = typeof onStage === "function" ? onStage : () => {};
    linterPromise = (async () => {
      onStage("加载本地语法模型");
      const binaryUrl = await resolveWasmUrl();
      const binary = createBinaryModuleFromUrl(binaryUrl, "full");
      const linter = new LocalLinter({ binary });
      await linter.setup();
      return linter;
    })().catch((error) => {
      linterPromise = null;
      throw error;
    });
  }
  return linterPromise;
}

async function resolveWasmUrl() {
  if (preferLocalModel || !("DecompressionStream" in globalThis)) {
    return wasmUrl;
  }
  try {
    const buffer = await fetchCompressedWasm();
    const blobUrl = URL.createObjectURL(
      new Blob([buffer], { type: "application/wasm" }),
    );
    return blobUrl;
  } catch (error) {
    activeStageCallback("加速源不可用，切换本地语法模型");
    return wasmUrl;
  }
}

async function fetchCompressedWasm() {
  let received = 0;
  const gzipSize = chunkParts.reduce((sum, part) => sum + part.bytes, 0);
  const parts = await Promise.all(
    chunkParts.map((part) =>
      fetchChunkPart(part).then((buffer) => {
        received += buffer.byteLength;
        const percent = Math.min(100, Math.round((received / gzipSize) * 100));
        activeStageCallback(`加载语法模型 ${percent}%`);
        return new Uint8Array(buffer);
      }),
    ),
  );
  const merged = new Uint8Array(gzipSize);
  let offset = 0;
  parts.forEach((part) => {
    merged.set(part, offset);
    offset += part.byteLength;
  });
  activeStageCallback("正在解压语法模型");
  const stream = new Blob([merged.buffer])
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));
  const output = await new Response(stream).arrayBuffer();
  if (output.byteLength < 16000000) {
    throw new Error("Grammar model is incomplete");
  }
  return output;
}

async function fetchChunkPart(part) {
  const relative = `vendor/harper/chunks/${part.name}?v=${chunkVersion}`;
  const urls = chunkHosts.map((host) => `${host}${relative}`);
  urls.push(new URL(`vendor/harper/chunks/${part.name}`, base).href);
  let lastError = null;

  for (const url of urls) {
    try {
      const response = await originalFetch(url, { cache: "force-cache" });
      if (!response.ok) {
        throw new Error(`Grammar chunk request failed: ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength !== part.bytes) {
        throw new Error(`Grammar chunk size mismatch: ${part.name}`);
      }
      return buffer;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`Unable to fetch ${part.name}`);
}

export async function correctEnglishText(
  source,
  { maxPasses = 2, maxChanges = 60, conservative = true } = {},
) {
  const original = String(source || "").trim();
  if (!looksEnglish(original)) {
    return { text: original, changes: [], changed: false };
  }

  const linter = await warmUpHarperGrammar();
  let current = original;
  const changes = [];

  for (let pass = 0; pass < maxPasses; pass += 1) {
    const lints = await linter.lint(current, { language: "plaintext" });
    const fixes = collectSafeFixes(
      current,
      lints,
      maxChanges - changes.length,
      conservative,
    );
    if (!fixes.length) {
      break;
    }

    fixes
      .sort((left, right) => right.start - left.start)
      .forEach((fix) => {
        current = current.slice(0, fix.start) + fix.replacement + current.slice(fix.end);
        changes.push({
          before: fix.before,
          after: fix.replacement,
          message: fix.message,
          kind: fix.kind,
        });
      });
  }

  return {
    text: current,
    changes,
    changed: current !== original,
  };
}

function collectSafeFixes(text, lints, remaining, conservative) {
  if (remaining <= 0) {
    return [];
  }

  const candidates = [];
  for (const lint of lints) {
    const suggestions = lint.suggestions();
    if (!suggestions.length) {
      continue;
    }

    const kind = lint.lint_kind();
    if (conservative && !autoFixKinds.has(kind)) {
      continue;
    }

    const span = lint.span();
    const start = Math.max(0, Number(span.start) || 0);
    const end = Math.max(start, Number(span.end) || start);
    const before = text.slice(start, end);
    const message = lint.message();

    for (const suggestion of suggestions) {
      const suggestionKind = suggestion.kind();
      const replacement = suggestion.get_replacement_text();
      if (
        !isSafeFix({
          text,
          start,
          end,
          before,
          replacement,
          kind: suggestionKind,
          message,
        })
      ) {
        continue;
      }

      candidates.push({
        start,
        end,
        before,
        replacement,
        message,
        kind,
      });
      break;
    }
  }

  candidates.sort((left, right) => left.start - right.start || left.end - right.end);
  const accepted = [];
  for (const candidate of candidates) {
    const overlaps = accepted.some(
      (fix) => candidate.start < fix.end && candidate.end > fix.start,
    );
    if (!overlaps) {
      accepted.push(candidate);
    }
    if (accepted.length >= remaining) {
      break;
    }
  }
  return accepted;
}

function isSafeFix({ text, start, end, before, replacement, kind, message }) {
  if (kind !== SuggestionKind.Replace && kind !== SuggestionKind.Remove) {
    return false;
  }
  if (start === end && !replacement) {
    return false;
  }
  if (/[\r\n]/.test(replacement) && !/[\r\n]/.test(before)) {
    return false;
  }
  if (before.length > 2 && replacement.length > Math.max(24, before.length * 2.2)) {
    return false;
  }
  if (before.length === 0 && replacement.length > 16) {
    return false;
  }
  if (/copyright|html|url|hyperlink|heading/i.test(message)) {
    return false;
  }
  if (replacement === before) {
    return false;
  }
  return true;
}

function looksEnglish(text) {
  if (!text || text.length < 2) {
    return false;
  }
  const letters = (text.match(/[A-Za-z]/g) || []).length;
  const cjk = (text.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
  return letters >= 2 && letters / Math.max(1, letters + cjk) > 0.65;
}
