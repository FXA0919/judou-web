let grammarPromise;

async function getGrammar() {
  if (!grammarPromise) {
    grammarPromise = import("./harper-runtime.bundle.mjs?v=grammar-v17")
      .then(async (grammar) => {
        await grammar.warmUpHarperGrammar();
        return grammar;
      })
      .catch((error) => {
        grammarPromise = null;
        throw error;
      });
  }
  return grammarPromise;
}

self.addEventListener("message", async (event) => {
  const { id, type, text } = event.data || {};
  if (!Number.isInteger(id)) {
    return;
  }
  try {
    const grammar = await getGrammar();
    const result = type === "correct"
      ? await grammar.correctEnglishText(String(text || ""))
      : null;
    self.postMessage({ id, result });
  } catch (error) {
    self.postMessage({ id, error: String(error?.message || error) });
  }
});
