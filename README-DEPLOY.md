# 句读网页版部署说明

## 本地运行

需要 Node.js 22 或更高版本。

```powershell
.\start.ps1
```

默认地址：`http://127.0.0.1:4173`

## 静态部署

整个目录都是静态文件，但必须保留子目录结构，不能只上传 `index.html`。

建议使用支持大文件和自定义响应头的对象存储、CDN 或 Nginx，例如：

- 腾讯云 COS + CDN
- 阿里云 OSS + CDN
- Cloudflare R2
- 自有 Nginx 服务器

部分普通静态托管平台对单个文件大小有限制，而本项目中的 OCR 和语音模型超过 80 MB，部署前需要确认平台限制。

## 必须保留的响应头

```text
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: credentialless
Cross-Origin-Resource-Policy: same-origin
```

这些响应头用于启用多线程 WASM，可以显著提高 OCR 和自然语音速度。缺少这些响应头时应用仍可运行，但会降级到单线程。

## MIME 类型

```text
.js   text/javascript
.mjs  text/javascript
.wasm application/wasm
.gz   application/gzip
.onnx application/octet-stream
.ort  application/octet-stream
```

详细文件说明见 `README.md`。
