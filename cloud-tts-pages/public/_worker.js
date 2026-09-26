const ALLOWED_ORIGIN = "https://fxa0919.github.io";

function failure(message, status, request) {
  const origin = request.headers.get("Origin");
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(origin === ALLOWED_ORIGIN ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
    },
  });
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path !== "/health" && path !== "/synthesize" && path !== "/translate") {
      return new Response("Judou voice gateway", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    if (!env.VOICE_WORKER) {
      return failure("Voice gateway is not connected", 503, request);
    }
    try {
      return await env.VOICE_WORKER.fetch(request);
    } catch {
      return failure("Voice gateway unavailable", 502, request);
    }
  },
};
