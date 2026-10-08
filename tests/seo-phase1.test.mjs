import assert from "node:assert/strict";
import fs from "node:fs";
import Module, { createRequire } from "node:module";
import { test } from "node:test";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
for (const extension of [".ts", ".tsx"]) {
  Module._extensions[extension] = (module, filename) => {
    module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, filename);
  };
}
Module._extensions[".css"] = () => {};
const { default: Layout, metadata: rootMetadata } = require("../app/layout.tsx");
const { default: Home } = require("../app/page.tsx");
const { default: Page, generateMetadata, generateStaticParams } = require("../app/[...slug]/page.tsx");
const { getCanonicalPaths } = require("../lib/routes.ts");
const { SERVICES, COMPANY } = require("../lib/data.ts");
const { BRAND_DIRECTORY } = require("../lib/brands.ts");
const { default: sitemap } = require("../app/sitemap.ts");
const paths = getCanonicalPaths();
const pages = new Map();
const metadata = new Map([["/", rootMetadata]]);
for (const path of paths) {
  const params = Promise.resolve({ slug: path.slice(1).split("/") });
  const content = path === "/" ? createElement(Home) : await Page({ params });
  pages.set(path, renderToStaticMarkup(createElement(Layout, null, content)));
  if (path !== "/") metadata.set(path, await generateMetadata({ params }));
}

test("all 45 pages retain unique metadata, one H1, canonicals, static parameters and sitemap membership", () => {
  assert.equal(paths.length, 45);
  assert.deepEqual(generateStaticParams().map(p => "/" + p.slug.join("/")), paths.slice(1));
  assert.deepEqual(sitemap(), paths.map(path => ({ url: COMPANY.website + path })));
  for (const field of ["title", "description"]) assert.equal(new Set([...metadata.values()].map(m => m[field])).size, 45);
  for (const [path, html] of pages) {
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
    assert.equal(metadata.get(path).alternates.canonical, path);
    assert.doesNotMatch(html, /7\/24 (?:Teknik Servis|Tamir)|24 Saat (?:Teknisyen|Onarım)|Her gün 08:00/);
  }
});

test("rendered internal page and fragment links resolve; coverage and appliance links are useful", () => {
  for (const [path, html] of pages) {
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (!href.startsWith("/") || href.startsWith("/_next/")) continue;
      const [destination, fragment] = href.split("#");
      assert.ok(pages.has(destination), `${path} -> ${href}`);
      if (fragment) assert.ok(pages.get(destination).includes(`id="${fragment}"`), href);
    }
  }
  for (const path of ["/markalar", "/hizmet-bolgeleri", "/iletisim", ...SERVICES.map(s => "/" + s.slug)]) {
    assert.ok(pages.get("/").includes(`href="${path}"`), path);
  }
  for (const service of SERVICES) {
    const html = pages.get("/" + service.slug);
    assert.ok(html.includes('href="/hizmet-bolgeleri"'));
    assert.ok(html.includes("İzmir ve Aydın"));
    assert.ok(html.includes("Beydağ, Kiraz ve Ödemiş"));
    assert.ok(html.includes("yetkili servisi değildir"));
    assert.ok(metadata.get("/" + service.slug).description.includes("İzmir ve Aydın"));
    if (["vrf-servisi", "isi-pompasi-servisi", "buzdolabi-servisi"].includes(service.slug)) assert.ok(!html.includes("Program tamamlamıyor"));
  }
  for (const slug of ["buzdolabi-servisi", "camasir-makinesi-servisi", "bulasik-makinesi-servisi", "kurutma-makinesi-servisi"]) {
    assert.ok(pages.get("/" + slug).includes('href="/beyaz-esya-servisi"'));
    assert.ok(pages.get("/beyaz-esya-servisi").includes(`href="/${slug}"`));
  }
});

test("JSON-LD expresses contact availability without inventing repair hours or manufacturer affiliations", () => {
  for (const [path, html] of pages) {
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
    const businesses = schemas.filter(s => s["@type"] === "LocalBusiness");
    assert.equal(businesses.length, 1, path);
    const business = businesses[0];
    assert.equal(business["@id"], COMPANY.website + "/#business");
    assert.equal(business.address.addressLocality, "Buca");
    assert.equal(business.areaServed.length, 44);
    assert.ok(!("openingHours" in business));
    assert.equal(business.contactPoint.telephone, "+905332319469");
    assert.deepEqual(business.contactPoint.hoursAvailable.dayOfWeek, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
    assert.equal(business.contactPoint.hoursAvailable.opens, "00:00");
    assert.equal(business.contactPoint.hoursAvailable.closes, "23:59");
    const service = schemas.find(s => s["@type"] === "Service");
    if (SERVICES.some(s => "/" + s.slug === path)) {
      assert.equal(service.url, COMPANY.website + path);
      assert.equal(service.provider["@id"], business["@id"]);
      assert.deepEqual(service.areaServed.map(a => a.name), ["İzmir", "Aydın"]);
    }
    assert.doesNotMatch(JSON.stringify(schemas), /AggregateRating|Review|award|certification/);
  }
  for (const brand of BRAND_DIRECTORY) assert.deepEqual(brand.supportedServices, []);
});

test("social image dimensions match the retained PNG and critical content is server-rendered", () => {
  const png = fs.readFileSync("public/og.png");
  const image = rootMetadata.openGraph.images[0];
  assert.equal(image.width, png.readUInt32BE(16));
  assert.equal(image.height, png.readUInt32BE(20));
  const html = pages.get("/");
  assert.ok(html.includes("Beyaz Eşya, Klima, Kombi ve TV"));
  assert.ok(html.includes("7/24 Çağrı Merkezi"));
  const css = fs.readFileSync("app/globals.css", "utf8");
  assert.doesNotMatch(css, /\.reveal[^{}]*\{[^}]*opacity:\s*0/);
  const animation = css.match(/@keyframes reveal-settle\{((?:[^{}]|\{[^{}]*\})*)\}/)[1];
  assert.doesNotMatch(animation, /opacity:\s*0/);
});
