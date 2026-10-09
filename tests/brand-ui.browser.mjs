// Uses an existing external Playwright install; never sends Ads requests or opens a dialer.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.EBTS_QA_URL || "http://127.0.0.1:3115";
const origin = new URL(base).origin;
assert.ok(["127.0.0.1", "localhost"].includes(new URL(base).hostname));
const browser = await chromium.launch({ headless: true });
try {
  // JavaScript-disabled navigation must leave all server-rendered homepage content visible.
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  await noJsContext.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(base, { waitUntil: "networkidle" });
  assert.ok(await noJsPage.locator("h1").isVisible());
  assert.ok(await noJsPage.locator(".hero-copy a[href^='tel:']").isVisible());
  assert.ok(await noJsPage.locator(".reveal").evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === "1")));
  await noJsContext.close();
  for (const width of [320, 393, 440, 768, 1440]) {
    for (const path of ["/", "/markalar", "/arcelik-servisi", "/bosch-servisi", "/samsung-servisi", "/vestel-servisi", "/mitsubishi-electric-servisi", "/mitsubishi-heavy-industries-servisi", "/beyaz-esya-servisi", "/buzdolabi-servisi", "/camasir-makinesi-servisi", "/bulasik-makinesi-servisi", "/kurutma-makinesi-servisi", "/klima-servisi", "/kombi-servisi", "/tv-tamiri", "/isi-pompasi-servisi", "/vrf-servisi", "/hizmet-bolgeleri", "/hakkimizda", "/iletisim"]) {
      const context = await browser.newContext({ viewport: { width, height: width === 440 ? 956 : 900 } });
      await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
      const page = await context.newPage(), errors = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      page.on("requestfailed", request => { if (request.url().startsWith(origin)) errors.push(request.url()); });
      page.on("request", request => { if (/brands(?:%2F|\/)/i.test(request.url())) errors.push("Unexpected manufacturer asset request: " + request.url()); });
      page.on("response", response => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(response.url()); });
      await page.addInitScript(() => {
        window.__uiCLS = 0;
        new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__uiCLS += entry.value; }).observe({ type: "layout-shift", buffered: true });
        window.addEventListener("click", event => {
          if (event.target instanceof Element && event.target.closest('a[href^="tel:"]')) event.preventDefault();
        });
      });
      assert.equal((await page.goto(base + path, { waitUntil: "networkidle" })).status(), 200);
      await page.locator(".cookie-consent").waitFor();
      const phone = page.locator(".mobile-call");
      const mobile = width <= 800;
      async function checkCookieSeparation() {
        const cookie = await page.locator(".cookie-consent").boundingBox(), cta = await phone.boundingBox();
        assert.ok(cookie.y >= 67 && cookie.y + cookie.height + 6 <= cta.y);
      }
      if (mobile) await checkCookieSeparation();
      await page.getByRole("button", { name: "Reddet", exact: true }).click();
      if (path === "/") {
        assert.equal(await page.locator(".hero-note").count(), 0);
        assert.match(await page.locator(".hero-copy").innerText(), /EGE BÖLGE SERVİS/);
        assert.equal(await page.locator(".hero-hours").innerText(), "7/24 ÇAĞRI MERKEZİ");
        assert.equal(await page.locator(".hero-hours").evaluate(e => e.nextElementSibling.matches("a.hero-call")), true);
        assert.ok((await page.locator(".hero-call").innerText()).includes("0533 231 9469"));
        if (mobile) {
          const heroCall = await page.locator(".hero-copy a[href^='tel:']").boundingBox();
          const fixedCall = await phone.boundingBox();
          assert.ok(heroCall.y + heroCall.height < fixedCall.y);
        }
      }
      let grid;
      if (path === "/" || path === "/markalar") {
        grid = await page.locator(".brand-directory__links").evaluate(list => {
          const cards = [...list.querySelectorAll("a")];
          const bounds = cards.map(card => { const r = card.getBoundingClientRect(); return { width: r.width, height: r.height, x: r.x, y: r.y }; });
          const long = cards.find(card => card.getAttribute("href") === "/mitsubishi-heavy-industries-servisi");
          const range = document.createRange(); range.selectNodeContents(long.querySelector(".brand-directory__name"));
          return { count: cards.length, columns: bounds.filter(r => Math.abs(r.y - bounds[0].y) < 1).length,
            rows: Object.values(Object.groupBy(bounds, r => Math.round(r.y))).map(row => row.length),
            widths: [...new Set(bounds.map(r => r.width))], heights: [...new Set(bounds.map(r => r.height))],
            centered: cards.every(card => getComputedStyle(card).textAlign === "center" && getComputedStyle(card).alignItems === "center"),
            overflow: cards.some(card => card.scrollWidth > card.clientWidth + 1),
            longNameLines: new Set([...range.getClientRects()].map(r => Math.round(r.y))).size,
            repeatedDisclosure: [...list.querySelectorAll("a")].some(a => a.textContent.includes("Bağımsız özel servis")),
            images: list.querySelectorAll("img,svg").length };
        });
        assert.equal(grid.count, 28); assert.equal(grid.images, 0);
        assert.equal(grid.repeatedDisclosure, false);
        assert.equal(await page.locator(".brand-directory__disclosure").count(), 1);
        assert.equal(grid.overflow, false); assert.equal(grid.centered, true);
        if (width <= 600) {
          assert.equal(grid.columns, 2); assert.ok(grid.rows.every(count => count === 2));
          assert.equal(grid.widths.length, 1); assert.ok(grid.longNameLines >= 2);
        } else {
          assert.equal(grid.columns, width === 768 ? 4 : 6);
          assert.ok(Math.max(...grid.widths) - Math.min(...grid.widths) < 1);
        }
        assert.ok(grid.heights.every(height => height >= 96 && height <= 104));
        const first = page.locator(".brand-directory__links a").first();
        await first.focus(); await page.keyboard.press("Tab");
        assert.ok(await page.evaluate(() => { const style = getComputedStyle(document.activeElement); return style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0; }));
      }
      if (mobile) {
        assert.equal(await phone.count(), 1); assert.equal(await phone.getAttribute("href"), "tel:+905332319469");
        assert.ok((await phone.innerText()).includes("0533 231 9469"));
        assert.equal(await phone.getAttribute("aria-label"), "0533 231 9469 numarasını hemen ara");
        await page.keyboard.press("Tab"); await phone.focus();
        assert.ok(await phone.evaluate(e => e.matches(":focus-visible") && getComputedStyle(e).outlineStyle !== "none"));
        await page.emulateMedia({ reducedMotion: "no-preference" });
        const moving = await phone.evaluate(e => ({ icon: getComputedStyle(e.querySelector(".phone-icon")).animationName, ring: getComputedStyle(e, "::after").animationName, pointer: getComputedStyle(e, "::after").pointerEvents, transform: getComputedStyle(e).transform }));
        assert.equal(moving.icon, "phone-attention"); assert.equal(moving.ring, "phone-ring");
        assert.equal(moving.pointer, "none"); assert.equal(moving.transform, "none");
        const before = await phone.boundingBox();
        await page.waitForTimeout(650); assert.deepEqual(await phone.boundingBox(), before);
        await page.emulateMedia({ reducedMotion: "reduce" });
        assert.deepEqual(await phone.evaluate(e => [getComputedStyle(e.querySelector(".phone-icon")).animationName, getComputedStyle(e, "::after").animationName]), ["none", "none"]);
        await phone.click();
      }
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise(resolve => setTimeout(resolve, 20)); }
        window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
      });
      assert.equal(await page.locator(".brand-directory img, .brand-directory__logo").count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (mobile) assert.ok(await page.evaluate(() => document.querySelector("footer").getBoundingClientRect().bottom <= document.querySelector(".mobile-call").getBoundingClientRect().top));
      await page.getByRole("button", { name: "Çerez Tercihleri", exact: true }).click();
      if (width === 320) {
        await page.setViewportSize({ width, height: 568 });
        if (path === "/") {
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
          const heroCall = await page.locator(".hero-copy a[href^='tel:']").boundingBox();
          const fixedCall = await phone.boundingBox();
          assert.ok(heroCall.y + heroCall.height < fixedCall.y);
        }
      }
      if (mobile) await checkCookieSeparation();
      await page.getByRole("button", { name: "Reddet", exact: true }).click();
      assert.deepEqual(await page.evaluate(() => [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src)), []);
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, path, grid, cls: await page.evaluate(() => window.__uiCLS), errors, cta: mobile ? "pass (motion, reduced motion, focus, cookie, footer)" : "desktop unchanged" }));
      await context.close();
    }
  }
} finally { await browser.close(); }
