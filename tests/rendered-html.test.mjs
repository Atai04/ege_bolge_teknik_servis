import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

async function fetchRoute(path, init) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("route", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, init), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the redesigned homepage with the responsive hero image", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Ege Bölge Teknik Servis/);
  assert.match(html, /Evinizdeki Teknolojiye/);
  assert.match(html, /Güvenilir Servis/);
  assert.match(html, /teknik-servis-hero\.png/);
  assert.match(html, /Servis Talep Formu/);
  assert.doesNotMatch(html, /object-fit:fill/);
});

test("mobile navigation uses real targets and closes accessibly", async () => {
  const [chrome, home, css] = await Promise.all([
    readFile(new URL("../components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  for (const target of ["/#hizmetler", "/#hizmet-bolgeleri", "/#sss", "/hakkimizda", "/iletisim"]) assert.match(chrome, new RegExp(`"${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  assert.match(chrome, /aria-expanded=\{open\}/);
  assert.match(chrome, /event\.key === "Escape"/);
  assert.match(chrome, /onClick=\{closeMenu\}/);
  for (const id of ["hizmetler", "servis-talebi", "hizmet-bolgeleri", "sss"]) assert.match(home, new RegExp(`id="${id}"`));
  assert.match(css, /scroll-margin-top:116px/);
  assert.match(css, /body\.menu-open\{overflow:hidden\}/);
});

test("service and hero visuals preserve aspect ratios without stretching", async () => {
  const [visual, data, css] = await Promise.all([
    readFile(new URL("../components/ServiceVisual.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(visual, /fill priority=\{priority\}/);
  assert.match(data, /beyaz-esya-servisi\.png/);
  assert.match(data, /klima-servisi\.png/);
  assert.match(css, /\.hero-background\{[^}]*object-fit:cover/);
  assert.match(css, /\.service-sheet\{object-fit:cover/);
  assert.match(css, /\.service-card \.service-visual\{aspect-ratio:16\/10/);
  assert.doesNotMatch(css, /object-fit:fill/);
  assert.doesNotMatch(css, /(?:width|height):300%/);
});

test("responsive layout covers mobile, tablet and desktop breakpoints", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media\(max-width:1050px\)/);
  assert.match(css, /@media\(max-width:800px\).*service-grid\{grid-template-columns:1fr 1fr\}/s);
  assert.match(css, /@media\(max-width:480px\).*service-grid,.quick-grid\{grid-template-columns:1fr\}/s);
  assert.match(css, /@media\(max-width:800px\).*\.mobile-bar\{position:fixed/s);
  assert.match(css, /@media\(max-width:800px\).*\.header-main nav\.open\{position:absolute/s);
});

test("all public service and information routes render successfully", async () => {
  const routes = ["/", "/beyaz-esya-servisi", "/camasir-makinesi-servisi", "/buzdolabi-servisi", "/bulasik-makinesi-servisi", "/kurutma-makinesi-servisi", "/klima-servisi", "/kombi-servisi", "/tv-tamiri", "/isi-pompasi-servisi", "/vrf-servisi", "/markalar", "/hizmet-bolgeleri", "/hakkimizda", "/iletisim", "/kvkk", "/gizlilik-politikasi", "/cerez-politikasi", "/sitemap.xml", "/robots.txt"];
  const responses = await Promise.all(routes.map(route => fetchRoute(route)));
  for (const [index, response] of responses.entries()) assert.equal(response.status, 200, routes[index]);
});

test("service request API validates required fields without throwing", async () => {
  const response = await fetchRoute("/api/service-request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: "123", district: "", device: "", consent: "" }) });
  assert.equal(response.status, 400);
  assert.match(await response.text(), /zorunlu alanları/i);
});
