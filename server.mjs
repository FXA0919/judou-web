import { fileURLToPath } from "node:url";
import { startStaticServer } from "./server-core.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);

const { url } = await startStaticServer({ root, host, port });
console.log(`句读已启动：${url}`);
