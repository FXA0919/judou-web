var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node-stub:fs
var fs_exports = {};
__export(fs_exports, {
  default: () => fs_default,
  promises: () => promises
});
var fs_default, promises;
var init_fs = __esm({
  "node-stub:fs"() {
    fs_default = {};
    promises = {};
  }
});

// ../../outputs/read-along-web/vendor/harper/BinaryModule-BmeyZWwZ.js
var __defProp2 = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _executor;
var _promise;
var Dialect$1 = Object.freeze({
  American: 0,
  "0": "American",
  British: 1,
  "1": "British",
  Australian: 2,
  "2": "Australian",
  Canadian: 3,
  "3": "Canadian",
  Indian: 4,
  "4": "Indian"
});
var Language$1 = Object.freeze({
  Plain: 0,
  "0": "Plain",
  Markdown: 1,
  "1": "Markdown",
  Typst: 2,
  "2": "Typst"
});
var Lint$1 = class Lint {
  static __wrap(ptr) {
    const obj = Object.create(Lint.prototype);
    obj.__wbg_ptr = ptr;
    LintFinalization$1.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  static __unwrap(jsValue) {
    if (!(jsValue instanceof Lint)) {
      return 0;
    }
    return jsValue.__destroy_into_raw();
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    LintFinalization$1.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_lint_free(ptr, 0);
  }
  /**
   * @param {string} json
   * @returns {Lint}
   */
  static from_json(json) {
    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.lint_from_json(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0$1(ret[1]);
    }
    return Lint.__wrap(ret[0]);
  }
  /**
   * Get the content of the source material pointed to by [`Self::span`]
   * @returns {string}
   */
  get_problem_text() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.lint_get_problem_text(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a string representing the general category of the lint.
   * @returns {string}
   */
  lint_kind() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.lint_lint_kind(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a string representing the general category of the lint.
   * @returns {string}
   */
  lint_kind_pretty() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.lint_lint_kind_pretty(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a description of the error.
   * @returns {string}
   */
  message() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.lint_message(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a description of the error as HTML.
   * @returns {string}
   */
  message_html() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.lint_message_html(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get the location of the problematic text.
   * @returns {Span}
   */
  span() {
    const ret = wasm$1.lint_span(this.__wbg_ptr);
    return Span$1.__wrap(ret);
  }
  /**
   * Equivalent to calling `.length` on the result of `suggestions()`.
   * @returns {number}
   */
  suggestion_count() {
    const ret = wasm$1.lint_suggestion_count(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Get an array of any suggestions that may resolve the issue.
   * @returns {Suggestion[]}
   */
  suggestions() {
    const ret = wasm$1.lint_suggestions(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {string}
   */
  to_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.lint_to_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) Lint$1.prototype[Symbol.dispose] = Lint$1.prototype.free;
var Linter$1 = class Linter {
  static __wrap(ptr) {
    const obj = Object.create(Linter.prototype);
    obj.__wbg_ptr = ptr;
    LinterFinalization$1.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    LinterFinalization$1.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_linter_free(ptr, 0);
  }
  /**
   * Apply a suggestion from a given lint.
   * This action will be logged to the Linter's statistics.
   * @param {string} source_text
   * @param {Lint} lint
   * @param {Suggestion} suggestion
   * @returns {string}
   */
  apply_suggestion(source_text, lint, suggestion) {
    let deferred3_0;
    let deferred3_1;
    try {
      const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN$1;
      _assertClass$1(lint, Lint$1);
      _assertClass$1(suggestion, Suggestion$1);
      const ret = wasm$1.linter_apply_suggestion(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr, suggestion.__wbg_ptr);
      var ptr2 = ret[0];
      var len2 = ret[1];
      if (ret[3]) {
        ptr2 = 0;
        len2 = 0;
        throw takeFromExternrefTable0$1(ret[2]);
      }
      deferred3_0 = ptr2;
      deferred3_1 = len2;
      return getStringFromWasm0$1(ptr2, len2);
    } finally {
      wasm$1.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
  }
  clear_ignored_lints() {
    wasm$1.linter_clear_ignored_lints(this.__wbg_ptr);
  }
  /**
   * Clear the user dictionary.
   */
  clear_words() {
    wasm$1.linter_clear_words(this.__wbg_ptr);
  }
  /**
   * Compute the context hash of a given lint.
   * @param {string} source_text
   * @param {Lint} lint
   * @returns {bigint}
   */
  context_hash(source_text, lint) {
    const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    _assertClass$1(lint, Lint$1);
    const ret = wasm$1.linter_context_hash(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * Export the linter's ignored lints as a privacy-respecting JSON list of hashes.
   * @returns {string}
   */
  export_ignored_lints() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.linter_export_ignored_lints(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Export words from the dictionary.
   * Note: this will only return words previously added by [`Self::import_words`].
   * @returns {string[]}
   */
  export_words() {
    const ret = wasm$1.linter_export_words(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {string}
   */
  generate_stats_file() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.linter_generate_stats_file(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get the dialect this struct was constructed for.
   * @returns {Dialect}
   */
  get_dialect() {
    const ret = wasm$1.linter_get_dialect(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {string}
   */
  get_lint_config_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.linter_get_lint_config_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  get_lint_config_as_object() {
    const ret = wasm$1.linter_get_lint_config_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * Get a JSON map containing the descriptions of all the linting rules, formatted as Markdown.
   * @returns {string}
   */
  get_lint_descriptions_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.linter_get_lint_descriptions_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a Record containing the descriptions of all the linting rules, formatted as Markdown.
   * @returns {any}
   */
  get_lint_descriptions_as_object() {
    const ret = wasm$1.linter_get_lint_descriptions_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * Get a JSON map containing the descriptions of all the linting rules, formatted as HTML.
   * @returns {string}
   */
  get_lint_descriptions_html_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a Record containing the descriptions of all the linting rules, formatted as HTML.
   * @returns {any}
   */
  get_lint_descriptions_html_as_object() {
    const ret = wasm$1.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {string}
   */
  get_structured_lint_config_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.linter_get_structured_lint_config_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  get_structured_lint_config_as_object() {
    const ret = wasm$1.linter_get_structured_lint_config_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * Add a specific context hash to the ignored lints list.
   * @param {BigUint64Array} hashes
   */
  ignore_hashes(hashes) {
    const ptr0 = passArray64ToWasm0$1(hashes, wasm$1.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN$1;
    wasm$1.linter_ignore_hashes(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} source_text
   * @param {Lint[]} lints
   */
  ignore_lints(source_text, lints) {
    const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ptr1 = passArrayJsValueToWasm0$1(lints, wasm$1.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN$1;
    wasm$1.linter_ignore_lints(this.__wbg_ptr, ptr0, len0, ptr1, len1);
  }
  /**
   * Import into the linter's ignored lints from a privacy-respecting JSON list of hashes.
   * @param {string} json
   */
  import_ignored_lints(json) {
    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.linter_import_ignored_lints(this.__wbg_ptr, ptr0, len0);
    if (ret[1]) {
      throw takeFromExternrefTable0$1(ret[0]);
    }
  }
  /**
   * @param {string} file
   */
  import_stats_file(file) {
    const ptr0 = passStringToWasm0$1(file, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.linter_import_stats_file(this.__wbg_ptr, ptr0, len0);
    if (ret[1]) {
      throw takeFromExternrefTable0$1(ret[0]);
    }
  }
  /**
   * Load a Weirpack from raw bytes, merging its rules into the current linter.
   * Returns test failures if any are found, and does not import in that case.
   * @param {Uint8Array} bytes
   * @returns {any}
   */
  import_weirpack(bytes) {
    const ptr0 = passArray8ToWasm0$1(bytes, wasm$1.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.linter_import_weirpack(this.__wbg_ptr, ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0$1(ret[1]);
    }
    return takeFromExternrefTable0$1(ret[0]);
  }
  /**
   * Import words into the dictionary.
   * @param {string[]} additional_words
   */
  import_words(additional_words) {
    const ptr0 = passArrayJsValueToWasm0$1(additional_words, wasm$1.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN$1;
    wasm$1.linter_import_words(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * Helper method to quickly check if a plain string is likely intended to be English
   * @param {string} text
   * @returns {boolean}
   */
  is_likely_english(text) {
    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.linter_is_likely_english(this.__wbg_ptr, ptr0, len0);
    return ret !== 0;
  }
  /**
   * Helper method to remove non-English text from a plain English document.
   * @param {string} text
   * @returns {string}
   */
  isolate_english(text) {
    let deferred2_0;
    let deferred2_1;
    try {
      const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN$1;
      const ret = wasm$1.linter_isolate_english(this.__wbg_ptr, ptr0, len0);
      deferred2_0 = ret[0];
      deferred2_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * Perform the configured linting on the provided text.
   *
   * If the provided regex mask cannot be parsed, this method will return an empty array.
   * @param {string} text
   * @param {Language} language
   * @param {boolean} all_headings
   * @param {string | null | undefined} regex_mask
   * @param {boolean} dedup
   * @param {boolean} isolate_english
   * @returns {Lint[]}
   */
  lint(text, language, all_headings, regex_mask, dedup, isolate_english) {
    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    var ptr1 = isLikeNone$1(regex_mask) ? 0 : passStringToWasm0$1(regex_mask, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.linter_lint(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
    var v3 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v3;
  }
  /**
   * Construct a new `Linter`.
   * Note that this can mean constructing the curated dictionary, which is the most expensive operation
   * in Harper.
   * @param {Dialect} dialect
   * @returns {Linter}
   */
  static new(dialect) {
    const ret = wasm$1.linter_new(dialect);
    return Linter.__wrap(ret);
  }
  /**
   * @param {string} text
   * @param {Language} language
   * @param {boolean} all_headings
   * @param {string | null | undefined} regex_mask
   * @param {boolean} dedup
   * @param {boolean} isolate_english
   * @returns {OrganizedGroup[]}
   */
  organized_lints(text, language, all_headings, regex_mask, dedup, isolate_english) {
    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    var ptr1 = isLikeNone$1(regex_mask) ? 0 : passStringToWasm0$1(regex_mask, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.linter_organized_lints(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
    var v3 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v3;
  }
  /**
   * @param {string} json
   */
  set_lint_config_from_json(json) {
    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.linter_set_lint_config_from_json(this.__wbg_ptr, ptr0, len0);
    if (ret[1]) {
      throw takeFromExternrefTable0$1(ret[0]);
    }
  }
  /**
   * @param {any} object
   */
  set_lint_config_from_object(object) {
    const ret = wasm$1.linter_set_lint_config_from_object(this.__wbg_ptr, object);
    if (ret[1]) {
      throw takeFromExternrefTable0$1(ret[0]);
    }
  }
  /**
   * @param {bigint | null} [start_time]
   * @param {bigint | null} [end_time]
   * @returns {any}
   */
  summarize_stats(start_time, end_time) {
    const ret = wasm$1.linter_summarize_stats(this.__wbg_ptr, !isLikeNone$1(start_time), isLikeNone$1(start_time) ? BigInt(0) : start_time, !isLikeNone$1(end_time), isLikeNone$1(end_time) ? BigInt(0) : end_time);
    return ret;
  }
};
if (Symbol.dispose) Linter$1.prototype[Symbol.dispose] = Linter$1.prototype.free;
var OrganizedGroup$1 = class OrganizedGroup {
  static __wrap(ptr) {
    const obj = Object.create(OrganizedGroup.prototype);
    obj.__wbg_ptr = ptr;
    OrganizedGroupFinalization$1.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    OrganizedGroupFinalization$1.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_organizedgroup_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get group() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.__wbg_get_organizedgroup_group(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {Lint[]}
   */
  get lints() {
    const ret = wasm$1.__wbg_get_organizedgroup_lints(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @param {string} arg0
   */
  set group(arg0) {
    const ptr0 = passStringToWasm0$1(arg0, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    wasm$1.__wbg_set_organizedgroup_group(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Lint[]} arg0
   */
  set lints(arg0) {
    const ptr0 = passArrayJsValueToWasm0$1(arg0, wasm$1.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN$1;
    wasm$1.__wbg_set_organizedgroup_lints(this.__wbg_ptr, ptr0, len0);
  }
};
if (Symbol.dispose) OrganizedGroup$1.prototype[Symbol.dispose] = OrganizedGroup$1.prototype.free;
var Span$1 = class Span {
  static __wrap(ptr) {
    const obj = Object.create(Span.prototype);
    obj.__wbg_ptr = ptr;
    SpanFinalization$1.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SpanFinalization$1.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_span_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get end() {
    const ret = wasm$1.__wbg_get_span_end(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  get start() {
    const ret = wasm$1.__wbg_get_span_start(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set end(arg0) {
    wasm$1.__wbg_set_span_end(this.__wbg_ptr, arg0);
  }
  /**
   * @param {number} arg0
   */
  set start(arg0) {
    wasm$1.__wbg_set_span_start(this.__wbg_ptr, arg0);
  }
  /**
   * @param {string} json
   * @returns {Span}
   */
  static from_json(json) {
    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.span_from_json(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0$1(ret[1]);
    }
    return Span.__wrap(ret[0]);
  }
  /**
   * @returns {boolean}
   */
  is_empty() {
    const ret = wasm$1.span_is_empty(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {number}
   */
  len() {
    const ret = wasm$1.span_len(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} start
   * @param {number} end
   * @returns {Span}
   */
  static new(start, end) {
    const ret = wasm$1.span_new(start, end);
    return Span.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  to_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.span_to_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) Span$1.prototype[Symbol.dispose] = Span$1.prototype.free;
var Suggestion$1 = class Suggestion {
  static __wrap(ptr) {
    const obj = Object.create(Suggestion.prototype);
    obj.__wbg_ptr = ptr;
    SuggestionFinalization$1.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SuggestionFinalization$1.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_suggestion_free(ptr, 0);
  }
  /**
   * @param {string} json
   * @returns {Suggestion}
   */
  static from_json(json) {
    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.suggestion_from_json(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0$1(ret[1]);
    }
    return Suggestion.__wrap(ret[0]);
  }
  /**
   * Get the text that is going to replace the problematic section.
   * If [`Self::kind`] is `SuggestionKind::Remove`, this will return an empty
   * string.
   * @returns {string}
   */
  get_replacement_text() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.suggestion_get_replacement_text(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {SuggestionKind}
   */
  kind() {
    const ret = wasm$1.suggestion_kind(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {string}
   */
  to_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm$1.suggestion_to_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0$1(ret[0], ret[1]);
    } finally {
      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) Suggestion$1.prototype[Symbol.dispose] = Suggestion$1.prototype.free;
var SuggestionKind$1 = Object.freeze({
  /**
   * Replace the problematic text.
   */
  Replace: 0,
  "0": "Replace",
  /**
   * Remove the problematic text.
   */
  Remove: 1,
  "1": "Remove",
  /**
   * Insert additional text after the error.
   */
  InsertAfter: 2,
  "2": "InsertAfter"
});
function get_default_lint_config$1() {
  const ret = wasm$1.get_default_lint_config();
  return ret;
}
function get_default_lint_config_as_json$1() {
  let deferred1_0;
  let deferred1_1;
  try {
    const ret = wasm$1.get_default_lint_config_as_json();
    deferred1_0 = ret[0];
    deferred1_1 = ret[1];
    return getStringFromWasm0$1(ret[0], ret[1]);
  } finally {
    wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
  }
}
function setup$1() {
  wasm$1.setup();
}
function to_title_case$1(text) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN$1;
    const ret = wasm$1.to_title_case(ptr0, len0);
    deferred2_0 = ret[0];
    deferred2_1 = ret[1];
    return getStringFromWasm0$1(ret[0], ret[1]);
  } finally {
    wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function __wbg_get_imports$1() {
  const import0 = {
    __proto__: null,
    __wbg_Error_408e67f47ca7b58b: function(arg0, arg1) {
      const ret = Error(getStringFromWasm0$1(arg0, arg1));
      return ret;
    },
    __wbg_String_8564e559799eccda: function(arg0, arg1) {
      const ret = String(arg1);
      const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN$1;
      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_boolean_get_c9c83ebd41b34df3: function(arg0) {
      const v = arg0;
      const ret = typeof v === "boolean" ? v : void 0;
      return isLikeNone$1(ret) ? 16777215 : ret ? 1 : 0;
    },
    __wbg___wbindgen_debug_string_a57024b9c6e4a48b: function(arg0, arg1) {
      const ret = debugString$1(arg1);
      const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN$1;
      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_is_function_5e4570eb24ffa122: function(arg0) {
      const ret = typeof arg0 === "function";
      return ret;
    },
    __wbg___wbindgen_is_object_a2790eb24c211ea0: function(arg0) {
      const val = arg0;
      const ret = typeof val === "object" && val !== null;
      return ret;
    },
    __wbg___wbindgen_is_string_e6f02f0ea5f20a32: function(arg0) {
      const ret = typeof arg0 === "string";
      return ret;
    },
    __wbg___wbindgen_jsval_loose_eq_acf2776254a8d832: function(arg0, arg1) {
      const ret = arg0 == arg1;
      return ret;
    },
    __wbg___wbindgen_number_get_136b9679cab35cfb: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "number" ? obj : void 0;
      getDataViewMemory0$1().setFloat64(arg0 + 8 * 1, isLikeNone$1(ret) ? 0 : ret, true);
      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, !isLikeNone$1(ret), true);
    },
    __wbg___wbindgen_string_get_d154f1e671052120: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone$1(ret) ? 0 : passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN$1;
      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {
      throw new Error(getStringFromWasm0$1(arg0, arg1));
    },
    __wbg_call_1c5886ab9c57d1c7: function() {
      return handleError$1(function(arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
      }, arguments);
    },
    __wbg_done_669171204c3dcae2: function(arg0) {
      const ret = arg0.done;
      return ret;
    },
    __wbg_entries_7774d489e1da5f4f: function(arg0) {
      const ret = Object.entries(arg0);
      return ret;
    },
    __wbg_error_757e9472f8410341: function(arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0$1(arg0, arg1));
      } finally {
        wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_getRandomValues_a608c4436c19407a: function() {
      return handleError$1(function(arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));
      }, arguments);
    },
    __wbg_getRandomValues_e446ea5ffdd14ee5: function() {
      return handleError$1(function(arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));
      }, arguments);
    },
    __wbg_getTime_63fb0332e6c4ec17: function(arg0) {
      const ret = arg0.getTime();
      return ret;
    },
    __wbg_get_c0c8f8d7da0c03dd: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_get_d173c0308df22d37: function() {
      return handleError$1(function(arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_get_unchecked_e20b893aeafc3fca: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_instanceof_ArrayBuffer_993d02d2d254cad1: function(arg0) {
      let result;
      try {
        result = arg0 instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Uint8Array_f935dbb0aa7cdeed: function(arg0) {
      let result;
      try {
        result = arg0 instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_iterator_5cebbb86e33c6dd6: function() {
      const ret = Symbol.iterator;
      return ret;
    },
    __wbg_length_36bd29c6848c2144: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_length_ecfa2c63d3d0d82c: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_lint_new: function(arg0) {
      const ret = Lint$1.__wrap(arg0);
      return ret;
    },
    __wbg_lint_unwrap: function(arg0) {
      const ret = Lint$1.__unwrap(arg0);
      return ret;
    },
    __wbg_log_1f8cbb01c83d06c2: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0$1(arg0, arg1), getStringFromWasm0$1(arg2, arg3), getStringFromWasm0$1(arg4, arg5), getStringFromWasm0$1(arg6, arg7));
      } finally {
        wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_log_a54ca6b45e09078a: function(arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0$1(arg0, arg1));
      } finally {
        wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_mark_6b7f03786f5e4d61: function(arg0, arg1) {
      performance.mark(getStringFromWasm0$1(arg0, arg1));
    },
    __wbg_measure_0e21b33a1c6e3a29: function() {
      return handleError$1(function(arg0, arg1, arg2, arg3) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
          deferred0_0 = arg0;
          deferred0_1 = arg1;
          deferred1_0 = arg2;
          deferred1_1 = arg3;
          performance.measure(getStringFromWasm0$1(arg0, arg1), getStringFromWasm0$1(arg2, arg3));
        } finally {
          wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
          wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
      }, arguments);
    },
    __wbg_new_0_f117d868b403dc07: function() {
      const ret = /* @__PURE__ */ new Date();
      return ret;
    },
    __wbg_new_116be93542d39019: function() {
      const ret = new Array();
      return ret;
    },
    __wbg_new_227d7c05414eb861: function() {
      const ret = new Error();
      return ret;
    },
    __wbg_new_77cc4f4f472aeb81: function(arg0) {
      const ret = new Uint8Array(arg0);
      return ret;
    },
    __wbg_new_cdf041679ded4c5f: function() {
      const ret = /* @__PURE__ */ new Map();
      return ret;
    },
    __wbg_new_ebe3e0f6837f0879: function() {
      const ret = new Object();
      return ret;
    },
    __wbg_next_42cf16ee0dafc9e2: function() {
      return handleError$1(function(arg0) {
        const ret = arg0.next();
        return ret;
      }, arguments);
    },
    __wbg_next_8f26b64fa5e9f64b: function(arg0) {
      const ret = arg0.next;
      return ret;
    },
    __wbg_organizedgroup_new: function(arg0) {
      const ret = OrganizedGroup$1.__wrap(arg0);
      return ret;
    },
    __wbg_prototypesetcall_de8e0d9553586985: function(arg0, arg1, arg2) {
      Uint8Array.prototype.set.call(getArrayU8FromWasm0$1(arg0, arg1), arg2);
    },
    __wbg_set_014226dfeca53178: function(arg0, arg1, arg2) {
      const ret = arg0.set(arg1, arg2);
      return ret;
    },
    __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
      arg0[arg1] = arg2;
    },
    __wbg_set_a80955eb93b145c6: function(arg0, arg1, arg2) {
      arg0[arg1 >>> 0] = arg2;
    },
    __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
      const ret = arg1.stack;
      const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN$1;
      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg_suggestion_new: function(arg0) {
      const ret = Suggestion$1.__wrap(arg0);
      return ret;
    },
    __wbg_value_1e2369fab29b420e: function(arg0) {
      const ret = arg0.value;
      return ret;
    },
    __wbindgen_cast_0000000000000001: function(arg0) {
      const ret = arg0;
      return ret;
    },
    __wbindgen_cast_0000000000000002: function(arg0, arg1) {
      const ret = getStringFromWasm0$1(arg0, arg1);
      return ret;
    },
    __wbindgen_init_externref_table: function() {
      const table = wasm$1.__wbindgen_externrefs;
      const offset = table.grow(4);
      table.set(0, void 0);
      table.set(offset + 0, void 0);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    }
  };
  return {
    __proto__: null,
    "./harper_wasm_slim_bg.js": import0
  };
}
var LintFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_lint_free(ptr, 1));
var LinterFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_linter_free(ptr, 1));
var OrganizedGroupFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_organizedgroup_free(ptr, 1));
var SpanFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_span_free(ptr, 1));
var SuggestionFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_suggestion_free(ptr, 1));
function addToExternrefTable0$1(obj) {
  const idx = wasm$1.__externref_table_alloc();
  wasm$1.__wbindgen_externrefs.set(idx, obj);
  return idx;
}
function _assertClass$1(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function debugString$1(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString$1(val[0]);
    }
    for (let i2 = 1; i2 < length; i2++) {
      debug += ", " + debugString$1(val[i2]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function getArrayJsValueFromWasm0$1(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0$1();
  const result = [];
  for (let i2 = ptr; i2 < ptr + 4 * len; i2 += 4) {
    result.push(wasm$1.__wbindgen_externrefs.get(mem.getUint32(i2, true)));
  }
  wasm$1.__externref_drop_slice(ptr, len);
  return result;
}
function getArrayU8FromWasm0$1(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0$1().subarray(ptr / 1, ptr / 1 + len);
}
var cachedBigUint64ArrayMemory0$1 = null;
function getBigUint64ArrayMemory0$1() {
  if (cachedBigUint64ArrayMemory0$1 === null || cachedBigUint64ArrayMemory0$1.byteLength === 0) {
    cachedBigUint64ArrayMemory0$1 = new BigUint64Array(wasm$1.memory.buffer);
  }
  return cachedBigUint64ArrayMemory0$1;
}
var cachedDataViewMemory0$1 = null;
function getDataViewMemory0$1() {
  if (cachedDataViewMemory0$1 === null || cachedDataViewMemory0$1.buffer.detached === true || cachedDataViewMemory0$1.buffer.detached === void 0 && cachedDataViewMemory0$1.buffer !== wasm$1.memory.buffer) {
    cachedDataViewMemory0$1 = new DataView(wasm$1.memory.buffer);
  }
  return cachedDataViewMemory0$1;
}
function getStringFromWasm0$1(ptr, len) {
  return decodeText$1(ptr >>> 0, len);
}
var cachedUint8ArrayMemory0$1 = null;
function getUint8ArrayMemory0$1() {
  if (cachedUint8ArrayMemory0$1 === null || cachedUint8ArrayMemory0$1.byteLength === 0) {
    cachedUint8ArrayMemory0$1 = new Uint8Array(wasm$1.memory.buffer);
  }
  return cachedUint8ArrayMemory0$1;
}
function handleError$1(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0$1(e);
    wasm$1.__wbindgen_exn_store(idx);
  }
}
function isLikeNone$1(x2) {
  return x2 === void 0 || x2 === null;
}
function passArray64ToWasm0$1(arg, malloc) {
  const ptr = malloc(arg.length * 8, 8) >>> 0;
  getBigUint64ArrayMemory0$1().set(arg, ptr / 8);
  WASM_VECTOR_LEN$1 = arg.length;
  return ptr;
}
function passArray8ToWasm0$1(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0$1().set(arg, ptr / 1);
  WASM_VECTOR_LEN$1 = arg.length;
  return ptr;
}
function passArrayJsValueToWasm0$1(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  for (let i2 = 0; i2 < array.length; i2++) {
    const add = addToExternrefTable0$1(array[i2]);
    getDataViewMemory0$1().setUint32(ptr + 4 * i2, add, true);
  }
  WASM_VECTOR_LEN$1 = array.length;
  return ptr;
}
function passStringToWasm0$1(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder$1.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0$1().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN$1 = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0$1();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0$1().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder$1.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN$1 = offset;
  return ptr;
}
function takeFromExternrefTable0$1(idx) {
  const value = wasm$1.__wbindgen_externrefs.get(idx);
  wasm$1.__externref_table_dealloc(idx);
  return value;
}
var cachedTextDecoder$1 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder$1.decode();
var MAX_SAFARI_DECODE_BYTES$1 = 2146435072;
var numBytesDecoded$1 = 0;
function decodeText$1(ptr, len) {
  numBytesDecoded$1 += len;
  if (numBytesDecoded$1 >= MAX_SAFARI_DECODE_BYTES$1) {
    cachedTextDecoder$1 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder$1.decode();
    numBytesDecoded$1 = len;
  }
  return cachedTextDecoder$1.decode(getUint8ArrayMemory0$1().subarray(ptr, ptr + len));
}
var cachedTextEncoder$1 = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder$1)) {
  cachedTextEncoder$1.encodeInto = function(arg, view) {
    const buf = cachedTextEncoder$1.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
var WASM_VECTOR_LEN$1 = 0;
var wasm$1;
function __wbg_finalize_init$1(instance, module) {
  wasm$1 = instance.exports;
  cachedBigUint64ArrayMemory0$1 = null;
  cachedDataViewMemory0$1 = null;
  cachedUint8ArrayMemory0$1 = null;
  wasm$1.__wbindgen_start();
  return wasm$1;
}
async function __wbg_load$1(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (!module.ok) {
      throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
    }
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        const validResponse = expectedResponseType(module.type);
        if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
  function expectedResponseType(type) {
    switch (type) {
      case "basic":
      case "cors":
      case "default":
        return true;
    }
    return false;
  }
}
function initSync$1(module) {
  if (wasm$1 !== void 0) return wasm$1;
  if (module !== void 0) {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module } = module);
    } else {
      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports$1();
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init$1(instance);
}
async function __wbg_init$1(module_or_path) {
  if (wasm$1 !== void 0) return wasm$1;
  if (module_or_path !== void 0) {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (module_or_path === void 0) {
    module_or_path = new URL();
  }
  const imports = __wbg_get_imports$1();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  const { instance } = await __wbg_load$1(await module_or_path, imports);
  return __wbg_finalize_init$1(instance);
}
var defaultGlue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Dialect: Dialect$1,
  Language: Language$1,
  Lint: Lint$1,
  Linter: Linter$1,
  OrganizedGroup: OrganizedGroup$1,
  Span: Span$1,
  Suggestion: Suggestion$1,
  SuggestionKind: SuggestionKind$1,
  default: __wbg_init$1,
  get_default_lint_config: get_default_lint_config$1,
  get_default_lint_config_as_json: get_default_lint_config_as_json$1,
  initSync: initSync$1,
  setup: setup$1,
  to_title_case: to_title_case$1
}, Symbol.toStringTag, { value: "Module" }));
var Dialect = Object.freeze({
  American: 0,
  "0": "American",
  British: 1,
  "1": "British",
  Australian: 2,
  "2": "Australian",
  Canadian: 3,
  "3": "Canadian",
  Indian: 4,
  "4": "Indian"
});
var Language = Object.freeze({
  Plain: 0,
  "0": "Plain",
  Markdown: 1,
  "1": "Markdown",
  Typst: 2,
  "2": "Typst"
});
var Lint2 = class _Lint2 {
  static __wrap(ptr) {
    const obj = Object.create(_Lint2.prototype);
    obj.__wbg_ptr = ptr;
    LintFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  static __unwrap(jsValue) {
    if (!(jsValue instanceof _Lint2)) {
      return 0;
    }
    return jsValue.__destroy_into_raw();
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    LintFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_lint_free(ptr, 0);
  }
  /**
   * @param {string} json
   * @returns {Lint}
   */
  static from_json(json) {
    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.lint_from_json(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _Lint2.__wrap(ret[0]);
  }
  /**
   * Get the content of the source material pointed to by [`Self::span`]
   * @returns {string}
   */
  get_problem_text() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.lint_get_problem_text(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a string representing the general category of the lint.
   * @returns {string}
   */
  lint_kind() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.lint_lint_kind(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a string representing the general category of the lint.
   * @returns {string}
   */
  lint_kind_pretty() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.lint_lint_kind_pretty(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a description of the error.
   * @returns {string}
   */
  message() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.lint_message(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a description of the error as HTML.
   * @returns {string}
   */
  message_html() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.lint_message_html(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get the location of the problematic text.
   * @returns {Span}
   */
  span() {
    const ret = wasm.lint_span(this.__wbg_ptr);
    return Span2.__wrap(ret);
  }
  /**
   * Equivalent to calling `.length` on the result of `suggestions()`.
   * @returns {number}
   */
  suggestion_count() {
    const ret = wasm.lint_suggestion_count(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Get an array of any suggestions that may resolve the issue.
   * @returns {Suggestion[]}
   */
  suggestions() {
    const ret = wasm.lint_suggestions(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {string}
   */
  to_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.lint_to_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) Lint2.prototype[Symbol.dispose] = Lint2.prototype.free;
var Linter2 = class _Linter2 {
  static __wrap(ptr) {
    const obj = Object.create(_Linter2.prototype);
    obj.__wbg_ptr = ptr;
    LinterFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    LinterFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_linter_free(ptr, 0);
  }
  /**
   * Apply a suggestion from a given lint.
   * This action will be logged to the Linter's statistics.
   * @param {string} source_text
   * @param {Lint} lint
   * @param {Suggestion} suggestion
   * @returns {string}
   */
  apply_suggestion(source_text, lint, suggestion) {
    let deferred3_0;
    let deferred3_1;
    try {
      const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN;
      _assertClass(lint, Lint2);
      _assertClass(suggestion, Suggestion2);
      const ret = wasm.linter_apply_suggestion(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr, suggestion.__wbg_ptr);
      var ptr2 = ret[0];
      var len2 = ret[1];
      if (ret[3]) {
        ptr2 = 0;
        len2 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred3_0 = ptr2;
      deferred3_1 = len2;
      return getStringFromWasm0(ptr2, len2);
    } finally {
      wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
  }
  clear_ignored_lints() {
    wasm.linter_clear_ignored_lints(this.__wbg_ptr);
  }
  /**
   * Clear the user dictionary.
   */
  clear_words() {
    wasm.linter_clear_words(this.__wbg_ptr);
  }
  /**
   * Compute the context hash of a given lint.
   * @param {string} source_text
   * @param {Lint} lint
   * @returns {bigint}
   */
  context_hash(source_text, lint) {
    const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    _assertClass(lint, Lint2);
    const ret = wasm.linter_context_hash(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * Export the linter's ignored lints as a privacy-respecting JSON list of hashes.
   * @returns {string}
   */
  export_ignored_lints() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.linter_export_ignored_lints(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Export words from the dictionary.
   * Note: this will only return words previously added by [`Self::import_words`].
   * @returns {string[]}
   */
  export_words() {
    const ret = wasm.linter_export_words(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {string}
   */
  generate_stats_file() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.linter_generate_stats_file(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get the dialect this struct was constructed for.
   * @returns {Dialect}
   */
  get_dialect() {
    const ret = wasm.linter_get_dialect(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {string}
   */
  get_lint_config_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.linter_get_lint_config_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  get_lint_config_as_object() {
    const ret = wasm.linter_get_lint_config_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * Get a JSON map containing the descriptions of all the linting rules, formatted as Markdown.
   * @returns {string}
   */
  get_lint_descriptions_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.linter_get_lint_descriptions_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a Record containing the descriptions of all the linting rules, formatted as Markdown.
   * @returns {any}
   */
  get_lint_descriptions_as_object() {
    const ret = wasm.linter_get_lint_descriptions_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * Get a JSON map containing the descriptions of all the linting rules, formatted as HTML.
   * @returns {string}
   */
  get_lint_descriptions_html_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Get a Record containing the descriptions of all the linting rules, formatted as HTML.
   * @returns {any}
   */
  get_lint_descriptions_html_as_object() {
    const ret = wasm.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {string}
   */
  get_structured_lint_config_as_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.linter_get_structured_lint_config_as_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  get_structured_lint_config_as_object() {
    const ret = wasm.linter_get_structured_lint_config_as_object(this.__wbg_ptr);
    return ret;
  }
  /**
   * Add a specific context hash to the ignored lints list.
   * @param {BigUint64Array} hashes
   */
  ignore_hashes(hashes) {
    const ptr0 = passArray64ToWasm0(hashes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.linter_ignore_hashes(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} source_text
   * @param {Lint[]} lints
   */
  ignore_lints(source_text, lints) {
    const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayJsValueToWasm0(lints, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    wasm.linter_ignore_lints(this.__wbg_ptr, ptr0, len0, ptr1, len1);
  }
  /**
   * Import into the linter's ignored lints from a privacy-respecting JSON list of hashes.
   * @param {string} json
   */
  import_ignored_lints(json) {
    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.linter_import_ignored_lints(this.__wbg_ptr, ptr0, len0);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {string} file
   */
  import_stats_file(file) {
    const ptr0 = passStringToWasm0(file, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.linter_import_stats_file(this.__wbg_ptr, ptr0, len0);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * Load a Weirpack from raw bytes, merging its rules into the current linter.
   * Returns test failures if any are found, and does not import in that case.
   * @param {Uint8Array} bytes
   * @returns {any}
   */
  import_weirpack(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.linter_import_weirpack(this.__wbg_ptr, ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * Import words into the dictionary.
   * @param {string[]} additional_words
   */
  import_words(additional_words) {
    const ptr0 = passArrayJsValueToWasm0(additional_words, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.linter_import_words(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * Helper method to quickly check if a plain string is likely intended to be English
   * @param {string} text
   * @returns {boolean}
   */
  is_likely_english(text) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.linter_is_likely_english(this.__wbg_ptr, ptr0, len0);
    return ret !== 0;
  }
  /**
   * Helper method to remove non-English text from a plain English document.
   * @param {string} text
   * @returns {string}
   */
  isolate_english(text) {
    let deferred2_0;
    let deferred2_1;
    try {
      const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN;
      const ret = wasm.linter_isolate_english(this.__wbg_ptr, ptr0, len0);
      deferred2_0 = ret[0];
      deferred2_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * Perform the configured linting on the provided text.
   *
   * If the provided regex mask cannot be parsed, this method will return an empty array.
   * @param {string} text
   * @param {Language} language
   * @param {boolean} all_headings
   * @param {string | null | undefined} regex_mask
   * @param {boolean} dedup
   * @param {boolean} isolate_english
   * @returns {Lint[]}
   */
  lint(text, language, all_headings, regex_mask, dedup, isolate_english) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(regex_mask) ? 0 : passStringToWasm0(regex_mask, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.linter_lint(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
    var v3 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v3;
  }
  /**
   * Construct a new `Linter`.
   * Note that this can mean constructing the curated dictionary, which is the most expensive operation
   * in Harper.
   * @param {Dialect} dialect
   * @returns {Linter}
   */
  static new(dialect) {
    const ret = wasm.linter_new(dialect);
    return _Linter2.__wrap(ret);
  }
  /**
   * @param {string} text
   * @param {Language} language
   * @param {boolean} all_headings
   * @param {string | null | undefined} regex_mask
   * @param {boolean} dedup
   * @param {boolean} isolate_english
   * @returns {OrganizedGroup[]}
   */
  organized_lints(text, language, all_headings, regex_mask, dedup, isolate_english) {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(regex_mask) ? 0 : passStringToWasm0(regex_mask, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.linter_organized_lints(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
    var v3 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v3;
  }
  /**
   * @param {string} json
   */
  set_lint_config_from_json(json) {
    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.linter_set_lint_config_from_json(this.__wbg_ptr, ptr0, len0);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {any} object
   */
  set_lint_config_from_object(object) {
    const ret = wasm.linter_set_lint_config_from_object(this.__wbg_ptr, object);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {bigint | null} [start_time]
   * @param {bigint | null} [end_time]
   * @returns {any}
   */
  summarize_stats(start_time, end_time) {
    const ret = wasm.linter_summarize_stats(this.__wbg_ptr, !isLikeNone(start_time), isLikeNone(start_time) ? BigInt(0) : start_time, !isLikeNone(end_time), isLikeNone(end_time) ? BigInt(0) : end_time);
    return ret;
  }
};
if (Symbol.dispose) Linter2.prototype[Symbol.dispose] = Linter2.prototype.free;
var OrganizedGroup2 = class _OrganizedGroup2 {
  static __wrap(ptr) {
    const obj = Object.create(_OrganizedGroup2.prototype);
    obj.__wbg_ptr = ptr;
    OrganizedGroupFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    OrganizedGroupFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_organizedgroup_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get group() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.__wbg_get_organizedgroup_group(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {Lint[]}
   */
  get lints() {
    const ret = wasm.__wbg_get_organizedgroup_lints(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @param {string} arg0
   */
  set group(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_organizedgroup_group(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Lint[]} arg0
   */
  set lints(arg0) {
    const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_organizedgroup_lints(this.__wbg_ptr, ptr0, len0);
  }
};
if (Symbol.dispose) OrganizedGroup2.prototype[Symbol.dispose] = OrganizedGroup2.prototype.free;
var Span2 = class _Span2 {
  static __wrap(ptr) {
    const obj = Object.create(_Span2.prototype);
    obj.__wbg_ptr = ptr;
    SpanFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SpanFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_span_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get end() {
    const ret = wasm.__wbg_get_span_end(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  get start() {
    const ret = wasm.__wbg_get_span_start(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set end(arg0) {
    wasm.__wbg_set_span_end(this.__wbg_ptr, arg0);
  }
  /**
   * @param {number} arg0
   */
  set start(arg0) {
    wasm.__wbg_set_span_start(this.__wbg_ptr, arg0);
  }
  /**
   * @param {string} json
   * @returns {Span}
   */
  static from_json(json) {
    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.span_from_json(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _Span2.__wrap(ret[0]);
  }
  /**
   * @returns {boolean}
   */
  is_empty() {
    const ret = wasm.span_is_empty(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {number}
   */
  len() {
    const ret = wasm.span_len(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} start
   * @param {number} end
   * @returns {Span}
   */
  static new(start, end) {
    const ret = wasm.span_new(start, end);
    return _Span2.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  to_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.span_to_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) Span2.prototype[Symbol.dispose] = Span2.prototype.free;
var Suggestion2 = class _Suggestion2 {
  static __wrap(ptr) {
    const obj = Object.create(_Suggestion2.prototype);
    obj.__wbg_ptr = ptr;
    SuggestionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SuggestionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_suggestion_free(ptr, 0);
  }
  /**
   * @param {string} json
   * @returns {Suggestion}
   */
  static from_json(json) {
    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.suggestion_from_json(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _Suggestion2.__wrap(ret[0]);
  }
  /**
   * Get the text that is going to replace the problematic section.
   * If [`Self::kind`] is `SuggestionKind::Remove`, this will return an empty
   * string.
   * @returns {string}
   */
  get_replacement_text() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.suggestion_get_replacement_text(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {SuggestionKind}
   */
  kind() {
    const ret = wasm.suggestion_kind(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {string}
   */
  to_json() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.suggestion_to_json(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) Suggestion2.prototype[Symbol.dispose] = Suggestion2.prototype.free;
var SuggestionKind = Object.freeze({
  /**
   * Replace the problematic text.
   */
  Replace: 0,
  "0": "Replace",
  /**
   * Remove the problematic text.
   */
  Remove: 1,
  "1": "Remove",
  /**
   * Insert additional text after the error.
   */
  InsertAfter: 2,
  "2": "InsertAfter"
});
function get_default_lint_config() {
  const ret = wasm.get_default_lint_config();
  return ret;
}
function get_default_lint_config_as_json() {
  let deferred1_0;
  let deferred1_1;
  try {
    const ret = wasm.get_default_lint_config_as_json();
    deferred1_0 = ret[0];
    deferred1_1 = ret[1];
    return getStringFromWasm0(ret[0], ret[1]);
  } finally {
    wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
  }
}
function setup() {
  wasm.setup();
}
function to_title_case(text) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.to_title_case(ptr0, len0);
    deferred2_0 = ret[0];
    deferred2_1 = ret[1];
    return getStringFromWasm0(ret[0], ret[1]);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function __wbg_get_imports() {
  const import0 = {
    __proto__: null,
    __wbg_Error_408e67f47ca7b58b: function(arg0, arg1) {
      const ret = Error(getStringFromWasm0(arg0, arg1));
      return ret;
    },
    __wbg_String_8564e559799eccda: function(arg0, arg1) {
      const ret = String(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_boolean_get_c9c83ebd41b34df3: function(arg0) {
      const v = arg0;
      const ret = typeof v === "boolean" ? v : void 0;
      return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
    },
    __wbg___wbindgen_debug_string_a57024b9c6e4a48b: function(arg0, arg1) {
      const ret = debugString(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_is_function_5e4570eb24ffa122: function(arg0) {
      const ret = typeof arg0 === "function";
      return ret;
    },
    __wbg___wbindgen_is_object_a2790eb24c211ea0: function(arg0) {
      const val = arg0;
      const ret = typeof val === "object" && val !== null;
      return ret;
    },
    __wbg___wbindgen_is_string_e6f02f0ea5f20a32: function(arg0) {
      const ret = typeof arg0 === "string";
      return ret;
    },
    __wbg___wbindgen_jsval_loose_eq_acf2776254a8d832: function(arg0, arg1) {
      const ret = arg0 == arg1;
      return ret;
    },
    __wbg___wbindgen_number_get_136b9679cab35cfb: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "number" ? obj : void 0;
      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    },
    __wbg___wbindgen_string_get_d154f1e671052120: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbg_call_1c5886ab9c57d1c7: function() {
      return handleError(function(arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
      }, arguments);
    },
    __wbg_done_669171204c3dcae2: function(arg0) {
      const ret = arg0.done;
      return ret;
    },
    __wbg_entries_7774d489e1da5f4f: function(arg0) {
      const ret = Object.entries(arg0);
      return ret;
    },
    __wbg_error_757e9472f8410341: function(arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_getRandomValues_a608c4436c19407a: function() {
      return handleError(function(arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
      }, arguments);
    },
    __wbg_getRandomValues_e446ea5ffdd14ee5: function() {
      return handleError(function(arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
      }, arguments);
    },
    __wbg_getTime_63fb0332e6c4ec17: function(arg0) {
      const ret = arg0.getTime();
      return ret;
    },
    __wbg_get_c0c8f8d7da0c03dd: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_get_d173c0308df22d37: function() {
      return handleError(function(arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_get_unchecked_e20b893aeafc3fca: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_instanceof_ArrayBuffer_993d02d2d254cad1: function(arg0) {
      let result;
      try {
        result = arg0 instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Uint8Array_f935dbb0aa7cdeed: function(arg0) {
      let result;
      try {
        result = arg0 instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_iterator_5cebbb86e33c6dd6: function() {
      const ret = Symbol.iterator;
      return ret;
    },
    __wbg_length_36bd29c6848c2144: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_length_ecfa2c63d3d0d82c: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_lint_new: function(arg0) {
      const ret = Lint2.__wrap(arg0);
      return ret;
    },
    __wbg_lint_unwrap: function(arg0) {
      const ret = Lint2.__unwrap(arg0);
      return ret;
    },
    __wbg_log_1f8cbb01c83d06c2: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_log_a54ca6b45e09078a: function(arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_mark_6b7f03786f5e4d61: function(arg0, arg1) {
      performance.mark(getStringFromWasm0(arg0, arg1));
    },
    __wbg_measure_0e21b33a1c6e3a29: function() {
      return handleError(function(arg0, arg1, arg2, arg3) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
          deferred0_0 = arg0;
          deferred0_1 = arg1;
          deferred1_0 = arg2;
          deferred1_1 = arg3;
          performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        } finally {
          wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
          wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
      }, arguments);
    },
    __wbg_new_0_f117d868b403dc07: function() {
      const ret = /* @__PURE__ */ new Date();
      return ret;
    },
    __wbg_new_116be93542d39019: function() {
      const ret = new Array();
      return ret;
    },
    __wbg_new_227d7c05414eb861: function() {
      const ret = new Error();
      return ret;
    },
    __wbg_new_77cc4f4f472aeb81: function(arg0) {
      const ret = new Uint8Array(arg0);
      return ret;
    },
    __wbg_new_cdf041679ded4c5f: function() {
      const ret = /* @__PURE__ */ new Map();
      return ret;
    },
    __wbg_new_ebe3e0f6837f0879: function() {
      const ret = new Object();
      return ret;
    },
    __wbg_next_42cf16ee0dafc9e2: function() {
      return handleError(function(arg0) {
        const ret = arg0.next();
        return ret;
      }, arguments);
    },
    __wbg_next_8f26b64fa5e9f64b: function(arg0) {
      const ret = arg0.next;
      return ret;
    },
    __wbg_organizedgroup_new: function(arg0) {
      const ret = OrganizedGroup2.__wrap(arg0);
      return ret;
    },
    __wbg_prototypesetcall_de8e0d9553586985: function(arg0, arg1, arg2) {
      Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
    },
    __wbg_set_014226dfeca53178: function(arg0, arg1, arg2) {
      const ret = arg0.set(arg1, arg2);
      return ret;
    },
    __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
      arg0[arg1] = arg2;
    },
    __wbg_set_a80955eb93b145c6: function(arg0, arg1, arg2) {
      arg0[arg1 >>> 0] = arg2;
    },
    __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
      const ret = arg1.stack;
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg_suggestion_new: function(arg0) {
      const ret = Suggestion2.__wrap(arg0);
      return ret;
    },
    __wbg_value_1e2369fab29b420e: function(arg0) {
      const ret = arg0.value;
      return ret;
    },
    __wbindgen_cast_0000000000000001: function(arg0) {
      const ret = arg0;
      return ret;
    },
    __wbindgen_cast_0000000000000002: function(arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return ret;
    },
    __wbindgen_init_externref_table: function() {
      const table = wasm.__wbindgen_externrefs;
      const offset = table.grow(4);
      table.set(0, void 0);
      table.set(offset + 0, void 0);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    }
  };
  return {
    __proto__: null,
    "./harper_wasm_bg.js": import0
  };
}
var LintFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_lint_free(ptr, 1));
var LinterFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_linter_free(ptr, 1));
var OrganizedGroupFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_organizedgroup_free(ptr, 1));
var SpanFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_span_free(ptr, 1));
var SuggestionFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_suggestion_free(ptr, 1));
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_externrefs.set(idx, obj);
  return idx;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i2 = 1; i2 < length; i2++) {
      debug += ", " + debugString(val[i2]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i2 = ptr; i2 < ptr + 4 * len; i2 += 4) {
    result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i2, true)));
  }
  wasm.__externref_drop_slice(ptr, len);
  return result;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
var cachedBigUint64ArrayMemory0 = null;
function getBigUint64ArrayMemory0() {
  if (cachedBigUint64ArrayMemory0 === null || cachedBigUint64ArrayMemory0.byteLength === 0) {
    cachedBigUint64ArrayMemory0 = new BigUint64Array(wasm.memory.buffer);
  }
  return cachedBigUint64ArrayMemory0;
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function getStringFromWasm0(ptr, len) {
  return decodeText(ptr >>> 0, len);
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
function isLikeNone(x2) {
  return x2 === void 0 || x2 === null;
}
function passArray64ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 8, 8) >>> 0;
  getBigUint64ArrayMemory0().set(arg, ptr / 8);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  for (let i2 = 0; i2 < array.length; i2++) {
    const add = addToExternrefTable0(array[i2]);
    getDataViewMemory0().setUint32(ptr + 4 * i2, add, true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_externrefs.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var MAX_SAFARI_DECODE_BYTES = 2146435072;
var numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
var cachedTextEncoder = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
var WASM_VECTOR_LEN = 0;
var wasm;
function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  cachedBigUint64ArrayMemory0 = null;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (!module.ok) {
      throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
    }
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        const validResponse = expectedResponseType(module.type);
        if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
  function expectedResponseType(type) {
    switch (type) {
      case "basic":
      case "cors":
      case "default":
        return true;
    }
    return false;
  }
}
function initSync(module) {
  if (wasm !== void 0) return wasm;
  if (module !== void 0) {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module } = module);
    } else {
      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports();
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init(instance);
}
async function __wbg_init(module_or_path) {
  if (wasm !== void 0) return wasm;
  if (module_or_path !== void 0) {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (module_or_path === void 0) {
    module_or_path = new URL();
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  const { instance } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance);
}
var fullGlue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Dialect,
  Language,
  Lint: Lint2,
  Linter: Linter2,
  OrganizedGroup: OrganizedGroup2,
  Span: Span2,
  Suggestion: Suggestion2,
  SuggestionKind,
  default: __wbg_init,
  get_default_lint_config,
  get_default_lint_config_as_json,
  initSync,
  setup,
  to_title_case
}, Symbol.toStringTag, { value: "Module" }));
var _PLazy = class _PLazy2 extends Promise {
  constructor(executor) {
    super((resolve) => {
      resolve();
    });
    __privateAdd(this, _executor);
    __privateAdd(this, _promise);
    __privateSet(this, _executor, executor);
  }
  static from(function_) {
    return new _PLazy2((resolve) => {
      resolve(function_());
    });
  }
  static resolve(value) {
    return new _PLazy2((resolve) => {
      resolve(value);
    });
  }
  static reject(error) {
    return new _PLazy2((resolve, reject) => {
      reject(error);
    });
  }
  then(onFulfilled, onRejected) {
    __privateGet(this, _promise) ?? __privateSet(this, _promise, new Promise(__privateGet(this, _executor)));
    return __privateGet(this, _promise).then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    __privateGet(this, _promise) ?? __privateSet(this, _promise, new Promise(__privateGet(this, _executor)));
    return __privateGet(this, _promise).catch(onRejected);
  }
  finally(onFinally) {
    __privateGet(this, _promise) ?? __privateSet(this, _promise, new Promise(__privateGet(this, _executor)));
    return __privateGet(this, _promise).finally(onFinally);
  }
};
_executor = /* @__PURE__ */ new WeakMap();
_promise = /* @__PURE__ */ new WeakMap();
var PLazy = _PLazy;
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}
var cacheStore = /* @__PURE__ */ new WeakMap();
function pMemoize(fn, { cacheKey = ([firstArgument]) => firstArgument, cache = /* @__PURE__ */ new Map() } = {}) {
  const promiseCache = /* @__PURE__ */ new Map();
  const memoized = function(...arguments_) {
    const key = cacheKey(arguments_);
    if (promiseCache.has(key)) {
      return promiseCache.get(key);
    }
    const promise = (async () => {
      try {
        if (cache && await cache.has(key)) {
          return await cache.get(key);
        }
        const promise2 = fn.apply(this, arguments_);
        const result = await promise2;
        try {
          return result;
        } finally {
          if (cache) {
            await cache.set(key, result);
          }
        }
      } finally {
        promiseCache.delete(key);
      }
    })();
    promiseCache.set(key, promise);
    return promise;
  };
  mimicFunction(memoized, fn, {
    ignoreNonConfigurable: true
  });
  cacheStore.set(memoized, cache);
  return memoized;
}
function inferGlueFlavor(binary) {
  return binary.includes("harper_wasm_slim") ? "slim" : "full";
}
function loadGlue(glueFlavor) {
  if (glueFlavor === "slim") {
    return defaultGlue;
  }
  return fullGlue;
}
function getDefaultGlueBinary(binary, glueFlavor) {
  if (glueFlavor === "slim") {
    return binary;
  }
  if (binary.includes("harper_wasm_bg.wasm")) {
    return binary.replace("harper_wasm_bg.wasm", "harper_wasm_slim_bg.wasm");
  }
  return null;
}
function getInitInput(binary) {
  if (typeof process !== "undefined" && binary.startsWith("file://")) {
    return Promise.resolve().then(() => (init_fs(), fs_exports)).then(
      (fs) => new Promise((resolve, reject) => {
        fs.readFile(new URL(binary).pathname, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      })
    );
  }
  return binary;
}
async function loadBinaryUncached(binary, glueFlavor) {
  const exports = loadGlue(glueFlavor);
  const defaultGlueBinary = getDefaultGlueBinary(binary, glueFlavor);
  if (defaultGlueBinary != null) {
    try {
      await __wbg_init$1({ module_or_path: getInitInput(defaultGlueBinary) });
    } catch (err) {
      if (glueFlavor === "slim") {
        throw err;
      }
    }
  }
  await exports.default({ module_or_path: getInitInput(binary) });
  return exports;
}
var loadBinaryByFlavor = {
  full: pMemoize((binary) => loadBinaryUncached(binary, "full")),
  slim: pMemoize((binary) => loadBinaryUncached(binary, "slim"))
};
function loadBinary(binary, glueFlavor) {
  return loadBinaryByFlavor[glueFlavor](binary);
}
function createBinaryModuleFromUrl(url, glueFlavor) {
  return BinaryModuleImpl.create(url, glueFlavor);
}
var BinaryModuleImpl = class {
  constructor() {
    __publicField(this, "url", "");
    __publicField(this, "glueFlavor", "full");
    __publicField(this, "inner", null);
  }
  /** Load a binary from a specified URL. This is the only recommended way to construct this type. */
  static create(url, glueFlavor) {
    const module = new SuperBinaryModule();
    module.url = url;
    module.glueFlavor = glueFlavor ?? inferGlueFlavor(typeof url === "string" ? url : url.href);
    module.inner = PLazy.from(
      () => loadBinary(typeof module.url === "string" ? module.url : module.url.href, module.glueFlavor)
    );
    return module;
  }
  async getDefaultLintConfigAsJSON() {
    const exported = await this.inner;
    return exported.get_default_lint_config_as_json();
  }
  async getDefaultLintConfig() {
    const exported = await this.inner;
    return exported.get_default_lint_config();
  }
  async toTitleCase(text) {
    const exported = await this.inner;
    return exported.to_title_case(text);
  }
  async setup() {
    const exported = await this.inner;
    exported.setup();
  }
};
var SuperBinaryModule = class extends BinaryModuleImpl {
  async createLinter(dialect) {
    const exported = await this.getBinaryModule();
    return exported.Linter.new(dialect ?? Dialect$1.American);
  }
  async getBinaryModule() {
    return await PLazy.from(
      () => loadBinary(typeof this.url === "string" ? this.url : this.url.href, this.glueFlavor)
    );
  }
};

// ../../outputs/read-along-web/vendor/harper/index.js
var __defProp3 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
function toWasmLanguage(language) {
  switch (language) {
    case "plaintext":
      return Language$1.Plain;
    case "typst":
      return Language$1.Typst;
    case "markdown":
    case void 0:
      return Language$1.Markdown;
    default:
      console.warn(`Unknown Harper language '${String(language)}'; using markdown.`);
      return Language$1.Markdown;
  }
}
function toWasmLintArgs(text, options) {
  return [
    text,
    toWasmLanguage(options == null ? void 0 : options.language),
    (options == null ? void 0 : options.forceAllHeadings) ?? false,
    options == null ? void 0 : options.regex_mask,
    (options == null ? void 0 : options.dedup) ?? true,
    (options == null ? void 0 : options.isolateEnglish) ?? false
  ];
}
var LocalLinter = class {
  constructor(init) {
    __publicField2(this, "binary");
    __publicField2(this, "inner");
    __publicField2(this, "disposed", false);
    this.binary = init.binary;
    this.binary.setup();
    this.inner = this.createInner(init.dialect);
  }
  createInner(dialect) {
    return PLazy.from(async () => {
      await this.binary.setup();
      return this.binary.createLinter(dialect);
    });
  }
  async setup() {
    await this.lint("", { language: "plaintext" });
    const exported = await this.exportIgnoredLints();
    await this.importIgnoredLints(exported);
  }
  async lint(text, options) {
    const inner = await this.inner;
    return inner.lint(...toWasmLintArgs(text, options));
  }
  async organizedLints(text, options) {
    const inner = await this.inner;
    const lintGroups = inner.organized_lints(...toWasmLintArgs(text, options));
    const output = {};
    for (const group of lintGroups) {
      output[group.group] = group.lints;
      group.free();
    }
    return output;
  }
  async applySuggestion(text, lint, suggestion) {
    const inner = await this.inner;
    return inner.apply_suggestion(text, lint, suggestion);
  }
  async isLikelyEnglish(text) {
    const inner = await this.inner;
    return inner.is_likely_english(text);
  }
  async isolateEnglish(text) {
    const inner = await this.inner;
    return inner.isolate_english(text);
  }
  async getLintConfig() {
    const inner = await this.inner;
    return inner.get_lint_config_as_object();
  }
  async getDefaultLintConfigAsJSON() {
    return await this.binary.getDefaultLintConfigAsJSON();
  }
  async getDefaultLintConfig() {
    return await this.binary.getDefaultLintConfig();
  }
  async getStructuredLintConfig() {
    const inner = await this.inner;
    return inner.get_structured_lint_config_as_object();
  }
  async getStructuredLintConfigJSON() {
    const inner = await this.inner;
    return inner.get_structured_lint_config_as_json();
  }
  async setLintConfig(config) {
    const inner = await this.inner;
    inner.set_lint_config_from_object(config);
  }
  async getLintConfigAsJSON() {
    const inner = await this.inner;
    return inner.get_lint_config_as_json();
  }
  async setLintConfigWithJSON(config) {
    const inner = await this.inner;
    inner.set_lint_config_from_json(config);
  }
  async toTitleCase(text) {
    return await this.binary.toTitleCase(text);
  }
  async getLintDescriptions() {
    const inner = await this.inner;
    return inner.get_lint_descriptions_as_object();
  }
  async getLintDescriptionsAsJSON() {
    const inner = await this.inner;
    return inner.get_lint_descriptions_as_json();
  }
  async getLintDescriptionsHTML() {
    const inner = await this.inner;
    return inner.get_lint_descriptions_html_as_object();
  }
  async getLintDescriptionsHTMLAsJSON() {
    const inner = await this.inner;
    return inner.get_lint_descriptions_html_as_json();
  }
  async ignoreLint(source, lint) {
    return await this.ignoreLints(source, [lint]);
  }
  async ignoreLints(source, lints) {
    const inner = await this.inner;
    inner.ignore_lints(source, lints);
  }
  async ignoreLintHash(hash) {
    const inner = await this.inner;
    inner.ignore_hashes(new BigUint64Array([hash]));
  }
  async exportIgnoredLints() {
    const inner = await this.inner;
    return inner.export_ignored_lints();
  }
  async importIgnoredLints(json) {
    const inner = await this.inner;
    inner.import_ignored_lints(json);
  }
  async contextHash(source, lint) {
    const inner = await this.inner;
    return inner.context_hash(source, lint);
  }
  async clearIgnoredLints() {
    const inner = await this.inner;
    inner.clear_ignored_lints();
  }
  async clearWords() {
    const inner = await this.inner;
    return inner.clear_words();
  }
  async importWords(words) {
    const inner = await this.inner;
    return inner.import_words(words);
  }
  async exportWords() {
    const inner = await this.inner;
    return inner.export_words();
  }
  async getDialect() {
    const inner = await this.inner;
    return inner.get_dialect();
  }
  async setDialect(dialect) {
    const inner = await this.inner;
    if (inner.get_dialect() !== dialect) {
      inner.free();
      this.inner = this.createInner(dialect);
    }
    return Promise.resolve();
  }
  async summarizeStats(start, end) {
    const inner = await this.inner;
    return inner.summarize_stats(start, end);
  }
  async generateStatsFile() {
    const inner = await this.inner;
    return inner.generate_stats_file();
  }
  async importStatsFile(statsFile) {
    const inner = await this.inner;
    return inner.import_stats_file(statsFile);
  }
  /**
   * Load a Weirpack from a Blob.
   *
   * Returns `undefined` if tests pass and rules are imported, otherwise returns
   * the Weirpack test failures.
   */
  async loadWeirpackFromBlob(blob2) {
    const bytes = new Uint8Array(await blob2.arrayBuffer());
    return this.loadWeirpackFromBytes(bytes);
  }
  /**
   * Load a Weirpack from a byte array.
   *
   * Returns `undefined` if tests pass and rules are imported, otherwise returns
   * the Weirpack test failures.
   */
  async loadWeirpackFromBytes(bytes) {
    const inner = await this.inner;
    const data = bytes instanceof Uint8Array ? bytes : Uint8Array.from(bytes);
    const result = inner.import_weirpack(data);
    return result;
  }
  async dispose() {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    const inner = await this.inner;
    inner.free();
  }
};
var jsContent = 'var __defProp = Object.defineProperty;\nvar __typeError = (msg) => {\n  throw TypeError(msg);\n};\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);\nvar __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);\nvar __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));\nvar __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);\nvar __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);\nvar _executor, _promise;\nconst Dialect$1 = Object.freeze({\n  American: 0,\n  "0": "American",\n  British: 1,\n  "1": "British",\n  Australian: 2,\n  "2": "Australian",\n  Canadian: 3,\n  "3": "Canadian",\n  Indian: 4,\n  "4": "Indian"\n});\nconst Language$1 = Object.freeze({\n  Plain: 0,\n  "0": "Plain",\n  Markdown: 1,\n  "1": "Markdown",\n  Typst: 2,\n  "2": "Typst"\n});\nlet Lint$1 = class Lint {\n  static __wrap(ptr) {\n    const obj = Object.create(Lint.prototype);\n    obj.__wbg_ptr = ptr;\n    LintFinalization$1.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  static __unwrap(jsValue) {\n    if (!(jsValue instanceof Lint)) {\n      return 0;\n    }\n    return jsValue.__destroy_into_raw();\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    LintFinalization$1.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm$1.__wbg_lint_free(ptr, 0);\n  }\n  /**\n   * @param {string} json\n   * @returns {Lint}\n   */\n  static from_json(json) {\n    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.lint_from_json(ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0$1(ret[1]);\n    }\n    return Lint.__wrap(ret[0]);\n  }\n  /**\n   * Get the content of the source material pointed to by [`Self::span`]\n   * @returns {string}\n   */\n  get_problem_text() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.lint_get_problem_text(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a string representing the general category of the lint.\n   * @returns {string}\n   */\n  lint_kind() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.lint_lint_kind(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a string representing the general category of the lint.\n   * @returns {string}\n   */\n  lint_kind_pretty() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.lint_lint_kind_pretty(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a description of the error.\n   * @returns {string}\n   */\n  message() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.lint_message(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a description of the error as HTML.\n   * @returns {string}\n   */\n  message_html() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.lint_message_html(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get the location of the problematic text.\n   * @returns {Span}\n   */\n  span() {\n    const ret = wasm$1.lint_span(this.__wbg_ptr);\n    return Span$1.__wrap(ret);\n  }\n  /**\n   * Equivalent to calling `.length` on the result of `suggestions()`.\n   * @returns {number}\n   */\n  suggestion_count() {\n    const ret = wasm$1.lint_suggestion_count(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * Get an array of any suggestions that may resolve the issue.\n   * @returns {Suggestion[]}\n   */\n  suggestions() {\n    const ret = wasm$1.lint_suggestions(this.__wbg_ptr);\n    var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);\n    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v1;\n  }\n  /**\n   * @returns {string}\n   */\n  to_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.lint_to_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n};\nif (Symbol.dispose) Lint$1.prototype[Symbol.dispose] = Lint$1.prototype.free;\nlet Linter$1 = class Linter {\n  static __wrap(ptr) {\n    const obj = Object.create(Linter.prototype);\n    obj.__wbg_ptr = ptr;\n    LinterFinalization$1.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    LinterFinalization$1.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm$1.__wbg_linter_free(ptr, 0);\n  }\n  /**\n   * Apply a suggestion from a given lint.\n   * This action will be logged to the Linter\'s statistics.\n   * @param {string} source_text\n   * @param {Lint} lint\n   * @param {Suggestion} suggestion\n   * @returns {string}\n   */\n  apply_suggestion(source_text, lint, suggestion) {\n    let deferred3_0;\n    let deferred3_1;\n    try {\n      const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n      const len0 = WASM_VECTOR_LEN$1;\n      _assertClass$1(lint, Lint$1);\n      _assertClass$1(suggestion, Suggestion$1);\n      const ret = wasm$1.linter_apply_suggestion(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr, suggestion.__wbg_ptr);\n      var ptr2 = ret[0];\n      var len2 = ret[1];\n      if (ret[3]) {\n        ptr2 = 0;\n        len2 = 0;\n        throw takeFromExternrefTable0$1(ret[2]);\n      }\n      deferred3_0 = ptr2;\n      deferred3_1 = len2;\n      return getStringFromWasm0$1(ptr2, len2);\n    } finally {\n      wasm$1.__wbindgen_free(deferred3_0, deferred3_1, 1);\n    }\n  }\n  clear_ignored_lints() {\n    wasm$1.linter_clear_ignored_lints(this.__wbg_ptr);\n  }\n  /**\n   * Clear the user dictionary.\n   */\n  clear_words() {\n    wasm$1.linter_clear_words(this.__wbg_ptr);\n  }\n  /**\n   * Compute the context hash of a given lint.\n   * @param {string} source_text\n   * @param {Lint} lint\n   * @returns {bigint}\n   */\n  context_hash(source_text, lint) {\n    const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    _assertClass$1(lint, Lint$1);\n    const ret = wasm$1.linter_context_hash(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr);\n    return BigInt.asUintN(64, ret);\n  }\n  /**\n   * Export the linter\'s ignored lints as a privacy-respecting JSON list of hashes.\n   * @returns {string}\n   */\n  export_ignored_lints() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.linter_export_ignored_lints(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Export words from the dictionary.\n   * Note: this will only return words previously added by [`Self::import_words`].\n   * @returns {string[]}\n   */\n  export_words() {\n    const ret = wasm$1.linter_export_words(this.__wbg_ptr);\n    var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);\n    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v1;\n  }\n  /**\n   * @returns {string}\n   */\n  generate_stats_file() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.linter_generate_stats_file(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get the dialect this struct was constructed for.\n   * @returns {Dialect}\n   */\n  get_dialect() {\n    const ret = wasm$1.linter_get_dialect(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {string}\n   */\n  get_lint_config_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.linter_get_lint_config_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {any}\n   */\n  get_lint_config_as_object() {\n    const ret = wasm$1.linter_get_lint_config_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * Get a JSON map containing the descriptions of all the linting rules, formatted as Markdown.\n   * @returns {string}\n   */\n  get_lint_descriptions_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.linter_get_lint_descriptions_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a Record containing the descriptions of all the linting rules, formatted as Markdown.\n   * @returns {any}\n   */\n  get_lint_descriptions_as_object() {\n    const ret = wasm$1.linter_get_lint_descriptions_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * Get a JSON map containing the descriptions of all the linting rules, formatted as HTML.\n   * @returns {string}\n   */\n  get_lint_descriptions_html_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a Record containing the descriptions of all the linting rules, formatted as HTML.\n   * @returns {any}\n   */\n  get_lint_descriptions_html_as_object() {\n    const ret = wasm$1.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {string}\n   */\n  get_structured_lint_config_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.linter_get_structured_lint_config_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {any}\n   */\n  get_structured_lint_config_as_object() {\n    const ret = wasm$1.linter_get_structured_lint_config_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * Add a specific context hash to the ignored lints list.\n   * @param {BigUint64Array} hashes\n   */\n  ignore_hashes(hashes) {\n    const ptr0 = passArray64ToWasm0$1(hashes, wasm$1.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    wasm$1.linter_ignore_hashes(this.__wbg_ptr, ptr0, len0);\n  }\n  /**\n   * @param {string} source_text\n   * @param {Lint[]} lints\n   */\n  ignore_lints(source_text, lints) {\n    const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ptr1 = passArrayJsValueToWasm0$1(lints, wasm$1.__wbindgen_malloc);\n    const len1 = WASM_VECTOR_LEN$1;\n    wasm$1.linter_ignore_lints(this.__wbg_ptr, ptr0, len0, ptr1, len1);\n  }\n  /**\n   * Import into the linter\'s ignored lints from a privacy-respecting JSON list of hashes.\n   * @param {string} json\n   */\n  import_ignored_lints(json) {\n    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.linter_import_ignored_lints(this.__wbg_ptr, ptr0, len0);\n    if (ret[1]) {\n      throw takeFromExternrefTable0$1(ret[0]);\n    }\n  }\n  /**\n   * @param {string} file\n   */\n  import_stats_file(file) {\n    const ptr0 = passStringToWasm0$1(file, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.linter_import_stats_file(this.__wbg_ptr, ptr0, len0);\n    if (ret[1]) {\n      throw takeFromExternrefTable0$1(ret[0]);\n    }\n  }\n  /**\n   * Load a Weirpack from raw bytes, merging its rules into the current linter.\n   * Returns test failures if any are found, and does not import in that case.\n   * @param {Uint8Array} bytes\n   * @returns {any}\n   */\n  import_weirpack(bytes) {\n    const ptr0 = passArray8ToWasm0$1(bytes, wasm$1.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.linter_import_weirpack(this.__wbg_ptr, ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0$1(ret[1]);\n    }\n    return takeFromExternrefTable0$1(ret[0]);\n  }\n  /**\n   * Import words into the dictionary.\n   * @param {string[]} additional_words\n   */\n  import_words(additional_words) {\n    const ptr0 = passArrayJsValueToWasm0$1(additional_words, wasm$1.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    wasm$1.linter_import_words(this.__wbg_ptr, ptr0, len0);\n  }\n  /**\n   * Helper method to quickly check if a plain string is likely intended to be English\n   * @param {string} text\n   * @returns {boolean}\n   */\n  is_likely_english(text) {\n    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.linter_is_likely_english(this.__wbg_ptr, ptr0, len0);\n    return ret !== 0;\n  }\n  /**\n   * Helper method to remove non-English text from a plain English document.\n   * @param {string} text\n   * @returns {string}\n   */\n  isolate_english(text) {\n    let deferred2_0;\n    let deferred2_1;\n    try {\n      const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n      const len0 = WASM_VECTOR_LEN$1;\n      const ret = wasm$1.linter_isolate_english(this.__wbg_ptr, ptr0, len0);\n      deferred2_0 = ret[0];\n      deferred2_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);\n    }\n  }\n  /**\n   * Perform the configured linting on the provided text.\n   *\n   * If the provided regex mask cannot be parsed, this method will return an empty array.\n   * @param {string} text\n   * @param {Language} language\n   * @param {boolean} all_headings\n   * @param {string | null | undefined} regex_mask\n   * @param {boolean} dedup\n   * @param {boolean} isolate_english\n   * @returns {Lint[]}\n   */\n  lint(text, language, all_headings, regex_mask, dedup, isolate_english) {\n    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    var ptr1 = isLikeNone$1(regex_mask) ? 0 : passStringToWasm0$1(regex_mask, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    var len1 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.linter_lint(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);\n    var v3 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);\n    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v3;\n  }\n  /**\n   * Construct a new `Linter`.\n   * Note that this can mean constructing the curated dictionary, which is the most expensive operation\n   * in Harper.\n   * @param {Dialect} dialect\n   * @returns {Linter}\n   */\n  static new(dialect) {\n    const ret = wasm$1.linter_new(dialect);\n    return Linter.__wrap(ret);\n  }\n  /**\n   * @param {string} text\n   * @param {Language} language\n   * @param {boolean} all_headings\n   * @param {string | null | undefined} regex_mask\n   * @param {boolean} dedup\n   * @param {boolean} isolate_english\n   * @returns {OrganizedGroup[]}\n   */\n  organized_lints(text, language, all_headings, regex_mask, dedup, isolate_english) {\n    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    var ptr1 = isLikeNone$1(regex_mask) ? 0 : passStringToWasm0$1(regex_mask, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    var len1 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.linter_organized_lints(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);\n    var v3 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);\n    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v3;\n  }\n  /**\n   * @param {string} json\n   */\n  set_lint_config_from_json(json) {\n    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.linter_set_lint_config_from_json(this.__wbg_ptr, ptr0, len0);\n    if (ret[1]) {\n      throw takeFromExternrefTable0$1(ret[0]);\n    }\n  }\n  /**\n   * @param {any} object\n   */\n  set_lint_config_from_object(object) {\n    const ret = wasm$1.linter_set_lint_config_from_object(this.__wbg_ptr, object);\n    if (ret[1]) {\n      throw takeFromExternrefTable0$1(ret[0]);\n    }\n  }\n  /**\n   * @param {bigint | null} [start_time]\n   * @param {bigint | null} [end_time]\n   * @returns {any}\n   */\n  summarize_stats(start_time, end_time) {\n    const ret = wasm$1.linter_summarize_stats(this.__wbg_ptr, !isLikeNone$1(start_time), isLikeNone$1(start_time) ? BigInt(0) : start_time, !isLikeNone$1(end_time), isLikeNone$1(end_time) ? BigInt(0) : end_time);\n    return ret;\n  }\n};\nif (Symbol.dispose) Linter$1.prototype[Symbol.dispose] = Linter$1.prototype.free;\nlet OrganizedGroup$1 = class OrganizedGroup {\n  static __wrap(ptr) {\n    const obj = Object.create(OrganizedGroup.prototype);\n    obj.__wbg_ptr = ptr;\n    OrganizedGroupFinalization$1.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    OrganizedGroupFinalization$1.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm$1.__wbg_organizedgroup_free(ptr, 0);\n  }\n  /**\n   * @returns {string}\n   */\n  get group() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.__wbg_get_organizedgroup_group(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {Lint[]}\n   */\n  get lints() {\n    const ret = wasm$1.__wbg_get_organizedgroup_lints(this.__wbg_ptr);\n    var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);\n    wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v1;\n  }\n  /**\n   * @param {string} arg0\n   */\n  set group(arg0) {\n    const ptr0 = passStringToWasm0$1(arg0, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    wasm$1.__wbg_set_organizedgroup_group(this.__wbg_ptr, ptr0, len0);\n  }\n  /**\n   * @param {Lint[]} arg0\n   */\n  set lints(arg0) {\n    const ptr0 = passArrayJsValueToWasm0$1(arg0, wasm$1.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    wasm$1.__wbg_set_organizedgroup_lints(this.__wbg_ptr, ptr0, len0);\n  }\n};\nif (Symbol.dispose) OrganizedGroup$1.prototype[Symbol.dispose] = OrganizedGroup$1.prototype.free;\nlet Span$1 = class Span {\n  static __wrap(ptr) {\n    const obj = Object.create(Span.prototype);\n    obj.__wbg_ptr = ptr;\n    SpanFinalization$1.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    SpanFinalization$1.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm$1.__wbg_span_free(ptr, 0);\n  }\n  /**\n   * @returns {number}\n   */\n  get end() {\n    const ret = wasm$1.__wbg_get_span_end(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * @returns {number}\n   */\n  get start() {\n    const ret = wasm$1.__wbg_get_span_start(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * @param {number} arg0\n   */\n  set end(arg0) {\n    wasm$1.__wbg_set_span_end(this.__wbg_ptr, arg0);\n  }\n  /**\n   * @param {number} arg0\n   */\n  set start(arg0) {\n    wasm$1.__wbg_set_span_start(this.__wbg_ptr, arg0);\n  }\n  /**\n   * @param {string} json\n   * @returns {Span}\n   */\n  static from_json(json) {\n    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.span_from_json(ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0$1(ret[1]);\n    }\n    return Span.__wrap(ret[0]);\n  }\n  /**\n   * @returns {boolean}\n   */\n  is_empty() {\n    const ret = wasm$1.span_is_empty(this.__wbg_ptr);\n    return ret !== 0;\n  }\n  /**\n   * @returns {number}\n   */\n  len() {\n    const ret = wasm$1.span_len(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * @param {number} start\n   * @param {number} end\n   * @returns {Span}\n   */\n  static new(start, end) {\n    const ret = wasm$1.span_new(start, end);\n    return Span.__wrap(ret);\n  }\n  /**\n   * @returns {string}\n   */\n  to_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.span_to_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n};\nif (Symbol.dispose) Span$1.prototype[Symbol.dispose] = Span$1.prototype.free;\nlet Suggestion$1 = class Suggestion {\n  static __wrap(ptr) {\n    const obj = Object.create(Suggestion.prototype);\n    obj.__wbg_ptr = ptr;\n    SuggestionFinalization$1.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    SuggestionFinalization$1.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm$1.__wbg_suggestion_free(ptr, 0);\n  }\n  /**\n   * @param {string} json\n   * @returns {Suggestion}\n   */\n  static from_json(json) {\n    const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.suggestion_from_json(ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0$1(ret[1]);\n    }\n    return Suggestion.__wrap(ret[0]);\n  }\n  /**\n   * Get the text that is going to replace the problematic section.\n   * If [`Self::kind`] is `SuggestionKind::Remove`, this will return an empty\n   * string.\n   * @returns {string}\n   */\n  get_replacement_text() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.suggestion_get_replacement_text(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {SuggestionKind}\n   */\n  kind() {\n    const ret = wasm$1.suggestion_kind(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {string}\n   */\n  to_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm$1.suggestion_to_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0$1(ret[0], ret[1]);\n    } finally {\n      wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n};\nif (Symbol.dispose) Suggestion$1.prototype[Symbol.dispose] = Suggestion$1.prototype.free;\nconst SuggestionKind$1 = Object.freeze({\n  /**\n   * Replace the problematic text.\n   */\n  Replace: 0,\n  "0": "Replace",\n  /**\n   * Remove the problematic text.\n   */\n  Remove: 1,\n  "1": "Remove",\n  /**\n   * Insert additional text after the error.\n   */\n  InsertAfter: 2,\n  "2": "InsertAfter"\n});\nfunction get_default_lint_config$1() {\n  const ret = wasm$1.get_default_lint_config();\n  return ret;\n}\nfunction get_default_lint_config_as_json$1() {\n  let deferred1_0;\n  let deferred1_1;\n  try {\n    const ret = wasm$1.get_default_lint_config_as_json();\n    deferred1_0 = ret[0];\n    deferred1_1 = ret[1];\n    return getStringFromWasm0$1(ret[0], ret[1]);\n  } finally {\n    wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n  }\n}\nfunction setup$1() {\n  wasm$1.setup();\n}\nfunction to_title_case$1(text) {\n  let deferred2_0;\n  let deferred2_1;\n  try {\n    const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN$1;\n    const ret = wasm$1.to_title_case(ptr0, len0);\n    deferred2_0 = ret[0];\n    deferred2_1 = ret[1];\n    return getStringFromWasm0$1(ret[0], ret[1]);\n  } finally {\n    wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);\n  }\n}\nfunction __wbg_get_imports$1() {\n  const import0 = {\n    __proto__: null,\n    __wbg_Error_408e67f47ca7b58b: function(arg0, arg1) {\n      const ret = Error(getStringFromWasm0$1(arg0, arg1));\n      return ret;\n    },\n    __wbg_String_8564e559799eccda: function(arg0, arg1) {\n      const ret = String(arg1);\n      const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n      const len1 = WASM_VECTOR_LEN$1;\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg___wbindgen_boolean_get_c9c83ebd41b34df3: function(arg0) {\n      const v = arg0;\n      const ret = typeof v === "boolean" ? v : void 0;\n      return isLikeNone$1(ret) ? 16777215 : ret ? 1 : 0;\n    },\n    __wbg___wbindgen_debug_string_a57024b9c6e4a48b: function(arg0, arg1) {\n      const ret = debugString$1(arg1);\n      const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n      const len1 = WASM_VECTOR_LEN$1;\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg___wbindgen_is_function_5e4570eb24ffa122: function(arg0) {\n      const ret = typeof arg0 === "function";\n      return ret;\n    },\n    __wbg___wbindgen_is_object_a2790eb24c211ea0: function(arg0) {\n      const val = arg0;\n      const ret = typeof val === "object" && val !== null;\n      return ret;\n    },\n    __wbg___wbindgen_is_string_e6f02f0ea5f20a32: function(arg0) {\n      const ret = typeof arg0 === "string";\n      return ret;\n    },\n    __wbg___wbindgen_jsval_loose_eq_acf2776254a8d832: function(arg0, arg1) {\n      const ret = arg0 == arg1;\n      return ret;\n    },\n    __wbg___wbindgen_number_get_136b9679cab35cfb: function(arg0, arg1) {\n      const obj = arg1;\n      const ret = typeof obj === "number" ? obj : void 0;\n      getDataViewMemory0$1().setFloat64(arg0 + 8 * 1, isLikeNone$1(ret) ? 0 : ret, true);\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, !isLikeNone$1(ret), true);\n    },\n    __wbg___wbindgen_string_get_d154f1e671052120: function(arg0, arg1) {\n      const obj = arg1;\n      const ret = typeof obj === "string" ? obj : void 0;\n      var ptr1 = isLikeNone$1(ret) ? 0 : passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n      var len1 = WASM_VECTOR_LEN$1;\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {\n      throw new Error(getStringFromWasm0$1(arg0, arg1));\n    },\n    __wbg_call_1c5886ab9c57d1c7: function() {\n      return handleError$1(function(arg0, arg1) {\n        const ret = arg0.call(arg1);\n        return ret;\n      }, arguments);\n    },\n    __wbg_done_669171204c3dcae2: function(arg0) {\n      const ret = arg0.done;\n      return ret;\n    },\n    __wbg_entries_7774d489e1da5f4f: function(arg0) {\n      const ret = Object.entries(arg0);\n      return ret;\n    },\n    __wbg_error_757e9472f8410341: function(arg0, arg1) {\n      let deferred0_0;\n      let deferred0_1;\n      try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.error(getStringFromWasm0$1(arg0, arg1));\n      } finally {\n        wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);\n      }\n    },\n    __wbg_getRandomValues_a608c4436c19407a: function() {\n      return handleError$1(function(arg0, arg1) {\n        globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));\n      }, arguments);\n    },\n    __wbg_getRandomValues_e446ea5ffdd14ee5: function() {\n      return handleError$1(function(arg0, arg1) {\n        globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));\n      }, arguments);\n    },\n    __wbg_getTime_63fb0332e6c4ec17: function(arg0) {\n      const ret = arg0.getTime();\n      return ret;\n    },\n    __wbg_get_c0c8f8d7da0c03dd: function(arg0, arg1) {\n      const ret = arg0[arg1 >>> 0];\n      return ret;\n    },\n    __wbg_get_d173c0308df22d37: function() {\n      return handleError$1(function(arg0, arg1) {\n        const ret = Reflect.get(arg0, arg1);\n        return ret;\n      }, arguments);\n    },\n    __wbg_get_unchecked_e20b893aeafc3fca: function(arg0, arg1) {\n      const ret = arg0[arg1 >>> 0];\n      return ret;\n    },\n    __wbg_instanceof_ArrayBuffer_993d02d2d254cad1: function(arg0) {\n      let result;\n      try {\n        result = arg0 instanceof ArrayBuffer;\n      } catch (_) {\n        result = false;\n      }\n      const ret = result;\n      return ret;\n    },\n    __wbg_instanceof_Uint8Array_f935dbb0aa7cdeed: function(arg0) {\n      let result;\n      try {\n        result = arg0 instanceof Uint8Array;\n      } catch (_) {\n        result = false;\n      }\n      const ret = result;\n      return ret;\n    },\n    __wbg_iterator_5cebbb86e33c6dd6: function() {\n      const ret = Symbol.iterator;\n      return ret;\n    },\n    __wbg_length_36bd29c6848c2144: function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    },\n    __wbg_length_ecfa2c63d3d0d82c: function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    },\n    __wbg_lint_new: function(arg0) {\n      const ret = Lint$1.__wrap(arg0);\n      return ret;\n    },\n    __wbg_lint_unwrap: function(arg0) {\n      const ret = Lint$1.__unwrap(arg0);\n      return ret;\n    },\n    __wbg_log_1f8cbb01c83d06c2: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {\n      let deferred0_0;\n      let deferred0_1;\n      try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.log(getStringFromWasm0$1(arg0, arg1), getStringFromWasm0$1(arg2, arg3), getStringFromWasm0$1(arg4, arg5), getStringFromWasm0$1(arg6, arg7));\n      } finally {\n        wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);\n      }\n    },\n    __wbg_log_a54ca6b45e09078a: function(arg0, arg1) {\n      let deferred0_0;\n      let deferred0_1;\n      try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.log(getStringFromWasm0$1(arg0, arg1));\n      } finally {\n        wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);\n      }\n    },\n    __wbg_mark_6b7f03786f5e4d61: function(arg0, arg1) {\n      performance.mark(getStringFromWasm0$1(arg0, arg1));\n    },\n    __wbg_measure_0e21b33a1c6e3a29: function() {\n      return handleError$1(function(arg0, arg1, arg2, arg3) {\n        let deferred0_0;\n        let deferred0_1;\n        let deferred1_0;\n        let deferred1_1;\n        try {\n          deferred0_0 = arg0;\n          deferred0_1 = arg1;\n          deferred1_0 = arg2;\n          deferred1_1 = arg3;\n          performance.measure(getStringFromWasm0$1(arg0, arg1), getStringFromWasm0$1(arg2, arg3));\n        } finally {\n          wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);\n          wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);\n        }\n      }, arguments);\n    },\n    __wbg_new_0_f117d868b403dc07: function() {\n      const ret = /* @__PURE__ */ new Date();\n      return ret;\n    },\n    __wbg_new_116be93542d39019: function() {\n      const ret = new Array();\n      return ret;\n    },\n    __wbg_new_227d7c05414eb861: function() {\n      const ret = new Error();\n      return ret;\n    },\n    __wbg_new_77cc4f4f472aeb81: function(arg0) {\n      const ret = new Uint8Array(arg0);\n      return ret;\n    },\n    __wbg_new_cdf041679ded4c5f: function() {\n      const ret = /* @__PURE__ */ new Map();\n      return ret;\n    },\n    __wbg_new_ebe3e0f6837f0879: function() {\n      const ret = new Object();\n      return ret;\n    },\n    __wbg_next_42cf16ee0dafc9e2: function() {\n      return handleError$1(function(arg0) {\n        const ret = arg0.next();\n        return ret;\n      }, arguments);\n    },\n    __wbg_next_8f26b64fa5e9f64b: function(arg0) {\n      const ret = arg0.next;\n      return ret;\n    },\n    __wbg_organizedgroup_new: function(arg0) {\n      const ret = OrganizedGroup$1.__wrap(arg0);\n      return ret;\n    },\n    __wbg_prototypesetcall_de8e0d9553586985: function(arg0, arg1, arg2) {\n      Uint8Array.prototype.set.call(getArrayU8FromWasm0$1(arg0, arg1), arg2);\n    },\n    __wbg_set_014226dfeca53178: function(arg0, arg1, arg2) {\n      const ret = arg0.set(arg1, arg2);\n      return ret;\n    },\n    __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {\n      arg0[arg1] = arg2;\n    },\n    __wbg_set_a80955eb93b145c6: function(arg0, arg1, arg2) {\n      arg0[arg1 >>> 0] = arg2;\n    },\n    __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {\n      const ret = arg1.stack;\n      const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);\n      const len1 = WASM_VECTOR_LEN$1;\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg_suggestion_new: function(arg0) {\n      const ret = Suggestion$1.__wrap(arg0);\n      return ret;\n    },\n    __wbg_value_1e2369fab29b420e: function(arg0) {\n      const ret = arg0.value;\n      return ret;\n    },\n    __wbindgen_cast_0000000000000001: function(arg0) {\n      const ret = arg0;\n      return ret;\n    },\n    __wbindgen_cast_0000000000000002: function(arg0, arg1) {\n      const ret = getStringFromWasm0$1(arg0, arg1);\n      return ret;\n    },\n    __wbindgen_init_externref_table: function() {\n      const table = wasm$1.__wbindgen_externrefs;\n      const offset = table.grow(4);\n      table.set(0, void 0);\n      table.set(offset + 0, void 0);\n      table.set(offset + 1, null);\n      table.set(offset + 2, true);\n      table.set(offset + 3, false);\n    }\n  };\n  return {\n    __proto__: null,\n    "./harper_wasm_slim_bg.js": import0\n  };\n}\nconst LintFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_lint_free(ptr, 1));\nconst LinterFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_linter_free(ptr, 1));\nconst OrganizedGroupFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_organizedgroup_free(ptr, 1));\nconst SpanFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_span_free(ptr, 1));\nconst SuggestionFinalization$1 = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm$1.__wbg_suggestion_free(ptr, 1));\nfunction addToExternrefTable0$1(obj) {\n  const idx = wasm$1.__externref_table_alloc();\n  wasm$1.__wbindgen_externrefs.set(idx, obj);\n  return idx;\n}\nfunction _assertClass$1(instance, klass) {\n  if (!(instance instanceof klass)) {\n    throw new Error(`expected instance of ${klass.name}`);\n  }\n}\nfunction debugString$1(val) {\n  const type = typeof val;\n  if (type == "number" || type == "boolean" || val == null) {\n    return `${val}`;\n  }\n  if (type == "string") {\n    return `"${val}"`;\n  }\n  if (type == "symbol") {\n    const description = val.description;\n    if (description == null) {\n      return "Symbol";\n    } else {\n      return `Symbol(${description})`;\n    }\n  }\n  if (type == "function") {\n    const name = val.name;\n    if (typeof name == "string" && name.length > 0) {\n      return `Function(${name})`;\n    } else {\n      return "Function";\n    }\n  }\n  if (Array.isArray(val)) {\n    const length = val.length;\n    let debug = "[";\n    if (length > 0) {\n      debug += debugString$1(val[0]);\n    }\n    for (let i = 1; i < length; i++) {\n      debug += ", " + debugString$1(val[i]);\n    }\n    debug += "]";\n    return debug;\n  }\n  const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));\n  let className;\n  if (builtInMatches && builtInMatches.length > 1) {\n    className = builtInMatches[1];\n  } else {\n    return toString.call(val);\n  }\n  if (className == "Object") {\n    try {\n      return "Object(" + JSON.stringify(val) + ")";\n    } catch (_) {\n      return "Object";\n    }\n  }\n  if (val instanceof Error) {\n    return `${val.name}: ${val.message}\n${val.stack}`;\n  }\n  return className;\n}\nfunction getArrayJsValueFromWasm0$1(ptr, len) {\n  ptr = ptr >>> 0;\n  const mem = getDataViewMemory0$1();\n  const result = [];\n  for (let i = ptr; i < ptr + 4 * len; i += 4) {\n    result.push(wasm$1.__wbindgen_externrefs.get(mem.getUint32(i, true)));\n  }\n  wasm$1.__externref_drop_slice(ptr, len);\n  return result;\n}\nfunction getArrayU8FromWasm0$1(ptr, len) {\n  ptr = ptr >>> 0;\n  return getUint8ArrayMemory0$1().subarray(ptr / 1, ptr / 1 + len);\n}\nlet cachedBigUint64ArrayMemory0$1 = null;\nfunction getBigUint64ArrayMemory0$1() {\n  if (cachedBigUint64ArrayMemory0$1 === null || cachedBigUint64ArrayMemory0$1.byteLength === 0) {\n    cachedBigUint64ArrayMemory0$1 = new BigUint64Array(wasm$1.memory.buffer);\n  }\n  return cachedBigUint64ArrayMemory0$1;\n}\nlet cachedDataViewMemory0$1 = null;\nfunction getDataViewMemory0$1() {\n  if (cachedDataViewMemory0$1 === null || cachedDataViewMemory0$1.buffer.detached === true || cachedDataViewMemory0$1.buffer.detached === void 0 && cachedDataViewMemory0$1.buffer !== wasm$1.memory.buffer) {\n    cachedDataViewMemory0$1 = new DataView(wasm$1.memory.buffer);\n  }\n  return cachedDataViewMemory0$1;\n}\nfunction getStringFromWasm0$1(ptr, len) {\n  return decodeText$1(ptr >>> 0, len);\n}\nlet cachedUint8ArrayMemory0$1 = null;\nfunction getUint8ArrayMemory0$1() {\n  if (cachedUint8ArrayMemory0$1 === null || cachedUint8ArrayMemory0$1.byteLength === 0) {\n    cachedUint8ArrayMemory0$1 = new Uint8Array(wasm$1.memory.buffer);\n  }\n  return cachedUint8ArrayMemory0$1;\n}\nfunction handleError$1(f, args) {\n  try {\n    return f.apply(this, args);\n  } catch (e) {\n    const idx = addToExternrefTable0$1(e);\n    wasm$1.__wbindgen_exn_store(idx);\n  }\n}\nfunction isLikeNone$1(x) {\n  return x === void 0 || x === null;\n}\nfunction passArray64ToWasm0$1(arg, malloc) {\n  const ptr = malloc(arg.length * 8, 8) >>> 0;\n  getBigUint64ArrayMemory0$1().set(arg, ptr / 8);\n  WASM_VECTOR_LEN$1 = arg.length;\n  return ptr;\n}\nfunction passArray8ToWasm0$1(arg, malloc) {\n  const ptr = malloc(arg.length * 1, 1) >>> 0;\n  getUint8ArrayMemory0$1().set(arg, ptr / 1);\n  WASM_VECTOR_LEN$1 = arg.length;\n  return ptr;\n}\nfunction passArrayJsValueToWasm0$1(array, malloc) {\n  const ptr = malloc(array.length * 4, 4) >>> 0;\n  for (let i = 0; i < array.length; i++) {\n    const add = addToExternrefTable0$1(array[i]);\n    getDataViewMemory0$1().setUint32(ptr + 4 * i, add, true);\n  }\n  WASM_VECTOR_LEN$1 = array.length;\n  return ptr;\n}\nfunction passStringToWasm0$1(arg, malloc, realloc) {\n  if (realloc === void 0) {\n    const buf = cachedTextEncoder$1.encode(arg);\n    const ptr2 = malloc(buf.length, 1) >>> 0;\n    getUint8ArrayMemory0$1().subarray(ptr2, ptr2 + buf.length).set(buf);\n    WASM_VECTOR_LEN$1 = buf.length;\n    return ptr2;\n  }\n  let len = arg.length;\n  let ptr = malloc(len, 1) >>> 0;\n  const mem = getUint8ArrayMemory0$1();\n  let offset = 0;\n  for (; offset < len; offset++) {\n    const code = arg.charCodeAt(offset);\n    if (code > 127) break;\n    mem[ptr + offset] = code;\n  }\n  if (offset !== len) {\n    if (offset !== 0) {\n      arg = arg.slice(offset);\n    }\n    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n    const view = getUint8ArrayMemory0$1().subarray(ptr + offset, ptr + len);\n    const ret = cachedTextEncoder$1.encodeInto(arg, view);\n    offset += ret.written;\n    ptr = realloc(ptr, len, offset, 1) >>> 0;\n  }\n  WASM_VECTOR_LEN$1 = offset;\n  return ptr;\n}\nfunction takeFromExternrefTable0$1(idx) {\n  const value = wasm$1.__wbindgen_externrefs.get(idx);\n  wasm$1.__externref_table_dealloc(idx);\n  return value;\n}\nlet cachedTextDecoder$1 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });\ncachedTextDecoder$1.decode();\nconst MAX_SAFARI_DECODE_BYTES$1 = 2146435072;\nlet numBytesDecoded$1 = 0;\nfunction decodeText$1(ptr, len) {\n  numBytesDecoded$1 += len;\n  if (numBytesDecoded$1 >= MAX_SAFARI_DECODE_BYTES$1) {\n    cachedTextDecoder$1 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });\n    cachedTextDecoder$1.decode();\n    numBytesDecoded$1 = len;\n  }\n  return cachedTextDecoder$1.decode(getUint8ArrayMemory0$1().subarray(ptr, ptr + len));\n}\nconst cachedTextEncoder$1 = new TextEncoder();\nif (!("encodeInto" in cachedTextEncoder$1)) {\n  cachedTextEncoder$1.encodeInto = function(arg, view) {\n    const buf = cachedTextEncoder$1.encode(arg);\n    view.set(buf);\n    return {\n      read: arg.length,\n      written: buf.length\n    };\n  };\n}\nlet WASM_VECTOR_LEN$1 = 0;\nlet wasm$1;\nfunction __wbg_finalize_init$1(instance, module) {\n  wasm$1 = instance.exports;\n  cachedBigUint64ArrayMemory0$1 = null;\n  cachedDataViewMemory0$1 = null;\n  cachedUint8ArrayMemory0$1 = null;\n  wasm$1.__wbindgen_start();\n  return wasm$1;\n}\nasync function __wbg_load$1(module, imports) {\n  if (typeof Response === "function" && module instanceof Response) {\n    if (!module.ok) {\n      throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching \'${module.url}\'`);\n    }\n    if (typeof WebAssembly.instantiateStreaming === "function") {\n      try {\n        return await WebAssembly.instantiateStreaming(module, imports);\n      } catch (e) {\n        const validResponse = expectedResponseType(module.type);\n        if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {\n          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n", e);\n        } else {\n          throw e;\n        }\n      }\n    }\n    const bytes = await module.arrayBuffer();\n    return await WebAssembly.instantiate(bytes, imports);\n  } else {\n    const instance = await WebAssembly.instantiate(module, imports);\n    if (instance instanceof WebAssembly.Instance) {\n      return { instance, module };\n    } else {\n      return instance;\n    }\n  }\n  function expectedResponseType(type) {\n    switch (type) {\n      case "basic":\n      case "cors":\n      case "default":\n        return true;\n    }\n    return false;\n  }\n}\nfunction initSync$1(module) {\n  if (wasm$1 !== void 0) return wasm$1;\n  if (module !== void 0) {\n    if (Object.getPrototypeOf(module) === Object.prototype) {\n      ({ module } = module);\n    } else {\n      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");\n    }\n  }\n  const imports = __wbg_get_imports$1();\n  if (!(module instanceof WebAssembly.Module)) {\n    module = new WebAssembly.Module(module);\n  }\n  const instance = new WebAssembly.Instance(module, imports);\n  return __wbg_finalize_init$1(instance);\n}\nasync function __wbg_init$1(module_or_path) {\n  if (wasm$1 !== void 0) return wasm$1;\n  if (module_or_path !== void 0) {\n    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {\n      ({ module_or_path } = module_or_path);\n    } else {\n      console.warn("using deprecated parameters for the initialization function; pass a single object instead");\n    }\n  }\n  if (module_or_path === void 0) {\n    module_or_path = new URL();\n  }\n  const imports = __wbg_get_imports$1();\n  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {\n    module_or_path = fetch(module_or_path);\n  }\n  const { instance, module } = await __wbg_load$1(await module_or_path, imports);\n  return __wbg_finalize_init$1(instance);\n}\nvar defaultGlue = /* @__PURE__ */ Object.freeze({\n  __proto__: null,\n  Dialect: Dialect$1,\n  Language: Language$1,\n  Lint: Lint$1,\n  Linter: Linter$1,\n  OrganizedGroup: OrganizedGroup$1,\n  Span: Span$1,\n  Suggestion: Suggestion$1,\n  SuggestionKind: SuggestionKind$1,\n  default: __wbg_init$1,\n  get_default_lint_config: get_default_lint_config$1,\n  get_default_lint_config_as_json: get_default_lint_config_as_json$1,\n  initSync: initSync$1,\n  setup: setup$1,\n  to_title_case: to_title_case$1\n});\nconst Dialect = Object.freeze({\n  American: 0,\n  "0": "American",\n  British: 1,\n  "1": "British",\n  Australian: 2,\n  "2": "Australian",\n  Canadian: 3,\n  "3": "Canadian",\n  Indian: 4,\n  "4": "Indian"\n});\nconst Language = Object.freeze({\n  Plain: 0,\n  "0": "Plain",\n  Markdown: 1,\n  "1": "Markdown",\n  Typst: 2,\n  "2": "Typst"\n});\nclass Lint2 {\n  static __wrap(ptr) {\n    const obj = Object.create(Lint2.prototype);\n    obj.__wbg_ptr = ptr;\n    LintFinalization.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  static __unwrap(jsValue) {\n    if (!(jsValue instanceof Lint2)) {\n      return 0;\n    }\n    return jsValue.__destroy_into_raw();\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    LintFinalization.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm.__wbg_lint_free(ptr, 0);\n  }\n  /**\n   * @param {string} json\n   * @returns {Lint}\n   */\n  static from_json(json) {\n    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.lint_from_json(ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0(ret[1]);\n    }\n    return Lint2.__wrap(ret[0]);\n  }\n  /**\n   * Get the content of the source material pointed to by [`Self::span`]\n   * @returns {string}\n   */\n  get_problem_text() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.lint_get_problem_text(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a string representing the general category of the lint.\n   * @returns {string}\n   */\n  lint_kind() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.lint_lint_kind(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a string representing the general category of the lint.\n   * @returns {string}\n   */\n  lint_kind_pretty() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.lint_lint_kind_pretty(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a description of the error.\n   * @returns {string}\n   */\n  message() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.lint_message(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a description of the error as HTML.\n   * @returns {string}\n   */\n  message_html() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.lint_message_html(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get the location of the problematic text.\n   * @returns {Span}\n   */\n  span() {\n    const ret = wasm.lint_span(this.__wbg_ptr);\n    return Span2.__wrap(ret);\n  }\n  /**\n   * Equivalent to calling `.length` on the result of `suggestions()`.\n   * @returns {number}\n   */\n  suggestion_count() {\n    const ret = wasm.lint_suggestion_count(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * Get an array of any suggestions that may resolve the issue.\n   * @returns {Suggestion[]}\n   */\n  suggestions() {\n    const ret = wasm.lint_suggestions(this.__wbg_ptr);\n    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);\n    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v1;\n  }\n  /**\n   * @returns {string}\n   */\n  to_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.lint_to_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n}\nif (Symbol.dispose) Lint2.prototype[Symbol.dispose] = Lint2.prototype.free;\nclass Linter2 {\n  static __wrap(ptr) {\n    const obj = Object.create(Linter2.prototype);\n    obj.__wbg_ptr = ptr;\n    LinterFinalization.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    LinterFinalization.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm.__wbg_linter_free(ptr, 0);\n  }\n  /**\n   * Apply a suggestion from a given lint.\n   * This action will be logged to the Linter\'s statistics.\n   * @param {string} source_text\n   * @param {Lint} lint\n   * @param {Suggestion} suggestion\n   * @returns {string}\n   */\n  apply_suggestion(source_text, lint, suggestion) {\n    let deferred3_0;\n    let deferred3_1;\n    try {\n      const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n      const len0 = WASM_VECTOR_LEN;\n      _assertClass(lint, Lint2);\n      _assertClass(suggestion, Suggestion2);\n      const ret = wasm.linter_apply_suggestion(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr, suggestion.__wbg_ptr);\n      var ptr2 = ret[0];\n      var len2 = ret[1];\n      if (ret[3]) {\n        ptr2 = 0;\n        len2 = 0;\n        throw takeFromExternrefTable0(ret[2]);\n      }\n      deferred3_0 = ptr2;\n      deferred3_1 = len2;\n      return getStringFromWasm0(ptr2, len2);\n    } finally {\n      wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);\n    }\n  }\n  clear_ignored_lints() {\n    wasm.linter_clear_ignored_lints(this.__wbg_ptr);\n  }\n  /**\n   * Clear the user dictionary.\n   */\n  clear_words() {\n    wasm.linter_clear_words(this.__wbg_ptr);\n  }\n  /**\n   * Compute the context hash of a given lint.\n   * @param {string} source_text\n   * @param {Lint} lint\n   * @returns {bigint}\n   */\n  context_hash(source_text, lint) {\n    const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    _assertClass(lint, Lint2);\n    const ret = wasm.linter_context_hash(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr);\n    return BigInt.asUintN(64, ret);\n  }\n  /**\n   * Export the linter\'s ignored lints as a privacy-respecting JSON list of hashes.\n   * @returns {string}\n   */\n  export_ignored_lints() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.linter_export_ignored_lints(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Export words from the dictionary.\n   * Note: this will only return words previously added by [`Self::import_words`].\n   * @returns {string[]}\n   */\n  export_words() {\n    const ret = wasm.linter_export_words(this.__wbg_ptr);\n    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);\n    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v1;\n  }\n  /**\n   * @returns {string}\n   */\n  generate_stats_file() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.linter_generate_stats_file(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get the dialect this struct was constructed for.\n   * @returns {Dialect}\n   */\n  get_dialect() {\n    const ret = wasm.linter_get_dialect(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {string}\n   */\n  get_lint_config_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.linter_get_lint_config_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {any}\n   */\n  get_lint_config_as_object() {\n    const ret = wasm.linter_get_lint_config_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * Get a JSON map containing the descriptions of all the linting rules, formatted as Markdown.\n   * @returns {string}\n   */\n  get_lint_descriptions_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.linter_get_lint_descriptions_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a Record containing the descriptions of all the linting rules, formatted as Markdown.\n   * @returns {any}\n   */\n  get_lint_descriptions_as_object() {\n    const ret = wasm.linter_get_lint_descriptions_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * Get a JSON map containing the descriptions of all the linting rules, formatted as HTML.\n   * @returns {string}\n   */\n  get_lint_descriptions_html_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * Get a Record containing the descriptions of all the linting rules, formatted as HTML.\n   * @returns {any}\n   */\n  get_lint_descriptions_html_as_object() {\n    const ret = wasm.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {string}\n   */\n  get_structured_lint_config_as_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.linter_get_structured_lint_config_as_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {any}\n   */\n  get_structured_lint_config_as_object() {\n    const ret = wasm.linter_get_structured_lint_config_as_object(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * Add a specific context hash to the ignored lints list.\n   * @param {BigUint64Array} hashes\n   */\n  ignore_hashes(hashes) {\n    const ptr0 = passArray64ToWasm0(hashes, wasm.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN;\n    wasm.linter_ignore_hashes(this.__wbg_ptr, ptr0, len0);\n  }\n  /**\n   * @param {string} source_text\n   * @param {Lint[]} lints\n   */\n  ignore_lints(source_text, lints) {\n    const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ptr1 = passArrayJsValueToWasm0(lints, wasm.__wbindgen_malloc);\n    const len1 = WASM_VECTOR_LEN;\n    wasm.linter_ignore_lints(this.__wbg_ptr, ptr0, len0, ptr1, len1);\n  }\n  /**\n   * Import into the linter\'s ignored lints from a privacy-respecting JSON list of hashes.\n   * @param {string} json\n   */\n  import_ignored_lints(json) {\n    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.linter_import_ignored_lints(this.__wbg_ptr, ptr0, len0);\n    if (ret[1]) {\n      throw takeFromExternrefTable0(ret[0]);\n    }\n  }\n  /**\n   * @param {string} file\n   */\n  import_stats_file(file) {\n    const ptr0 = passStringToWasm0(file, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.linter_import_stats_file(this.__wbg_ptr, ptr0, len0);\n    if (ret[1]) {\n      throw takeFromExternrefTable0(ret[0]);\n    }\n  }\n  /**\n   * Load a Weirpack from raw bytes, merging its rules into the current linter.\n   * Returns test failures if any are found, and does not import in that case.\n   * @param {Uint8Array} bytes\n   * @returns {any}\n   */\n  import_weirpack(bytes) {\n    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.linter_import_weirpack(this.__wbg_ptr, ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0(ret[1]);\n    }\n    return takeFromExternrefTable0(ret[0]);\n  }\n  /**\n   * Import words into the dictionary.\n   * @param {string[]} additional_words\n   */\n  import_words(additional_words) {\n    const ptr0 = passArrayJsValueToWasm0(additional_words, wasm.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN;\n    wasm.linter_import_words(this.__wbg_ptr, ptr0, len0);\n  }\n  /**\n   * Helper method to quickly check if a plain string is likely intended to be English\n   * @param {string} text\n   * @returns {boolean}\n   */\n  is_likely_english(text) {\n    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.linter_is_likely_english(this.__wbg_ptr, ptr0, len0);\n    return ret !== 0;\n  }\n  /**\n   * Helper method to remove non-English text from a plain English document.\n   * @param {string} text\n   * @returns {string}\n   */\n  isolate_english(text) {\n    let deferred2_0;\n    let deferred2_1;\n    try {\n      const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n      const len0 = WASM_VECTOR_LEN;\n      const ret = wasm.linter_isolate_english(this.__wbg_ptr, ptr0, len0);\n      deferred2_0 = ret[0];\n      deferred2_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);\n    }\n  }\n  /**\n   * Perform the configured linting on the provided text.\n   *\n   * If the provided regex mask cannot be parsed, this method will return an empty array.\n   * @param {string} text\n   * @param {Language} language\n   * @param {boolean} all_headings\n   * @param {string | null | undefined} regex_mask\n   * @param {boolean} dedup\n   * @param {boolean} isolate_english\n   * @returns {Lint[]}\n   */\n  lint(text, language, all_headings, regex_mask, dedup, isolate_english) {\n    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    var ptr1 = isLikeNone(regex_mask) ? 0 : passStringToWasm0(regex_mask, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    var len1 = WASM_VECTOR_LEN;\n    const ret = wasm.linter_lint(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);\n    var v3 = getArrayJsValueFromWasm0(ret[0], ret[1]);\n    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v3;\n  }\n  /**\n   * Construct a new `Linter`.\n   * Note that this can mean constructing the curated dictionary, which is the most expensive operation\n   * in Harper.\n   * @param {Dialect} dialect\n   * @returns {Linter}\n   */\n  static new(dialect) {\n    const ret = wasm.linter_new(dialect);\n    return Linter2.__wrap(ret);\n  }\n  /**\n   * @param {string} text\n   * @param {Language} language\n   * @param {boolean} all_headings\n   * @param {string | null | undefined} regex_mask\n   * @param {boolean} dedup\n   * @param {boolean} isolate_english\n   * @returns {OrganizedGroup[]}\n   */\n  organized_lints(text, language, all_headings, regex_mask, dedup, isolate_english) {\n    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    var ptr1 = isLikeNone(regex_mask) ? 0 : passStringToWasm0(regex_mask, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    var len1 = WASM_VECTOR_LEN;\n    const ret = wasm.linter_organized_lints(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);\n    var v3 = getArrayJsValueFromWasm0(ret[0], ret[1]);\n    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v3;\n  }\n  /**\n   * @param {string} json\n   */\n  set_lint_config_from_json(json) {\n    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.linter_set_lint_config_from_json(this.__wbg_ptr, ptr0, len0);\n    if (ret[1]) {\n      throw takeFromExternrefTable0(ret[0]);\n    }\n  }\n  /**\n   * @param {any} object\n   */\n  set_lint_config_from_object(object) {\n    const ret = wasm.linter_set_lint_config_from_object(this.__wbg_ptr, object);\n    if (ret[1]) {\n      throw takeFromExternrefTable0(ret[0]);\n    }\n  }\n  /**\n   * @param {bigint | null} [start_time]\n   * @param {bigint | null} [end_time]\n   * @returns {any}\n   */\n  summarize_stats(start_time, end_time) {\n    const ret = wasm.linter_summarize_stats(this.__wbg_ptr, !isLikeNone(start_time), isLikeNone(start_time) ? BigInt(0) : start_time, !isLikeNone(end_time), isLikeNone(end_time) ? BigInt(0) : end_time);\n    return ret;\n  }\n}\nif (Symbol.dispose) Linter2.prototype[Symbol.dispose] = Linter2.prototype.free;\nclass OrganizedGroup2 {\n  static __wrap(ptr) {\n    const obj = Object.create(OrganizedGroup2.prototype);\n    obj.__wbg_ptr = ptr;\n    OrganizedGroupFinalization.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    OrganizedGroupFinalization.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm.__wbg_organizedgroup_free(ptr, 0);\n  }\n  /**\n   * @returns {string}\n   */\n  get group() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.__wbg_get_organizedgroup_group(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {Lint[]}\n   */\n  get lints() {\n    const ret = wasm.__wbg_get_organizedgroup_lints(this.__wbg_ptr);\n    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);\n    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);\n    return v1;\n  }\n  /**\n   * @param {string} arg0\n   */\n  set group(arg0) {\n    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    wasm.__wbg_set_organizedgroup_group(this.__wbg_ptr, ptr0, len0);\n  }\n  /**\n   * @param {Lint[]} arg0\n   */\n  set lints(arg0) {\n    const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);\n    const len0 = WASM_VECTOR_LEN;\n    wasm.__wbg_set_organizedgroup_lints(this.__wbg_ptr, ptr0, len0);\n  }\n}\nif (Symbol.dispose) OrganizedGroup2.prototype[Symbol.dispose] = OrganizedGroup2.prototype.free;\nclass Span2 {\n  static __wrap(ptr) {\n    const obj = Object.create(Span2.prototype);\n    obj.__wbg_ptr = ptr;\n    SpanFinalization.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    SpanFinalization.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm.__wbg_span_free(ptr, 0);\n  }\n  /**\n   * @returns {number}\n   */\n  get end() {\n    const ret = wasm.__wbg_get_span_end(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * @returns {number}\n   */\n  get start() {\n    const ret = wasm.__wbg_get_span_start(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * @param {number} arg0\n   */\n  set end(arg0) {\n    wasm.__wbg_set_span_end(this.__wbg_ptr, arg0);\n  }\n  /**\n   * @param {number} arg0\n   */\n  set start(arg0) {\n    wasm.__wbg_set_span_start(this.__wbg_ptr, arg0);\n  }\n  /**\n   * @param {string} json\n   * @returns {Span}\n   */\n  static from_json(json) {\n    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.span_from_json(ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0(ret[1]);\n    }\n    return Span2.__wrap(ret[0]);\n  }\n  /**\n   * @returns {boolean}\n   */\n  is_empty() {\n    const ret = wasm.span_is_empty(this.__wbg_ptr);\n    return ret !== 0;\n  }\n  /**\n   * @returns {number}\n   */\n  len() {\n    const ret = wasm.span_len(this.__wbg_ptr);\n    return ret >>> 0;\n  }\n  /**\n   * @param {number} start\n   * @param {number} end\n   * @returns {Span}\n   */\n  static new(start, end) {\n    const ret = wasm.span_new(start, end);\n    return Span2.__wrap(ret);\n  }\n  /**\n   * @returns {string}\n   */\n  to_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.span_to_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n}\nif (Symbol.dispose) Span2.prototype[Symbol.dispose] = Span2.prototype.free;\nclass Suggestion2 {\n  static __wrap(ptr) {\n    const obj = Object.create(Suggestion2.prototype);\n    obj.__wbg_ptr = ptr;\n    SuggestionFinalization.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    SuggestionFinalization.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm.__wbg_suggestion_free(ptr, 0);\n  }\n  /**\n   * @param {string} json\n   * @returns {Suggestion}\n   */\n  static from_json(json) {\n    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.suggestion_from_json(ptr0, len0);\n    if (ret[2]) {\n      throw takeFromExternrefTable0(ret[1]);\n    }\n    return Suggestion2.__wrap(ret[0]);\n  }\n  /**\n   * Get the text that is going to replace the problematic section.\n   * If [`Self::kind`] is `SuggestionKind::Remove`, this will return an empty\n   * string.\n   * @returns {string}\n   */\n  get_replacement_text() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.suggestion_get_replacement_text(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n  /**\n   * @returns {SuggestionKind}\n   */\n  kind() {\n    const ret = wasm.suggestion_kind(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {string}\n   */\n  to_json() {\n    let deferred1_0;\n    let deferred1_1;\n    try {\n      const ret = wasm.suggestion_to_json(this.__wbg_ptr);\n      deferred1_0 = ret[0];\n      deferred1_1 = ret[1];\n      return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n    }\n  }\n}\nif (Symbol.dispose) Suggestion2.prototype[Symbol.dispose] = Suggestion2.prototype.free;\nconst SuggestionKind = Object.freeze({\n  /**\n   * Replace the problematic text.\n   */\n  Replace: 0,\n  "0": "Replace",\n  /**\n   * Remove the problematic text.\n   */\n  Remove: 1,\n  "1": "Remove",\n  /**\n   * Insert additional text after the error.\n   */\n  InsertAfter: 2,\n  "2": "InsertAfter"\n});\nfunction get_default_lint_config() {\n  const ret = wasm.get_default_lint_config();\n  return ret;\n}\nfunction get_default_lint_config_as_json() {\n  let deferred1_0;\n  let deferred1_1;\n  try {\n    const ret = wasm.get_default_lint_config_as_json();\n    deferred1_0 = ret[0];\n    deferred1_1 = ret[1];\n    return getStringFromWasm0(ret[0], ret[1]);\n  } finally {\n    wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n  }\n}\nfunction setup() {\n  wasm.setup();\n}\nfunction to_title_case(text) {\n  let deferred2_0;\n  let deferred2_1;\n  try {\n    const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.to_title_case(ptr0, len0);\n    deferred2_0 = ret[0];\n    deferred2_1 = ret[1];\n    return getStringFromWasm0(ret[0], ret[1]);\n  } finally {\n    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);\n  }\n}\nfunction __wbg_get_imports() {\n  const import0 = {\n    __proto__: null,\n    __wbg_Error_408e67f47ca7b58b: function(arg0, arg1) {\n      const ret = Error(getStringFromWasm0(arg0, arg1));\n      return ret;\n    },\n    __wbg_String_8564e559799eccda: function(arg0, arg1) {\n      const ret = String(arg1);\n      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n      const len1 = WASM_VECTOR_LEN;\n      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg___wbindgen_boolean_get_c9c83ebd41b34df3: function(arg0) {\n      const v = arg0;\n      const ret = typeof v === "boolean" ? v : void 0;\n      return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;\n    },\n    __wbg___wbindgen_debug_string_a57024b9c6e4a48b: function(arg0, arg1) {\n      const ret = debugString(arg1);\n      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n      const len1 = WASM_VECTOR_LEN;\n      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg___wbindgen_is_function_5e4570eb24ffa122: function(arg0) {\n      const ret = typeof arg0 === "function";\n      return ret;\n    },\n    __wbg___wbindgen_is_object_a2790eb24c211ea0: function(arg0) {\n      const val = arg0;\n      const ret = typeof val === "object" && val !== null;\n      return ret;\n    },\n    __wbg___wbindgen_is_string_e6f02f0ea5f20a32: function(arg0) {\n      const ret = typeof arg0 === "string";\n      return ret;\n    },\n    __wbg___wbindgen_jsval_loose_eq_acf2776254a8d832: function(arg0, arg1) {\n      const ret = arg0 == arg1;\n      return ret;\n    },\n    __wbg___wbindgen_number_get_136b9679cab35cfb: function(arg0, arg1) {\n      const obj = arg1;\n      const ret = typeof obj === "number" ? obj : void 0;\n      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);\n      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);\n    },\n    __wbg___wbindgen_string_get_d154f1e671052120: function(arg0, arg1) {\n      const obj = arg1;\n      const ret = typeof obj === "string" ? obj : void 0;\n      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n      var len1 = WASM_VECTOR_LEN;\n      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {\n      throw new Error(getStringFromWasm0(arg0, arg1));\n    },\n    __wbg_call_1c5886ab9c57d1c7: function() {\n      return handleError(function(arg0, arg1) {\n        const ret = arg0.call(arg1);\n        return ret;\n      }, arguments);\n    },\n    __wbg_done_669171204c3dcae2: function(arg0) {\n      const ret = arg0.done;\n      return ret;\n    },\n    __wbg_entries_7774d489e1da5f4f: function(arg0) {\n      const ret = Object.entries(arg0);\n      return ret;\n    },\n    __wbg_error_757e9472f8410341: function(arg0, arg1) {\n      let deferred0_0;\n      let deferred0_1;\n      try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.error(getStringFromWasm0(arg0, arg1));\n      } finally {\n        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);\n      }\n    },\n    __wbg_getRandomValues_a608c4436c19407a: function() {\n      return handleError(function(arg0, arg1) {\n        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));\n      }, arguments);\n    },\n    __wbg_getRandomValues_e446ea5ffdd14ee5: function() {\n      return handleError(function(arg0, arg1) {\n        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));\n      }, arguments);\n    },\n    __wbg_getTime_63fb0332e6c4ec17: function(arg0) {\n      const ret = arg0.getTime();\n      return ret;\n    },\n    __wbg_get_c0c8f8d7da0c03dd: function(arg0, arg1) {\n      const ret = arg0[arg1 >>> 0];\n      return ret;\n    },\n    __wbg_get_d173c0308df22d37: function() {\n      return handleError(function(arg0, arg1) {\n        const ret = Reflect.get(arg0, arg1);\n        return ret;\n      }, arguments);\n    },\n    __wbg_get_unchecked_e20b893aeafc3fca: function(arg0, arg1) {\n      const ret = arg0[arg1 >>> 0];\n      return ret;\n    },\n    __wbg_instanceof_ArrayBuffer_993d02d2d254cad1: function(arg0) {\n      let result;\n      try {\n        result = arg0 instanceof ArrayBuffer;\n      } catch (_) {\n        result = false;\n      }\n      const ret = result;\n      return ret;\n    },\n    __wbg_instanceof_Uint8Array_f935dbb0aa7cdeed: function(arg0) {\n      let result;\n      try {\n        result = arg0 instanceof Uint8Array;\n      } catch (_) {\n        result = false;\n      }\n      const ret = result;\n      return ret;\n    },\n    __wbg_iterator_5cebbb86e33c6dd6: function() {\n      const ret = Symbol.iterator;\n      return ret;\n    },\n    __wbg_length_36bd29c6848c2144: function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    },\n    __wbg_length_ecfa2c63d3d0d82c: function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    },\n    __wbg_lint_new: function(arg0) {\n      const ret = Lint2.__wrap(arg0);\n      return ret;\n    },\n    __wbg_lint_unwrap: function(arg0) {\n      const ret = Lint2.__unwrap(arg0);\n      return ret;\n    },\n    __wbg_log_1f8cbb01c83d06c2: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {\n      let deferred0_0;\n      let deferred0_1;\n      try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));\n      } finally {\n        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);\n      }\n    },\n    __wbg_log_a54ca6b45e09078a: function(arg0, arg1) {\n      let deferred0_0;\n      let deferred0_1;\n      try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.log(getStringFromWasm0(arg0, arg1));\n      } finally {\n        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);\n      }\n    },\n    __wbg_mark_6b7f03786f5e4d61: function(arg0, arg1) {\n      performance.mark(getStringFromWasm0(arg0, arg1));\n    },\n    __wbg_measure_0e21b33a1c6e3a29: function() {\n      return handleError(function(arg0, arg1, arg2, arg3) {\n        let deferred0_0;\n        let deferred0_1;\n        let deferred1_0;\n        let deferred1_1;\n        try {\n          deferred0_0 = arg0;\n          deferred0_1 = arg1;\n          deferred1_0 = arg2;\n          deferred1_1 = arg3;\n          performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));\n        } finally {\n          wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);\n          wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n        }\n      }, arguments);\n    },\n    __wbg_new_0_f117d868b403dc07: function() {\n      const ret = /* @__PURE__ */ new Date();\n      return ret;\n    },\n    __wbg_new_116be93542d39019: function() {\n      const ret = new Array();\n      return ret;\n    },\n    __wbg_new_227d7c05414eb861: function() {\n      const ret = new Error();\n      return ret;\n    },\n    __wbg_new_77cc4f4f472aeb81: function(arg0) {\n      const ret = new Uint8Array(arg0);\n      return ret;\n    },\n    __wbg_new_cdf041679ded4c5f: function() {\n      const ret = /* @__PURE__ */ new Map();\n      return ret;\n    },\n    __wbg_new_ebe3e0f6837f0879: function() {\n      const ret = new Object();\n      return ret;\n    },\n    __wbg_next_42cf16ee0dafc9e2: function() {\n      return handleError(function(arg0) {\n        const ret = arg0.next();\n        return ret;\n      }, arguments);\n    },\n    __wbg_next_8f26b64fa5e9f64b: function(arg0) {\n      const ret = arg0.next;\n      return ret;\n    },\n    __wbg_organizedgroup_new: function(arg0) {\n      const ret = OrganizedGroup2.__wrap(arg0);\n      return ret;\n    },\n    __wbg_prototypesetcall_de8e0d9553586985: function(arg0, arg1, arg2) {\n      Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);\n    },\n    __wbg_set_014226dfeca53178: function(arg0, arg1, arg2) {\n      const ret = arg0.set(arg1, arg2);\n      return ret;\n    },\n    __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {\n      arg0[arg1] = arg2;\n    },\n    __wbg_set_a80955eb93b145c6: function(arg0, arg1, arg2) {\n      arg0[arg1 >>> 0] = arg2;\n    },\n    __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {\n      const ret = arg1.stack;\n      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n      const len1 = WASM_VECTOR_LEN;\n      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);\n      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);\n    },\n    __wbg_suggestion_new: function(arg0) {\n      const ret = Suggestion2.__wrap(arg0);\n      return ret;\n    },\n    __wbg_value_1e2369fab29b420e: function(arg0) {\n      const ret = arg0.value;\n      return ret;\n    },\n    __wbindgen_cast_0000000000000001: function(arg0) {\n      const ret = arg0;\n      return ret;\n    },\n    __wbindgen_cast_0000000000000002: function(arg0, arg1) {\n      const ret = getStringFromWasm0(arg0, arg1);\n      return ret;\n    },\n    __wbindgen_init_externref_table: function() {\n      const table = wasm.__wbindgen_externrefs;\n      const offset = table.grow(4);\n      table.set(0, void 0);\n      table.set(offset + 0, void 0);\n      table.set(offset + 1, null);\n      table.set(offset + 2, true);\n      table.set(offset + 3, false);\n    }\n  };\n  return {\n    __proto__: null,\n    "./harper_wasm_bg.js": import0\n  };\n}\nconst LintFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm.__wbg_lint_free(ptr, 1));\nconst LinterFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm.__wbg_linter_free(ptr, 1));\nconst OrganizedGroupFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm.__wbg_organizedgroup_free(ptr, 1));\nconst SpanFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm.__wbg_span_free(ptr, 1));\nconst SuggestionFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {\n}, unregister: () => {\n} } : new FinalizationRegistry((ptr) => wasm.__wbg_suggestion_free(ptr, 1));\nfunction addToExternrefTable0(obj) {\n  const idx = wasm.__externref_table_alloc();\n  wasm.__wbindgen_externrefs.set(idx, obj);\n  return idx;\n}\nfunction _assertClass(instance, klass) {\n  if (!(instance instanceof klass)) {\n    throw new Error(`expected instance of ${klass.name}`);\n  }\n}\nfunction debugString(val) {\n  const type = typeof val;\n  if (type == "number" || type == "boolean" || val == null) {\n    return `${val}`;\n  }\n  if (type == "string") {\n    return `"${val}"`;\n  }\n  if (type == "symbol") {\n    const description = val.description;\n    if (description == null) {\n      return "Symbol";\n    } else {\n      return `Symbol(${description})`;\n    }\n  }\n  if (type == "function") {\n    const name = val.name;\n    if (typeof name == "string" && name.length > 0) {\n      return `Function(${name})`;\n    } else {\n      return "Function";\n    }\n  }\n  if (Array.isArray(val)) {\n    const length = val.length;\n    let debug = "[";\n    if (length > 0) {\n      debug += debugString(val[0]);\n    }\n    for (let i = 1; i < length; i++) {\n      debug += ", " + debugString(val[i]);\n    }\n    debug += "]";\n    return debug;\n  }\n  const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));\n  let className;\n  if (builtInMatches && builtInMatches.length > 1) {\n    className = builtInMatches[1];\n  } else {\n    return toString.call(val);\n  }\n  if (className == "Object") {\n    try {\n      return "Object(" + JSON.stringify(val) + ")";\n    } catch (_) {\n      return "Object";\n    }\n  }\n  if (val instanceof Error) {\n    return `${val.name}: ${val.message}\n${val.stack}`;\n  }\n  return className;\n}\nfunction getArrayJsValueFromWasm0(ptr, len) {\n  ptr = ptr >>> 0;\n  const mem = getDataViewMemory0();\n  const result = [];\n  for (let i = ptr; i < ptr + 4 * len; i += 4) {\n    result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));\n  }\n  wasm.__externref_drop_slice(ptr, len);\n  return result;\n}\nfunction getArrayU8FromWasm0(ptr, len) {\n  ptr = ptr >>> 0;\n  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);\n}\nlet cachedBigUint64ArrayMemory0 = null;\nfunction getBigUint64ArrayMemory0() {\n  if (cachedBigUint64ArrayMemory0 === null || cachedBigUint64ArrayMemory0.byteLength === 0) {\n    cachedBigUint64ArrayMemory0 = new BigUint64Array(wasm.memory.buffer);\n  }\n  return cachedBigUint64ArrayMemory0;\n}\nlet cachedDataViewMemory0 = null;\nfunction getDataViewMemory0() {\n  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {\n    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);\n  }\n  return cachedDataViewMemory0;\n}\nfunction getStringFromWasm0(ptr, len) {\n  return decodeText(ptr >>> 0, len);\n}\nlet cachedUint8ArrayMemory0 = null;\nfunction getUint8ArrayMemory0() {\n  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {\n    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);\n  }\n  return cachedUint8ArrayMemory0;\n}\nfunction handleError(f, args) {\n  try {\n    return f.apply(this, args);\n  } catch (e) {\n    const idx = addToExternrefTable0(e);\n    wasm.__wbindgen_exn_store(idx);\n  }\n}\nfunction isLikeNone(x) {\n  return x === void 0 || x === null;\n}\nfunction passArray64ToWasm0(arg, malloc) {\n  const ptr = malloc(arg.length * 8, 8) >>> 0;\n  getBigUint64ArrayMemory0().set(arg, ptr / 8);\n  WASM_VECTOR_LEN = arg.length;\n  return ptr;\n}\nfunction passArray8ToWasm0(arg, malloc) {\n  const ptr = malloc(arg.length * 1, 1) >>> 0;\n  getUint8ArrayMemory0().set(arg, ptr / 1);\n  WASM_VECTOR_LEN = arg.length;\n  return ptr;\n}\nfunction passArrayJsValueToWasm0(array, malloc) {\n  const ptr = malloc(array.length * 4, 4) >>> 0;\n  for (let i = 0; i < array.length; i++) {\n    const add = addToExternrefTable0(array[i]);\n    getDataViewMemory0().setUint32(ptr + 4 * i, add, true);\n  }\n  WASM_VECTOR_LEN = array.length;\n  return ptr;\n}\nfunction passStringToWasm0(arg, malloc, realloc) {\n  if (realloc === void 0) {\n    const buf = cachedTextEncoder.encode(arg);\n    const ptr2 = malloc(buf.length, 1) >>> 0;\n    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);\n    WASM_VECTOR_LEN = buf.length;\n    return ptr2;\n  }\n  let len = arg.length;\n  let ptr = malloc(len, 1) >>> 0;\n  const mem = getUint8ArrayMemory0();\n  let offset = 0;\n  for (; offset < len; offset++) {\n    const code = arg.charCodeAt(offset);\n    if (code > 127) break;\n    mem[ptr + offset] = code;\n  }\n  if (offset !== len) {\n    if (offset !== 0) {\n      arg = arg.slice(offset);\n    }\n    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);\n    const ret = cachedTextEncoder.encodeInto(arg, view);\n    offset += ret.written;\n    ptr = realloc(ptr, len, offset, 1) >>> 0;\n  }\n  WASM_VECTOR_LEN = offset;\n  return ptr;\n}\nfunction takeFromExternrefTable0(idx) {\n  const value = wasm.__wbindgen_externrefs.get(idx);\n  wasm.__externref_table_dealloc(idx);\n  return value;\n}\nlet cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });\ncachedTextDecoder.decode();\nconst MAX_SAFARI_DECODE_BYTES = 2146435072;\nlet numBytesDecoded = 0;\nfunction decodeText(ptr, len) {\n  numBytesDecoded += len;\n  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {\n    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });\n    cachedTextDecoder.decode();\n    numBytesDecoded = len;\n  }\n  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));\n}\nconst cachedTextEncoder = new TextEncoder();\nif (!("encodeInto" in cachedTextEncoder)) {\n  cachedTextEncoder.encodeInto = function(arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n      read: arg.length,\n      written: buf.length\n    };\n  };\n}\nlet WASM_VECTOR_LEN = 0;\nlet wasm;\nfunction __wbg_finalize_init(instance, module) {\n  wasm = instance.exports;\n  cachedBigUint64ArrayMemory0 = null;\n  cachedDataViewMemory0 = null;\n  cachedUint8ArrayMemory0 = null;\n  wasm.__wbindgen_start();\n  return wasm;\n}\nasync function __wbg_load(module, imports) {\n  if (typeof Response === "function" && module instanceof Response) {\n    if (!module.ok) {\n      throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching \'${module.url}\'`);\n    }\n    if (typeof WebAssembly.instantiateStreaming === "function") {\n      try {\n        return await WebAssembly.instantiateStreaming(module, imports);\n      } catch (e) {\n        const validResponse = expectedResponseType(module.type);\n        if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {\n          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n", e);\n        } else {\n          throw e;\n        }\n      }\n    }\n    const bytes = await module.arrayBuffer();\n    return await WebAssembly.instantiate(bytes, imports);\n  } else {\n    const instance = await WebAssembly.instantiate(module, imports);\n    if (instance instanceof WebAssembly.Instance) {\n      return { instance, module };\n    } else {\n      return instance;\n    }\n  }\n  function expectedResponseType(type) {\n    switch (type) {\n      case "basic":\n      case "cors":\n      case "default":\n        return true;\n    }\n    return false;\n  }\n}\nfunction initSync(module) {\n  if (wasm !== void 0) return wasm;\n  if (module !== void 0) {\n    if (Object.getPrototypeOf(module) === Object.prototype) {\n      ({ module } = module);\n    } else {\n      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");\n    }\n  }\n  const imports = __wbg_get_imports();\n  if (!(module instanceof WebAssembly.Module)) {\n    module = new WebAssembly.Module(module);\n  }\n  const instance = new WebAssembly.Instance(module, imports);\n  return __wbg_finalize_init(instance);\n}\nasync function __wbg_init(module_or_path) {\n  if (wasm !== void 0) return wasm;\n  if (module_or_path !== void 0) {\n    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {\n      ({ module_or_path } = module_or_path);\n    } else {\n      console.warn("using deprecated parameters for the initialization function; pass a single object instead");\n    }\n  }\n  if (module_or_path === void 0) {\n    module_or_path = new URL();\n  }\n  const imports = __wbg_get_imports();\n  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {\n    module_or_path = fetch(module_or_path);\n  }\n  const { instance, module } = await __wbg_load(await module_or_path, imports);\n  return __wbg_finalize_init(instance);\n}\nvar fullGlue = /* @__PURE__ */ Object.freeze({\n  __proto__: null,\n  Dialect,\n  Language,\n  Lint: Lint2,\n  Linter: Linter2,\n  OrganizedGroup: OrganizedGroup2,\n  Span: Span2,\n  Suggestion: Suggestion2,\n  SuggestionKind,\n  default: __wbg_init,\n  get_default_lint_config,\n  get_default_lint_config_as_json,\n  initSync,\n  setup,\n  to_title_case\n});\nconst _PLazy = class _PLazy extends Promise {\n  constructor(executor) {\n    super((resolve) => {\n      resolve();\n    });\n    __privateAdd(this, _executor);\n    __privateAdd(this, _promise);\n    __privateSet(this, _executor, executor);\n  }\n  static from(function_) {\n    return new _PLazy((resolve) => {\n      resolve(function_());\n    });\n  }\n  static resolve(value) {\n    return new _PLazy((resolve) => {\n      resolve(value);\n    });\n  }\n  static reject(error) {\n    return new _PLazy((resolve, reject) => {\n      reject(error);\n    });\n  }\n  then(onFulfilled, onRejected) {\n    __privateGet(this, _promise) ?? __privateSet(this, _promise, new Promise(__privateGet(this, _executor)));\n    return __privateGet(this, _promise).then(onFulfilled, onRejected);\n  }\n  catch(onRejected) {\n    __privateGet(this, _promise) ?? __privateSet(this, _promise, new Promise(__privateGet(this, _executor)));\n    return __privateGet(this, _promise).catch(onRejected);\n  }\n  finally(onFinally) {\n    __privateGet(this, _promise) ?? __privateSet(this, _promise, new Promise(__privateGet(this, _executor)));\n    return __privateGet(this, _promise).finally(onFinally);\n  }\n};\n_executor = new WeakMap();\n_promise = new WeakMap();\nlet PLazy = _PLazy;\nconst copyProperty = (to, from, property, ignoreNonConfigurable) => {\n  if (property === "length" || property === "prototype") {\n    return;\n  }\n  if (property === "arguments" || property === "caller") {\n    return;\n  }\n  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);\n  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);\n  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {\n    return;\n  }\n  Object.defineProperty(to, property, fromDescriptor);\n};\nconst canCopyProperty = function(toDescriptor, fromDescriptor) {\n  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);\n};\nconst changePrototype = (to, from) => {\n  const fromPrototype = Object.getPrototypeOf(from);\n  if (fromPrototype === Object.getPrototypeOf(to)) {\n    return;\n  }\n  Object.setPrototypeOf(to, fromPrototype);\n};\nconst wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;\nconst toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");\nconst toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");\nconst changeToString = (to, from, name) => {\n  const withName = name === "" ? "" : `with ${name.trim()}() `;\n  const newToString = wrappedToString.bind(null, withName, from.toString());\n  Object.defineProperty(newToString, "name", toStringName);\n  Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });\n};\nfunction mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {\n  const { name } = to;\n  for (const property of Reflect.ownKeys(from)) {\n    copyProperty(to, from, property, ignoreNonConfigurable);\n  }\n  changePrototype(to, from);\n  changeToString(to, from, name);\n  return to;\n}\nconst cacheStore = /* @__PURE__ */ new WeakMap();\nfunction pMemoize(fn, { cacheKey = ([firstArgument]) => firstArgument, cache = /* @__PURE__ */ new Map() } = {}) {\n  const promiseCache = /* @__PURE__ */ new Map();\n  const memoized = function(...arguments_) {\n    const key = cacheKey(arguments_);\n    if (promiseCache.has(key)) {\n      return promiseCache.get(key);\n    }\n    const promise = (async () => {\n      try {\n        if (cache && await cache.has(key)) {\n          return await cache.get(key);\n        }\n        const promise2 = fn.apply(this, arguments_);\n        const result = await promise2;\n        try {\n          return result;\n        } finally {\n          if (cache) {\n            await cache.set(key, result);\n          }\n        }\n      } finally {\n        promiseCache.delete(key);\n      }\n    })();\n    promiseCache.set(key, promise);\n    return promise;\n  };\n  mimicFunction(memoized, fn, {\n    ignoreNonConfigurable: true\n  });\n  cacheStore.set(memoized, cache);\n  return memoized;\n}\nfunction inferGlueFlavor(binary) {\n  return binary.includes("harper_wasm_slim") ? "slim" : "full";\n}\nfunction loadGlue(glueFlavor) {\n  if (glueFlavor === "slim") {\n    return defaultGlue;\n  }\n  return fullGlue;\n}\nfunction getDefaultGlueBinary(binary, glueFlavor) {\n  if (glueFlavor === "slim") {\n    return binary;\n  }\n  if (binary.includes("harper_wasm_bg.wasm")) {\n    return binary.replace("harper_wasm_bg.wasm", "harper_wasm_slim_bg.wasm");\n  }\n  return null;\n}\nfunction getInitInput(binary) {\n  if (typeof process !== "undefined" && binary.startsWith("file://")) {\n    return Promise.resolve().then(function() {\n      return __viteBrowserExternal$1;\n    }).then(\n      (fs) => new Promise((resolve, reject) => {\n        fs.readFile(new URL(binary).pathname, (err, data) => {\n          if (err) reject(err);\n          resolve(data);\n        });\n      })\n    );\n  }\n  return binary;\n}\nasync function loadBinaryUncached(binary, glueFlavor) {\n  const exports = loadGlue(glueFlavor);\n  const defaultGlueBinary = getDefaultGlueBinary(binary, glueFlavor);\n  if (defaultGlueBinary != null) {\n    try {\n      await __wbg_init$1({ module_or_path: getInitInput(defaultGlueBinary) });\n    } catch (err) {\n      if (glueFlavor === "slim") {\n        throw err;\n      }\n    }\n  }\n  await exports.default({ module_or_path: getInitInput(binary) });\n  return exports;\n}\nconst loadBinaryByFlavor = {\n  full: pMemoize((binary) => loadBinaryUncached(binary, "full")),\n  slim: pMemoize((binary) => loadBinaryUncached(binary, "slim"))\n};\nfunction loadBinary(binary, glueFlavor) {\n  return loadBinaryByFlavor[glueFlavor](binary);\n}\nclass BinaryModuleImpl {\n  constructor() {\n    __publicField(this, "url", "");\n    __publicField(this, "glueFlavor", "full");\n    __publicField(this, "inner", null);\n  }\n  /** Load a binary from a specified URL. This is the only recommended way to construct this type. */\n  static create(url, glueFlavor) {\n    const module = new SuperBinaryModule();\n    module.url = url;\n    module.glueFlavor = glueFlavor ?? inferGlueFlavor(typeof url === "string" ? url : url.href);\n    module.inner = PLazy.from(\n      () => loadBinary(typeof module.url === "string" ? module.url : module.url.href, module.glueFlavor)\n    );\n    return module;\n  }\n  async getDefaultLintConfigAsJSON() {\n    const exported = await this.inner;\n    return exported.get_default_lint_config_as_json();\n  }\n  async getDefaultLintConfig() {\n    const exported = await this.inner;\n    return exported.get_default_lint_config();\n  }\n  async toTitleCase(text) {\n    const exported = await this.inner;\n    return exported.to_title_case(text);\n  }\n  async setup() {\n    const exported = await this.inner;\n    exported.setup();\n  }\n}\nclass SuperBinaryModule extends BinaryModuleImpl {\n  async createLinter(dialect) {\n    const exported = await this.getBinaryModule();\n    return exported.Linter.new(dialect ?? Dialect$1.American);\n  }\n  async getBinaryModule() {\n    return await PLazy.from(\n      () => loadBinary(typeof this.url === "string" ? this.url : this.url.href, this.glueFlavor)\n    );\n  }\n}\nfunction toWasmLanguage(language) {\n  switch (language) {\n    case "plaintext":\n      return Language$1.Plain;\n    case "typst":\n      return Language$1.Typst;\n    case "markdown":\n    case void 0:\n      return Language$1.Markdown;\n    default:\n      console.warn(`Unknown Harper language \'${String(language)}\'; using markdown.`);\n      return Language$1.Markdown;\n  }\n}\nfunction toWasmLintArgs(text, options) {\n  return [\n    text,\n    toWasmLanguage(options == null ? void 0 : options.language),\n    (options == null ? void 0 : options.forceAllHeadings) ?? false,\n    options == null ? void 0 : options.regex_mask,\n    (options == null ? void 0 : options.dedup) ?? true,\n    (options == null ? void 0 : options.isolateEnglish) ?? false\n  ];\n}\nclass LocalLinter {\n  constructor(init) {\n    __publicField(this, "binary");\n    __publicField(this, "inner");\n    __publicField(this, "disposed", false);\n    this.binary = init.binary;\n    this.binary.setup();\n    this.inner = this.createInner(init.dialect);\n  }\n  createInner(dialect) {\n    return PLazy.from(async () => {\n      await this.binary.setup();\n      return this.binary.createLinter(dialect);\n    });\n  }\n  async setup() {\n    await this.lint("", { language: "plaintext" });\n    const exported = await this.exportIgnoredLints();\n    await this.importIgnoredLints(exported);\n  }\n  async lint(text, options) {\n    const inner = await this.inner;\n    return inner.lint(...toWasmLintArgs(text, options));\n  }\n  async organizedLints(text, options) {\n    const inner = await this.inner;\n    const lintGroups = inner.organized_lints(...toWasmLintArgs(text, options));\n    const output = {};\n    for (const group of lintGroups) {\n      output[group.group] = group.lints;\n      group.free();\n    }\n    return output;\n  }\n  async applySuggestion(text, lint, suggestion) {\n    const inner = await this.inner;\n    return inner.apply_suggestion(text, lint, suggestion);\n  }\n  async isLikelyEnglish(text) {\n    const inner = await this.inner;\n    return inner.is_likely_english(text);\n  }\n  async isolateEnglish(text) {\n    const inner = await this.inner;\n    return inner.isolate_english(text);\n  }\n  async getLintConfig() {\n    const inner = await this.inner;\n    return inner.get_lint_config_as_object();\n  }\n  async getDefaultLintConfigAsJSON() {\n    return await this.binary.getDefaultLintConfigAsJSON();\n  }\n  async getDefaultLintConfig() {\n    return await this.binary.getDefaultLintConfig();\n  }\n  async getStructuredLintConfig() {\n    const inner = await this.inner;\n    return inner.get_structured_lint_config_as_object();\n  }\n  async getStructuredLintConfigJSON() {\n    const inner = await this.inner;\n    return inner.get_structured_lint_config_as_json();\n  }\n  async setLintConfig(config) {\n    const inner = await this.inner;\n    inner.set_lint_config_from_object(config);\n  }\n  async getLintConfigAsJSON() {\n    const inner = await this.inner;\n    return inner.get_lint_config_as_json();\n  }\n  async setLintConfigWithJSON(config) {\n    const inner = await this.inner;\n    inner.set_lint_config_from_json(config);\n  }\n  async toTitleCase(text) {\n    return await this.binary.toTitleCase(text);\n  }\n  async getLintDescriptions() {\n    const inner = await this.inner;\n    return inner.get_lint_descriptions_as_object();\n  }\n  async getLintDescriptionsAsJSON() {\n    const inner = await this.inner;\n    return inner.get_lint_descriptions_as_json();\n  }\n  async getLintDescriptionsHTML() {\n    const inner = await this.inner;\n    return inner.get_lint_descriptions_html_as_object();\n  }\n  async getLintDescriptionsHTMLAsJSON() {\n    const inner = await this.inner;\n    return inner.get_lint_descriptions_html_as_json();\n  }\n  async ignoreLint(source, lint) {\n    return await this.ignoreLints(source, [lint]);\n  }\n  async ignoreLints(source, lints) {\n    const inner = await this.inner;\n    inner.ignore_lints(source, lints);\n  }\n  async ignoreLintHash(hash) {\n    const inner = await this.inner;\n    inner.ignore_hashes(new BigUint64Array([hash]));\n  }\n  async exportIgnoredLints() {\n    const inner = await this.inner;\n    return inner.export_ignored_lints();\n  }\n  async importIgnoredLints(json) {\n    const inner = await this.inner;\n    inner.import_ignored_lints(json);\n  }\n  async contextHash(source, lint) {\n    const inner = await this.inner;\n    return inner.context_hash(source, lint);\n  }\n  async clearIgnoredLints() {\n    const inner = await this.inner;\n    inner.clear_ignored_lints();\n  }\n  async clearWords() {\n    const inner = await this.inner;\n    return inner.clear_words();\n  }\n  async importWords(words) {\n    const inner = await this.inner;\n    return inner.import_words(words);\n  }\n  async exportWords() {\n    const inner = await this.inner;\n    return inner.export_words();\n  }\n  async getDialect() {\n    const inner = await this.inner;\n    return inner.get_dialect();\n  }\n  async setDialect(dialect) {\n    const inner = await this.inner;\n    if (inner.get_dialect() !== dialect) {\n      inner.free();\n      this.inner = this.createInner(dialect);\n    }\n    return Promise.resolve();\n  }\n  async summarizeStats(start, end) {\n    const inner = await this.inner;\n    return inner.summarize_stats(start, end);\n  }\n  async generateStatsFile() {\n    const inner = await this.inner;\n    return inner.generate_stats_file();\n  }\n  async importStatsFile(statsFile) {\n    const inner = await this.inner;\n    return inner.import_stats_file(statsFile);\n  }\n  /**\n   * Load a Weirpack from a Blob.\n   *\n   * Returns `undefined` if tests pass and rules are imported, otherwise returns\n   * the Weirpack test failures.\n   */\n  async loadWeirpackFromBlob(blob) {\n    const bytes = new Uint8Array(await blob.arrayBuffer());\n    return this.loadWeirpackFromBytes(bytes);\n  }\n  /**\n   * Load a Weirpack from a byte array.\n   *\n   * Returns `undefined` if tests pass and rules are imported, otherwise returns\n   * the Weirpack test failures.\n   */\n  async loadWeirpackFromBytes(bytes) {\n    const inner = await this.inner;\n    const data = bytes instanceof Uint8Array ? bytes : Uint8Array.from(bytes);\n    const result = inner.import_weirpack(data);\n    return result;\n  }\n  async dispose() {\n    if (this.disposed) {\n      return;\n    }\n    this.disposed = true;\n    const inner = await this.inner;\n    inner.free();\n  }\n}\nfunction assert(condition, message) {\n  if (!condition) {\n    throw new Error("Assertion failed");\n  }\n}\nfunction isSerializedRequest(v) {\n  return typeof v === "object" && v !== null && "procName" in v && "args" in v;\n}\nclass Serializer {\n  constructor(binary) {\n    __publicField(this, "binary");\n    this.binary = binary;\n    this.binary.setup();\n  }\n  async serializeArg(arg) {\n    var _a;\n    const { Lint: Lint3, Span: Span3, Suggestion: Suggestion3 } = await this.binary.getBinaryModule();\n    if (Array.isArray(arg)) {\n      return {\n        json: JSON.stringify(await Promise.all(arg.map((a) => this.serializeArg(a)))),\n        type: "Array"\n      };\n    }\n    const argType = typeof arg;\n    switch (argType) {\n      case "string":\n      case "number":\n      case "boolean":\n      case "undefined":\n        return { json: JSON.stringify(arg), type: argType };\n      case "bigint":\n        return { json: arg.toString(), type: argType };\n    }\n    if (arg.to_json !== void 0) {\n      const json = arg.to_json();\n      let type;\n      const constructorName = (_a = arg.constructor) == null ? void 0 : _a.name;\n      if (arg instanceof Lint3 || constructorName === "Lint") {\n        type = "Lint";\n      } else if (arg instanceof Suggestion3 || constructorName === "Suggestion") {\n        type = "Suggestion";\n      } else if (arg instanceof Span3 || constructorName === "Span") {\n        type = "Span";\n      }\n      if (type === void 0) {\n        throw new Error("Unhandled case: type undefined");\n      }\n      return { json, type };\n    }\n    if (argType == "object") {\n      return {\n        json: JSON.stringify(\n          await Promise.all(\n            Object.entries(arg).map(([key, value]) => this.serializeArg([key, value]))\n          )\n        ),\n        type: "object"\n      };\n    }\n    throw new Error(`Unhandled case: ${arg}`);\n  }\n  async serialize(req) {\n    return {\n      procName: req.procName,\n      args: await Promise.all(req.args.map((arg) => this.serializeArg(arg)))\n    };\n  }\n  async deserializeArg(requestArg) {\n    const { Lint: Lint3, Span: Span3, Suggestion: Suggestion3 } = await this.binary.getBinaryModule();\n    switch (requestArg.type) {\n      case "bigint":\n        return BigInt(requestArg.json);\n      case "undefined":\n        return void 0;\n      case "boolean":\n      case "number":\n      case "string":\n        return JSON.parse(requestArg.json);\n      case "Suggestion":\n        return Suggestion3.from_json(requestArg.json);\n      case "Lint":\n        return Lint3.from_json(requestArg.json);\n      case "Span":\n        return Span3.from_json(requestArg.json);\n      case "Array": {\n        const parsed = JSON.parse(requestArg.json);\n        assert(Array.isArray(parsed));\n        return await Promise.all(parsed.map((arg) => this.deserializeArg(arg)));\n      }\n      case "object": {\n        const parsed = JSON.parse(requestArg.json);\n        return Object.fromEntries(\n          await Promise.all(parsed.map((val) => this.deserializeArg(val)))\n        );\n      }\n      default:\n        throw new Error(`Unhandled case: ${requestArg.type}`);\n    }\n  }\n  async deserialize(request) {\n    return {\n      procName: request.procName,\n      args: await Promise.all(request.args.map((arg) => this.deserializeArg(arg)))\n    };\n  }\n}\nself.postMessage("ready");\nself.onmessage = (e) => {\n  const [binaryUrl, dialect, glueFlavor] = e.data;\n  if (typeof binaryUrl !== "string") {\n    throw new TypeError(`Expected binary to be a string of url but got ${typeof binaryUrl}.`);\n  }\n  if (glueFlavor !== void 0 && glueFlavor !== "full" && glueFlavor !== "slim") {\n    throw new TypeError(`Expected glue flavor to be "full" or "slim" but got ${glueFlavor}.`);\n  }\n  const binary = SuperBinaryModule.create(binaryUrl, glueFlavor);\n  const serializer = new Serializer(binary);\n  const linter = new LocalLinter({ binary, dialect });\n  async function processRequest(v) {\n    const { procName, args } = await serializer.deserialize(v);\n    if (procName in linter) {\n      const res = await linter[procName](...args);\n      postMessage(await serializer.serializeArg(res));\n    }\n  }\n  self.onmessage = (e2) => {\n    if (isSerializedRequest(e2.data)) {\n      processRequest(e2.data);\n    }\n  };\n};\nvar __viteBrowserExternal = {};\nvar __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze({\n  __proto__: null,\n  default: __viteBrowserExternal\n});\n';
var blob = typeof self !== "undefined" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", jsContent], { type: "text/javascript;charset=utf-8" });
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b[i2] = start += 1 << eb[i2 - 1];
  }
  var r = new i32(b[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j = b[i2]; j < b[i2 + 1]; ++j) {
      r[j] = j - b[i2] << 5 | i2;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var et = /* @__PURE__ */ new u8(0);
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}

// ../../outputs/read-along-web/harper-grammar.mjs
var base = new URL("./", import.meta.url);
var wasmUrl = new URL("./vendor/harper/harper_wasm_bg.wasm", import.meta.url).href;
var chunkVersion = "45831d47694ee8f2da6a691c099ba8d6be637e5367434e4e8333498cf6ec10fc";
var chunkParts = [
  { name: "harper_wasm_bg.wasm.gz.part0", bytes: 2716561 },
  { name: "harper_wasm_bg.wasm.gz.part1", bytes: 2716561 },
  { name: "harper_wasm_bg.wasm.gz.part2", bytes: 2716561 }
];
var chunkHosts = [
  "https://gcore.jsdelivr.net/gh/FXA0919/judou-web@main/",
  "https://cdn.jsdelivr.net/gh/FXA0919/judou-web@main/",
  "https://fastly.jsdelivr.net/gh/FXA0919/judou-web@main/"
];
var autoFixKinds = /* @__PURE__ */ new Set([
  "Agreement",
  "BoundaryError",
  "Capitalization",
  "Grammar",
  "Miscellaneous",
  "Punctuation",
  "Spelling",
  "Typo",
  "WordOrder"
]);
var preferLocalModel = Boolean(
  globalThis.Capacitor?.isNativePlatform?.() || globalThis.Capacitor?.getPlatform?.() === "android" || globalThis.androidBridge || typeof location !== "undefined" && location.search.includes("desktop=1")
);
var originalFetch = globalThis.fetch.bind(globalThis);
var linterPromise = null;
var activeStageCallback = () => {
};
function isHarperGrammarAvailable() {
  return true;
}
async function warmUpHarperGrammar(onStage = () => {
}) {
  if (!linterPromise) {
    activeStageCallback = typeof onStage === "function" ? onStage : () => {
    };
    linterPromise = (async () => {
      onStage("\u52A0\u8F7D\u672C\u5730\u8BED\u6CD5\u6A21\u578B");
      const binaryUrl = await resolveWasmUrl();
      const binary = createBinaryModuleFromUrl(binaryUrl, "full");
      const linter = new LocalLinter({ binary });
      await linter.setup();
      return linter;
    })().catch((error) => {
      linterPromise = null;
      throw error;
    });
  }
  return linterPromise;
}
async function resolveWasmUrl() {
  if (preferLocalModel || !("DecompressionStream" in globalThis)) {
    return wasmUrl;
  }
  try {
    const buffer = await fetchCompressedWasm();
    const blobUrl = URL.createObjectURL(
      new Blob([buffer], { type: "application/wasm" })
    );
    return blobUrl;
  } catch (error) {
    activeStageCallback("\u52A0\u901F\u6E90\u4E0D\u53EF\u7528\uFF0C\u5207\u6362\u672C\u5730\u8BED\u6CD5\u6A21\u578B");
    return wasmUrl;
  }
}
async function fetchCompressedWasm() {
  let received = 0;
  const gzipSize = chunkParts.reduce((sum, part) => sum + part.bytes, 0);
  const parts = await Promise.all(
    chunkParts.map(
      (part) => fetchChunkPart(part).then((buffer) => {
        received += buffer.byteLength;
        const percent = Math.min(100, Math.round(received / gzipSize * 100));
        activeStageCallback(`\u52A0\u8F7D\u8BED\u6CD5\u6A21\u578B ${percent}%`);
        return new Uint8Array(buffer);
      })
    )
  );
  const merged = new Uint8Array(gzipSize);
  let offset = 0;
  parts.forEach((part) => {
    merged.set(part, offset);
    offset += part.byteLength;
  });
  activeStageCallback("\u6B63\u5728\u89E3\u538B\u8BED\u6CD5\u6A21\u578B");
  const stream = new Blob([merged.buffer]).stream().pipeThrough(new DecompressionStream("gzip"));
  const output = await new Response(stream).arrayBuffer();
  if (output.byteLength < 16e6) {
    throw new Error("Grammar model is incomplete");
  }
  return output;
}
async function fetchChunkPart(part) {
  const relative = `vendor/harper/chunks/${part.name}?v=${chunkVersion}`;
  const urls = chunkHosts.map((host) => `${host}${relative}`);
  urls.push(new URL(`vendor/harper/chunks/${part.name}`, base).href);
  let lastError = null;
  for (const url of urls) {
    try {
      const response = await originalFetch(url, { cache: "force-cache" });
      if (!response.ok) {
        throw new Error(`Grammar chunk request failed: ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength !== part.bytes) {
        throw new Error(`Grammar chunk size mismatch: ${part.name}`);
      }
      return buffer;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`Unable to fetch ${part.name}`);
}
async function correctEnglishText(source, { maxPasses = 2, maxChanges = 60, conservative = true } = {}) {
  const original = String(source || "").trim();
  if (!looksEnglish(original)) {
    return { text: original, changes: [], changed: false };
  }
  const linter = await warmUpHarperGrammar();
  let current = original;
  const changes = [];
  for (let pass = 0; pass < maxPasses; pass += 1) {
    const lints = await linter.lint(current, { language: "plaintext" });
    const fixes = collectSafeFixes(
      current,
      lints,
      maxChanges - changes.length,
      conservative
    );
    if (!fixes.length) {
      break;
    }
    fixes.sort((left, right) => right.start - left.start).forEach((fix) => {
      current = current.slice(0, fix.start) + fix.replacement + current.slice(fix.end);
      changes.push({
        before: fix.before,
        after: fix.replacement,
        message: fix.message,
        kind: fix.kind
      });
    });
  }
  return {
    text: current,
    changes,
    changed: current !== original
  };
}
function collectSafeFixes(text, lints, remaining, conservative) {
  if (remaining <= 0) {
    return [];
  }
  const candidates = [];
  for (const lint of lints) {
    const suggestions = lint.suggestions();
    if (!suggestions.length) {
      continue;
    }
    const kind = lint.lint_kind();
    if (conservative && !autoFixKinds.has(kind)) {
      continue;
    }
    const span = lint.span();
    const start = Math.max(0, Number(span.start) || 0);
    const end = Math.max(start, Number(span.end) || start);
    const before = text.slice(start, end);
    const message = lint.message();
    for (const suggestion of suggestions) {
      const suggestionKind = suggestion.kind();
      const replacement = suggestion.get_replacement_text();
      if (!isSafeFix({
        text,
        start,
        end,
        before,
        replacement,
        kind: suggestionKind,
        message
      })) {
        continue;
      }
      candidates.push({
        start,
        end,
        before,
        replacement,
        message,
        kind
      });
      break;
    }
  }
  candidates.sort((left, right) => left.start - right.start || left.end - right.end);
  const accepted = [];
  for (const candidate of candidates) {
    const overlaps = accepted.some(
      (fix) => candidate.start < fix.end && candidate.end > fix.start
    );
    if (!overlaps) {
      accepted.push(candidate);
    }
    if (accepted.length >= remaining) {
      break;
    }
  }
  return accepted;
}
function isSafeFix({ text, start, end, before, replacement, kind, message }) {
  if (kind !== SuggestionKind$1.Replace && kind !== SuggestionKind$1.Remove) {
    return false;
  }
  if (start === end && !replacement) {
    return false;
  }
  if (/[\r\n]/.test(replacement) && !/[\r\n]/.test(before)) {
    return false;
  }
  if (before.length > 2 && replacement.length > Math.max(24, before.length * 2.2)) {
    return false;
  }
  if (before.length === 0 && replacement.length > 16) {
    return false;
  }
  if (/copyright|html|url|hyperlink|heading/i.test(message)) {
    return false;
  }
  if (replacement === before) {
    return false;
  }
  return true;
}
function looksEnglish(text) {
  if (!text || text.length < 2) {
    return false;
  }
  const letters = (text.match(/[A-Za-z]/g) || []).length;
  const cjk = (text.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
  return letters >= 2 && letters / Math.max(1, letters + cjk) > 0.65;
}
export {
  correctEnglishText,
  isHarperGrammarAvailable,
  warmUpHarperGrammar
};
