import assert from "node:assert/strict";
import test from "node:test";
import worker, { VoiceBudget } from "./worker.mjs";

function testEnvironment() {
  const values = new Map();
  const state = {
    storage: {
      transaction: async (callback) => callback({
        get: async (key) => values.get(key),
        put: async (key, value) => { values.set(key, value); },
      }),
    },
  };
  const budget = new VoiceBudget(state);
  const audio = new Map();
  const waits = [];
  const calls = [];
  globalThis.caches = {
    default: {
      match: async (request) => audio.get(request.url)?.clone(),
      put: async (request, response) => { audio.set(request.url, response.clone()); },
    },
  };
  return {
    env: {
      ALLOWED_ORIGINS: "https://fxa0919.github.io",
        AI: {
        run: async (...args) => {
          calls.push(args);
          if (args[0] === "@cf/meta/m2m100-1.2b") {
            return { translated_text: "你好。" };
          }
          return new Response(new Uint8Array([255, 251, 144, 100]), {
            headers: { "Content-Type": "audio/mpeg" },
          });
        },
      },
      DAILY_CHAR_LIMIT: "100",
      DAILY_IP_CHAR_LIMIT: "50",
      VOICE_BUDGET: {
        idFromName: (day) => day,
        get: () => ({ fetch: (url, init) => budget.fetch(new Request(url, init)) }),
      },
    },
    ctx: { waitUntil: (promise) => waits.push(promise) },
    waits,
    values,
    calls,
  };
}

function speechRequest(text, voice = "female", origin = "https://fxa0919.github.io") {
  return new Request("https://judou-voice.example/synthesize", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", "CF-Connecting-IP": "203.0.113.9" },
    body: JSON.stringify({ text, voice }),
  });
}

function translationRequest(text = "Hello.", source = "en", target = "zh-CN", origin = "https://fxa0919.github.io") {
  return new Request("https://judou-voice.example/translate", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify({ text, source, target }),
  });
}

test("rejects foreign origins and invalid inputs before spending", async () => {
  const { env, ctx, values } = testEnvironment();
  assert.equal((await worker.fetch(speechRequest("Hello", "female", "https://evil.example"), env, ctx)).status, 403);
  assert.equal((await worker.fetch(speechRequest("Hello", "unknown"), env, ctx)).status, 400);
  assert.equal((await worker.fetch(speechRequest("x".repeat(1201)), env, ctx)).status, 400);
  assert.equal(values.size, 0);
});

test("synthesizes with Aura 2, caches and enforces daily budget", async () => {
  const { env, ctx, waits, values, calls } = testEnvironment();
  const first = await worker.fetch(speechRequest("A & B < C"), env, ctx);
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("Access-Control-Allow-Origin"), "https://fxa0919.github.io");
  assert.equal(first.headers.get("Content-Type"), "audio/mpeg");
  assert.deepEqual(calls[0], ["@cf/deepgram/aura-2-en", {
    text: "A & B < C", speaker: "cora", encoding: "mp3",
  }, { returnRawResponse: true }]);
  await Promise.all(waits);
  const second = await worker.fetch(speechRequest("A & B < C"), env, ctx);
  assert.equal(second.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(values.get("total"), 9);

  env.DAILY_IP_CHAR_LIMIT = "12";
  const blocked = await worker.fetch(speechRequest("Another sentence"), env, ctx);
  assert.equal(blocked.status, 429);
  assert.equal(calls.length, 1);
});

test("preflight works and missing AI binding is reported", async () => {
  const { env, ctx } = testEnvironment();
  const preflight = await worker.fetch(new Request("https://judou-voice.example/synthesize", {
    method: "OPTIONS", headers: { Origin: "https://fxa0919.github.io" },
  }), env, ctx);
  assert.equal(preflight.status, 204);
  delete env.AI;
  assert.equal((await worker.fetch(speechRequest("Hello"), env, ctx)).status, 503);
});

test("provider errors keep audio off the cache", async () => {
  const { env, ctx, calls } = testEnvironment();
  env.AI.run = async (...args) => {
    calls.push(args);
    return new Response("unavailable", { status: 503 });
  };
  assert.equal((await worker.fetch(speechRequest("Hello"), env, ctx)).status, 502);
  assert.equal(calls.length, 1);
});

test("translates through Workers AI with CORS and validates requests", async () => {
  const { env, ctx, calls } = testEnvironment();
  const response = await worker.fetch(translationRequest(), env, ctx);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://fxa0919.github.io");
  assert.equal((await response.json()).translatedText, "你好。");
  assert.deepEqual(calls.at(-1), ["@cf/meta/m2m100-1.2b", {
    text: "Hello.", source_lang: "en", target_lang: "zh",
  }]);
  assert.equal((await worker.fetch(translationRequest("x".repeat(401)), env, ctx)).status, 400);
  assert.equal((await worker.fetch(translationRequest("Hello.", "en", "zh-CN", "https://evil.example"), env, ctx)).status, 403);
  assert.equal((await worker.fetch(new Request("https://judou-voice.example/translate", {
    method: "OPTIONS", headers: { Origin: "https://fxa0919.github.io" },
  }), env, ctx)).status, 204);
});
