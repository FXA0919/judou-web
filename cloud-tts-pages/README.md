# 句读语音 Pages 网关

当手机网络无法访问 `workers.dev` 时，这个 Cloudflare Pages 项目提供 `pages.dev` 地址。`public/_worker.js` 将 `/health` 和 `/synthesize` 转发到现有的 `judou-voice` Worker，语音配额仍由原 Worker 管理。`/translate` 接收来自句读网页的短文本，再向 MyMemory 公共接口请求译文，供手机跨站请求失败时使用。

当前生产地址为 `https://judou-voice-gateway.pages.dev`。Pages 生产环境的 Service binding 名为 `VOICE_WORKER`，绑定到 `judou-voice`。重新部署时上传 `public` 目录，并确认 `/health` 返回 `{"ready":true}`；网页版在根目录 `voice-config.js` 中使用 `/synthesize` 地址，翻译使用 `/translate` 地址。
