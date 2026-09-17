import type { Tensor } from "onnxruntime-common";
/** CTC blank token index. */
export declare const BLANK_INDEX = 0;
/** Unknown token marker used in PaddleOCR dictionaries. */
export declare const UNK_TOKEN = "<unk>";
/** Minimum crop width (pixels) fed to the recognition model. */
export declare const MIN_CROP_WIDTH = 8;
/**
 * Inserts spaces into wide gaps between decoded characters, in place.
 *
 * CTC recognition models under-emit spaces; a horizontal gap much wider than
 * the typical glyph pitch is whitespace the model read through (columnar
 * receipts, tab-aligned forms). The injected space's position is the gap's
 * midpoint, keeping `chars` and `positions` index-aligned.
 */
export declare function injectGapSpaces(chars: string[], positions: number[]): void;
/**
 * Cleans up decoded characters in place, keeping `positions` index-aligned:
 *
 * - Collapses runs of spaces to one (the model can emit a space at a wide
 *   gap that {@link injectGapSpaces} also widened, or fire two space
 *   timesteps across a column gap).
 * - Maps fullwidth forms (U+FF01-FF5E, ideographic space) to ASCII when the
 *   text contains no CJK: the multilingual recognizer picks the fullwidth
 *   colon (U+FF1A) or parenthesis (U+FF08) on Latin-only receipts where the
 *   halfwidth form is always the correct reading. Text with any CJK is left
 *   untouched - fullwidth is proper typography there.
 */
export declare function refineDecodedChars(chars: string[], positions: number[]): void;
/**
 * Performs greedy CTC decoding over raw model logits.
 *
 * Hot loop: argmax and character handling are inlined, and per-character
 * confidence is accumulated as a running sum instead of a backing array.
 *
 * `positions` holds, per emitted character, the fraction (0..1) of the input
 * width where its timestep fired; CTC peaks near the glyph's center, so this
 * locates each character in the crop for position-based text splitting.
 * Wide gaps between characters become spaces (see {@link injectGapSpaces}).
 */
/** Text decoded from a recognition tensor, with its per-character offsets. */
export type DecodedText = {
    text: string;
    confidence: number;
    positions: number[];
};
export declare function ctcGreedyDecode(logits: Float32Array, sequenceLength: number, numClasses: number, charDict: string[], spaceRecovery?: boolean): DecodedText;
/**
 * Maps a parsed dictionary onto the model's class indices.
 *
 * `parseDictionary` splits on newlines, so a file's trailing newline leaves an
 * empty entry that stands for no class. The raw length is compared first, which
 * keeps a dictionary that already has one entry per class exactly as it is.
 *
 * Failing that, the trailing empties go, the blank is taken from a leading
 * empty entry or prepended when the dictionary opens on a glyph, and one
 * unnamed space class is added if the result is a single class short. A larger
 * shortfall means the wrong dictionary was passed, which the caller reports.
 *
 * @param charactersDictionary - Entries as {@link parseDictionary} produced them.
 * @param numClasses - Class count from the model's output shape.
 */
export declare function alignDictionaryToClasses(charactersDictionary: string[], numClasses: number): string[];
/**
 * Decodes an ONNX output tensor into text using the supplied character dictionary.
 *
 * The dictionary is aligned to the model's class count by
 * {@link alignDictionaryToClasses}, which makes the blank slot a function of the
 * glyph count rather than of the dictionary file's leading and trailing newlines.
 *
 * When `verbose` is set, a dictionary/model size mismatch is reported once (such a
 * mismatch produces garbage output, so it usually signals the wrong dictionary).
 */
export declare function decodeResults(outputTensor: Tensor, charactersDictionary: string[], numClassesFromShape: number, verbose?: boolean, spaceRecovery?: boolean): DecodedText;
/**
 * Decodes one row of a batched recognition output (`[N, seq, classes]`),
 * applying the same dictionary padding rules as {@link decodeResults}.
 */
export declare function decodeLogitsRow(rowData: Float32Array, sequenceLength: number, numClasses: number, charactersDictionary: string[], spaceRecovery?: boolean): DecodedText;
