const CACHE_NAME = "judou-shell-v17";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./voice-config.js",
  "./text-engine.js",
  "./vendor/lucide/lucide.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.allSettled(SHELL_FILES.map((file) => cacheFile(cache, file))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("judou-shell-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.headers.has("range")) {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate" || url.pathname.endsWith("/voice-config.js")) {
    event.respondWith(
      caches.match(request.mode === "navigate" ? "./index.html" : request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              void caches.open(CACHE_NAME).then((cache) => cache.put(
                request.mode === "navigate" ? "./index.html" : request, copy,
              ));
            }
            return response;
          })
          .catch(() => cached || Response.error());
        return network;
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, copy))
              .catch(() => undefined);
          }
          return response;
        });
    }),
  );
});

async function cacheFile(cache, file) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(file, {
      cache: "reload",
      signal: controller.signal,
    });
    if (response.ok) {
      await cache.put(file, response);
    }
  } finally {
    clearTimeout(timeout);
  }
}
