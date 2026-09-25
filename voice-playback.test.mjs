import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";

function silentWav() {
  const samples = 3200;
  const bytes = Buffer.alloc(44 + samples * 2);
  bytes.write("RIFF", 0);
  bytes.writeUInt32LE(bytes.length - 8, 4);
  bytes.write("WAVEfmt ", 8);
  bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20);
  bytes.writeUInt16LE(1, 22);
  bytes.writeUInt32LE(16000, 24);
  bytes.writeUInt32LE(32000, 28);
  bytes.writeUInt16LE(2, 32);
  bytes.writeUInt16LE(16, 34);
  bytes.write("data", 36);
  bytes.writeUInt32LE(samples * 2, 40);
  return bytes;
}

async function prepare(page, text) {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.click("#loadSampleBtn");
  await page.click('[data-view="review"]');
  await page.click("#editSourceBtn");
  await page.fill("#sourceText", text);
  await page.click("#applySourceBtn");
  await page.click('[data-view="listen"]');
}

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ["--disable-gpu", "--no-sandbox"],
});
try {
  const fakeSpeech = () => {
    const voices = [
      { name: "Microsoft Aria Natural", lang: "en-US", voiceURI: "aria", localService: true },
      { name: "Microsoft David", lang: "en-US", voiceURI: "david", localService: true },
    ];
    window.speechSynthesis.getVoices = () => voices;
    window.SpeechSynthesisUtterance = class {
      constructor(text) { this.text = text; }
    };
    window.__speechCalls = [];
    window.speechSynthesis.speak = (utterance) => {
      window.__speechCalls.push({ text: utterance.text, voice: utterance.voice?.name, pitch: utterance.pitch });
      window.setTimeout(() => utterance.onend?.(), 80);
    };
  };
  const context = await browser.newContext({ serviceWorkers: "block" });
  await context.addInitScript(fakeSpeech);
  const systemPage = await context.newPage();
  const errors = [];
  systemPage.on("pageerror", (error) => errors.push(error.message));
  await prepare(systemPage, "First, listen carefully; then repeat the sentence.");
  await systemPage.click("#playPauseBtn");
  await systemPage.waitForFunction(() => window.__speechCalls.length > 0);
  const systemCalls = await systemPage.evaluate(() => window.__speechCalls);
  assert.equal(systemCalls.length, 1, "short sentence should be one natural utterance");
  assert.equal(systemCalls[0].text, "First, listen carefully; then repeat the sentence.");
  assert.equal(systemCalls[0].pitch, 1);
  assert.match(systemCalls[0].voice, /Aria Natural/);

  let cloudPosts = 0;
  const cloudContext = await browser.newContext({ serviceWorkers: "block" });
  await cloudContext.addInitScript(fakeSpeech);
  await cloudContext.route("**/voice-config.js*", (route) => route.fulfill({
    contentType: "text/javascript",
    body: 'window.JUDOU_CLOUD_TTS_ENDPOINT = "https://voice.test/synthesize";',
  }));
  await cloudContext.route("https://voice.test/synthesize", (route) => {
    const headers = { "Access-Control-Allow-Origin": new URL(baseUrl).origin };
    if (route.request().method() === "OPTIONS") {
      return route.fulfill({ status: 204, headers: {
        ...headers,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      } });
    }
    cloudPosts += 1;
    return route.fulfill({ status: 200, contentType: "audio/wav", headers, body: silentWav() });
  });
  const cloudPage = await cloudContext.newPage();
  cloudPage.on("pageerror", (error) => errors.push(error.message));
  await prepare(cloudPage, "Practice every day.");
  assert.equal(await cloudPage.locator("#voiceSelect").inputValue(), "cloud:female");
  await cloudPage.click("#playPauseBtn");
  await cloudPage.waitForFunction(() => document.querySelector("#playbackCounter")?.textContent === "1 / 1");
  await cloudPage.waitForTimeout(500);
  assert.equal(cloudPosts, 1);
  assert.equal((await cloudPage.evaluate(() => window.__speechCalls)).length, 0);
  await cloudPage.click("#repeatBtn");
  await cloudPage.waitForTimeout(400);
  assert.equal(cloudPosts, 1, "repeat should use cached audio");

  await cloudContext.unroute("https://voice.test/synthesize");
  await cloudContext.route("https://voice.test/synthesize", (route) => {
    if (route.request().method() === "OPTIONS") {
      return route.fulfill({ status: 204, headers: {
        "Access-Control-Allow-Origin": new URL(baseUrl).origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      } });
    }
    return route.fulfill({ status: 503, contentType: "application/json", headers: {
      "Access-Control-Allow-Origin": new URL(baseUrl).origin,
    }, body: '{"error":"unavailable"}' });
  });
  const fallbackPage = await cloudContext.newPage();
  fallbackPage.on("pageerror", (error) => errors.push(error.message));
  await prepare(fallbackPage, "The online service is temporarily unavailable.");
  await fallbackPage.click("#playPauseBtn");
  await fallbackPage.waitForFunction(() => window.__speechCalls.length > 0);
  assert.equal((await fallbackPage.evaluate(() => window.__speechCalls))[0].text,
    "The online service is temporarily unavailable.");
  assert.deepEqual(errors, []);
  await context.close();
  await cloudContext.close();
  console.log("Voice playback QA passed: system prosody, online audio, repeat cache and fallback.");
} finally {
  await browser.close();
}
