// Run: node --test tests/service-regions.test.mjs
// Optional pre-change snapshot: EBTS_PHASE2_BASELINE=/tmp/ebts-brand-route-baseline.json
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

const { IZMIR_SERVICE_AREAS, IZMIR_EXCLUDED_AREAS, IZMIR_ADMINISTRATIVE_DISTRICTS, AYDIN_SERVICE_AREAS, SERVICE_PROVINCES, SERVICE_AREA_SCHEMA } = require("../lib/regions.ts");
const { AREAS, COMPANY } = require("../lib/data.ts");
const { PAGE_ROUTES, getCanonicalPaths, resolvePageRoute } = require("../lib/routes.ts");
const { default: Page, generateMetadata } = require("../app/[...slug]/page.tsx");
const { ServiceAreas, ProvinceSummary } = require("../components/ServiceAreas.tsx");
const expectedIzmir = ["Buca","Konak","Karabağlar","Bornova","Bayraklı","Gaziemir","Balçova","Narlıdere","Güzelbahçe","Karşıyaka","Çiğli","Menemen","Torbalı","Kemalpaşa","Menderes","Seferihisar","Urla","Foça","Aliağa","Selçuk","Bayındır","Bergama","Çeşme","Dikili","Karaburun","Kınık","Tire"];
const expectedAydin = ["Bozdoğan","Buharkent","Çine","Didim","Efeler","Germencik","İncirliova","Karacasu","Karpuzlu","Koçarlı","Köşk","Kuşadası","Kuyucak","Nazilli","Söke","Sultanhisar","Yenipazar"];

test("confirmed province coverage preserves İzmir order and all 17 Aydın districts", () => {
  assert.deepEqual(IZMIR_SERVICE_AREAS, expectedIzmir);
  assert.deepEqual(AREAS, expectedIzmir);
  assert.equal(IZMIR_SERVICE_AREAS.length, 27);
  assert.deepEqual(IZMIR_EXCLUDED_AREAS, ["Beydağ", "Kiraz", "Ödemiş"]);
  const administrative = ["Aliağa","Balçova","Bayındır","Bayraklı","Bergama","Beydağ","Bornova","Buca","Çeşme","Çiğli","Dikili","Foça","Gaziemir","Güzelbahçe","Karabağlar","Karaburun","Karşıyaka","Kemalpaşa","Kınık","Kiraz","Konak","Menderes","Menemen","Narlıdere","Ödemiş","Seferihisar","Selçuk","Tire","Torbalı","Urla"];
  assert.equal(IZMIR_ADMINISTRATIVE_DISTRICTS.length, 30);
  assert.equal(new Set(IZMIR_ADMINISTRATIVE_DISTRICTS).size, 30);
  assert.deepEqual([...IZMIR_ADMINISTRATIVE_DISTRICTS].sort(), administrative.sort());
  assert.deepEqual(AYDIN_SERVICE_AREAS, expectedAydin);
  assert.deepEqual(SERVICE_PROVINCES.map(p => p.id), ["izmir", "aydin"]);
  assert.deepEqual(SERVICE_PROVINCES[0].exclusions, ["Beydağ", "Kiraz", "Ödemiş"]);
  assert.deepEqual(SERVICE_PROVINCES[1].exclusions, []);
  for (const province of SERVICE_PROVINCES) {
    assert.equal(new Set(province.districts).size, province.districts.length);
    assert.ok(province.districts.every(name => !province.exclusions.includes(name)));
    assert.ok(!("neighborhoods" in province));
  }
});

test("region page renders 44 plain district labels; exclusion stays within İzmir", async () => {
  const html = renderToStaticMarkup(createElement(ServiceAreas));
  assert.ok(html.includes("İzmir ve Aydın Hizmet Bölgeleri</h1>"));
  assert.equal((html.match(/<li>/g) || []).length, 44);
  assert.ok(html.includes('href="/iletisim"'));
  for (const list of html.matchAll(/<ul class="province-districts">(.*?)<\/ul>/gs)) assert.ok(!list[1].includes("<a "));
  assert.ok(!html.includes("<details"));
  const aydinSection = html.slice(html.indexOf('aria-labelledby="province-aydin"'));
  assert.ok(!aydinSection.includes("Beydağ"));
  assert.ok(aydinSection.includes("Bozdoğan"));
  for (const name of IZMIR_EXCLUDED_AREAS) assert.ok(!html.includes(`<li>${name}</li>`));
  assert.ok(html.includes("Hizmet kapsamı dışında: Beydağ, Kiraz ve Ödemiş."));
  const summary = renderToStaticMarkup(createElement(ProvinceSummary));
  assert.ok(summary.includes("İzmir")); assert.ok(summary.includes("Aydın"));
  assert.ok(!summary.includes("Bozdoğan"));
  const meta = await generateMetadata({params: Promise.resolve({slug:["hizmet-bolgeleri"]})});
  assert.equal(meta.alternates.canonical, "/hizmet-bolgeleri");
  assert.ok(meta.title.includes("İzmir ve Aydın"));
});

test("canonical route set stays exactly at Phase 1: no province, district or neighborhood routes", () => {
  const brands = ["altus","amana","arcelik","baymak","beko","bosch","buderus","daikin","demirdokum","eca","electrolux","gaggenau","grundig","hoover","indesit","lg","mitsubishi-electric","mitsubishi-heavy-industries","profilo","regal","samsung","siemens","sub-zero","toshiba","vaillant","vestel","viessmann","whirlpool"].map(name => "/" + name + "-servisi");
  const services = ["beyaz-esya-servisi","camasir-makinesi-servisi","buzdolabi-servisi","bulasik-makinesi-servisi","kurutma-makinesi-servisi","klima-servisi","kombi-servisi","tv-tamiri","isi-pompasi-servisi","vrf-servisi"].map(name => "/" + name);
  const information = ["/","/markalar","/hizmet-bolgeleri","/hakkimizda","/iletisim","/gizlilik-politikasi","/cerez-politikasi"];
  assert.deepEqual([...getCanonicalPaths()].sort(), [...information, ...services, ...brands].sort());
  assert.equal(PAGE_ROUTES.filter(route => route.kind === "brand").length, 28);
  for (const slug of ["aydin", "bozdogan", "aydin/bozdogan", "aydin/bozdogan/akcay", "aydin-beyaz-esya-servisi"]) assert.equal(resolvePageRoute(slug), undefined);
});

test("structured service areas are districts nested under the correct province", () => {
  assert.equal(SERVICE_AREA_SCHEMA.length, 44);
  assert.ok(SERVICE_AREA_SCHEMA.every(area => !IZMIR_EXCLUDED_AREAS.includes(area.name)));
  assert.deepEqual(SERVICE_AREA_SCHEMA.filter(a => a.containedInPlace.name === "İzmir").map(a => a.name), expectedIzmir);
  assert.deepEqual(SERVICE_AREA_SCHEMA.filter(a => a.containedInPlace.name === "Aydın").map(a => a.name), expectedAydin);
  assert.ok(SERVICE_AREA_SCHEMA.every(a => a["@type"] === "AdministrativeArea" && !("address" in a)));
});

test("actual layout keeps one LocalBusiness and the exact Buca physical address", () => {
  // Stub build-only font/CSS modules; render the actual layout and parse its JSON-LD.
  const originalLoad = Module._load;
  const originalCss = Module._extensions[".css"];
  Module._extensions[".css"] = () => {};
  Module._load = function(id, ...args) {
    if (id === "next/font/google") return { Geist: () => ({variable: "qa-font"}) };
    return originalLoad.call(this, id, ...args);
  };
  try {
    const Layout = require("../app/layout.tsx").default;
    const html = renderToStaticMarkup(createElement(Layout, null, "QA"));
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    const businesses = schemas.filter(s => s["@type"] === "LocalBusiness");
    assert.equal(businesses.length, 1);
    assert.deepEqual(businesses[0].address, {"@type":"PostalAddress",streetAddress:"Fırat Mah. 289/59 Sk. No:7/A",postalCode:"35380",addressLocality:"Buca",addressRegion:"İzmir",addressCountry:"TR"});
    assert.deepEqual(businesses[0].areaServed, SERVICE_AREA_SCHEMA);
    assert.equal(COMPANY.contactAvailability, "7/24 Çağrı Merkezi");
    assert.ok(!("openingHours" in businesses[0]));
    assert.equal(businesses[0].contactPoint.contactType, "customer service");
    assert.equal(businesses[0].contactPoint.hoursAvailable.opens, "00:00");
    assert.equal(businesses[0].contactPoint.hoursAvailable.closes, "23:59");
    assert.equal(businesses[0].contactPoint.hoursAvailable.dayOfWeek.length, 7);
    assert.equal(COMPANY.address, "Fırat Mah. 289/59 Sk. No:7/A, 35380 Buca / İzmir");
  } finally {
    Module._load = originalLoad;
    if (originalCss) Module._extensions[".css"] = originalCss;
    else delete Module._extensions[".css"];
  }
});

test("Phase 2B baseline preserves metadata outside region page and all contact link counts", {skip: !process.env.EBTS_PHASE2_BASELINE}, async () => {
  const baseline = JSON.parse(fs.readFileSync(path.resolve(process.env.EBTS_PHASE2_BASELINE), "utf8"));
  for (const [url, previous] of Object.entries(baseline)) {
    let html;
    if (url === "/") html = renderToStaticMarkup(require("../app/page.tsx").default());
    else {
      const params = Promise.resolve({slug: [url.slice(1)]});
      const metadata = await generateMetadata({params});
      assert.equal(metadata.alternates.canonical, previous.canonical, url);
      if (url !== "/hizmet-bolgeleri") {
        assert.equal(metadata.title, previous.title, url);
        assert.equal(metadata.description, previous.description, url);
      }
      html = renderToStaticMarkup(await Page({params}));
    }
    assert.equal((html.match(/href="tel:/g) || []).length, previous.phoneLinks, url);
    assert.equal((html.match(/href="https:\/\/wa.me\//g) || []).length, previous.whatsappLinks, url);
  }
});
