# 句读在线语音服务

网页由 GitHub Pages 托管。这个 Cloudflare Worker 通过 Workers AI 的 Deepgram Aura 2 英文模型生成语音。手机不需要安装语音包，也不需要 Azure 账号或密钥。网页只有在 `voice-config.js` 配置 Worker 地址后才显示在线语音选项。

## 开通和部署

1. 注册并登录 Cloudflare 账号。Workers Free 计划即可试用 Workers AI 和 SQLite Durable Objects。
2. 在本目录运行 `npx wrangler login`，按浏览器提示授权。`wrangler.jsonc` 的 `ALLOWED_ORIGINS` 当前对应 `https://fxa0919.github.io`。
3. 运行 `npx wrangler deploy`，记下返回的 Worker 地址。访问 `<Worker 地址>/health`，应看到 `{"ready":true}`。
4. 把根目录 `voice-config.js` 的值改为 `<Worker 地址>/synthesize`，把 `sw.js` 的缓存版本加一，然后提交并推送网页。新项目会默认选择在线自然语音；已有项目可在“朗读设置 → 声音”中选择。

上线前用手机打开 GitHub Pages 页面，分别试听三个音色、暂停与继续、重复同一句和切换句子。Cloudflare 和 GitHub Pages 的网络可达性取决于访客所在地区，应在目标地区的真实网络下测试。

## 用量保护

- 每句最多 1200 字符；只接受配置好的网页来源。
- 三个音色分别使用 Aura 2 的 `cora`、`arcas`、`iris`，可根据手机试听结果调整。
- 全站每天最多生成 3,000 字符，每个 IP 每天最多使用这 3,000 字符，足够单人朗读一页较长的教材。全站上限没有增加，多个访客会共享同一天的额度。以 Aura 2 每千字符 0.03 美元和 Workers AI 每天 10,000 Neurons 免费额度估算，3,000 字符约用掉 8,182 Neurons，给其他消耗留一点余量。若账号还运行其他 AI 服务，可能更早触及额度。Workers Free 达到额度后会报错，网页会尝试设备语音。
- 网页在访客设备上保留最近 60 条音频。Worker 也尝试在边缘缓存相同句子 7 天；Cloudflare 的 Cache API 在 `*.workers.dev` 地址上不会真正保存缓存，接入自定义域名后才有这层跨访客缓存。
- 来源域名校验和 IP 限额只能降低滥用风险，不能代替账号认证。若以后升级付费计划，先观察实际用量，再决定是否提高限额。

`DAILY_CHAR_LIMIT`、`DAILY_IP_CHAR_LIMIT` 可在 `wrangler.jsonc` 调整。数值设为 `0` 可暂停新语音生成，已缓存的句子仍可播放。
