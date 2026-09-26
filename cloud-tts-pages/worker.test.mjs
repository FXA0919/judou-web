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
