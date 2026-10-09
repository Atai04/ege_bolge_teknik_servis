import assert from "node:assert/strict";
import fs from "node:fs";
import Module, { createRequire } from "node:module";
import { test } from "node:test";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
const require = createRequire(import.meta.url);
for (const extension of [".ts", ".tsx"]) {
  Module._extensions[extension] = (module, filename) => {
    module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, filename);
  };
}
const { default: Page } = require("../app/[...slug]/page.tsx");
const { BRAND_DIRECTORY } = require("../lib/brands.ts");
const { SERVICES } = require("../lib/data.ts");
const { BRAND_GUIDES } = require("../lib/brand-guides.ts");
const { SERVICE_GUIDES } = require("../lib/service-guides.ts");

test("every current brand and service renders its own readable guide and FAQ without changing page identity", async () => {
  assert.deepEqual(Object.keys(BRAND_GUIDES).sort(), BRAND_DIRECTORY.map(b => b.slug).sort());
  assert.deepEqual(Object.keys(SERVICE_GUIDES).sort(), SERVICES.map(s => s.slug).sort());
  const paragraphs = new Set();
  for (const [slug, guide] of Object.entries({ ...BRAND_GUIDES, ...SERVICE_GUIDES })) {
    const html = renderToStaticMarkup(await Page({ params: Promise.resolve({ slug: [slug] }) }));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, slug);
    assert.equal((html.match(/id="content-guide-title"/g) || []).length, 1, slug);
    assert.ok(html.includes(guide.title), slug);
    for (const section of guide.sections) {
      assert.ok(html.includes(section.title), slug);
      assert.ok(html.includes(section.text), slug);
      assert.ok(!paragraphs.has(section.text), `Repeated paragraph: ${slug}`);
      paragraphs.add(section.text);
    }
    for (const [question, answer] of guide.questions) {
      assert.ok(html.includes(question), slug);
      assert.ok(html.includes(answer), slug);
    }
    assert.ok(html.includes('href="tel:+905332319469"'), slug);
    assert.ok(html.includes("yetkili servisi değildir"), slug);
    assert.doesNotMatch(html, /brand-page__disclosure|7\/24 (?:tamir|teknik servis|yerinde servis)/i);
  }
});
