import { LocalLinter, SuggestionKind } from "./vendor/harper/index.js";
import { binary } from "./vendor/harper/binary.js";

let linterPromise = null;

export function isHarperGrammarAvailable() {
  return true;
}

export async function warmUpHarperGrammar(onStage = () => {}) {
  if (!linterPromise) {
    onStage("加载本地语法模型");
    linterPromise = (async () => {
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

export async function correctEnglishText(
  source,
  { maxPasses = 2, maxChanges = 60 } = {},
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
    const fixes = collectSafeFixes(current, lints, maxChanges - changes.length);
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
        });
      });
  }

  return {
    text: current,
    changes,
    changed: current !== original,
  };
}

function collectSafeFixes(text, lints, remaining) {
  if (remaining <= 0) {
    return [];
  }

  const candidates = [];
  for (const lint of lints) {
    const suggestions = lint.suggestions();
    if (!suggestions.length) {
      continue;
    }

    const span = lint.span();
    const start = Math.max(0, Number(span.start) || 0);
    const end = Math.max(start, Number(span.end) || start);
    const before = text.slice(start, end);
    const message = lint.message();

    for (const suggestion of suggestions) {
      const kind = suggestion.kind();
      const replacement = suggestion.get_replacement_text();
      if (!isSafeFix({ text, start, end, before, replacement, kind, message })) {
        continue;
      }

      candidates.push({
        start,
        end,
        before,
        replacement,
        message,
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
