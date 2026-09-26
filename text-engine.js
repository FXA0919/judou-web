(function () {
  "use strict";

  const MAX_SEGMENT_LENGTH = 280;

  const COMMON_ABBREVIATIONS = new Set(
    [
      "adm",
      "al",
      "approx",
      "apr",
      "aug",
      "ave",
      "bros",
      "capt",
      "cf",
      "chap",
      "cmdr",
      "co",
      "col",
      "corp",
      "dec",
      "dept",
      "dr",
      "e.g",
      "ed",
      "eds",
      "eg",
      "est",
      "etc",
      "ex",
      "feb",
      "fig",
      "figs",
      "fri",
      "gen",
      "gov",
      "hon",
      "i.e",
      "ie",
      "inc",
      "jan",
      "jr",
      "jul",
      "jun",
      "ltd",
      "mar",
      "mr",
      "mrs",
      "ms",
      "mt",
      "no",
      "nov",
      "oct",
      "op",
      "p",
      "ph.d",
      "pp",
      "pres",
      "prof",
      "rev",
      "sen",
      "sep",
      "sept",
      "sgt",
      "sr",
      "st",
      "sun",
      "thu",
      "tue",
      "u.k",
      "u.s",
      "vs",
      "vol",
      "wed",
    ].map((item) => item.toLowerCase()),
  );

  const BULLET_RE = /^\s*(?:[-*•·▪◦‣–—]|(?:\d{1,3}|[a-zA-Z])[.)])\s+/;
  const TERMINAL_RE = /[.!?。！？]["'”’»)\]]*$/;
  const FIRST_PERSON_VERBS = new Set([
    "am", "was", "were", "have", "had", "will", "would", "shall", "should",
    "can", "cannot", "could", "may", "might", "must", "do", "did", "don't", "didn't",
    "want", "wanted", "need", "needed", "know", "knew", "think", "thought",
    "believe", "believed", "feel", "felt", "see", "saw", "hear", "heard",
    "read", "write", "wrote", "say", "said", "ask", "asked", "get", "got",
    "go", "went", "come", "came", "learn", "learned", "work", "worked",
    "try", "tried", "find", "found", "remember", "hope", "hoped", "like",
    "liked", "love", "loved", "prefer", "preferred", "start", "started",
    "use", "used", "understand", "understood",
    "enjoy", "enjoyed", "study", "studied", "play", "played", "eat", "ate",
    "make", "made", "take", "took", "give", "gave", "speak", "spoke",
    "tell", "told", "look", "looked", "live", "lived", "help", "helped",
    "buy", "bought", "keep", "kept", "leave", "left", "grow", "grew",
    "sleep", "slept", "walk", "walked", "run", "ran", "sit", "sat",
    "stand", "stood", "spend", "spent", "visit", "visited", "watch", "watched",
    "listen", "listened", "choose", "chose", "become", "became", "bring",
    "brought", "open", "opened", "close", "closed", "wait", "waited",
    "call", "called", "meet", "met", "show", "showed", "plan", "planned",
    "decide", "decided",
  ]);
  const NUMBER_LABELS = new Set([
    "chapter", "lesson", "unit", "page", "figure", "table", "number", "no",
    "step", "item", "option", "example", "section", "verse", "question",
    "point", "line", "row", "column", "part", "value", "score", "answer",
  ]);

  function fromPaddle(result) {
    const groups = Array.isArray(result?.lines) ? result.lines : [];
    const lines = [];

    groups.forEach((group) => {
      const items = (Array.isArray(group) ? group : [group]).filter(
        (item) => item?.text && String(item.text).trim(),
      );
      items.forEach((item) => {
        lines.push({
          text: cleanInlineText(item.text),
          confidence: normalizeConfidence(item.confidence),
          box: normalizeBox(item.box),
        });
      });
    });

    return buildDocument(lines);
  }

  function fromTesseract(data) {
    if (!Array.isArray(data?.blocks) || !data.blocks.length) {
      const text = normalizePageText(data?.text || "");
      return {
        text,
        lines: text
          .split(/\n+/)
          .map((line) => ({ text: line.trim(), confidence: null, box: null, paragraph: 0 }))
          .filter((line) => line.text),
        confidence: Number.isFinite(data?.confidence) ? data.confidence / 100 : null,
      };
    }

    const lines = [];
    let paragraphIndex = 0;
    data.blocks.forEach((block) => {
      const paragraphs = Array.isArray(block?.paragraphs) ? block.paragraphs : [];
      paragraphs.forEach((paragraph) => {
        const paragraphLines = Array.isArray(paragraph?.lines) ? paragraph.lines : [];
        paragraphLines.forEach((line) => {
          splitTesseractLine(line).forEach((part) => {
            const text = cleanInlineText(part.text || "");
            if (text) {
              lines.push({
                text,
                confidence: normalizeConfidence(part.confidence),
                box: part.box,
                paragraph: paragraphIndex,
              });
            }
          });
        });
        paragraphIndex += 1;
      });
    });

    if (!lines.length) {
      return fromTesseract({ text: data?.text || "", confidence: data?.confidence });
    }

    return buildDocument(lines, true);
  }

  function fromDocumentPages(pages) {
    const entries = (Array.isArray(pages) ? pages : []).map((page, pageIndex) => {
      const lines = Array.isArray(page?.lines)
        ? page.lines
            .map((line) => ({
              text: cleanInlineText(line?.text || ""),
              confidence: normalizeConfidence(line?.confidence),
              box: normalizeBox(line?.box),
              paragraph: Number.isInteger(line?.paragraph) ? line.paragraph : null,
            }))
            .filter((line) => line.text)
        : [];

      if (!lines.length && page?.text) {
        return {
          pageIndex,
          lines: String(page.text)
            .split(/\n+/)
            .map((text) => ({
              text: cleanInlineText(text),
              confidence: normalizeConfidence(page.confidence),
              box: null,
              paragraph: null,
            }))
            .filter((line) => line.text),
        };
      }

      return { pageIndex, lines };
    });

    if (!entries.some((entry) => entry.lines.some((line) => line.box))) {
      const text = entries
        .map((entry) => entry.lines.map((line) => line.text).join("\n"))
        .filter(Boolean)
        .join("\n\n");
      const lines = entries.flatMap((entry) =>
        entry.lines.map((line, index) => ({
          ...line,
          paragraph: entry.pageIndex * 1000 + index,
        })),
      );
      return buildDocument(lines, true);
    }

    removeRepeatedMarginalLines(entries);
    const documentLines = [];
    let paragraphOffset = 0;

    entries.forEach((entry) => {
      const ordered = orderPageLines(entry.lines.filter((line) => !line.remove));
      const pageDocument = buildDocument(repairLostSentenceEnds(ordered), false);
      let pageParagraphCount = 0;
      pageDocument.lines.forEach((line) => {
        pageParagraphCount = Math.max(pageParagraphCount, line.paragraph + 1);
        documentLines.push({
          ...line,
          paragraph: paragraphOffset + line.paragraph,
        });
      });
      paragraphOffset += Math.max(1, pageParagraphCount);
    });

    return buildDocument(documentLines, true);
  }

  function removeRepeatedMarginalLines(entries) {
    const occurrences = new Map();
    let pageCount = 0;

    entries.forEach((entry) => {
      const boxes = entry.lines.map((line) => line.box).filter(Boolean);
      if (!boxes.length) {
        return;
      }
      pageCount += 1;
      const pageHeight = Math.max(...boxes.map((box) => box.y + box.height));
      entry.lines.forEach((line) => {
        if (!line.box || !line.text) {
          return;
        }
        const centerY = line.box.y + line.box.height / 2;
        const band = centerY < pageHeight * 0.14 ? "top" : centerY > pageHeight * 0.86 ? "bottom" : "";
        if (!band || line.text.length > 120) {
          return;
        }
        const signature = `${band}:${line.text
          .toLowerCase()
          .replace(/\d+/g, "#")
          .replace(/[^\p{L}#]+/gu, "")}`;
        if (signature.length < 4) {
          return;
        }
        if (!occurrences.has(signature)) {
          occurrences.set(signature, new Set());
        }
        occurrences.get(signature).add(entry.pageIndex);
      });
    });

    if (pageCount < 2) {
      return;
    }
    const threshold = Math.max(2, Math.ceil(pageCount * 0.6));
    entries.forEach((entry) => {
      const boxes = entry.lines.map((line) => line.box).filter(Boolean);
      const pageHeight = boxes.length
        ? Math.max(...boxes.map((box) => box.y + box.height))
        : 0;
      entry.lines.forEach((line) => {
        if (!line.box || !line.text || !pageHeight) {
          return;
        }
        const centerY = line.box.y + line.box.height / 2;
        const band = centerY < pageHeight * 0.14 ? "top" : centerY > pageHeight * 0.86 ? "bottom" : "";
        const signature = `${band}:${line.text
          .toLowerCase()
          .replace(/\d+/g, "#")
          .replace(/[^\p{L}#]+/gu, "")}`;
        if (occurrences.get(signature)?.size >= threshold) {
          line.remove = true;
        }
      });
    });
  }

  function orderPageLines(lines) {
    if (lines.length < 4 || lines.filter((line) => line.box).length < 3) {
      return lines;
    }

    const pageWidth = Math.max(...lines.filter((line) => line.box).map((line) => line.box.x + line.box.width));
    if (!Number.isFinite(pageWidth) || pageWidth <= 0) {
      return lines;
    }

    const columnMode = detectColumnMode(lines, pageWidth);
    const sorted = columnMode
      ? orderByColumns(lines, pageWidth)
      : orderByRows(lines);
    return sorted;
  }

  function detectColumnMode(lines, pageWidth) {
    const usable = lines.filter((line) => line.box);
    if (usable.length < 6) {
      return false;
    }

    const left = usable.filter((line) => centerX(line.box) < pageWidth * 0.47);
    const right = usable.filter((line) => centerX(line.box) > pageWidth * 0.53);
    const wide = usable.filter((line) => line.box.width > pageWidth * 0.62);
    if (left.length < 3 || right.length < 3 || wide.length / usable.length > 0.46) {
      return false;
    }

    const leftMedian = median(left.map((line) => centerX(line.box)));
    const rightMedian = median(right.map((line) => centerX(line.box)));
    const separation = rightMedian - leftMedian;
    return (
      separation > pageWidth * 0.13 &&
      Math.min(left.length, right.length) / usable.length > 0.2
    );
  }

  function orderByColumns(lines, pageWidth) {
    const wideLines = lines
      .filter((line) => line.box && line.box.width > pageWidth * 0.62)
      .sort(compareByPosition);
    const columnLines = lines.filter((line) => !wideLines.includes(line));
    if (!wideLines.length) {
      return orderColumnSection(columnLines, pageWidth);
    }

    const output = [];
    let cursorY = Number.NEGATIVE_INFINITY;
    wideLines.forEach((wideLine) => {
      const section = columnLines
        .filter((line) => {
          if (!line.box) {
            return false;
          }
          const y = line.box.y + line.box.height / 2;
          return y < wideLine.box.y && y >= cursorY;
        })
        .sort(compareByPosition);
      output.push(...orderColumnSection(section, pageWidth));
      output.push(wideLine);
      cursorY = wideLine.box.y + wideLine.box.height;
    });

    const remainder = columnLines
      .filter((line) => !line.box || line.box.y + line.box.height / 2 >= cursorY)
      .sort(compareByPosition);
    output.push(...orderColumnSection(remainder, pageWidth));
    return output;
  }

  function orderColumnSection(lines, pageWidth) {
    const left = lines
      .filter((line) => !line.box || centerX(line.box) <= pageWidth * 0.5);
    const right = lines
      .filter((line) => line.box && centerX(line.box) > pageWidth * 0.5);
    return [
      ...trimColumnLabels(orderByRows(left), pageWidth),
      ...trimColumnLabels(orderByRows(right), pageWidth),
    ];
  }

  function orderByRows(lines) {
    const heights = lines.map((line) => line.box?.height)
      .filter((height) => Number.isFinite(height) && height > 0);
    const rowTolerance = Math.max(8, (median(heights) || 18) * 0.72);
    const rows = [];
    [...lines].sort(compareByPosition).forEach((line) => {
      if (!line.box) {
        rows.push([line]);
        return;
      }
      const center = line.box.y + line.box.height / 2;
      let row;
      for (let index = rows.length - 1; index >= 0; index -= 1) {
        const items = rows[index];
        const anchor = items[0].box;
        if (anchor && Math.abs(center - (anchor.y + anchor.height / 2)) <= rowTolerance) {
          row = items;
          break;
        }
      }
      if (row) {
        row.push(line);
      } else {
        rows.push([line]);
      }
    });
    return rows.flatMap((row) => row.sort((left, right) =>
      (left.box?.x ?? 0) - (right.box?.x ?? 0),
    ));
  }

  function trimColumnLabels(lines, pageWidth) {
    if (lines.length < 8) {
      return lines;
    }
    const isBodyLine = (line) => line.text.replace(/[^\p{L}]/gu, "").length >= 24;
    let firstBody = -1;
    for (let index = 0; index <= lines.length - 4; index += 1) {
      if (lines.slice(index, index + 4).filter(isBodyLine).length >= 3) {
        firstBody = index;
        break;
      }
    }
    if (firstBody < 0) {
      return lines;
    }

    const prefixSpan = lines[firstBody].box?.y - lines[0].box?.y;
    const prefixIsLabels =
      (firstBody >= 3 && prefixSpan > 50) ||
      (firstBody > 0 && prefixSpan > 80 &&
        lines.slice(0, firstBody).every((line) =>
          !isBodyLine(line) && !TERMINAL_RE.test(line.text)));
    let start = prefixIsLabels ? firstBody : 0;
    if (prefixIsLabels) {
      while (start < lines.length && !isBodyLine(lines[start]) &&
        !TERMINAL_RE.test(lines[start].text)) {
        start += 1;
      }
    }
    const heading = prefixIsLabels && start > 0 ? lines[start - 1] : null;
    const headingGap = heading?.box && lines[start]?.box
      ? lines[start].box.y - heading.box.y - heading.box.height
      : Number.POSITIVE_INFINITY;
    const keepHeading = heading && headingGap >= 0 &&
      headingGap < Math.max(24, lines[start].box.height * 1.5) &&
      /^[A-Z][a-z]+(?:\s+[a-z]+){2,}$/.test(heading.text) &&
      heading.text.replace(/[^\p{L}]/gu, "").length >= 14;
    const body = keepHeading
      ? [{ ...heading, text: `${heading.text}.` }, ...lines.slice(start)]
      : lines.slice(start);
    const lineSteps = body
      .slice(1)
      .map((line, index) => line.box?.y - body[index].box?.y)
      .filter((step) => Number.isFinite(step) && step > 0 && step < 80);
    const typicalStep = median(lineSteps) || 28;
    let lastLongIndex = -1;
    for (let index = 0; index < body.length; index += 1) {
      if (isBodyLine(body[index])) {
        lastLongIndex = index;
      }
    }
    let end = body.length;
    for (let index = lastLongIndex + 1; index < body.length; index += 1) {
      const gap = body[index].box?.y - body[index - 1].box?.y;
      if (Number.isFinite(gap) && gap > Math.max(40, typicalStep * 1.5)) {
        end = index;
        break;
      }
    }
    const trimmed = body.slice(0, end);
    const columnBaseX = median(body.filter(isBodyLine).map((line) => line.box?.x));
    return trimmed.filter((line, index) => {
      if (index <= lastLongIndex) {
        return true;
      }
      const letters = line.text.replace(/[^\p{L}]/gu, "").length;
      if (letters >= 24 || TERMINAL_RE.test(line.text) || !line.box) {
        return true;
      }
      const sameRow = trimmed.filter((other) =>
        other !== line && other.box &&
        Math.abs(other.box.y - line.box.y) < Math.max(12, typicalStep * 0.55) &&
        Math.abs(other.box.x - line.box.x) > pageWidth * 0.15,
      );
      if (!sameRow.length) {
        return true;
      }
      const prior = trimmed.filter((other) =>
        other.box && other.box.y < line.box.y - typicalStep * 0.55 &&
        other.box.y >= line.box.y - typicalStep * 3,
      );
      if (!prior.length) {
        return true;
      }
      const baselineX = median(prior.map((other) => other.box.x));
      if (baselineX - columnBaseX < pageWidth * 0.15 ||
        line.box.x >= baselineX - pageWidth * 0.1) {
        return true;
      }
      return !sameRow.some((other) =>
        Math.abs(other.box.x - baselineX) + pageWidth * 0.1 <
        Math.abs(line.box.x - baselineX),
      );
    });
  }

  function repairLostSentenceEnds(lines) {
    const repaired = lines.map((line) => ({ ...line }));
    for (let index = 1; index < repaired.length; index += 1) {
      const previous = repaired[index - 1];
      const current = repaired[index];
      if (!previous.box || !current.box ||
        !/^["'“‘]?(?:[A-Z][a-z]|[AI](?=\s))/.test(current.text) ||
        /[.!?。！？,，;；:：-]$/.test(previous.text)) {
        continue;
      }
      const step = current.box.y - previous.box.y;
      const lineHeight = Math.max(previous.box.height, current.box.height, 12);
      const columnReset = step < -lineHeight * 4 &&
        current.box.x > previous.box.x + lineHeight * 3;
      const sameRowGap = Math.abs(step) <= lineHeight * 0.55 &&
        current.box.x > previous.box.x + previous.box.width + lineHeight * 0.3;
      if ((step > lineHeight * 0.55 && step < lineHeight * 4) ||
        columnReset || sameRowGap) {
        previous.text += ".";
      }
    }
    return repaired;
  }

  function splitTesseractLine(line) {
    const words = (Array.isArray(line?.words) ? line.words : [])
      .filter((word) => word?.text && convertTesseractBox(word.bbox))
      .sort((left, right) => left.bbox.x0 - right.bbox.x0);
    if (words.length < 2) {
      return [{
        text: line?.text || "",
        confidence: line?.confidence,
        box: convertTesseractBox(line?.bbox),
      }];
    }
    const wordHeight = median(words.map((word) => word.bbox.y1 - word.bbox.y0)) || 18;
    const gapThreshold = Math.max(28, wordHeight * 1.5);
    const groups = [[words[0]]];
    words.slice(1).forEach((word) => {
      const group = groups[groups.length - 1];
      const last = group[group.length - 1];
      if (word.bbox.x0 - last.bbox.x1 > gapThreshold) {
        groups.push([]);
      }
      groups[groups.length - 1].push(word);
    });
    if (groups.length === 1) {
      return [{
        text: line.text,
        confidence: line.confidence,
        box: convertTesseractBox(line.bbox),
      }];
    }
    return groups.map((group) => ({
      text: group.map((word) => word.text).join(" "),
      confidence: weightedConfidence(group),
      box: unionBoxes(group.map((word) => convertTesseractBox(word.bbox))),
    }));
  }

  function compareByPosition(left, right) {
    if (!left.box && !right.box) {
      return 0;
    }
    if (!left.box) {
      return -1;
    }
    if (!right.box) {
      return 1;
    }
    return left.box.y - right.box.y || left.box.x - right.box.x;
  }

  function centerX(box) {
    return box.x + box.width / 2;
  }

  function median(values) {
    const sorted = values.filter(Number.isFinite).sort((left, right) => left - right);
    if (!sorted.length) {
      return 0;
    }
    return sorted[Math.floor(sorted.length / 2)];
  }

  function buildDocument(inputLines, preserveParagraphs) {
    const lines = inputLines
      .map((line) => ({
        text: cleanInlineText(line.text),
        confidence: normalizeConfidence(line.confidence),
        box: normalizeBox(line.box),
        paragraph: Number.isInteger(line.paragraph) ? line.paragraph : null,
      }))
      .filter((line) => line.text);

    if (!lines.length) {
      return { text: "", lines: [], confidence: null };
    }

    const heights = lines
      .map((line) => line.box?.height)
      .filter((value) => Number.isFinite(value) && value > 0)
      .sort((a, b) => a - b);
    const medianHeight = heights.length ? heights[Math.floor(heights.length / 2)] : 18;

    let paragraph = 0;
    lines.forEach((line, index) => {
      if (preserveParagraphs && line.paragraph !== null) {
        paragraph = line.paragraph;
        line.paragraph = paragraph;
        return;
      }

      if (index > 0 && shouldStartParagraph(lines[index - 1], line, medianHeight)) {
        paragraph += 1;
      }
      line.paragraph = paragraph;
    });

    const paragraphs = [];
    lines.forEach((line) => {
      if (!paragraphs[line.paragraph]) {
        paragraphs[line.paragraph] = [];
      }
      paragraphs[line.paragraph].push(line.text);
    });

    const text = paragraphs
      .filter(Boolean)
      .map((paragraphLines) => paragraphLines.join("\n"))
      .join("\n\n");

    return {
      text: normalizePageText(text),
      lines,
      confidence: weightedLineConfidence(lines),
    };
  }

  function shouldStartParagraph(previous, current, medianHeight) {
    if (!previous) {
      return false;
    }
    if (BULLET_RE.test(current.text) && !BULLET_RE.test(previous.text)) {
      return true;
    }
    if (!previous.box || !current.box) {
      return false;
    }

    const previousBottom = previous.box.y + previous.box.height;
    const verticalGap = current.box.y - previousBottom;
    const indentation = Math.abs(current.box.x - previous.box.x);
    if (current.box.y < previous.box.y - medianHeight * 2 &&
      TERMINAL_RE.test(previous.text)) {
      return true;
    }
    if (verticalGap >= Math.max(20, medianHeight * 1.3)) {
      return true;
    }
    if (
      current.box.y - previous.box.y > medianHeight * 0.5 &&
      indentation > Math.max(18, medianHeight * 1.35) &&
      TERMINAL_RE.test(previous.text)
    ) {
      return true;
    }
    return false;
  }

  function segment(text, languageCode) {
    const normalized = normalizeDocumentText(text);
    if (!normalized) {
      return [];
    }

    const paragraphs = normalized.split(/\n{2,}/);
    const output = [];
    paragraphs.forEach((paragraph, paragraphIndex) => {
      const paragraphText = paragraph.replace(/\s*\n\s*/g, " ").trim();
      if (!paragraphText) {
        return;
      }

      const explicitLines = paragraph
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);
      const hasExplicitList = explicitLines.some((line) => BULLET_RE.test(line));
      let parts;

      if (hasExplicitList) {
        parts = splitExplicitList(explicitLines);
      } else if (languageCode === "eng" || languageCode === "eng+chi_sim") {
        parts = splitEnglishParagraph(prepareListBreaks(paragraphText));
      } else {
        parts = splitWithIntl(paragraphText, localeForLanguage(languageCode));
      }

      normalizeParts(parts).forEach((part) => {
        output.push({
          text: part,
          paragraph: paragraphIndex,
          confidence: null,
        });
      });
    });

    return output;
  }

  function splitEnglishParagraph(text) {
    const parts = [];
    let start = 0;
    let index = 0;

    while (index < text.length) {
      const char = text[index];
      if (char !== "." && char !== "!" && char !== "?") {
        index += 1;
        continue;
      }

      let punctuationEnd = index;
      while (/[.!?]/.test(text[punctuationEnd + 1] || "")) {
        punctuationEnd += 1;
      }
      while (/["'”’»)\]]/.test(text[punctuationEnd + 1] || "")) {
        punctuationEnd += 1;
      }

      if (!isBoundaryAt(text, index, punctuationEnd)) {
        index += 1;
        continue;
      }

      const sentence = text.slice(start, punctuationEnd + 1).trim();
      if (sentence) {
        parts.push(sentence);
      }
      start = punctuationEnd + 1;
      index = start;
    }

    const tail = text.slice(start).trim();
    if (tail) {
      parts.push(tail);
    }
    return parts;
  }

  function isBoundaryAt(text, punctuationIndex, punctuationEnd) {
    const punctuation = text[punctuationIndex];
    if (punctuation === "!" || punctuation === "?") {
      const next = nextNonSpace(text, punctuationEnd + 1);
      return !next || !/[\p{Ll}\d]/u.test(next);
    }

    const previousChar = text[punctuationIndex - 1] || "";
    const nextChar = text[punctuationIndex + 1] || "";
    if (/\d/.test(previousChar) && /\d/.test(nextChar)) {
      return false;
    }

    const before = text.slice(0, punctuationIndex);
    const tokenMatch = before.match(/([\p{L}.]+)$/u);
    const token = tokenMatch ? tokenMatch[1] : "";
    if (isProtectedToken(token)) {
      return false;
    }

    const next = nextNonSpace(text, punctuationEnd + 1);
    if (!next) {
      return true;
    }
    if (/[\p{Ll}\d]/u.test(next)) {
      return false;
    }
    if (token.length === 1 && /\p{Lu}/u.test(token) && /\p{Lu}/u.test(next)) {
      return false;
    }
    if (token.length === 1 && /\p{Lu}/u.test(token) && /[\p{Ll}]/u.test(next)) {
      return false;
    }
    return true;
  }

  function isProtectedToken(token) {
    if (!token) {
      return false;
    }
    const raw = token.toLowerCase();
    const compact = raw.replace(/\./g, "");
    if (COMMON_ABBREVIATIONS.has(raw) || COMMON_ABBREVIATIONS.has(compact)) {
      return true;
    }
    if (/^(?:\p{Lu}\.)+$/u.test(token)) {
      return true;
    }
    if (/^(?:[a-z]\.){2,}$/i.test(token)) {
      return true;
    }
    if (/^(?:ph\.?d|b\.?a|m\.?a|m\.?d|d\.?c)\.?$/i.test(token)) {
      return true;
    }
    return false;
  }

  function splitExplicitList(lines) {
    const parts = [];
    lines.forEach((line) => {
      if (BULLET_RE.test(line)) {
        parts.push(line);
      } else if (parts.length) {
        parts[parts.length - 1] = joinSentenceText(parts[parts.length - 1], line);
      } else {
        parts.push(line);
      }
    });
    return parts;
  }

  function splitWithIntl(text, locale) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      try {
        return Array.from(new Intl.Segmenter(locale, { granularity: "sentence" }).segment(text)).map(
          (item) => item.segment.trim(),
        );
      } catch (error) {
        // Use the punctuation fallback below.
      }
    }
    return text.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) || [text];
  }

  function normalizeParts(parts) {
    const output = [];
    parts
      .flatMap((part) => splitLongSentence(cleanInlineText(part)))
      .filter(Boolean)
      .forEach((part) => {
        const previous = output[output.length - 1];
        if (
          previous &&
          !BULLET_RE.test(previous) &&
          !BULLET_RE.test(part) &&
          shouldMergeFragments(previous, part)
        ) {
          output[output.length - 1] = joinSentenceText(previous, part);
        } else {
          output.push(part);
        }
      });
    return output;
  }

  function shouldMergeFragments(previous, current) {
    const previousLength = previous.replace(/\s/g, "").length;
    const currentLength = current.replace(/\s/g, "").length;
    if (TERMINAL_RE.test(previous) && TERMINAL_RE.test(current)) {
      return false;
    }
    if (previousLength < 12 || currentLength < 5) {
      return true;
    }
    if (/^[\p{Ll}]/u.test(current) && !TERMINAL_RE.test(previous)) {
      return true;
    }
    return false;
  }

  function splitLongSentence(sentence) {
    if (!sentence || sentence.length <= MAX_SEGMENT_LENGTH) {
      return sentence ? [sentence] : [];
    }

    const clauses = sentence
      .split(/(?<=[;,，；])\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (clauses.length === 1) {
      return splitByWords(sentence, MAX_SEGMENT_LENGTH);
    }

    const chunks = [];
    let current = "";
    clauses.forEach((clause) => {
      if (current && `${current} ${clause}`.length > MAX_SEGMENT_LENGTH) {
        chunks.push(current);
        current = clause;
      } else {
        current = current ? `${current} ${clause}` : clause;
      }
    });
    if (current) {
      chunks.push(current);
    }
    return chunks.flatMap((chunk) =>
      chunk.length > MAX_SEGMENT_LENGTH ? splitByWords(chunk, MAX_SEGMENT_LENGTH) : [chunk],
    );
  }

  function splitByWords(text, maxLength) {
    const words = text.split(/\s+/);
    const chunks = [];
    let current = "";
    words.forEach((word) => {
      if (current && `${current} ${word}`.length > maxLength) {
        chunks.push(current);
        current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    });
    if (current) {
      chunks.push(current);
    }
    return chunks;
  }

  function normalizePageText(rawText) {
    let text = String(rawText || "")
      .replace(/\r/g, "")
      .replace(/\u00ad/g, "")
      .replace(/ﬁ/g, "fi")
      .replace(/ﬂ/g, "fl")
      .replace(/ﬀ/g, "ff")
      .replace(/ﬃ/g, "ffi")
      .replace(/ﬄ/g, "ffl")
      .replace(/…/g, "...")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n[ \t]+/g, "\n")
      .replace(/[ \t]{2,}/g, " ");

    text = text
      .split("\n")
      .filter((line) => !/^\s*\d{1,4}\s*$/.test(line))
      .filter((line) => !/^\s*[|_·•]+\s*$/.test(line))
      .join("\n");

    const paragraphs = text.split(/\n\s*\n+/);
    return paragraphs
      .map((paragraph) => joinWrappedLines(paragraph.split(/\n+/)))
      .filter(Boolean)
      .join("\n\n");
  }

  function joinWrappedLines(lines) {
    const cleanLines = lines.map(cleanInlineText).filter(Boolean);
    if (!cleanLines.length) {
      return "";
    }

    let output = cleanLines[0];
    for (let index = 1; index < cleanLines.length; index += 1) {
      const current = cleanLines[index];
      if (BULLET_RE.test(current) || BULLET_RE.test(output)) {
        output = `${output}\n${current}`;
        continue;
      }
      if (TERMINAL_RE.test(output) && current.length < 70 && /^[A-Z\d]/.test(current)) {
        output = `${output}\n${current}`;
        continue;
      }
      if (/[A-Za-z]-$/.test(output) && /^[a-z]/.test(current)) {
        output = output.slice(0, -1) + current;
      } else {
        output = joinSentenceText(output, current);
      }
    }
    return output.trim();
  }

  function normalizeDocumentText(text) {
    return String(text || "")
      .replace(/\r/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function repairEnglishPronounOcr(text) {
    return String(text || "").replace(
      /(^|[^\p{L}\p{N}])([1l|¦｜])(?=(?:['’](?:m|ve|ll|d)\b)|(?:\s+([A-Za-z]+(?:['’][A-Za-z]+)?)))/gu,
      (match, boundary, glyph, nextWord, offset, source) => {
        const before = source.slice(0, offset + boundary.length);
        const previousWord = before.match(/([A-Za-z]+)\W*$/)?.[1]?.toLowerCase();
        if (NUMBER_LABELS.has(previousWord)) {
          return match;
        }
        const after = source.slice(offset + match.length);
        if (/^['’](?:m|ve|ll|d)\b/i.test(after)) {
          return `${boundary}I`;
        }
        const follower = nextWord?.toLowerCase();
        if (!FIRST_PERSON_VERBS.has(follower) ||
          (follower === "can" && /^\s+can\s+of\b/i.test(after)) ||
          (follower === "am" && /\b(?:at|around|about|from|until)\W*$/i.test(before))) {
          return match;
        }
        return `${boundary}I`;
      },
    );
  }

  function joinRecognizedItems(items) {
    let output = "";
    items.forEach((item) => {
      const part = cleanInlineText(item.text);
      if (!part) {
        return;
      }
      output = output ? joinSentenceText(output, part) : part;
    });
    return output;
  }

  function joinSentenceText(left, right) {
    if (!left) {
      return right;
    }
    if (!right) {
      return left;
    }
    if (/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]$/u.test(left)) {
      return left + right;
    }
    if (/^[,.;:!?%)}\]]/.test(right)) {
      return left + right;
    }
    if (/[(\[{]$/.test(left)) {
      return left + right;
    }
    return `${left} ${right}`.replace(/\s+/g, " ").trim();
  }

  function prepareListBreaks(text) {
    return text
      .replace(/([.!?])\s+(?=(?:\d{1,3}|[A-Z])[.)]\s+\p{Lu})/gu, "$1\n")
      .replace(/\s+(?=[-*•·▪◦‣]\s+)/g, "\n");
  }

  function cleanInlineText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .trim();
  }

  function nextNonSpace(text, index) {
    for (let cursor = index; cursor < text.length; cursor += 1) {
      if (!/\s/.test(text[cursor])) {
        return text[cursor];
      }
    }
    return "";
  }

  function localeForLanguage(languageCode) {
    const locales = {
      eng: "en",
      chi_sim: "zh-CN",
      jpn: "ja",
      kor: "ko",
      fra: "fr",
      deu: "de",
      spa: "es",
      rus: "ru",
      ara: "ar",
    };
    return locales[languageCode] || "en";
  }

  function normalizeConfidence(value) {
    if (!Number.isFinite(value)) {
      return null;
    }
    return value > 1 ? clamp(value / 100, 0, 1) : clamp(value, 0, 1);
  }

  function weightedConfidence(items) {
    const weighted = items
      .map((item) => ({
        value: normalizeConfidence(item.confidence),
        weight: Math.max(1, String(item.text || "").length),
      }))
      .filter((item) => item.value !== null);
    if (!weighted.length) {
      return null;
    }
    const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
    return weighted.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight;
  }

  function weightedLineConfidence(lines) {
    const weighted = lines
      .map((line) => ({ value: line.confidence, weight: Math.max(1, line.text.length) }))
      .filter((line) => line.value !== null);
    if (!weighted.length) {
      return null;
    }
    const totalWeight = weighted.reduce((sum, line) => sum + line.weight, 0);
    return weighted.reduce((sum, line) => sum + line.value * line.weight, 0) / totalWeight;
  }

  function unionBoxes(boxes) {
    const normalized = boxes.map(normalizeBox).filter(Boolean);
    if (!normalized.length) {
      return null;
    }
    const left = Math.min(...normalized.map((box) => box.x));
    const top = Math.min(...normalized.map((box) => box.y));
    const right = Math.max(...normalized.map((box) => box.x + box.width));
    const bottom = Math.max(...normalized.map((box) => box.y + box.height));
    return { x: left, y: top, width: right - left, height: bottom - top };
  }

  function normalizeBox(box) {
    if (!box) {
      return null;
    }
    if (Number.isFinite(box.x) && Number.isFinite(box.y)) {
      return {
        x: box.x,
        y: box.y,
        width: box.width || 0,
        height: box.height || 0,
      };
    }
    return null;
  }

  function convertTesseractBox(box) {
    if (!box || ![box.x0, box.y0, box.x1, box.y1].every(Number.isFinite)) {
      return null;
    }
    return {
      x: box.x0,
      y: box.y0,
      width: Math.max(0, box.x1 - box.x0),
      height: Math.max(0, box.y1 - box.y0),
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  window.TextPipeline = {
    fromPaddle,
    fromTesseract,
    fromDocumentPages,
    normalizePageText,
    normalizeDocumentText,
    repairEnglishPronounOcr,
    segment,
  };
})();
