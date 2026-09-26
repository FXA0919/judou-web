import assert from "node:assert/strict";
import gateway from "./public/_worker.js";

const request = new Request("https://judou-voice-gateway.pages.dev/synthesize", {
  method: "POST",
  headers: { Origin: "https://fxa0919.github.io", "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Hello.", voice: "female" }),
});
let forwarded;
const response = await gateway.fetch(request, {
  VOICE_WORKER: {
    fetch: async (input) => {
      forwarded = input;
      return new Response("audio", { headers: { "Content-Type": "audio/mpeg" } });
    },
  },
});
assert.equal(response.status, 200);
assert.equal(response.headers.get("Content-Type"), "audio/mpeg");
assert.equal(forwarded.headers.get("Origin"), "https://fxa0919.github.io");
assert.equal((await forwarded.json()).text, "Hello.");
const missing = await gateway.fetch(request, {});
assert.equal(missing.status, 503);
assert.equal(missing.headers.get("Access-Control-Allow-Origin"), "https://fxa0919.github.io");
console.log("Pages voice gateway tests passed");

const translationUrl = "https://judou-voice-gateway.pages.dev/translate";
const translationRequest = new Request(translationUrl, {
  method: "POST",
  headers: { Origin: "https://fxa0919.github.io", "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Hello.", source: "en", target: "zh-CN" }),
});
let translationForwarded;
const translated = await gateway.fetch(translationRequest, {
  VOICE_WORKER: { fetch: async (input) => {
    translationForwarded = input;
    return Response.json({ translatedText: "你好。" }, { headers: { "Access-Control-Allow-Origin": "https://fxa0919.github.io" } });
  } },
});
assert.equal(translated.status, 200);
assert.equal((await translated.json()).translatedText, "你好。");
assert.equal(new URL(translationForwarded.url).pathname, "/translate");
assert.equal((await translationForwarded.json()).target, "zh-CN");
const preflight = await gateway.fetch(new Request(translationUrl, {
  method: "OPTIONS", headers: { Origin: "https://fxa0919.github.io" },
}), { VOICE_WORKER: { fetch: async (input) => new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": input.headers.get("Origin") } }) } });
assert.equal(preflight.status, 204);
const foreign = await gateway.fetch(new Request(translationUrl, {
  method: "POST",
  headers: { Origin: "https://other.example", "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Hello.", source: "en", target: "zh-CN" }),
}), { VOICE_WORKER: { fetch: async () => new Response("no", { status: 403 }) } });
assert.equal(foreign.status, 403);
console.log("Pages translation gateway tests passed");
