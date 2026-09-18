# 句读

浏览器端 MVP，用照片 OCR、自动分句、英译中和系统语音完成逐句跟读。

## 启动

```powershell
.\start.ps1
```

默认地址：`http://127.0.0.1:4173`

`start.ps1` 会在后台启动服务并检查 `/health`。如果需要在前台查看日志，运行：

```powershell
.\start.ps1 -Foreground
```

## 当前边界

- 默认使用浏览器端 PP-OCRv6 PaddleOCR，中英日韩和常见拉丁文字可离线识别。
- 英文使用 PP-OCRv5 英文识别模型，并采用单文件运行时和分块并行模型加载。
- PP-OCRv6 模型、ONNX Runtime Web、PaddleOCR 和图像处理依赖已随项目保存。
- Tesseract 作为快速后备；英文和简体中文模型已保存，其他语言按需加载。
- OCR 完成后会先生成整篇文档：去除跨页重复页眉页脚、识别常见双栏阅读顺序并重组段落。
- 自动分句会规避常见缩写、网址、邮箱、小数和编号列表的误切。
- 英文句子会用本地 Harper WASM 做保守校对，只自动修正拼写、标点、一致性和明确语法错误，原文和逐项修改记录都会保留。
- 翻译在文档分段和语法修正完成后执行，避免基于错误句子生成译文。
- 校对页可用光标手动拆分或并入相邻句子，并显示低置信度提示。
- 翻译默认优先使用浏览器内置翻译，失败后使用 MyMemory 公共接口。
- 默认使用本地 Kokoro 神经语音，提供女生、男声和少女三套声线。
- 跟读页可直接点击“女生、男声、少女”切换声音模块。
- 服务启用跨域隔离，让 ONNX Runtime 使用多线程 WASM。
- 公网无法启用跨域隔离时，会自动预载 OCR 单文件运行时并缓存模型。
- 每句话只进行一次语音推理，并提前生成当前句和后续句子。
- 已生成的语音会缓存到 IndexedDB，重新打开页面无需重新生成。
- 网页版会优先从国内可访问的 CDN 并行下载压缩分片，再在浏览器本地解压并保存到持久缓存；GitHub Pages 模型保留为后备源。
- 系统语音保留为低内存后备，只支持网页内播放。
- 项目保存在当前浏览器的 IndexedDB 中，可手动删除。
- OCR 或语法校对前会检查本地服务；服务停止时会提示重新运行 `start.ps1`。

## 开源来源

- PaddleOCR：https://github.com/PaddlePaddle/PaddleOCR
- ppu-paddle-ocr：https://github.com/PT-Perkasa-Pilar-Utama/ppu-paddle-ocr
- ppu-ocv：https://github.com/PT-Perkasa-Pilar-Utama/ppu-ocv
- ONNX Runtime Web：https://github.com/microsoft/onnxruntime
- Tesseract.js：https://github.com/naptha/tesseract.js
- Harper：https://github.com/Automattic/harper
- Kokoro：https://github.com/hexgrad/kokoro
- Lucide：https://github.com/lucide-icons/lucide

许可证文件保存在 `vendor/licenses/`。
