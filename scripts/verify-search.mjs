import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mergeSearchResults } from "../src/lib/search.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const prefix = "/personal-resume/";
const mimeTypes = {
  ".js": "text/javascript",
  ".json": "application/json",
  ".wasm": "application/wasm",
};
const server = createServer(async (request, response) => {
  const route = new URL(request.url, "http://localhost").pathname;
  if (!route.startsWith(prefix)) {
    response.writeHead(404).end();
    return;
  }
  const path = resolve(root, decodeURIComponent(route.slice(prefix.length)));
  if (!path.startsWith(root + sep)) {
    response.writeHead(404).end();
    return;
  }
  try {
    const data = await readFile(path);
    response
      .writeHead(200, {
        "Content-Type": mimeTypes[extname(path)] || "application/octet-stream",
      })
      .end(data);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
const origin = `http://127.0.0.1:${server.address().port}`;
const nativeFetch = globalThis.fetch;
globalThis.fetch = (input, options) =>
  nativeFetch(new URL(input, origin), options);
globalThis.window = {
  location: { origin },
  addEventListener() {},
  removeEventListener() {},
};
globalThis.document = {
  currentScript: null,
  querySelector: () => ({ getAttribute: () => "zh-CN" }),
};
let engine;
try {
  const catalog = JSON.parse(
    await readFile(resolve(root, "search-catalog.json"), "utf8"),
  );
  engine = await import(pathToFileURL(resolve(root, "pagefind/pagefind.js")));
  await engine.options({
    basePath: origin + prefix + "pagefind/",
    baseUrl: prefix,
    noWorker: true,
  });
  const cases = [
    ["标定", "calibration-workstation"],
    ["Zenoh", "device-core"],
    ["OTA", "firmware-ota"],
    ["Grounding DINO", "local-ai"],
    ["Vera", "vera-agent"],
    ["Agent", "vera-agent"],
    ["xanderPool", "xanderpool"],
    ["线程池", "xanderpool"],
    ["this-term-does-not-exist-7391", null],
  ];
  for (const [term, expected] of cases) {
    const found = await engine.search(term);
    const fullText = await Promise.all(
      found.results.map((item) => item.data()),
    );
    const results = mergeSearchResults(term, fullText, catalog);
    if (expected)
      assert(
        results.some((item) => item.url.includes(`/${expected}/`)),
        `Missing result for ${term}`,
      );
    else assert.equal(results.length, 0);
    assert.equal(
      new Set(results.map((item) => item.url)).size,
      results.length,
      "Duplicate result",
    );
    assert(
      results.every((item) => item.url.startsWith(prefix)),
      "Result escaped Pages base path",
    );
    console.log(
      `${term}: ${results.length} result(s), expected project verified`,
    );
  }
  assert.equal(mergeSearchResults("   ", [], catalog).length, 0);
} finally {
  if (engine) await engine.destroy();
  globalThis.fetch = nativeFetch;
  delete globalThis.window;
  delete globalThis.document;
  await new Promise((done) => server.close(done));
}
