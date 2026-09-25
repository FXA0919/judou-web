# 句读在线语音服务

网页仍由 GitHub Pages 托管。这个 Cloudflare Worker 负责保管 Azure Speech 密钥、生成英文语音、缓存重复句子，并以每日字符数限制费用。用户手机不需要安装语音包。网页只有在 `voice-config.js` 配置 Worker 地址后才显示在线语音选项。

## 开通和部署

1. 创建 Azure Speech 资源，记下其区域和密钥。语音使用标准神经网络音色 `en-US-AvaNeural`、`en-US-AndrewNeural`、`en-US-JennyNeural`。
2. 创建 Cloudflare 账号。在 `wrangler.jsonc` 中把 `AZURE_SPEECH_REGION` 改成 Azure 资源的实际区域，把 `ALLOWED_ORIGINS` 改成网页的来源域名。GitHub Pages 项目路径不属于来源域名；当前来源是 `https://fxa0919.github.io`。
3. 在本目录运行 `npx wrangler login`，然后运行 `npx wrangler secret put AZURE_SPEECH_KEY`，按提示输入密钥。不要把密钥写入仓库或网页。
4. 运行 `npx wrangler deploy`，记下返回的 Worker 地址。访问 `<Worker 地址>/health`，应看到 `{"ready":true}`。
5. 把根目录 `voice-config.js` 的值改成 `<Worker 地址>/synthesize`，把 `sw.js` 的缓存版本加一，再提交并推送网页。新项目将默认选择在线自然语音；已有项目可在“朗读设置 → 声音”中选择。

上线前用手机打开 GitHub Pages 页面，分别试听三个音色、暂停与继续、重复同一句和切换句子。Cloudflare 和 Azure 的网络可达性取决于访客所在地区，应在目标地区的真实网络下测试。

## 用量保护

- 每句最多 1200 字符；只接受配置好的网页来源。
- 默认全站每天最多生成 100,000 字符，每个 IP 每天最多 10,000 字符。达到上限后网页会尝试系统语音。
- 网页在访客设备上保留最近 60 条音频。Worker 也尝试在边缘缓存相同句子 7 天；Cloudflare 的 Cache API 在 `*.workers.dev` 地址上不会真正保存缓存，接入自定义域名后才有这层跨访客缓存。
- 来源域名校验和 IP 限额只能降低滥用风险，不能代替账号认证。上线后还应在 Azure 设置预算提醒，观察实际用量，再决定是否提高限额。

`DAILY_CHAR_LIMIT`、`DAILY_IP_CHAR_LIMIT` 可在 `wrangler.jsonc` 调整。数值设为 `0` 可暂停新语音生成，已缓存的句子仍可播放。
