import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const sandbox = { window: {}, Intl, console };
vm.runInNewContext(fs.readFileSync(new URL("./text-engine.js", import.meta.url), "utf8"), sandbox);
const pipeline = sandbox.window.TextPipeline;

const box = (x, y, width = 350) => ({ x, y, width, height: 20 });
const leftText = [
  "Seeds can remain dormant for a long time.",
  "They need moisture and warmth before growing.",
  "Warm weather alone is not always enough.",
  "Some seeds wait until rain reaches the soil.",
  "This delay helps the young plants survive.",
  "The seed coat can be hard and protective.",
  "It slowly softens when conditions are right.",
  "A small plant then emerges from the seed.",
];
const rightText = [
  "Plants have many different varieties today.",
  "Scientists study how those varieties grow.",
  "They can breed plants with useful traits.",
  "Some examples grow larger than others do.",
  "A new variety may have stronger roots.",
  "Other varieties can survive colder weather.",
  "Farmers use this knowledge in their fields.",
  "These changes can improve many crops.",
];
const lines = [
  ...leftText.map((text, index) => ({ text, box: box(40, 100 + index * 30) })),
  { text: "Corn", box: box(520, 10, 44) },
  { text: "seed coat", box: box(600, 35, 80) },
  { text: "one cotyledon", box: box(630, 65, 115) },
  { text: "Design for variety", box: box(500, 100, 205) },
  ...rightText.map((text, index) => ({ text, box: box(510, 130 + index * 30) })),
  { text: "hybrid apple", box: box(550, 400, 110) },
  { text: "crab apples", box: box(700, 400, 110) },
];
const ordered = pipeline.fromDocumentPages([{ lines }]);
const text = ordered.text;
assert(text.indexOf(leftText[0]) < text.indexOf(leftText.at(-1)));
assert(text.indexOf(leftText.at(-1)) < text.indexOf("Design for variety"));
assert(text.indexOf("Design for variety") < text.indexOf(rightText[0]));
assert(text.includes(rightText.at(-1)));
for (const label of ["seed coat", "one cotyledon", "hybrid apple", "crab apples"]) {
  assert(!ordered.lines.some((line) => line.text === label), `Figure label leaked into body: ${label}`);
}
assert.equal(pipeline.segment(text, "eng").length, 17);

const paddle = pipeline.fromPaddle({ lines: [[
  { text: "Left column text.", box: box(40, 100) },
  { text: "Right column text.", box: box(510, 100) },
]] });
assert.equal(paddle.lines.length, 2);
assert.equal(paddle.lines[0].box.x, 40);
assert.equal(paddle.lines[1].box.x, 510);

const tesseract = pipeline.fromTesseract({ blocks: [{ paragraphs: [{ lines: [{
  text: "Left Right",
  confidence: 90,
  bbox: { x0: 40, y0: 100, x1: 550, y1: 120 },
  words: [
    { text: "Left", confidence: 90, bbox: { x0: 40, y0: 100, x1: 75, y1: 120 } },
    { text: "Right", confidence: 90, bbox: { x0: 510, y0: 100, x1: 550, y1: 120 } },
  ],
}] }] }] });
assert.equal(tesseract.lines.length, 2);
assert.equal(tesseract.lines[0].text, "Left");
assert.equal(tesseract.lines[1].text, "Right");

assert.equal(
  pipeline.repairEnglishPronounOcr(
    "1 am ready. | have a book. l think it helps. 1've learned. And 1 went home. 1 don't know. 1 study daily.",
  ),
  "I am ready. I have a book. I think it helps. I've learned. And I went home. I don't know. I study daily.",
);
assert.equal(
  pipeline.repairEnglishPronounOcr(
    "Chapter 1 will begin. Page 1 has a picture. I have 1 book and 1 can of beans. At 1 am I left.",
  ),
  "Chapter 1 will begin. Page 1 has a picture. I have 1 book and 1 can of beans. At 1 am I left.",
);
console.log("text layout and figure-label tests passed");
