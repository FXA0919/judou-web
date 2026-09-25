const VOICES = Object.freeze({
  female: "en-US-AvaNeural",
  male: "en-US-AndrewNeural",
  girl: "en-US-JennyNeural",
});
const MAX_TEXT_LENGTH = 1200;
const CACHE_SECONDS = 7 * 24 * 60 * 60;

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin");
  const allowed = String(env.ALLOWED_ORIGINS || "https://fxa0919.github.io")
    .split(",")
    .map((value) => value.trim());
  return origin && allowed.includes(origin) ? origin : "";
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonError(message, status, origin = "") {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(origin ? corsHeaders(origin) : {}),
    },
  });
}

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[character]);
}

async function sha256(value) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function audioResponse(source, origin) {
  const headers = new Headers(source.headers);
  headers.set("Content-Type", "audio/mpeg");
  headers.set("Cache-Control", "no-store");
  for (const [name, value] of Object.entries(corsHeaders(origin))) {
    headers.set(name, value);
  }
  return new Response(source.body, { status: 200, headers });
}

function dailyLimit(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}

async function readJsonLimited(request, maxBytes) {
  if (!request.body) {
    return null;
  }
  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    length += value.byteLength;
    if (length > maxBytes) {
      await reader.cancel();
      throw new RangeError("Request too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export class VoiceBudget {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    const { ipHash, chars, totalLimit, ipLimit } = await request.json();
    if (!/^[a-f0-9]{64}$/.test(ipHash) || !Number.isInteger(chars) || chars < 1 || chars > MAX_TEXT_LENGTH) {
      return new Response("Invalid quota request", { status: 400 });
    }
    const allowed = await this.state.storage.transaction(async (storage) => {
      const ipKey = `ip:${ipHash}`;
      const total = (await storage.get("total")) || 0;
      const usedByIp = (await storage.get(ipKey)) || 0;
      if (total + chars > totalLimit || usedByIp + chars > ipLimit) {
        return false;
      }
      await storage.put("total", total + chars);
      await storage.put(ipKey, usedByIp + chars);
      return true;
    });
    return new Response(null, { status: allowed ? 204 : 429 });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return new Response(JSON.stringify({ ready: Boolean(env.AZURE_SPEECH_KEY && env.AZURE_SPEECH_REGION) }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }
    if (url.pathname !== "/synthesize") {
      return jsonError("Not found", 404);
    }
    const origin = allowedOrigin(request, env);
    if (!origin) {
      return jsonError("Origin not allowed", 403);
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return jsonError("Method not allowed", 405, origin);
    }
    if (!String(request.headers.get("Content-Type") || "").toLowerCase().startsWith("application/json")) {
      return jsonError("Expected JSON", 415, origin);
    }
    if (Number(request.headers.get("Content-Length") || 0) > 6000) {
      return jsonError("Request too large", 413, origin);
    }
    let input;
    try {
      input = await readJsonLimited(request, 6000);
    } catch (error) {
      if (error instanceof RangeError) {
        return jsonError("Request too large", 413, origin);
      }
      return jsonError("Invalid JSON", 400, origin);
    }
    const text = String(input?.text || "").replace(/\s+/g, " ").trim();
    const voice = String(input?.voice || "");
    if (!text || text.length > MAX_TEXT_LENGTH || !Object.hasOwn(VOICES, voice)) {
      return jsonError("Invalid text or voice", 400, origin);
    }
    const region = String(env.AZURE_SPEECH_REGION || "").trim().toLowerCase();
    if (!env.AZURE_SPEECH_KEY || !/^[a-z0-9]+$/.test(region) || !env.VOICE_BUDGET) {
      return jsonError("Voice service is not configured", 503, origin);
    }

    const cacheKey = new Request(new URL(`/__audio_cache__/${await sha256(`v1|${voice}|${text}`)}`, url.origin));
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) {
      return audioResponse(cached, origin);
    }

    const ipHash = await sha256(request.headers.get("CF-Connecting-IP") || "unknown");
    const day = new Date().toISOString().slice(0, 10);
    const budget = env.VOICE_BUDGET.get(env.VOICE_BUDGET.idFromName(day));
    const quota = await budget.fetch("https://budget.internal/consume", {
      method: "POST",
      body: JSON.stringify({
        ipHash,
        chars: text.length,
        totalLimit: dailyLimit(env.DAILY_CHAR_LIMIT, 100000),
        ipLimit: dailyLimit(env.DAILY_IP_CHAR_LIMIT, 10000),
      }),
    });
    if (!quota.ok) {
      return jsonError("Daily voice limit reached", 429, origin);
    }

    const ssml = `<speak version="1.0" xml:lang="en-US"><voice name="${VOICES[voice]}">${escapeXml(text)}</voice></speak>`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    let azure;
    try {
      azure = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
          "User-Agent": "JudouWeb",
        },
        body: ssml,
        signal: controller.signal,
      });
    } catch {
      return jsonError("Voice provider unavailable", 502, origin);
    } finally {
      clearTimeout(timer);
    }
    if (!azure.ok) {
      return jsonError("Voice provider rejected the request", 502, origin);
    }
    const audio = await azure.arrayBuffer();
    if (!audio.byteLength || audio.byteLength > 8_000_000) {
      return jsonError("Invalid voice audio", 502, origin);
    }
    const stored = new Response(audio, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
    });
    ctx.waitUntil(cache.put(cacheKey, stored.clone()).catch(() => undefined));
    return audioResponse(stored, origin);
  },
};
