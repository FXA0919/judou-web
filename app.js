(() => {
  "use strict";

  const DB_NAME = "judou-read-along";
  const DB_VERSION = 1;
  const PROJECTS_STORE = "projects";
  const META_STORE = "meta";
  const REMOTE_TESSDATA = "https://tessdata.projectnaptha.com/4.0.0";
  const LOCAL_TESSDATA_LANGS = new Set(["eng", "chi_sim"]);
  const MAX_IMAGE_EDGE = 2400;
  const PADDLE_MAX_IMAGE_EDGE = 2800;

  const LANGUAGE_INFO = {
    eng: {
      speech: "en-US",
      segmenter: "en",
      translation: "en",
      browser: "en",
      label: "English",
    },
    chi_sim: {
      speech: "zh-CN",
      segmenter: "zh-CN",
      translation: "zh-CN",
      browser: "zh",
      label: "简体中文",
    },
    jpn: {
      speech: "ja-JP",
      segmenter: "ja",
      translation: "ja",
      browser: "ja",
      label: "日本語",
    },
    kor: {
      speech: "ko-KR",
      segmenter: "ko",
      translation: "ko",
      browser: "ko",
      label: "한국어",
    },
    fra: {
      speech: "fr-FR",
      segmenter: "fr",
      translation: "fr",
      browser: "fr",
      label: "Français",
    },
    deu: {
      speech: "de-DE",
      segmenter: "de",
      translation: "de",
      browser: "de",
      label: "Deutsch",
    },
    spa: {
      speech: "es-ES",
      segmenter: "es",
      translation: "es",
      browser: "es",
      label: "Español",
    },
    rus: {
      speech: "ru-RU",
      segmenter: "ru",
      translation: "ru",
      browser: "ru",
      label: "Русский",
    },
    ara: {
      speech: "ar-SA",
      segmenter: "ar",
      translation: "ar",
      browser: "ar",
      label: "العربية",
    },
  };

  const SAMPLE_TEXT = [
    "Learning a language works best when practice becomes part of your day.",
    "Short and regular sessions are easier to keep than long and occasional ones.",
    "Read each sentence aloud, then listen carefully to the rhythm of the language.",
    "Do not worry about understanding every word on the first pass.",
    "Return to the same sentence tomorrow and notice what has become easier.",
  ].join("\n");

  const SAMPLE_TRANSLATIONS = new Map([
    [SAMPLE_TEXT.split("\n")[0], "当练习成为日常生活的一部分时，语言学习效果最好。"],
    [SAMPLE_TEXT.split("\n")[1], "短而规律的练习比偶尔进行长时间练习更容易坚持。"],
    [SAMPLE_TEXT.split("\n")[2], "把每个句子大声读出来，然后仔细听这门语言的节奏。"],
    [SAMPLE_TEXT.split("\n")[3], "第一遍不必担心理解每一个单词。"],
    [SAMPLE_TEXT.split("\n")[4], "明天再回到同一个句子，留意哪些地方已经变得更容易。"],
  ]);

  const DEFAULT_SETTINGS = {
    ocrEngine: "auto",
    ocrLanguage: "eng",
    enhanceImages: true,
    autoTranslate: true,
    grammarCheck: true,
    translationProvider: "auto",
    rate: 1,
    repeat: 1,
    gap: 0.4,
    loopAll: false,
    voiceURI: "neural:female",
    showTranslations: true,
  };

  const runtime = {
    db: null,
    files: new Map(),
    metaList: [],
    ocr: {
      worker: null,
      paddleModulePromise: null,
      language: "",
      engineUsed: "",
      active: false,
      pageIndex: 0,
      pageCount: 0,
      localProgress: 0,
    },
    translation: {
      active: false,
      token: 0,
      completed: 0,
      total: 0,
      failures: 0,
    },
    grammar: {
      active: false,
      token: 0,
      completed: 0,
      total: 0,
    },
    neural: {
      modulePromise: null,
      audioContext: null,
      source: null,
      gainNode: null,
      generating: false,
      prefetchIndex: -1,
      prefetchPromise: null,
      prepareToken: 0,
    },
    player: {
      state: "idle",
      currentIndex: -1,
      token: 0,
      repeatRemaining: 1,
      timer: null,
    },
    preview: {
      index: -1,
      zoom: 1,
      objectUrl: "",
    },
    translators: new Map(),
    voices: [],
    saveTimer: null,
    savePromise: Promise.resolve(),
    lastSaveAt: 0,
  };

  let project = createProject();
  let activeView = "import";

  const dom = {};

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheDom();
    bindStaticEvents();
    await openDatabase();
    await loadInitialProject();
    syncControlsFromProject();
    renderEverything();
    setupVoices();
    renderIcons();
  }

  function cacheDom() {
    [
      "sidebar",
      "newProjectBtn",
      "projectList",
      "settingsBtn",
      "deleteProjectBtn",
      "menuBtn",
      "projectTitle",
      "saveStatus",
      "loadSampleBtn",
      "dropZone",
      "chooseFilesBtn",
      "fileInput",
      "ocrEngine",
      "ocrLanguage",
      "enhanceImages",
      "autoTranslate",
      "grammarCheck",
      "processBtn",
      "ocrProgress",
      "ocrProgressLabel",
      "ocrProgressValue",
      "ocrProgressBar",
      "pageCountLabel",
      "addMoreBtn",
      "pageGrid",
      "segmentCount",
      "translatedCount",
      "grammarCount",
      "grammarReviewBtn",
      "grammarButtonLabel",
      "grammarStatus",
      "grammarStatusLabel",
      "grammarStatusValue",
      "grammarProgressBar",
      "translateBtn",
      "translateButtonLabel",
      "editSourceBtn",
      "resegmentBtn",
      "translationStatus",
      "translationStatusLabel",
      "translationStatusValue",
      "translationProgressBar",
      "segmentList",
      "focusSentence",
      "focusTranslation",
      "playbackCounter",
      "previousBtn",
      "playPauseBtn",
      "nextBtn",
      "repeatBtn",
      "quickRate",
      "quickRateValue",
      "showTranslations",
      "listenList",
      "voiceModuleSwitcher",
      "voiceSelect",
      "rateControl",
      "rateValue",
      "repeatSelect",
      "gapControl",
      "gapValue",
      "loopAll",
      "sourceDialog",
      "sourceText",
      "cancelSourceBtn",
      "applySourceBtn",
      "imagePreviewDialog",
      "previewImageName",
      "previewPageCounter",
      "closePreviewBtn",
      "previewPreviousBtn",
      "previewNextBtn",
      "previewZoomOutBtn",
      "previewZoomInBtn",
      "previewResetBtn",
      "previewZoomValue",
      "imagePreviewStage",
      "previewImage",
      "settingsDialog",
      "translationProvider",
      "clearAllBtn",
      "toastRegion",
    ].forEach((id) => {
      dom[id] = document.getElementById(id);
    });
  }

  function bindStaticEvents() {
    document.querySelectorAll(".view-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchView(tab.dataset.view));
    });

    dom.newProjectBtn.addEventListener("click", () => createAndOpenProject());
    dom.menuBtn.addEventListener("click", () => dom.sidebar.classList.toggle("is-open"));
    dom.projectList.addEventListener("click", handleProjectListClick);
    dom.deleteProjectBtn.addEventListener("click", deleteCurrentProject);
    dom.settingsBtn.addEventListener("click", () => dom.settingsDialog.showModal());
    dom.clearAllBtn.addEventListener("click", clearAllProjects);

    dom.projectTitle.addEventListener("input", () => {
      project.title = dom.projectTitle.value.trimStart();
      scheduleSave();
      updateProjectMeta();
      renderProjectList();
    });
    dom.projectTitle.addEventListener("blur", () => {
      if (!dom.projectTitle.value.trim()) {
        project.title = "未命名项目";
        dom.projectTitle.value = project.title;
      }
      scheduleSave();
    });

    dom.chooseFilesBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      dom.fileInput.click();
    });
    dom.addMoreBtn.addEventListener("click", () => dom.fileInput.click());
    dom.dropZone.addEventListener("click", () => dom.fileInput.click());
    dom.dropZone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dom.fileInput.click();
      }
    });
    dom.fileInput.addEventListener("change", async () => {
      await addFiles(Array.from(dom.fileInput.files || []));
      dom.fileInput.value = "";
    });

    ["dragenter", "dragover"].forEach((name) => {
      dom.dropZone.addEventListener(name, (event) => {
        event.preventDefault();
        dom.dropZone.classList.add("is-dragging");
      });
    });
    ["dragleave", "drop"].forEach((name) => {
      dom.dropZone.addEventListener(name, (event) => {
        event.preventDefault();
        dom.dropZone.classList.remove("is-dragging");
      });
    });
    dom.dropZone.addEventListener("drop", async (event) => {
      await addFiles(Array.from(event.dataTransfer?.files || []));
    });

    document.addEventListener("paste", async (event) => {
      const files = Array.from(event.clipboardData?.files || []).filter((file) =>
        file.type.startsWith("image/"),
      );
      if (files.length) {
        event.preventDefault();
        await addFiles(files);
      }
    });

    dom.pageGrid.addEventListener("click", handlePageAction);

    dom.closePreviewBtn.addEventListener("click", () => dom.imagePreviewDialog.close());
    dom.previewPreviousBtn.addEventListener("click", () => showPreviewAt(runtime.preview.index - 1));
    dom.previewNextBtn.addEventListener("click", () => showPreviewAt(runtime.preview.index + 1));
    dom.previewZoomOutBtn.addEventListener("click", () => setPreviewZoom(runtime.preview.zoom - 0.25));
    dom.previewZoomInBtn.addEventListener("click", () => setPreviewZoom(runtime.preview.zoom + 0.25));
    dom.previewResetBtn.addEventListener("click", () => setPreviewZoom(1));
    dom.imagePreviewDialog.addEventListener("close", closeImagePreview);
    dom.imagePreviewDialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviewAt(runtime.preview.index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showPreviewAt(runtime.preview.index + 1);
      }
    });

    dom.ocrEngine.addEventListener("change", () => {
      project.settings.ocrEngine = dom.ocrEngine.value;
      scheduleSave();
    });
    dom.ocrLanguage.addEventListener("change", () => {
      project.settings.ocrLanguage = dom.ocrLanguage.value;
      scheduleSave();
    });
    dom.enhanceImages.addEventListener("change", () => {
      project.settings.enhanceImages = dom.enhanceImages.checked;
      scheduleSave();
    });
    dom.autoTranslate.addEventListener("change", () => {
      project.settings.autoTranslate = dom.autoTranslate.checked;
      scheduleSave();
    });
    dom.grammarCheck.addEventListener("change", () => {
      project.settings.grammarCheck = dom.grammarCheck.checked;
      scheduleSave();
    });

    dom.processBtn.addEventListener("click", runOCR);
    dom.loadSampleBtn.addEventListener("click", loadSample);
    dom.editSourceBtn.addEventListener("click", openSourceEditor);
    dom.applySourceBtn.addEventListener("click", applySourceEditor);
    dom.cancelSourceBtn.addEventListener("click", () => dom.sourceDialog.close());
    dom.resegmentBtn.addEventListener("click", async () => {
      project.text = project.segments.map((segment) => segment.text).join("\n");
      rebuildSegments(project.text);
      if (project.settings.grammarCheck) {
        await correctSegmentGrammar({ force: true, silent: true, translateAfter: true });
      }
      switchView("review");
      toast("已经重新分句", "success");
    });
    dom.grammarReviewBtn.addEventListener("click", () =>
      correctSegmentGrammar({ force: true, translateAfter: true }),
    );
    dom.translateBtn.addEventListener("click", () => translateMissingSegments());

    dom.segmentList.addEventListener("input", handleSegmentInput);
    dom.segmentList.addEventListener("click", handleSegmentAction);
    dom.listenList.addEventListener("click", handleListenListClick);
    dom.voiceModuleSwitcher.addEventListener("click", (event) => {
      const button = event.target.closest("[data-voice-module]");
      if (button) {
        setVoiceModule(button.dataset.voiceModule);
      }
    });

    dom.previousBtn.addEventListener("click", () => playRelative(-1));
    dom.nextBtn.addEventListener("click", () => playRelative(1));
    dom.playPauseBtn.addEventListener("click", togglePlayback);
    dom.repeatBtn.addEventListener("click", () => {
      if (project.segments.length) {
        playSegment(runtime.player.currentIndex >= 0 ? runtime.player.currentIndex : 0);
      }
    });

    dom.quickRate.addEventListener("input", () => {
      setRate(Number(dom.quickRate.value));
    });
    dom.rateControl.addEventListener("input", () => {
      setRate(Number(dom.rateControl.value));
    });
    dom.repeatSelect.addEventListener("change", () => {
      project.settings.repeat = Number(dom.repeatSelect.value);
      scheduleSave();
    });
    dom.gapControl.addEventListener("input", () => {
      project.settings.gap = Number(dom.gapControl.value);
      dom.gapValue.textContent = `${project.settings.gap.toFixed(1)} 秒`;
      scheduleSave();
    });
    dom.loopAll.addEventListener("change", () => {
      project.settings.loopAll = dom.loopAll.checked;
      scheduleSave();
    });
    dom.showTranslations.addEventListener("change", () => {
      project.settings.showTranslations = dom.showTranslations.checked;
      scheduleSave();
      renderListenList();
    });
    dom.voiceSelect.addEventListener("change", () => {
      stopPlayback();
      project.settings.voiceURI = dom.voiceSelect.value;
      runtime.neural.prefetchIndex = -1;
      runtime.neural.prefetchPromise = null;
      renderVoiceModuleSwitcher();
      scheduleSave();
    });
    dom.translationProvider.addEventListener("change", () => {
      project.settings.translationProvider = dom.translationProvider.value;
      scheduleSave();
    });

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        commitSave();
      }
    });
    window.addEventListener("beforeunload", () => {
      commitSave();
      releasePreviewObjectUrl();
      releaseNeuralAudio();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      runtime.ocr.worker?.terminate();
    });
  }

  async function openDatabase() {
    if (!("indexedDB" in window)) {
      return;
    }

    runtime.db = await new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(PROJECTS_STORE)) {
          db.createObjectStore(PROJECTS_STORE, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }

  async function loadInitialProject() {
    try {
      runtime.metaList = runtime.db ? await dbGetAll(META_STORE) : readLocalMetaList();
      runtime.metaList.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

      if (runtime.metaList.length) {
        const latest = runtime.metaList[0];
        const loaded = runtime.db ? await dbGet(PROJECTS_STORE, latest.id) : readLocalProject(latest.id);
        if (loaded) {
          project = hydrateProject(loaded);
          return;
        }
      }
    } catch (error) {
      console.warn("Failed to load project", error);
    }

    project = createProject();
    updateProjectMeta();
    await commitSave();
  }

  function hydrateProject(saved) {
    const hydrated = {
      ...createProject(),
      ...saved,
      settings: { ...DEFAULT_SETTINGS, ...(saved.settings || {}) },
      pages: Array.isArray(saved.pages)
        ? saved.pages.map((page) => ({
            status: "ready",
            error: "",
            confidence: null,
            lines: [],
            ...page,
          }))
        : [],
      segments: Array.isArray(saved.segments)
        ? saved.segments.map((segment) => ({
            id: segment.id || createId(),
            text: String(segment.text || ""),
            translation: String(segment.translation || ""),
            paragraph: Number(segment.paragraph || 0),
            confidence: Number.isFinite(segment.confidence) ? segment.confidence : null,
            originalText: String(segment.originalText || ""),
            grammarChecked: Boolean(segment.grammarChecked),
            corrections: Array.isArray(segment.corrections) ? segment.corrections : [],
          }))
        : [],
    };
    if (!hydrated.settings.voiceURI) {
      hydrated.settings.voiceURI = "neural:female";
    }
    runtime.player.currentIndex = hydrated.segments.length ? 0 : -1;
    return hydrated;
  }

  function createProject() {
    const now = Date.now();
    return {
      id: createId(),
      title: "未命名项目",
      createdAt: now,
      updatedAt: now,
      pages: [],
      text: "",
      segments: [],
      settings: { ...DEFAULT_SETTINGS },
    };
  }

  async function createAndOpenProject() {
    stopPlayback();
    await commitSave();
    project = createProject();
    runtime.files.clear();
    runtime.player.currentIndex = -1;
    updateProjectMeta();
    await commitSave();
    syncControlsFromProject();
    renderEverything();
    switchView("import");
    dom.sidebar.classList.remove("is-open");
    toast("已创建新项目", "success");
  }

  async function deleteCurrentProject() {
    if (!project?.id) {
      return;
    }
    const confirmed = window.confirm(`删除项目“${project.title}”？此操作无法撤销。`);
    if (!confirmed) {
      return;
    }

    stopPlayback();
    if (runtime.db) {
      await dbDelete(PROJECTS_STORE, project.id);
      await dbDelete(META_STORE, project.id);
    } else {
      localStorage.removeItem(projectKey(project.id));
      localStorage.removeItem(metaKey(project.id));
    }
    runtime.files.clear();
    runtime.metaList = runtime.metaList.filter((meta) => meta.id !== project.id);

    if (runtime.metaList.length) {
      runtime.metaList.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      const nextMeta = runtime.metaList[0];
      const loaded = runtime.db ? await dbGet(PROJECTS_STORE, nextMeta.id) : readLocalProject(nextMeta.id);
      project = loaded ? hydrateProject(loaded) : createProject();
    } else {
      project = createProject();
      updateProjectMeta();
      await commitSave();
    }

    syncControlsFromProject();
    renderEverything();
    toast("项目已删除", "success");
  }

  async function clearAllProjects() {
    const confirmed = window.confirm("清除当前浏览器中的全部项目？此操作无法撤销。");
    if (!confirmed) {
      return;
    }

    stopPlayback();
    if (runtime.db) {
      await dbClear(PROJECTS_STORE);
      await dbClear(META_STORE);
    } else {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(`${DB_NAME}:`))
        .forEach((key) => localStorage.removeItem(key));
    }

    runtime.metaList = [];
    runtime.files.clear();
    project = createProject();
    updateProjectMeta();
    await commitSave();
    dom.settingsDialog.close();
    syncControlsFromProject();
    renderEverything();
    switchView("import");
    toast("全部项目已清除", "success");
  }

  async function handleProjectListClick(event) {
    const button = event.target.closest("[data-project-id]");
    if (!button || button.dataset.projectId === project.id) {
      return;
    }

    stopPlayback();
    await commitSave();
    const loaded = runtime.db
      ? await dbGet(PROJECTS_STORE, button.dataset.projectId)
      : readLocalProject(button.dataset.projectId);
    if (!loaded) {
      toast("项目数据不存在", "error");
      return;
    }

    project = hydrateProject(loaded);
    runtime.files.clear();
    syncControlsFromProject();
    renderEverything();
    dom.sidebar.classList.remove("is-open");
  }

  function updateProjectMeta() {
    const meta = makeProjectMeta();
    const index = runtime.metaList.findIndex((item) => item.id === meta.id);
    if (index >= 0) {
      runtime.metaList[index] = meta;
    } else {
      runtime.metaList.unshift(meta);
    }
    runtime.metaList.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }

  function makeProjectMeta() {
    return {
      id: project.id,
      title: project.title || "未命名项目",
      pageCount: project.pages.length,
      segmentCount: project.segments.length,
      cover: project.pages[0]?.thumb || "",
      updatedAt: project.updatedAt || Date.now(),
    };
  }

  function scheduleSave() {
    project.updatedAt = Date.now();
    dom.saveStatus.textContent = "正在保存";
    clearTimeout(runtime.saveTimer);
    runtime.saveTimer = setTimeout(commitSave, 450);
  }

  function commitSave() {
    if (runtime.saveTimer) {
      clearTimeout(runtime.saveTimer);
      runtime.saveTimer = null;
    }

    updateProjectMeta();
    const snapshot = projectSnapshot();
    const meta = makeProjectMeta();

    runtime.savePromise = runtime.savePromise
      .catch(() => undefined)
      .then(async () => {
        if (runtime.db) {
          await Promise.all([
            dbPut(PROJECTS_STORE, snapshot),
            dbPut(META_STORE, meta),
          ]);
        } else {
          localStorage.setItem(projectKey(snapshot.id), JSON.stringify(snapshot));
          localStorage.setItem(metaKey(meta.id), JSON.stringify(meta));
        }
        runtime.lastSaveAt = Date.now();
        if (dom.saveStatus) {
          dom.saveStatus.textContent = "已保存";
        }
      })
      .catch((error) => {
        console.warn("Save failed", error);
        if (dom.saveStatus) {
          dom.saveStatus.textContent = "保存失败";
        }
      });

    return runtime.savePromise;
  }

  function projectSnapshot() {
    return JSON.parse(
      JSON.stringify({
        id: project.id,
        title: project.title || "未命名项目",
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        pages: project.pages.map((page) => ({
          id: page.id,
          name: page.name,
          thumb: page.thumb,
          text: page.text || "",
          status: page.status === "working" ? "ready" : page.status,
          confidence: page.confidence,
          lines: Array.isArray(page.lines) ? page.lines : [],
          error: page.error || "",
        })),
        text: project.text,
        segments: project.segments.map((segment) => ({
          id: segment.id,
          text: segment.text,
          translation: segment.translation || "",
          paragraph: segment.paragraph || 0,
          confidence: Number.isFinite(segment.confidence) ? segment.confidence : null,
          originalText: segment.originalText || "",
          grammarChecked: Boolean(segment.grammarChecked),
          corrections: Array.isArray(segment.corrections) ? segment.corrections : [],
        })),
        settings: { ...project.settings },
      }),
    );
  }

  async function addFiles(files) {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) {
      if (files.length) {
        toast("请选择图片文件", "warning");
      }
      return;
    }

    const availableSlots = Math.max(0, 24 - project.pages.length);
    const accepted = imageFiles.slice(0, availableSlots);
    if (!accepted.length) {
      toast("单个项目最多添加 24 张图片", "warning");
      return;
    }

    dom.saveStatus.textContent = "正在保存";
    for (const file of accepted) {
      const page = {
        id: createId(),
        name: file.name || "未命名图片",
        thumb: "",
        text: "",
        status: "ready",
        confidence: null,
        error: "",
      };
      runtime.files.set(page.id, file);
      try {
        page.thumb = await createThumbnail(file);
      } catch (error) {
        console.warn("Thumbnail failed", error);
      }
      project.pages.push(page);
    }

    if (imageFiles.length > accepted.length) {
      toast(`已添加 ${accepted.length} 张，单个项目最多 24 张图片`, "warning");
    }

    project.updatedAt = Date.now();
    renderPages();
    scheduleSave();
  }

  function handlePageAction(event) {
    const button = event.target.closest("[data-page-action]");
    if (!button) {
      return;
    }

    const { pageId, pageAction } = button.dataset;
    const index = project.pages.findIndex((page) => page.id === pageId);
    if (index < 0) {
      return;
    }

    if (pageAction === "preview") {
      openImagePreview(index);
      return;
    }
    if (pageAction === "remove") {
      project.pages.splice(index, 1);
      runtime.files.delete(pageId);
    } else if (pageAction === "left" && index > 0) {
      [project.pages[index - 1], project.pages[index]] = [
        project.pages[index],
        project.pages[index - 1],
      ];
    } else if (pageAction === "right" && index < project.pages.length - 1) {
      [project.pages[index + 1], project.pages[index]] = [
        project.pages[index],
        project.pages[index + 1],
      ];
    }

    renderPages();
    scheduleSave();
  }

  function openImagePreview(index) {
    if (!project.pages[index]) {
      return;
    }
    if (!dom.imagePreviewDialog.open) {
      dom.imagePreviewDialog.showModal();
    }
    showPreviewAt(index);
  }

  function showPreviewAt(index) {
    if (index < 0 || index >= project.pages.length) {
      return;
    }

    releasePreviewObjectUrl();
    runtime.preview.index = index;
    const page = project.pages[index];
    const file = runtime.files.get(page.id);

    if (file) {
      runtime.preview.objectUrl = URL.createObjectURL(file);
      dom.previewImage.src = runtime.preview.objectUrl;
    } else {
      dom.previewImage.src = page.thumb || "";
    }

    dom.previewImage.alt = page.name;
    dom.previewImageName.textContent = page.name;
    dom.previewPageCounter.textContent = `${index + 1} / ${project.pages.length}`;
    dom.previewPreviousBtn.disabled = index === 0;
    dom.previewNextBtn.disabled = index === project.pages.length - 1;
    setPreviewZoom(1);
    dom.imagePreviewStage.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  function setPreviewZoom(value) {
    const zoom = clamp(Math.round(value * 100) / 100, 0.5, 3);
    runtime.preview.zoom = zoom;
    dom.previewZoomValue.textContent = `${Math.round(zoom * 100)}%`;
    dom.previewZoomOutBtn.disabled = zoom <= 0.5;
    dom.previewZoomInBtn.disabled = zoom >= 3;

    if (Math.abs(zoom - 1) < 0.01) {
      dom.previewImage.classList.remove("is-zoomed");
      dom.previewImage.style.width = "";
      dom.previewImage.style.height = "";
      return;
    }

    dom.previewImage.classList.add("is-zoomed");
    dom.previewImage.style.width = `${Math.round(zoom * 100)}%`;
    dom.previewImage.style.height = "auto";
  }

  function closeImagePreview() {
    releasePreviewObjectUrl();
    runtime.preview.index = -1;
    runtime.preview.zoom = 1;
    dom.previewImage.removeAttribute("src");
  }

  function releasePreviewObjectUrl() {
    if (runtime.preview.objectUrl) {
      URL.revokeObjectURL(runtime.preview.objectUrl);
      runtime.preview.objectUrl = "";
    }
  }

  async function runOCR() {
    if (runtime.ocr.active) {
      return;
    }
    if (!project.pages.length) {
      toast("请先添加图片", "warning");
      return;
    }

    const pagesWithFiles = project.pages.filter((page) => runtime.files.has(page.id));
    const pagesWithText = project.pages.filter((page) => page.text?.trim());
    if (!pagesWithFiles.length && !pagesWithText.length) {
      toast("当前图片需要重新添加后才能识别", "warning");
      return;
    }

    runtime.ocr.active = true;
    runtime.ocr.pageCount = project.pages.length;
    runtime.ocr.localProgress = 0;
    dom.processBtn.disabled = true;
    dom.processBtn.querySelector("span").textContent = "正在识别";
    setOCRProgress(0, "准备识别");

    try {
      let engine = "tesseract";
      const requestedEngine = project.settings.ocrEngine;
      if (requestedEngine === "paddle" || requestedEngine === "auto") {
        try {
          await assertLocalService();
          const paddle = await loadPaddleOcrModule();
          await paddle.initializePaddleOcr((stage) => setOCRProgress(0, stage));
          engine = "paddle";
        } catch (error) {
          if (requestedEngine === "paddle") {
            throw error;
          }
          console.warn("PaddleOCR unavailable, using Tesseract", error);
          toast("高精度引擎暂不可用，已切换 Tesseract", "warning");
        }
      }

      runtime.ocr.engineUsed = engine;
      if (engine === "paddle") {
        await runPaddleOcrPipeline();
      } else {
        await runTesseractOcrPipeline();
      }

      const reconstructedDocument = window.TextPipeline.fromDocumentPages(project.pages);
      const fullText = normalizeDocumentText(reconstructedDocument.text);
      if (!fullText) {
        throw new Error("No usable text was recognized");
      }
      project.text = fullText;
      rebuildSegments(fullText);
      if (project.settings.grammarCheck) {
        await correctSegmentGrammar({ force: true, silent: true });
      }
      await commitSave();
      switchView("review");
      const engineLabel = engine === "paddle" ? "PaddleOCR" : "Tesseract";
      toast(`${engineLabel} 识别完成，共 ${project.segments.length} 句`, "success");
      window.setTimeout(() => preloadNaturalVoice(), 1200);

      if (project.settings.autoTranslate && !isChineseSource(project.settings.ocrLanguage)) {
        translateMissingSegments();
      }
    } catch (error) {
      console.error("OCR initialization failed", error);
      toast(friendlyOcrError(error), "error");
    } finally {
      runtime.ocr.active = false;
      dom.processBtn.disabled = !project.pages.length;
      dom.processBtn.querySelector("span").textContent = "开始识别";
      window.setTimeout(() => {
        dom.ocrProgress.hidden = true;
      }, 900);
      renderPages();
      scheduleSave();
    }
  }

  function loadPaddleOcrModule() {
    if (!runtime.ocr.paddleModulePromise) {
      runtime.ocr.paddleModulePromise = import("./paddle-ocr.mjs").catch((error) => {
        runtime.ocr.paddleModulePromise = null;
        throw error;
      });
    }
    return runtime.ocr.paddleModulePromise;
  }

  async function assertLocalService() {
    if (
      window.Capacitor?.isNativePlatform?.() ||
      window.Capacitor?.getPlatform?.() === "android" ||
      window.androidBridge
    ) {
      return;
    }
    try {
      const response = await fetch(new URL("health", window.location.href), {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Health check failed");
      }
    } catch (error) {
      throw new Error("LOCAL_SERVICE_DOWN", { cause: error });
    }
  }

  async function runPaddleOcrPipeline() {
    const paddle = await loadPaddleOcrModule();
    setOCRProgress(0, "准备 PaddleOCR");

    for (let index = 0; index < project.pages.length; index += 1) {
      const page = project.pages[index];
      runtime.ocr.pageIndex = index;
      renderPages();

      const file = runtime.files.get(page.id);
      if (!file) {
        if (!page.text?.trim()) {
          page.status = "error";
          page.error = "页面刷新后需要重新添加图片";
        }
        renderPages();
        continue;
      }

      page.status = "working";
      page.error = "";
      renderPages();

      try {
        const prepared = await prepareImageForPaddle(file);
        setOCRProgress(index / project.pages.length, `PaddleOCR · 第 ${index + 1} / ${project.pages.length} 张`);
        const result = await paddle.recognizeWithPaddleOcr(prepared, (stage) => {
          setOCRProgress(
            (index + 0.45) / project.pages.length,
            `${stage} · 第 ${index + 1} / ${project.pages.length} 张`,
          );
        });
        applyStructuredOcrResult(page, window.TextPipeline.fromPaddle(result));
      } catch (error) {
        console.error("PaddleOCR failed", error);
        page.status = "error";
        page.error = friendlyOcrError(error);
        toast(`${page.name}：${page.error}`, "error");
      }

      setOCRProgress((index + 1) / project.pages.length, `已完成第 ${index + 1} / ${project.pages.length} 张`);
      renderPages();
    }
  }

  async function runTesseractOcrPipeline() {
    if (!window.Tesseract) {
      throw new Error("Tesseract is not loaded");
    }

    await ensureOcrWorker(project.settings.ocrLanguage);
    for (let index = 0; index < project.pages.length; index += 1) {
      const page = project.pages[index];
      runtime.ocr.pageIndex = index;
      runtime.ocr.localProgress = 0;
      setOCRProgress(index / project.pages.length, `识别第 ${index + 1} / ${project.pages.length} 张`);

      const file = runtime.files.get(page.id);
      if (!file) {
        if (!page.text?.trim()) {
          page.status = "error";
          page.error = "页面刷新后需要重新添加图片";
        }
        renderPages();
        continue;
      }

      page.status = "working";
      page.error = "";
      renderPages();

      try {
        const prepared = await prepareImageForOcr(file);
        const result = await runtime.ocr.worker.recognize(prepared, {}, { text: true, blocks: true });
        applyStructuredOcrResult(page, window.TextPipeline.fromTesseract(result.data));
      } catch (error) {
        console.error("Tesseract OCR failed", error);
        page.status = "error";
        page.error = friendlyOcrError(error);
        toast(`${page.name}：${page.error}`, "error");
      }

      setOCRProgress((index + 1) / project.pages.length, `已完成第 ${index + 1} / ${project.pages.length} 张`);
      renderPages();
    }
  }

  function applyStructuredOcrResult(page, structured) {
    page.text = normalizePageText(structured?.text || "");
    page.lines = Array.isArray(structured?.lines)
      ? structured.lines.map((line) => ({
          text: line.text,
          confidence: Number.isFinite(line.confidence) ? line.confidence : null,
          paragraph: Number(line.paragraph || 0),
          box: line.box || null,
        }))
      : [];
    const confidence = Number.isFinite(structured?.confidence) ? structured.confidence : null;
    page.confidence = confidence === null ? null : Math.round(confidence * 100);
    page.status = page.text ? "done" : "error";
    page.error = page.text ? "" : "未识别到文字";
  }

  async function ensureOcrWorker(language) {
    if (runtime.ocr.worker && runtime.ocr.language === language) {
      return runtime.ocr.worker;
    }

    if (runtime.ocr.worker) {
      await runtime.ocr.worker.terminate();
      runtime.ocr.worker = null;
    }

    const base = new URL("./", window.location.href).href;
    const languageParts = language.split("+");
    const useLocalModels = languageParts.every((part) => LOCAL_TESSDATA_LANGS.has(part));
    const langPath = useLocalModels
      ? new URL("tessdata", base).href.replace(/\/$/, "")
      : REMOTE_TESSDATA;

    runtime.ocr.worker = await window.Tesseract.createWorker(language, 1, {
      workerPath: new URL("vendor/worker.min.js", base).href,
      corePath: new URL("vendor/tesseract-core", base).href.replace(/\/$/, ""),
      langPath,
      logger: handleTesseractLog,
    });
    runtime.ocr.language = language;

    try {
      await runtime.ocr.worker.setParameters({
        preserve_interword_spaces: "1",
        tessedit_pageseg_mode: "3",
      });
    } catch (error) {
      console.warn("Tesseract parameters failed", error);
    }

    return runtime.ocr.worker;
  }

  function handleTesseractLog(message) {
    if (!runtime.ocr.active || !message) {
      return;
    }

    const local = Number.isFinite(message.progress) ? message.progress : runtime.ocr.localProgress;
    runtime.ocr.localProgress = Math.max(runtime.ocr.localProgress, local);
    const overall = (runtime.ocr.pageIndex + runtime.ocr.localProgress) / Math.max(1, runtime.ocr.pageCount);
    setOCRProgress(overall, localizeOcrStatus(message.status));
  }

  function setOCRProgress(progress, label) {
    const clamped = Math.max(0, Math.min(1, progress));
    dom.ocrProgress.hidden = false;
    dom.ocrProgressLabel.textContent = label;
    dom.ocrProgressValue.textContent = `${Math.round(clamped * 100)}%`;
    dom.ocrProgressBar.style.width = `${clamped * 100}%`;
  }

  function localizeOcrStatus(status) {
    const labels = {
      "loading tesseract core": "加载 OCR 核心",
      "initializing tesseract": "初始化 OCR",
      "loading language traineddata": "加载语言模型",
      "initializing api": "准备识别引擎",
      "recognizing text": "识别文字",
    };
    return labels[status] || "处理图片";
  }

  function friendlyOcrError(error) {
    const message = String(error?.message || error || "");
    if (message.includes("LOCAL_SERVICE_DOWN")) {
      return "本地服务已停止，请重新运行 start.ps1 后再识别";
    }
    if (/paddle|onnx|wasm|model/i.test(message)) {
      return "高精度 OCR 初始化失败，可切换到 Tesseract 后重试";
    }
    if (/fetch|network|failed to load|404/i.test(message)) {
      return "语言模型加载失败，请改用英文或简体中文，或检查网络";
    }
    if (/memory|allocation/i.test(message)) {
      return "图片过大，请压缩后重试";
    }
    return "识别失败，请更换清晰图片后重试";
  }

  async function translateMissingSegments() {
    if (runtime.translation.active) {
      runtime.translation.token += 1;
      runtime.translation.active = false;
      dom.translationStatusLabel.textContent = "正在停止";
      return;
    }

    if (!project.segments.length) {
      toast("暂无可翻译的句子", "warning");
      return;
    }

    let targets = project.segments.filter((segment) => !segment.translation.trim());
    const force = targets.length === 0;
    if (force) {
      const confirmed = window.confirm("重新翻译全部句子并覆盖现有译文？");
      if (!confirmed) {
        return;
      }
      targets = [...project.segments];
    }

    runtime.translation.active = true;
    runtime.translation.token += 1;
    const token = runtime.translation.token;
    runtime.translation.completed = 0;
    runtime.translation.total = targets.length;
    runtime.translation.failures = 0;
    dom.translationStatus.hidden = false;
    dom.translateButtonLabel.textContent = "停止翻译";
    updateTranslationProgress();

    let cursor = 0;
    const worker = async () => {
      while (cursor < targets.length && runtime.translation.active && token === runtime.translation.token) {
        const segment = targets[cursor];
        cursor += 1;

        try {
          const sourceCode = detectSentenceSource(segment.text);
          const result = await translateText(segment.text, sourceCode, force);
          if (result && token === runtime.translation.token) {
            segment.translation = result;
            updateTranslationInput(segment);
          } else if (!result) {
            runtime.translation.failures += 1;
          }
        } catch (error) {
          console.warn("Translation failed", error);
          runtime.translation.failures += 1;
        }

        runtime.translation.completed += 1;
        updateTranslationProgress();
        scheduleSave();
        await sleep(130);
      }
    };

    await Promise.all([worker(), worker()]);

    const wasStopped = token !== runtime.translation.token || !runtime.translation.active;
    runtime.translation.active = false;
    dom.translationStatus.hidden = true;
    dom.translateButtonLabel.textContent = "自动翻译";

    renderReview();
    renderListenList();
    await commitSave();

    if (wasStopped) {
      toast("翻译已停止", "warning");
    } else if (runtime.translation.failures === targets.length) {
      toast("翻译服务不可用，可手动填写译文", "error");
    } else if (runtime.translation.failures) {
      toast(`翻译完成，${runtime.translation.failures} 句失败`, "warning");
    } else {
      toast("翻译完成", "success");
    }
  }

  function updateTranslationProgress() {
    const progress = runtime.translation.total
      ? runtime.translation.completed / runtime.translation.total
      : 0;
    dom.translationStatusValue.textContent = `${runtime.translation.completed} / ${runtime.translation.total}`;
    dom.translationProgressBar.style.width = `${Math.round(progress * 100)}%`;
  }

  function updateTranslationInput(segment) {
    const input = dom.segmentList.querySelector(
      `.segment-translation-input[data-segment-id="${cssEscape(segment.id)}"]`,
    );
    if (input && document.activeElement !== input) {
      input.value = segment.translation;
    }
  }

  async function translateText(text, sourceCode, force) {
    const clean = text.trim();
    if (!clean) {
      return "";
    }

    const provider = project.settings.translationProvider;
    const targetCode = sourceCode === "zh-CN" ? "en" : "zh-CN";

    if (provider === "auto" || provider === "browser") {
      const browserResult = await translateWithBrowser(
        clean,
        sourceCode,
        targetCode,
        provider === "browser",
      );
      if (browserResult) {
        return browserResult;
      }
      if (provider === "browser") {
        return "";
      }
    }

    if (provider === "auto" || provider === "mymemory") {
      return translateWithMyMemory(clean, sourceCode, targetCode);
    }

    return "";
  }

  async function translateWithBrowser(text, sourceCode, targetCode, allowDownload) {
    const API = window.Translator;
    if (!API?.create) {
      return "";
    }

    const source = LANGUAGE_INFO[sourceCode]?.browser || sourceCode;
    const target = targetCode === "zh-CN" ? "zh" : LANGUAGE_INFO[targetCode]?.browser || targetCode;
    const pair = { sourceLanguage: source, targetLanguage: target };

    try {
      if (API.availability) {
        const availability = await API.availability(pair);
        if (availability === "unavailable") {
          return "";
        }
        if (availability !== "available" && !allowDownload) {
          return "";
        }
      }

      const key = `${source}:${target}`;
      let translator = runtime.translators.get(key);
      if (!translator) {
        translator = await API.create(pair);
        runtime.translators.set(key, translator);
      }
      const result = await translator.translate(text);
      return typeof result === "string" ? result.trim() : "";
    } catch (error) {
      console.warn("Browser translation failed", error);
      return "";
    }
  }

  async function translateWithMyMemory(text, sourceCode, targetCode) {
    const source = sourceCodeToMyMemory(sourceCode);
    const target = sourceCodeToMyMemory(targetCode);
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", text);
    url.searchParams.set("langpair", `${source}|${target}`);

    const response = await fetchWithTimeout(url.toString(), {}, 12000);
    if (!response.ok) {
      throw new Error(`Translation HTTP ${response.status}`);
    }
    const payload = await response.json();
    if (payload.responseStatus && Number(payload.responseStatus) >= 400) {
      throw new Error(payload.responseDetails || "Translation request failed");
    }
    const result = payload.responseData?.translatedText;
    return typeof result === "string" ? decodeHtmlEntities(result).trim() : "";
  }

  async function correctSegmentGrammar({
    force = false,
    silent = false,
    translateAfter = false,
  } = {}) {
    if (runtime.grammar.active) {
      runtime.grammar.token += 1;
      runtime.grammar.active = false;
      dom.grammarStatusLabel.textContent = "正在停止";
      return;
    }
    if (!project.segments.length) {
      if (!silent) {
        toast("暂无可校对的句子", "warning");
      }
      return;
    }

    const targets = project.segments.filter((segment) => {
      if (!force && segment.grammarChecked) {
        return false;
      }
      return detectSentenceSource(segment.text) === "eng";
    });
    if (!targets.length) {
      if (!silent) {
        toast("没有需要校对的英文句子", "success");
      }
      return;
    }

    runtime.grammar.active = true;
    runtime.grammar.token += 1;
    const token = runtime.grammar.token;
    runtime.grammar.completed = 0;
    runtime.grammar.total = targets.length;
    dom.grammarStatus.hidden = false;
    dom.grammarButtonLabel.textContent = "停止校对";
    updateGrammarProgress();

    try {
      await assertLocalService();
      const grammar = await import("./harper-grammar.mjs");
      for (const segment of targets) {
        if (token !== runtime.grammar.token || !runtime.grammar.active) {
          break;
        }
        const original = segment.text;
        const result = await grammar.correctEnglishText(original);
        if (result.changed && token === runtime.grammar.token) {
          if (!segment.originalText) {
            segment.originalText = original;
          }
          segment.text = result.text;
          segment.translation = "";
          segment.corrections = result.changes;
        }
        if (token === runtime.grammar.token) {
          segment.grammarChecked = true;
        }
        runtime.grammar.completed += 1;
        updateGrammarProgress();
        updateSegmentTextInput(segment);
        await sleep(10);
      }

      const wasStopped = token !== runtime.grammar.token || !runtime.grammar.active;
      runtime.grammar.active = false;
      dom.grammarStatus.hidden = true;
      dom.grammarButtonLabel.textContent = "语法校对";
      project.text = project.segments.map((segment) => segment.text).join("\n");
      renderReview();
      renderListenList();
      await commitSave();

      if (!silent) {
        if (wasStopped) {
          toast("语法校对已停止", "warning");
        } else {
          const corrected = project.segments.filter(
            (segment) => segment.corrections.length,
          ).length;
          toast(
            corrected ? `语法校对完成，修正 ${corrected} 句` : "语法校对完成，未发现需要修正的内容",
            "success",
          );
        }
      }
      if (
        translateAfter &&
        !wasStopped &&
        project.settings.autoTranslate &&
        !isChineseSource(project.settings.ocrLanguage)
      ) {
        translateMissingSegments();
      }
    } catch (error) {
      console.warn("Harper grammar correction failed", error);
      runtime.grammar.active = false;
      dom.grammarStatus.hidden = true;
      dom.grammarButtonLabel.textContent = "语法校对";
      if (!silent) {
        toast(
          String(error?.message || "").includes("LOCAL_SERVICE_DOWN")
            ? "本地服务已停止，请重新运行 start.ps1 后再校对"
            : "本地语法模型加载失败，已保留原文",
          "warning",
        );
      }
    }
  }

  function updateGrammarProgress() {
    const progress = runtime.grammar.total
      ? runtime.grammar.completed / runtime.grammar.total
      : 0;
    dom.grammarStatusValue.textContent = `${runtime.grammar.completed} / ${runtime.grammar.total}`;
    dom.grammarProgressBar.style.width = `${Math.round(progress * 100)}%`;
  }

  function updateSegmentTextInput(segment) {
    const input = dom.segmentList.querySelector(
      `.segment-text-input[data-segment-id="${cssEscape(segment.id)}"]`,
    );
    if (input && document.activeElement !== input) {
      input.value = segment.text;
    }
  }

  function openSourceEditor() {
    dom.sourceText.value =
      project.segments.length > 0
        ? project.segments.map((segment) => segment.text).join("\n")
        : project.text;
    dom.sourceDialog.showModal();
  }

  async function applySourceEditor() {
    const nextText = normalizeDocumentText(dom.sourceText.value);
    project.text = nextText;
    rebuildSegments(nextText);
    dom.sourceDialog.close();
    switchView("review");

    if (project.settings.grammarCheck) {
      await correctSegmentGrammar({ force: true, silent: true });
    }
    if (project.settings.autoTranslate && !isChineseSource(project.settings.ocrLanguage)) {
      translateMissingSegments();
    }
  }

  function handleSegmentInput(event) {
    const target = event.target;
    const segment = project.segments.find((item) => item.id === target.dataset.segmentId);
    if (!segment) {
      return;
    }

    if (target.classList.contains("segment-text-input")) {
      segment.text = target.value;
      segment.grammarChecked = false;
      segment.corrections = [];
      project.text = project.segments.map((item) => item.text).join("\n");
      renderListenList();
    } else if (target.classList.contains("segment-translation-input")) {
      segment.translation = target.value;
      updateReviewCounts();
      renderListenList();
    }
    scheduleSave();
  }

  function handleSegmentAction(event) {
    const button = event.target.closest("[data-segment-action]");
    if (!button) {
      return;
    }

    const segmentId = button.dataset.segmentId;
    const index = project.segments.findIndex((segment) => segment.id === segmentId);
    if (index < 0) {
      return;
    }

    if (button.dataset.segmentAction === "play") {
      switchView("listen");
      playSegment(index);
    } else if (button.dataset.segmentAction === "remove") {
      project.segments.splice(index, 1);
      project.text = project.segments.map((segment) => segment.text).join("\n");
      renderReview();
      renderListenList();
      scheduleSave();
    } else if (button.dataset.segmentAction === "merge-prev" && index > 0) {
      const previous = project.segments[index - 1];
      const current = project.segments[index];
      previous.text = joinSentenceText(previous.text, current.text);
      previous.grammarChecked = false;
      previous.corrections = [];
      previous.originalText = "";
      if (current.translation.trim()) {
        previous.translation = [previous.translation.trim(), current.translation.trim()]
          .filter(Boolean)
          .join(" ");
      }
      project.segments.splice(index, 1);
      project.text = project.segments.map((segment) => segment.text).join("\n");
      renderReview();
      renderListenList();
      scheduleSave();
    } else if (button.dataset.segmentAction === "split-at-cursor") {
      splitSegmentAtCursor(index, button);
    } else if (button.dataset.segmentAction === "restore-original") {
      restoreSegmentOriginal(index);
    }
  }

  function restoreSegmentOriginal(index) {
    const segment = project.segments[index];
    if (!segment?.originalText) {
      return;
    }
    segment.text = segment.originalText;
    segment.originalText = "";
    segment.translation = "";
    segment.grammarChecked = false;
    segment.corrections = [];
    project.text = project.segments.map((item) => item.text).join("\n");
    renderReview();
    renderListenList();
    scheduleSave();
    toast("已恢复该句原文", "success");
  }

  function splitSegmentAtCursor(index, button) {
    const segment = project.segments[index];
    const textarea = button
      .closest(".segment-body")
      ?.querySelector(".segment-text-input");
    const cursor = Number.isInteger(textarea?.selectionStart)
      ? textarea.selectionStart
      : Math.floor(segment.text.length / 2);
    if (cursor <= 0 || cursor >= segment.text.length) {
      toast("请把光标放在句子中间再分句", "warning");
      textarea?.focus();
      return;
    }

    const originalText = segment.text;
    const leftText = originalText.slice(0, cursor).trim();
    const rightText = originalText.slice(cursor).trim();
    if (!leftText || !rightText) {
      toast("当前位置无法分句", "warning");
      return;
    }

    const ratio = cursor / originalText.length;
    const [leftTranslation, rightTranslation] = splitTranslationNearRatio(
      segment.translation || "",
      ratio,
    );
    segment.text = leftText;
    segment.translation = leftTranslation;
    segment.confidence = null;

    const nextSegment = {
      id: createId(),
      text: rightText,
      translation: rightTranslation,
      paragraph: segment.paragraph,
      confidence: null,
      originalText: "",
      grammarChecked: false,
      corrections: [],
    };
    project.segments.splice(index + 1, 0, nextSegment);
    project.text = project.segments.map((item) => item.text).join("\n");
    renderReview();
    renderListenList();
    scheduleSave();
    toast("已从光标处分句", "success");
  }

  function splitTranslationNearRatio(text, ratio) {
    const source = String(text || "").trim();
    if (!source) {
      return ["", ""];
    }
    const target = clamp(Math.round(source.length * ratio), 1, Math.max(1, source.length - 1));
    const searchRadius = Math.max(3, Math.round(source.length * 0.18));
    let splitAt = target;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let cursor = Math.max(1, target - searchRadius); cursor < Math.min(source.length, target + searchRadius); cursor += 1) {
      if (/[\s，。；！？,.;!?]/.test(source[cursor - 1])) {
        const distance = Math.abs(cursor - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          splitAt = cursor;
        }
      }
    }
    return [source.slice(0, splitAt).trim(), source.slice(splitAt).trim()];
  }

  function handleListenListClick(event) {
    const row = event.target.closest("[data-listen-index]");
    if (!row) {
      return;
    }
    playSegment(Number(row.dataset.listenIndex));
  }

  function rebuildSegments(text, options = {}) {
    const previousSegments = options.previousSegments || project.segments;
    const translationMap = new Map(
      previousSegments
        .filter((segment) => segment.text && segment.translation)
        .map((segment) => [normalizeComparableText(segment.text), segment.translation]),
    );

    project.text = text;
    project.segments = segmentText(text, project.settings.ocrLanguage).map((item) => ({
      ...item,
      translation:
        translationMap.get(normalizeComparableText(item.text)) ||
        SAMPLE_TRANSLATIONS.get(item.text) ||
        "",
    }));
    annotateSegmentConfidence(project.segments);
    runtime.player.currentIndex = project.segments.length ? 0 : -1;
    renderReview();
    renderListenList();
    scheduleSave();
  }

  function annotateSegmentConfidence(segments) {
    const lines = project.pages.flatMap((page) =>
      Array.isArray(page.lines)
        ? page.lines.filter((line) => line.text && Number.isFinite(line.confidence))
        : [],
    );
    if (!lines.length) {
      segments.forEach((segment) => {
        segment.confidence = null;
      });
      return;
    }

    segments.forEach((segment) => {
      const sentence = normalizeComparableText(segment.text);
      const matches = lines.filter((line) => {
        const normalizedLine = normalizeComparableText(line.text);
        return normalizedLine.length > 2 && sentence.includes(normalizedLine);
      });
      segment.confidence = matches.length
        ? matches.reduce((sum, line) => sum + line.confidence, 0) / matches.length
        : null;
    });
  }

  function segmentText(text, languageCode) {
    return window.TextPipeline.segment(text, languageCode).map((segment) => ({
      id: createId(),
      text: segment.text,
      translation: "",
      paragraph: segment.paragraph,
      confidence: null,
      originalText: "",
      grammarChecked: false,
      corrections: [],
    }));
  }

  function joinSentenceText(left, right) {
    const needsSpace = /[A-Za-z0-9)]$/.test(left) && /^[A-Za-z0-9("']/.test(right);
    return `${left}${needsSpace ? " " : ""}${right}`.replace(/\s+/g, " ").trim();
  }

  function normalizePageText(rawText) {
    return window.TextPipeline.normalizePageText(rawText);
  }

  function normalizeDocumentText(text) {
    return window.TextPipeline.normalizeDocumentText(text);
  }

  function loadSample() {
    const hasCurrentContent = Boolean(project.text || project.pages.length || project.segments.length);
    if (hasCurrentContent) {
      const confirmed = window.confirm("载入示例会新建一个项目，是否继续？");
      if (!confirmed) {
        return;
      }
      stopPlayback();
      commitSave();
      project = createProject();
      runtime.files.clear();
    }

    project.title = "示例：每日英语跟读";
    project.text = SAMPLE_TEXT;
    project.segments = segmentText(SAMPLE_TEXT, "eng").map((segment) => ({
      ...segment,
      translation: SAMPLE_TRANSLATIONS.get(segment.text) || "",
    }));
    runtime.player.currentIndex = 0;
    updateProjectMeta();
    commitSave();
    syncControlsFromProject();
    renderEverything();
    switchView("review");
    toast("示例已载入", "success");
    window.setTimeout(() => preloadNaturalVoice(), 800);
  }

  async function createThumbnail(file) {
    const bitmap = await loadBitmap(file);
    const scale = Math.min(1, 760 / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const source = bitmap.source || bitmap;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false });
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);
    bitmap.close?.();
    return canvasToDataUrl(canvas, "image/jpeg", 0.8);
  }

  async function prepareImageForOcr(file) {
    const bitmap = await loadBitmap(file);
    const longestEdge = Math.max(bitmap.width, bitmap.height);
    const scale = longestEdge > MAX_IMAGE_EDGE ? MAX_IMAGE_EDGE / longestEdge : 1;
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const source = bitmap.source || bitmap;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);
    bitmap.close?.();

    if (project.settings.enhanceImages) {
      enhanceCanvas(context, width, height);
    }

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) {
      throw new Error("Image processing failed");
    }
    return blob;
  }

  async function prepareImageForPaddle(file) {
    const bitmap = await loadBitmap(file);
    const longestEdge = Math.max(bitmap.width, bitmap.height);
    const scale =
      longestEdge > PADDLE_MAX_IMAGE_EDGE ? PADDLE_MAX_IMAGE_EDGE / longestEdge : 1;
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const source = bitmap.source || bitmap;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);
    bitmap.close?.();
    return canvas;
  }

  function enhanceCanvas(context, width, height) {
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    let sampleTotal = 0;
    let sampleCount = 0;
    const sampleStep = Math.max(4, Math.floor(data.length / 16000 / 4) * 4);

    for (let index = 0; index < data.length; index += sampleStep) {
      sampleTotal += data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
      sampleCount += 1;
    }

    const average = sampleCount ? sampleTotal / sampleCount : 180;
    const contrast = average < 135 ? 1.34 : 1.2;
    const brightness = average < 120 ? 7 : 2;

    for (let index = 0; index < data.length; index += 4) {
      const gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
      const adjusted = clamp((gray - 128) * contrast + 128 + brightness, 0, 255);
      data[index] = adjusted;
      data[index + 1] = adjusted;
      data[index + 2] = adjusted;
    }

    context.putImageData(imageData, 0, 0);
  }

  async function loadBitmap(file) {
    if ("createImageBitmap" in window) {
      try {
        return await createImageBitmap(file, { imageOrientation: "from-image" });
      } catch (error) {
        console.warn("createImageBitmap failed, using Image", error);
      }
    }

    const url = URL.createObjectURL(file);
    try {
      const image = await new Promise((resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve(element);
        element.onerror = () => reject(new Error("Image load failed"));
        element.src = url;
      });
      return {
        width: image.naturalWidth,
        height: image.naturalHeight,
        source: image,
        close: () => URL.revokeObjectURL(url),
      };
    } catch (error) {
      URL.revokeObjectURL(url);
      throw error;
    }
  }

  function canvasToDataUrl(canvas, type, quality) {
    return canvas.toDataURL(type, quality);
  }

  function renderEverything() {
    dom.projectTitle.value = project.title || "未命名项目";
    renderProjectList();
    renderPages();
    renderReview();
    renderListenList();
    renderPlayer();
    renderVoiceOptions();
    renderIcons();
  }

  function renderProjectList() {
    if (!runtime.metaList.length) {
      dom.projectList.innerHTML = "";
      return;
    }

    dom.projectList.innerHTML = runtime.metaList
      .map(
        (meta) => `
          <button class="project-item ${meta.id === project.id ? "is-active" : ""}" type="button" data-project-id="${escapeAttribute(meta.id)}">
            <span class="project-item-copy">
              <span class="project-item-title">${escapeHtml(meta.title || "未命名项目")}</span>
              <span class="project-item-meta">${meta.segmentCount || 0} 句 · ${formatRelativeTime(meta.updatedAt)}</span>
            </span>
            <span class="project-page-count">${meta.pageCount || 0}</span>
          </button>
        `,
      )
      .join("");
  }

  function renderPages() {
    const total = project.pages.length;
    dom.pageCountLabel.textContent = `${total} 张图片`;
    dom.processBtn.disabled = !total || runtime.ocr.active;
    dom.addMoreBtn.disabled = total >= 24 || runtime.ocr.active;

    if (!total) {
      dom.pageGrid.innerHTML = `
        <div class="empty-state">
          <div>
            <i data-lucide="images"></i>
            <div>还没有页面</div>
          </div>
        </div>
      `;
      renderIcons();
      return;
    }

    dom.pageGrid.innerHTML = project.pages
      .map(
        (page, index) => `
          <article class="page-card">
            <button
              class="page-thumb-wrap"
              type="button"
              data-page-id="${escapeAttribute(page.id)}"
              data-page-action="preview"
              title="查看图片"
              aria-label="查看第 ${index + 1} 张图片：${escapeAttribute(page.name)}"
            >
              ${
                page.thumb
                  ? `<img class="page-thumb" src="${page.thumb}" alt="" />`
                  : `<div class="page-thumb"></div>`
              }
              <span class="page-order">${index + 1}</span>
              <span class="page-status ${pageStatusClass(page.status)}">${escapeHtml(pageStatusLabel(page))}</span>
              <span class="page-preview-hint" aria-hidden="true"><i data-lucide="expand"></i></span>
            </button>
            <div class="page-card-body">
              <div class="page-name" title="${escapeAttribute(page.name)}">${escapeHtml(page.name)}</div>
              <div class="page-actions">
                <button
                  class="icon-button"
                  type="button"
                  data-page-id="${escapeAttribute(page.id)}"
                  data-page-action="left"
                  title="前移"
                  aria-label="前移"
                  ${index === 0 || runtime.ocr.active ? "disabled" : ""}
                >
                  <i data-lucide="arrow-left"></i>
                </button>
                <button
                  class="icon-button"
                  type="button"
                  data-page-id="${escapeAttribute(page.id)}"
                  data-page-action="right"
                  title="后移"
                  aria-label="后移"
                  ${index === total - 1 || runtime.ocr.active ? "disabled" : ""}
                >
                  <i data-lucide="arrow-right"></i>
                </button>
                <button
                  class="icon-button danger"
                  type="button"
                  data-page-id="${escapeAttribute(page.id)}"
                  data-page-action="remove"
                  title="删除"
                  aria-label="删除"
                  ${runtime.ocr.active ? "disabled" : ""}
                >
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
          </article>
        `,
      )
      .join("");
    renderIcons();
  }

  function pageStatusClass(status) {
    if (status === "done") {
      return "is-done";
    }
    if (status === "working") {
      return "is-working";
    }
    if (status === "error") {
      return "is-error";
    }
    return "";
  }

  function pageStatusLabel(page) {
    if (page.status === "working") {
      return "识别中";
    }
    if (page.status === "done") {
      return page.confidence ? `完成 ${page.confidence}%` : "完成";
    }
    if (page.status === "error") {
      return page.error || "失败";
    }
    return "待识别";
  }

  function renderReview() {
    updateReviewCounts();
    dom.translationStatus.hidden = !runtime.translation.active;

    if (!project.segments.length) {
      dom.segmentList.innerHTML = `
        <div class="empty-state">
          <div>
            <i data-lucide="text-cursor-input"></i>
            <div>暂无可校对的句子</div>
          </div>
        </div>
      `;
      renderIcons();
      return;
    }

    dom.segmentList.innerHTML = project.segments
      .map((segment, index) => {
        const startsParagraph =
          index === 0 || segment.paragraph !== project.segments[index - 1].paragraph;
        const lowConfidence =
          Number.isFinite(segment.confidence) && segment.confidence < 0.72;
        const hasGrammarChanges = Boolean(segment.corrections?.length);
        const confidenceTitle = Number.isFinite(segment.confidence)
          ? `识别置信度 ${Math.round(segment.confidence * 100)}%`
          : "无置信度信息";
        return `
          <article class="segment-card ${runtime.player.currentIndex === index ? "is-playing" : ""} ${hasGrammarChanges ? "is-corrected" : ""}" data-segment-card="${escapeAttribute(segment.id)}">
            <div class="segment-index-column">
              <span>${index + 1}</span>
              ${
                Number.isFinite(segment.confidence)
                  ? `<span class="confidence-dot ${lowConfidence ? "is-low" : ""}" title="${confidenceTitle}"></span>`
                  : ""
              }
              ${
                hasGrammarChanges
                  ? `<span class="grammar-dot" title="${escapeAttribute(segment.corrections.map((item) => item.message).filter(Boolean).slice(0, 3).join("；"))}"></span>`
                  : ""
              }
            </div>
            <div class="segment-body">
              ${startsParagraph ? `<div class="segment-paragraph-label">段落 ${segment.paragraph + 1}</div>` : ""}
              <textarea
                class="segment-text-input"
                data-segment-id="${escapeAttribute(segment.id)}"
                rows="2"
                spellcheck="false"
                aria-label="第 ${index + 1} 句原文"
              >${escapeHtml(segment.text)}</textarea>
              <textarea
                class="segment-translation-input"
                data-segment-id="${escapeAttribute(segment.id)}"
                rows="1"
                spellcheck="false"
                placeholder="中文译文"
                aria-label="第 ${index + 1} 句译文"
              >${escapeHtml(segment.translation || "")}</textarea>
              <div class="segment-footer">
                <button class="mini-button" type="button" data-segment-id="${escapeAttribute(segment.id)}" data-segment-action="play">
                  <i data-lucide="play"></i>
                  <span>朗读</span>
                </button>
                <button
                  class="mini-button"
                  type="button"
                  data-segment-id="${escapeAttribute(segment.id)}"
                  data-segment-action="merge-prev"
                  ${index === 0 ? "disabled" : ""}
                >
                  <i data-lucide="merge"></i>
                  <span>并入上一句</span>
                </button>
                <button
                  class="mini-button"
                  type="button"
                  data-segment-id="${escapeAttribute(segment.id)}"
                  data-segment-action="split-at-cursor"
                >
                  <i data-lucide="scissors"></i>
                  <span>光标处分句</span>
                </button>
                ${
                  segment.originalText
                    ? `<button class="mini-button" type="button" data-segment-id="${escapeAttribute(segment.id)}" data-segment-action="restore-original">
                        <i data-lucide="undo-2"></i>
                        <span>恢复原文</span>
                      </button>`
                    : ""
                }
                <span class="segment-footer-spacer"></span>
                <button class="mini-button" type="button" data-segment-id="${escapeAttribute(segment.id)}" data-segment-action="remove">
                  <i data-lucide="trash-2"></i>
                  <span>删除</span>
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
    renderIcons();
  }

  function updateReviewCounts() {
    const translated = project.segments.filter((segment) => segment.translation.trim()).length;
    const corrected = project.segments.filter((segment) => segment.corrections?.length).length;
    dom.segmentCount.textContent = String(project.segments.length);
    dom.translatedCount.textContent = String(translated);
    dom.grammarCount.textContent = String(corrected);
    dom.grammarButtonLabel.textContent = runtime.grammar.active ? "停止校对" : "语法校对";
    dom.translateButtonLabel.textContent = runtime.translation.active ? "停止翻译" : "自动翻译";
  }

  function renderListenList() {
    dom.showTranslations.checked = project.settings.showTranslations;
    dom.loopAll.checked = project.settings.loopAll;
    dom.repeatSelect.value = String(project.settings.repeat);

    if (!project.segments.length) {
      dom.listenList.innerHTML = `
        <div class="empty-state">
          <div>
            <i data-lucide="headphones"></i>
            <div>暂无可朗读的句子</div>
          </div>
        </div>
      `;
      renderIcons();
      renderPlayer();
      return;
    }

    dom.listenList.innerHTML = project.segments
      .map(
        (segment, index) => `
          <button
            class="listen-row ${runtime.player.currentIndex === index ? "is-active" : ""}"
            type="button"
            data-listen-index="${index}"
            aria-label="朗读第 ${index + 1} 句"
          >
            <span class="listen-row-index">${index + 1}</span>
            <span class="listen-row-copy">
              <span class="listen-row-text">${escapeHtml(segment.text)}</span>
              <span class="listen-row-translation" ${project.settings.showTranslations && segment.translation ? "" : "hidden"}>${escapeHtml(segment.translation || "")}</span>
            </span>
            <i data-lucide="volume-2"></i>
          </button>
        `,
      )
      .join("");
    renderIcons();
    renderPlayer();
  }

  function renderPlayer() {
    const segments = project.segments;
    const hasSegments = segments.length > 0;
    if (!hasSegments) {
      dom.playbackCounter.textContent = "0 / 0";
      dom.focusSentence.textContent = "添加图片并完成识别后，可在这里逐句跟读。";
      dom.focusTranslation.textContent = "";
      dom.focusTranslation.hidden = true;
      setPlayButtonState("idle");
      setPlaybackButtonsDisabled(true);
      return;
    }

    if (runtime.player.currentIndex < 0 || runtime.player.currentIndex >= segments.length) {
      runtime.player.currentIndex = 0;
    }

    const current = segments[runtime.player.currentIndex];
    dom.playbackCounter.textContent =
      runtime.neural.generating && runtime.player.state === "playing"
        ? "正在生成语音"
        : `${runtime.player.currentIndex + 1} / ${segments.length}`;
    dom.focusSentence.textContent = current.text;
    dom.focusTranslation.textContent = current.translation || "";
    dom.focusTranslation.hidden = !current.translation;
    setPlayButtonState(runtime.player.state);
    setPlaybackButtonsDisabled(false);
    updateActiveListenRows();
    updateActiveReviewCards();
  }

  function setPlaybackButtonsDisabled(disabled) {
    [dom.previousBtn, dom.nextBtn, dom.repeatBtn, dom.playPauseBtn].forEach((button) => {
      button.disabled = disabled;
    });
  }

  function setPlayButtonState(state) {
    const iconName = state === "playing" ? "pause" : "play";
    dom.playPauseBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    dom.playPauseBtn.title = state === "playing" ? "暂停" : state === "paused" ? "继续" : "播放";
    dom.playPauseBtn.setAttribute("aria-label", dom.playPauseBtn.title);
    renderIcons();
  }

  function updateActiveListenRows() {
    dom.listenList.querySelectorAll("[data-listen-index]").forEach((row) => {
      row.classList.toggle("is-active", Number(row.dataset.listenIndex) === runtime.player.currentIndex);
    });
  }

  function updateActiveReviewCards() {
    dom.segmentList.querySelectorAll("[data-segment-card]").forEach((card) => {
      card.classList.toggle(
        "is-playing",
        card.dataset.segmentCard === project.segments[runtime.player.currentIndex]?.id,
      );
    });
  }

  function setupVoices() {
    if (!("speechSynthesis" in window)) {
      return;
    }
    const refresh = () => {
      runtime.voices = window.speechSynthesis.getVoices() || [];
      renderVoiceOptions();
    };
    refresh();
    window.speechSynthesis.addEventListener?.("voiceschanged", refresh);
    window.speechSynthesis.onvoiceschanged = refresh;
  }

  function renderVoiceOptions() {
    if (!runtime.voices.length && "speechSynthesis" in window) {
      runtime.voices = window.speechSynthesis.getVoices() || [];
    }

    const current = project.settings.voiceURI || "neural:female";
    const neuralOptions = `
      <optgroup label="自然语音">
        <option value="neural:female">女生 · Heart</option>
        <option value="neural:male">男声 · Michael</option>
        <option value="neural:girl">少女 · Sky</option>
      </optgroup>
    `;
    const systemOptions = runtime.voices.length
      ? `<optgroup label="系统语音">${runtime.voices
          .map(
            (voice) =>
              `<option value="${escapeAttribute(voice.voiceURI)}">${escapeHtml(voice.name)} · ${escapeHtml(voice.lang)}</option>`,
          )
          .join("")}</optgroup>`
      : "";
    dom.voiceSelect.innerHTML = `${neuralOptions}${systemOptions}`;
    dom.voiceSelect.value = isNeuralVoiceValue(current)
      ? current
      : runtime.voices.some((voice) => voice.voiceURI === current)
        ? current
        : "neural:female";
    renderVoiceModuleSwitcher();
  }

  function renderVoiceModuleSwitcher() {
    const current = project.settings.voiceURI;
    dom.voiceModuleSwitcher.querySelectorAll("[data-voice-module]").forEach((button) => {
      const active = button.dataset.voiceModule === current;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function setVoiceModule(value) {
    if (!isNeuralVoiceValue(value)) {
      return;
    }
    stopPlayback();
    project.settings.voiceURI = value;
    dom.voiceSelect.value = value;
    runtime.neural.prefetchIndex = -1;
    runtime.neural.prefetchPromise = null;
    renderVoiceModuleSwitcher();
    scheduleSave();
    preloadNaturalVoice();
  }

  function syncControlsFromProject() {
    dom.projectTitle.value = project.title || "未命名项目";
    dom.ocrEngine.value = project.settings.ocrEngine;
    dom.ocrLanguage.value = project.settings.ocrLanguage;
    dom.enhanceImages.checked = project.settings.enhanceImages;
    dom.autoTranslate.checked = project.settings.autoTranslate;
    dom.grammarCheck.checked = project.settings.grammarCheck;
    dom.translationProvider.value = project.settings.translationProvider;
    dom.quickRate.value = String(project.settings.rate);
    dom.rateControl.value = String(project.settings.rate);
    dom.quickRateValue.textContent = `${Number(project.settings.rate).toFixed(1)}x`;
    dom.rateValue.textContent = `${Number(project.settings.rate).toFixed(1)}x`;
    dom.repeatSelect.value = String(project.settings.repeat);
    dom.gapControl.value = String(project.settings.gap);
    dom.gapValue.textContent = `${Number(project.settings.gap).toFixed(1)} 秒`;
    dom.loopAll.checked = project.settings.loopAll;
    dom.showTranslations.checked = project.settings.showTranslations;
  }

  function switchView(view) {
    if (!["import", "review", "listen"].includes(view)) {
      return;
    }
    activeView = view;
    document.querySelectorAll(".view-tab").forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.view === view);
    });
    document.querySelectorAll("[data-view-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.viewPanel === view);
    });
    dom.sidebar.classList.remove("is-open");

    if (view === "review") {
      renderReview();
    } else if (view === "listen") {
      renderListenList();
      preloadNaturalVoice();
    } else {
      renderPages();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function playRelative(delta) {
    if (!project.segments.length) {
      return;
    }
    const current = runtime.player.currentIndex >= 0 ? runtime.player.currentIndex : 0;
    const next = clamp(current + delta, 0, project.segments.length - 1);
    playSegment(next);
  }

  function playSegment(index) {
    if (!project.segments.length) {
      return;
    }

    cancelScheduledSpeech();
    stopActiveSpeech();
    runtime.player.token += 1;
    const token = runtime.player.token;
    runtime.player.currentIndex = clamp(index, 0, project.segments.length - 1);
    runtime.player.repeatRemaining = Math.max(1, Number(project.settings.repeat) || 1);
    runtime.player.state = "playing";
    renderPlayer();
    speakCurrent(token);
  }

  async function speakCurrent(token) {
    if (token !== runtime.player.token || runtime.player.state !== "playing") {
      return;
    }

    const segment = project.segments[runtime.player.currentIndex];
    if (!segment) {
      stopPlayback();
      return;
    }

    if (shouldUseNeuralVoice(segment)) {
      try {
        await speakNeuralSegment(segment, token);
        return;
      } catch (error) {
        if (token !== runtime.player.token) {
          return;
        }
        runtime.neural.generating = false;
        document.documentElement.dataset.neuralPlayback = "failed";
        document.documentElement.dataset.neuralError = String(error?.message || error || "");
        console.warn("Natural speech failed, using system speech", error);
        toast("自然语音生成失败，已切换系统语音", "warning");
        renderPlayer();
      }
    }

    speakSystemSegment(segment, token);
  }

  function speakSystemSegment(segment, token) {
    if (!("speechSynthesis" in window)) {
      toast("当前浏览器不支持网页朗读", "error");
      stopPlayback();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(segment.text);
    const voice = resolveVoice(segment.text);
    utterance.voice = voice || null;
    utterance.lang = voice?.lang || speechLocaleForSegment(segment.text);
    utterance.rate = clamp(Number(project.settings.rate) || 1, 0.5, 2);
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => handleSegmentFinished(token);

    utterance.onerror = (event) => {
      if (event.error === "canceled" || event.error === "interrupted") {
        return;
      }
      console.warn("Speech synthesis failed", event);
      toast("朗读失败，请检查浏览器声音设置", "error");
      stopPlayback();
    };

    window.speechSynthesis.speak(utterance);
  }

  async function speakNeuralSegment(segment, token) {
    const voiceKey = getNeuralVoiceKey(project.settings.voiceURI);
    if (!voiceKey) {
      throw new Error("Natural voice is not selected");
    }

    runtime.neural.generating = true;
    document.documentElement.dataset.neuralPlayback = "generating";
    renderPlayer();
    const audioContext = await ensureNeuralAudioContext();
    await assertLocalService();
    const kokoro = await loadKokoroModule();
    const result = await kokoro.synthesizeNaturalSpeech(segment.text, voiceKey, {
      onStage: (stage) => {
        if (token === runtime.player.token) {
          dom.playbackCounter.textContent = stage;
        }
      },
    });
    if (token !== runtime.player.token || runtime.player.state !== "playing") {
      return;
    }

    releaseNeuralAudio();
    const audioBuffer = await audioContext.decodeAudioData(await result.blob.arrayBuffer());
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    source.buffer = audioBuffer;
    source.playbackRate.value = clamp(Number(project.settings.rate) || 1, 0.6, 1.4);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    runtime.neural.source = source;
    runtime.neural.gainNode = gainNode;
    runtime.neural.generating = false;
    source.onended = () => handleSegmentFinished(token);
    renderPlayer();
    await audioContext.resume();
    document.documentElement.dataset.neuralAudioState = audioContext.state;
    source.start();
    document.documentElement.dataset.neuralPlayback = "playing";
    void prefetchNeuralSegment(runtime.player.currentIndex + 1);
  }

  async function ensureNeuralAudioContext() {
    if (!runtime.neural.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error("Web Audio API is not supported");
      }
      runtime.neural.audioContext = new AudioContextClass();
    }
    if (runtime.neural.audioContext.state === "suspended") {
      await runtime.neural.audioContext.resume();
    }
    return runtime.neural.audioContext;
  }

  function handleSegmentFinished(token) {
    if (token !== runtime.player.token || runtime.player.state === "idle") {
      return;
    }

    releaseNeuralAudio();
    runtime.player.repeatRemaining -= 1;
    if (runtime.player.repeatRemaining > 0) {
      runtime.player.timer = window.setTimeout(() => speakCurrent(token), 260);
      return;
    }

    if (runtime.player.currentIndex < project.segments.length - 1) {
      runtime.player.currentIndex += 1;
      runtime.player.repeatRemaining = Math.max(1, Number(project.settings.repeat) || 1);
      renderPlayer();
      runtime.player.timer = window.setTimeout(
        () => speakCurrent(token),
        Math.max(0, Number(project.settings.gap) || 0) * 1000,
      );
    } else if (project.settings.loopAll && project.segments.length) {
      runtime.player.currentIndex = 0;
      runtime.player.repeatRemaining = Math.max(1, Number(project.settings.repeat) || 1);
      renderPlayer();
      runtime.player.timer = window.setTimeout(
        () => speakCurrent(token),
        Math.max(0, Number(project.settings.gap) || 0) * 1000,
      );
    } else {
      runtime.player.state = "idle";
      renderPlayer();
    }
  }

  function shouldUseNeuralVoice(segment) {
    return (
      isNeuralVoiceValue(project.settings.voiceURI) &&
      detectSentenceSource(segment.text) === "eng"
    );
  }

  function loadKokoroModule() {
    if (!runtime.neural.modulePromise) {
      runtime.neural.modulePromise = import("./kokoro-tts.mjs").catch((error) => {
        runtime.neural.modulePromise = null;
        throw error;
      });
    }
    return runtime.neural.modulePromise;
  }

  function preloadNaturalVoice() {
    if (!isNeuralVoiceValue(project.settings.voiceURI)) {
      return;
    }
    const voiceKey = getNeuralVoiceKey(project.settings.voiceURI);
    if (!voiceKey) {
      return;
    }
    const token = runtime.neural.prepareToken + 1;
    runtime.neural.prepareToken = token;

    (async () => {
      await assertLocalService();
      const kokoro = await loadKokoroModule();
      await kokoro.warmUpKokoro((stage) => {
        if (runtime.player.state !== "playing") {
          dom.playbackCounter.textContent = stage;
        }
      });

      const start = runtime.player.currentIndex >= 0 ? runtime.player.currentIndex : 0;
      const end = Math.min(project.segments.length, start + 3);
      for (let index = start; index < end; index += 1) {
        if (
          token !== runtime.neural.prepareToken ||
          voiceKey !== getNeuralVoiceKey(project.settings.voiceURI)
        ) {
          return;
        }
        if (runtime.player.state !== "playing") {
          dom.playbackCounter.textContent = `准备第 ${index + 1} / ${project.segments.length} 句语音`;
        }
        await prefetchNeuralSegment(index, token);
      }
      if (runtime.player.state !== "playing") {
        renderPlayer();
      }
    })()
      .catch(() => {
        if (runtime.player.state !== "playing") {
          renderPlayer();
        }
      });
  }

  async function prefetchNeuralSegment(index, prepareToken = 0) {
    if (
      index < 0 ||
      index >= project.segments.length ||
      runtime.neural.prefetchIndex === index
    ) {
      return;
    }
    const segment = project.segments[index];
    const voiceKey = getNeuralVoiceKey(project.settings.voiceURI);
    if (!voiceKey || !shouldUseNeuralVoice(segment)) {
      return;
    }
    if (prepareToken && prepareToken !== runtime.neural.prepareToken) {
      return;
    }

    runtime.neural.prefetchIndex = index;
    runtime.neural.prefetchPromise = loadKokoroModule()
      .then((kokoro) =>
        kokoro.synthesizeNaturalSpeech(
          segment.text,
          voiceKey,
          prepareToken
            ? {}
            : undefined,
        ),
      )
      .catch(() => undefined);
    await runtime.neural.prefetchPromise;
  }

  async function togglePlayback() {
    if (!project.segments.length) {
      return;
    }

    if (runtime.player.state === "playing" && runtime.neural.generating) {
      stopPlayback();
      toast("已取消语音生成", "warning");
      return;
    }

    if (runtime.player.state === "playing" && runtime.neural.source) {
      await runtime.neural.audioContext?.suspend();
      runtime.player.state = "paused";
      renderPlayer();
    } else if (runtime.player.state === "paused" && runtime.neural.source) {
      await runtime.neural.audioContext?.resume();
      runtime.player.state = "playing";
      renderPlayer();
    } else if (
      runtime.player.state === "playing" &&
      "speechSynthesis" in window &&
      window.speechSynthesis.speaking
    ) {
      window.speechSynthesis.pause();
      runtime.player.state = "paused";
      renderPlayer();
    } else if (runtime.player.state === "paused") {
      window.speechSynthesis.resume();
      runtime.player.state = "playing";
      renderPlayer();
    } else {
      playSegment(runtime.player.currentIndex >= 0 ? runtime.player.currentIndex : 0);
    }
  }

  function stopPlayback() {
    cancelScheduledSpeech();
    runtime.player.token += 1;
    runtime.player.state = "idle";
    stopActiveSpeech();
    renderPlayer();
  }

  function stopActiveSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    runtime.neural.generating = false;
    runtime.neural.prefetchIndex = -1;
    runtime.neural.prefetchPromise = null;
    releaseNeuralAudio();
  }

  function releaseNeuralAudio() {
    if (runtime.neural.source) {
      runtime.neural.source.onended = null;
      try {
        runtime.neural.source.stop();
      } catch {
        // The source may already have ended.
      }
      runtime.neural.source.disconnect();
    }
    runtime.neural.gainNode?.disconnect();
    runtime.neural.source = null;
    runtime.neural.gainNode = null;
    document.documentElement.dataset.neuralPlayback = "stopped";
    if (runtime.neural.audioContext?.state === "suspended") {
      runtime.neural.audioContext.resume().catch(() => undefined);
    }
  }

  function cancelScheduledSpeech() {
    if (runtime.player.timer) {
      clearTimeout(runtime.player.timer);
      runtime.player.timer = null;
    }
  }

  function resolveVoice(text) {
    if (!runtime.voices.length && "speechSynthesis" in window) {
      runtime.voices = window.speechSynthesis.getVoices() || [];
    }

    const selected = runtime.voices.find(
      (voice) => voice.voiceURI === project.settings.voiceURI,
    );
    if (selected) {
      return selected;
    }

    const locale = speechLocaleForSegment(text).toLowerCase();
    const base = locale.split("-")[0];
    return (
      runtime.voices.find((voice) => voice.lang.toLowerCase() === locale) ||
      runtime.voices.find((voice) => voice.lang.toLowerCase().startsWith(`${base}-`)) ||
      runtime.voices.find((voice) => voice.lang.toLowerCase() === base) ||
      null
    );
  }

  function setRate(rate) {
    const next = clamp(Number(rate) || 1, 0.6, 1.4);
    project.settings.rate = next;
    dom.quickRate.value = String(next);
    dom.rateControl.value = String(next);
    dom.quickRateValue.textContent = `${next.toFixed(1)}x`;
    dom.rateValue.textContent = `${next.toFixed(1)}x`;
    if (runtime.neural.source) {
      runtime.neural.source.playbackRate.value = next;
    }
    scheduleSave();
  }

  function handleKeyboard(event) {
    const tag = event.target?.tagName?.toLowerCase();
    if (["input", "textarea", "select", "button"].includes(tag) || event.metaKey || event.ctrlKey) {
      return;
    }
    if (!project.segments.length) {
      return;
    }

    if (event.code === "Space") {
      event.preventDefault();
      togglePlayback();
    } else if (event.key === "ArrowRight") {
      playRelative(1);
    } else if (event.key === "ArrowLeft") {
      playRelative(-1);
    } else if (event.key.toLowerCase() === "r") {
      playSegment(runtime.player.currentIndex);
    }
  }

  async function fetchWithTimeout(url, options = {}, timeoutMs = 12000) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function detectSentenceSource(text) {
    const value = String(text || "");
    if (/[\u3040-\u30ff]/.test(value)) {
      return "jpn";
    }
    if (/[\uac00-\ud7af]/.test(value)) {
      return "kor";
    }
    if (/[\u0600-\u06ff]/.test(value)) {
      return "ara";
    }
    if (/[\u0400-\u04ff]/.test(value)) {
      return "rus";
    }
    const cjkCount = (value.match(/[\u4e00-\u9fff]/g) || []).length;
    if (cjkCount / Math.max(1, value.replace(/\s/g, "").length) > 0.18) {
      return "chi_sim";
    }
    return project.settings.ocrLanguage.includes("+")
      ? "eng"
      : project.settings.ocrLanguage;
  }

  function speechLocaleForSegment(text) {
    return LANGUAGE_INFO[detectSentenceSource(text)]?.speech || "en-US";
  }

  function isNeuralVoiceValue(value) {
    return /^neural:(female|male|girl)$/.test(String(value || ""));
  }

  function getNeuralVoiceKey(value) {
    const match = /^neural:(female|male|girl)$/.exec(String(value || ""));
    return match ? match[1] : "";
  }

  function isChineseSource(languageCode) {
    return languageCode === "chi_sim";
  }

  function sourceCodeToMyMemory(code) {
    if (code === "chi_sim") {
      return "zh-CN";
    }
    return LANGUAGE_INFO[code]?.translation || code;
  }

  function normalizeComparableText(text) {
    return String(text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function toast(message, type = "info") {
    const icons = {
      info: "info",
      success: "check-circle-2",
      error: "circle-alert",
      warning: "triangle-alert",
    };
    const element = document.createElement("div");
    element.className = `toast ${type === "info" ? "" : `is-${type}`}`;
    element.innerHTML = `
      <i data-lucide="${icons[type] || icons.info}"></i>
      <span>${escapeHtml(message)}</span>
    `;
    dom.toastRegion.appendChild(element);
    renderIcons();
    window.setTimeout(() => {
      element.style.opacity = "0";
      element.style.transform = "translateY(5px)";
      window.setTimeout(() => element.remove(), 180);
    }, type === "error" ? 5200 : 3400);
  }

  function renderIcons() {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons({
        attrs: {
          "aria-hidden": "true",
        },
      });
    }
  }

  function formatRelativeTime(timestamp) {
    if (!timestamp) {
      return "刚刚";
    }
    const diff = Date.now() - timestamp;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (diff < minute) {
      return "刚刚";
    }
    if (diff < hour) {
      return `${Math.floor(diff / minute)} 分钟前`;
    }
    if (diff < day) {
      return `${Math.floor(diff / hour)} 小时前`;
    }
    if (diff < day * 7) {
      return `${Math.floor(diff / day)} 天前`;
    }
    return new Date(timestamp).toLocaleDateString("zh-CN");
  }

  function createId() {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function decodeHtmlEntities(value) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = value;
    return textarea.value;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function cssEscape(value) {
    if (window.CSS?.escape) {
      return window.CSS.escape(value);
    }
    return String(value).replace(/["\\]/g, "\\$&");
  }

  function projectKey(id) {
    return `${DB_NAME}:project:${id}`;
  }

  function metaKey(id) {
    return `${DB_NAME}:meta:${id}`;
  }

  function readLocalProject(id) {
    try {
      const raw = localStorage.getItem(projectKey(id));
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function readLocalMetaList() {
    const items = [];
    Object.keys(localStorage)
      .filter((key) => key.startsWith(`${DB_NAME}:meta:`))
      .forEach((key) => {
        try {
          items.push(JSON.parse(localStorage.getItem(key)));
        } catch (error) {
          // Ignore malformed local entries.
        }
      });
    return items;
  }

  function dbGet(storeName, key) {
    if (!runtime.db) {
      return Promise.resolve(null);
    }
    return new Promise((resolve, reject) => {
      const transaction = runtime.db.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  function dbGetAll(storeName) {
    if (!runtime.db) {
      return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
      const transaction = runtime.db.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  function dbPut(storeName, value) {
    if (!runtime.db) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const transaction = runtime.db.transaction(storeName, "readwrite");
      const request = transaction.objectStore(storeName).put(value);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  function dbDelete(storeName, key) {
    if (!runtime.db) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const transaction = runtime.db.transaction(storeName, "readwrite");
      const request = transaction.objectStore(storeName).delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  function dbClear(storeName) {
    if (!runtime.db) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const transaction = runtime.db.transaction(storeName, "readwrite");
      const request = transaction.objectStore(storeName).clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
})();
