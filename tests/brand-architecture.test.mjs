// Run: node --test tests/brand-architecture.test.mjs
// Optional pre-change snapshot: EBTS_BASELINE=/tmp/ebts-brand-route-baseline.json
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
const { BRAND_DIRECTORY, getBrandsForService } = require("../lib/brands.ts");
const { SERVICES, COMPANY } = require("../lib/data.ts");
const { PAGE_ROUTES, resolvePageRoute, assertUniqueRoutePaths, getCanonicalPaths } = require("../lib/routes.ts");
const { BrandDirectory } = require("../components/BrandDirectory.tsx");
const { BrandPage } = require("../components/BrandPage.tsx");
const { default: Page, generateMetadata, generateStaticParams } = require("../app/[...slug]/page.tsx");
const { default: sitemap } = require("../app/sitemap.ts");
const existingPaths = ["/", "/markalar", "/hizmet-bolgeleri", "/hakkimizda", "/iletisim", "/gizlilik-politikasi", "/cerez-politikasi", "/beyaz-esya-servisi", "/camasir-makinesi-servisi", "/buzdolabi-servisi", "/bulasik-makinesi-servisi", "/kurutma-makinesi-servisi", "/klima-servisi", "/kombi-servisi", "/tv-tamiri", "/isi-pompasi-servisi", "/vrf-servisi"];
const render = component => renderToStaticMarkup(component);
const counts = html => ({ phoneLinks: (html.match(/href="tel:/g) || []).length, whatsappLinks: (html.match(/href="https:\/\/wa.me\//g) || []).length });

test("28 confirmed brands, explicit distinct slugs, no inferred category coverage", () => {
  assert.equal(BRAND_DIRECTORY.length, 28);
  assert.equal(new Set(BRAND_DIRECTORY.map(b => b.slug)).size, 28);
  for (const brand of BRAND_DIRECTORY) assert.deepEqual(brand.supportedServices, []);
  for (const service of SERVICES) assert.deepEqual(getBrandsForService(service.slug), []);
  assert.equal(resolvePageRoute("mitsubishi-electric-servisi").brand.name, "Mitsubishi Electric");
  assert.equal(resolvePageRoute("mitsubishi-heavy-industries-servisi").brand.name, "Mitsubishi Heavy Industries");
  assert.equal(resolvePageRoute("eca-servisi").brand.name, "E.C.A.");
});

test("collisions fail for current and future route types; unknown routes remain 404", async () => {
  for (const slug of ["markalar", "klima-servisi", "arcelik-servisi"]) {
    assert.throws(() => assertUniqueRoutePaths([...PAGE_ROUTES, { slug }]), /collision/);
  }
  assert.throws(() => assertUniqueRoutePaths([{ slug: "future/page" }, { slug: "future/page" }]), /collision/);
  assert.throws(() => assertUniqueRoutePaths([{ slug: "arcelik-servisi/" }]), /Invalid/);
  for (const slug of ["unknown", "bosch-buzdolabi-servisi", "arcelik-servisi/unknown", "__proto__"]) {
    assert.equal(resolvePageRoute(slug), undefined);
    await assert.rejects(() => Page({ params: Promise.resolve({ slug: slug.split("/") }) }), /404/);
    await assert.rejects(() => generateMetadata({ params: Promise.resolve({ slug: slug.split("/") }) }), /404/);
  }
});

test("all original URLs keep canonicals; sitemap and generated routes agree", async () => {
  const canonicalPaths = getCanonicalPaths();
  assert.equal(canonicalPaths.length, 45);
  for (const url of existingPaths) {
    assert.ok(canonicalPaths.includes(url));
    if (url !== "/") assert.equal((await generateMetadata({ params: Promise.resolve({ slug: [url.slice(1)] }) })).alternates.canonical, url);
  }
  assert.deepEqual(sitemap().map(item => item.url), canonicalPaths.map(url => COMPANY.website + url));
  assert.deepEqual(generateStaticParams().map(({ slug }) => "/" + slug.join("/")), canonicalPaths.slice(1));
});

test("brand pages render disclosure, unique metadata, breadcrumbs and native contact links", async () => {
  const titles = new Set(), descriptions = new Set(), introductions = new Set();
  for (const brand of BRAND_DIRECTORY) {
    const params = Promise.resolve({ slug: [brand.slug] });
    const meta = await generateMetadata({ params });
    titles.add(meta.title); descriptions.add(meta.description); introductions.add(brand.shortDescription);
    assert.equal(meta.alternates.canonical, "/" + brand.slug);
    assert.equal(meta.openGraph.url, "/" + brand.slug);
    const html = render(await Page({ params }));
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.ok(html.includes(`${brand.name} Özel Servisi</h1>`));
    assert.ok(html.includes(`Bağımsız özel servistir. ${brand.name} markasının yetkili servisi değildir.`));
    assert.deepEqual(counts(html), { phoneLinks: 2, whatsappLinks: 2 });
    assert.ok(html.includes(`href="${COMPANY.phoneHref}"`));
    assert.ok(html.includes(`href="${COMPANY.whatsappUrl}"`));
    assert.ok(!html.includes("brand-services-title"));
    for (const service of SERVICES) assert.ok(!html.includes(`href="/${service.slug}"`));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema["@type"], "BreadcrumbList");
    assert.equal(schema.itemListElement[2].item, `${COMPANY.website}/${brand.slug}`);
    assert.deepEqual(schema.itemListElement.map(item => item.position), [1, 2, 3]);
    assert.ok(!html.includes("AggregateRating"));
  }
  assert.equal(titles.size, 28); assert.equal(descriptions.size, 28); assert.equal(introductions.size, 28);
});

test("future approved mappings render only their canonical service links", () => {
  const fixture = { ...BRAND_DIRECTORY[0], supportedServices: ["klima-servisi"] };
  const html = render(createElement(BrandPage, { brand: fixture }));
  assert.ok(html.includes('href="/klima-servisi"'));
  assert.ok(!html.includes('href="/kombi-servisi"'));
});

test("directory supports repeated rendering and light/dark themes without duplicate IDs", () => {
  const html = render(createElement("div", null,
    createElement(BrandDirectory, { theme: "dark" }),
    createElement(BrandDirectory, { headingLevel: 1 }),
  ));
  assert.equal((html.match(/<a href=/g) || []).length, 56);
  assert.ok(html.includes("brand-directory--dark"));
  assert.ok(html.includes("brand-directory--light"));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(render(createElement(BrandDirectory, { brands: [] })), "");
});

test("pre-change baseline retains metadata and contact link counts", { skip: !process.env.EBTS_BASELINE }, async () => {
  const baseline = JSON.parse(fs.readFileSync(path.resolve(process.env.EBTS_BASELINE), "utf8"));
  for (const [url, previous] of Object.entries(baseline)) {
    if (url === "/") {
      const Home = require("../app/page.tsx").default;
      assert.deepEqual(counts(render(Home())), { phoneLinks: previous.phoneLinks, whatsappLinks: previous.whatsappLinks });
      continue;
    }
    const params = Promise.resolve({ slug: [url.slice(1)] });
    const meta = await generateMetadata({ params });
    assert.equal(meta.alternates.canonical, previous.canonical, url);
    assert.equal(meta.title, previous.title, url);
    assert.equal(meta.description, previous.description, url);
    assert.deepEqual(counts(render(await Page({ params }))), { phoneLinks: previous.phoneLinks, whatsappLinks: previous.whatsappLinks }, url);
  }
});
