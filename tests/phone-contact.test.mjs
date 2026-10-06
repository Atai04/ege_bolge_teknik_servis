// Run: node --test tests/phone-contact.test.mjs
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { test } from "node:test";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
// Compile only application TS/TSX in memory; no generated files or new dependencies.
for (const extension of [".ts", ".tsx"]) {
  Module._extensions[extension] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2017, esModuleInterop: true },
    });
    module._compile(outputText, filename);
  };
}

const { COMPANY } = require("../lib/data.ts");
const { Header, Footer } = require("../components/SiteChrome.tsx");
const { default: Home } = require("../app/page.tsx");
const { default: Page, generateMetadata } = require("../app/[...slug]/page.tsx");
const { getCanonicalPaths } = require("../lib/routes.ts");
const baseline = JSON.parse(fs.readFileSync(new URL("./fixtures/phase4-baseline.json", import.meta.url), "utf8"));
const render = component => renderToStaticMarkup(createElement(component));
const chrome = render(Header) + render(Footer);

test("all 45 content routes and shared chrome offer phone contact without WhatsApp UI", async () => {
  assert.equal(getCanonicalPaths().length, 45);
  for (const url of getCanonicalPaths()) {
    const params = Promise.resolve({slug: [url.slice(1)]});
    const html = chrome + (url === "/" ? render(Home) : renderToStaticMarkup(await Page({params})));
    assert.doesNotMatch(html, /wa\.me|whatsapp/i, url);
    assert.doesNotMatch(html, /Servis talebi oluşturun/i, url);
    assert.doesNotMatch(html, /7\s*\/\s*24|24\s*\/\s*7|24 saat açık|gece gündüz|08:00[– -]+19:00/i, url);
    assert.ok(html.includes("Her gün 08:00–22:00"), url);
    const phones = [...html.matchAll(/href="(tel:[^"]+)"/g)].map(match => match[1]);
    assert.ok(phones.length >= 5, url);
    assert.ok(phones.every(href => href === "tel:+905332319469"), url);
    if (url !== "/") {
      const metadata = await generateMetadata({params});
      assert.equal(metadata.alternates.canonical, url);
      assert.doesNotMatch(JSON.stringify(metadata), /wa\.me|whatsapp/i, url);
    }
  }
});

test("mobile call control is one native phone link with visible number and decorative SVG", () => {
  const html = render(Footer);
  const mobile = html.match(/<nav class="mobile-bar".*?<\/nav>/s)[0];
  assert.equal((mobile.match(/<a /g) || []).length, 1);
  assert.ok(mobile.includes('href="tel:+905332319469"'));
  assert.ok(mobile.includes('<strong>0533 231 9469</strong>'));
  assert.ok(mobile.includes('Hemen Ara'));
  assert.ok(mobile.includes('aria-label="0533 231 9469 numarasını hemen ara"'));
  assert.match(mobile, /<svg[^>]+aria-hidden="true"[^>]+focusable="false"/);
  assert.doesNotMatch(mobile, /target=|onclick=|☎/);
  assert.equal(COMPANY.phoneHref, "tel:+905332319469");
  assert.equal(COMPANY.phoneDisplay, "0533 231 9469");
});

test("approved UI work preserves business data, shared chrome, routes, SEO and protected configuration", () => {
  // Approved UI scope only; historical hashes stay intact for all other files.
  const approvedUIFiles = ["app/globals.css", "components/BrandDirectory.tsx", "app/page.tsx"];
  for (const [file, expected] of Object.entries(baseline.sha256)) {
    if (approvedUIFiles.includes(file)) continue;
    const actual = createHash("sha256").update(fs.readFileSync(path.resolve(file))).digest("hex");
    assert.equal(actual, expected, file);
  }
  const consent = fs.readFileSync("components/CookieConsent.tsx", "utf8");
  assert.ok(consent.includes('send_to: "AW-18410577740/WXDGCL6J55IdEMy-7MpE"'));
  assert.ok(consent.includes('const GOOGLE_ADS_TAG_ID = "AW-18410577740"'));
  assert.equal(createHash("sha256").update(fs.readFileSync("lib/data.ts")).digest("hex"), baseline.dataWithoutObsoleteFieldSha256);
  assert.equal("whatsappUrl" in COMPANY, false);
  // No other application file may introduce a conversion call or destination.
  for (const directory of ["app", "components", "lib"]) {
    for (const entry of fs.readdirSync(directory, {recursive: true})) {
      const file = path.join(directory, entry);
      if (!/\.tsx?$/.test(file)) continue;
      assert.doesNotMatch(fs.readFileSync(file, "utf8"), /3sszCK2N7Y0dEMy-7MpE|wa\.me|whatsapp/i, file);
      if (file === path.join("components", "CookieConsent.tsx")) continue;
      assert.doesNotMatch(fs.readFileSync(file, "utf8"), /send_to\s*:|gtag\??\.?(?:\s*\()\s*["']event["']\s*,\s*["']conversion["']/i, file);
    }
  }
});


test("homepage hero shows only business hours below its call CTA", () => {
  const html = render(Home);
  const hero = html.match(/<section class="hero hero-photo">(.*?)<\/section>/s)[1];
  assert.doesNotMatch(hero, /hero-note|Bağımsız özel teknik servis/);
  assert.ok(hero.includes('<p class="hero-hours">Her gün 08:00–22:00</p>'));
  assert.ok(hero.includes('href="tel:+905332319469"'));
  assert.ok(chrome.includes("Her gün 08:00–22:00"));
});
