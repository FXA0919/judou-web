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
  globalThis.caches = {
    default: {
      match: async (request) => audio.get(request.url)?.clone(),
      put: async (request, response) => { audio.set(request.url, response.clone()); },
    },
  };
  return {
    env: {
      ALLOWED_ORIGINS: "https://fxa0919.github.io",
      AZURE_SPEECH_KEY: "test-key",
      AZURE_SPEECH_REGION: "southeastasia",
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
  };
}

function speechRequest(text, voice = "female", origin = "https://fxa0919.github.io") {
  return new Request("https://judou-voice.example/synthesize", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", "CF-Connecting-IP": "203.0.113.9" },
    body: JSON.stringify({ text, voice }),
  });
}

test("rejects foreign origins and invalid inputs before spending", async () => {
  const { env, ctx, values } = testEnvironment();
  assert.equal((await worker.fetch(speechRequest("Hello", "female", "https://evil.example"), env, ctx)).status, 403);
  assert.equal((await worker.fetch(speechRequest("Hello", "unknown"), env, ctx)).status, 400);
  assert.equal((await worker.fetch(speechRequest("x".repeat(1201)), env, ctx)).status, 400);
  assert.equal(values.size, 0);
});

test("synthesizes once, escapes SSML, caches and enforces daily budget", async () => {
  const { env, ctx, waits, values } = testEnvironment();
  const originalFetch = globalThis.fetch;
  let azureCalls = 0;
  let ssml = "";
  globalThis.fetch = async (_url, init) => {
    azureCalls += 1;
    ssml = init.body;
    return new Response(new Uint8Array([255, 251, 144, 100]), {
      headers: { "Content-Type": "audio/mpeg" },
    });
  };
  try {
    const first = await worker.fetch(speechRequest("A & B < C"), env, ctx);
    assert.equal(first.status, 200);
    assert.equal(first.headers.get("Access-Control-Allow-Origin"), "https://fxa0919.github.io");
    assert.equal(first.headers.get("Content-Type"), "audio/mpeg");
    assert.match(ssml, /A &amp; B &lt; C/);
    assert.match(ssml, /en-US-AvaNeural/);
    await Promise.all(waits);
    const second = await worker.fetch(speechRequest("A & B < C"), env, ctx);
    assert.equal(second.status, 200);
    assert.equal(azureCalls, 1);
    assert.equal(values.get("total"), 9);

    env.DAILY_IP_CHAR_LIMIT = "12";
    const blocked = await worker.fetch(speechRequest("Another sentence"), env, ctx);
    assert.equal(blocked.status, 429);
    assert.equal(azureCalls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("preflight works and missing provider secret is reported", async () => {
  const { env, ctx } = testEnvironment();
  const preflight = await worker.fetch(new Request("https://judou-voice.example/synthesize", {
    method: "OPTIONS", headers: { Origin: "https://fxa0919.github.io" },
  }), env, ctx);
  assert.equal(preflight.status, 204);
  delete env.AZURE_SPEECH_KEY;
  assert.equal((await worker.fetch(speechRequest("Hello"), env, ctx)).status, 503);
});
