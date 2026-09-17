import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, isAbsolute, join, normalize, relative, resolve } from "node:path";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gz": "application/gzip",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".onnx": "application/octet-stream",
  ".ort": "application/octet-stream",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".wasm": "application/wasm",
  ".webp": "image/webp",
};

export function createStaticServer(rootDirectory) {
  const root = resolve(rootDirectory);

  return createServer((request, response) => {
    if ((request.url || "").split("?")[0] === "/health") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "credentialless",
      });
      response.end(JSON.stringify({ status: "ok", service: "judou-read-along" }));
      return;
    }

    const file = findFile(root, request.url || "/");
    if (!file) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const extension = extname(file).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600",
      "Cross-Origin-Resource-Policy": "same-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "credentialless",
    });
    createReadStream(file).pipe(response);
  });
}

export function startStaticServer({
  root,
  host = "127.0.0.1",
  port = 4173,
  maxAttempts = 10,
}) {
  return new Promise((resolve, reject) => {
    let currentPort = Number(port) || 0;
    let attempts = 0;
    const server = createStaticServer(root);

    const handleError = (error) => {
      if (error.code === "EADDRINUSE" && currentPort !== 0 && attempts < maxAttempts) {
        attempts += 1;
        currentPort += 1;
        server.listen(currentPort, host);
        return;
      }
      reject(error);
    };

    server.on("error", handleError);
    server.listen(currentPort, host, () => {
      server.off("error", handleError);
      const address = server.address();
      const actualPort = typeof address === "object" && address ? address.port : currentPort;
      resolve({
        server,
        port: actualPort,
        url: `http://${host}:${actualPort}`,
      });
    });
  });
}

function findFile(root, urlPath) {
  const target = safePath(root, urlPath);
  if (!target) {
    return null;
  }
  if (existsSync(target) && statSync(target).isFile()) {
    return target;
  }
  const indexTarget = join(target, "index.html");
  if (existsSync(indexTarget) && statSync(indexTarget).isFile()) {
    return indexTarget;
  }
  return null;
}

function safePath(root, urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent((urlPath || "/").split("?")[0]);
  } catch {
    return null;
  }
  const normalized = normalize(decoded).replace(/^[/\\]+/, "");
  const target = resolve(root, normalized);
  const relativePath = relative(root, target);
  return relativePath.startsWith("..") || isAbsolute(relativePath) ? null : target;
}
